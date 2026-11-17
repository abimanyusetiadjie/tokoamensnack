import { generateText, isStepCount, type ModelMessage } from "ai";
import crypto from "node:crypto";
import { isDatabaseConfigured, queryDb } from "@/lib/db";
import { getWebStoreAndKnowledge } from "@/lib/catalog";
import { createStoreTools } from "@/lib/chatbot-tools";
import {
  buildChatbotSystemPrompt,
  formatWhatsAppMarkdown,
  generateSmartStoreReply,
} from "@/lib/chatbot-fallback";

export type WaProvider = "waha" | "fonnte" | "meta";

export interface NormalizedWaEvent {
  provider: WaProvider;
  externalMessageId: string | null;
  chatId: string;
  customerPhone: string;
  customerName: string | null;
  fromMe: boolean;
  body: string;
  session?: string;
}

export interface WaProcessOutcome {
  ok: boolean;
  provider?: WaProvider;
  action:
    | "ignored_non_text"
    | "ignored_group_or_broadcast"
    | "duplicate_ignored"
    | "bot_echo_ignored"
    | "admin_manual_reply_paused"
    | "bot_resumed_by_admin"
    | "paused_for_human_admin"
    | "escalated_to_human"
    | "replied"
    | "reply_generated_dry_run";
  customerPhone?: string;
  replyText?: string;
  sendResult?: { sent: boolean; externalMessageId?: string | null; error?: string };
}

function getPauseMinutes(): number {
  const raw = Number(process.env.WA_HUMAN_PAUSE_MINUTES || 30);
  return Number.isFinite(raw) && raw > 0 ? Math.min(Math.round(raw), 1440) : 30;
}

export function normalizePhoneDigits(raw: string): string {
  let digits = raw.replace(/@.+$/, "").replace(/\D/g, "");
  if (digits.startsWith("0")) {
    digits = "62" + digits.slice(1);
  }
  return digits;
}

/**
 * Verifies Meta X-Hub-Signature-256 HMAC if META_APP_SECRET is configured.
 */
export function verifyMetaSignature(
  rawBody: string,
  signatureHeader: string | null
): boolean {
  const secret = (process.env.META_APP_SECRET || "").trim();
  if (!secret) return true;
  if (!signatureHeader || !signatureHeader.startsWith("sha256=")) return false;

  const expected =
    "sha256=" +
    crypto.createHmac("sha256", secret).update(rawBody, "utf8").digest("hex");
  try {
    return crypto.timingSafeEqual(
      Buffer.from(signatureHeader, "utf8"),
      Buffer.from(expected, "utf8")
    );
  } catch {
    return false;
  }
}

function extractWahaMessageId(rawId: unknown): string | null {
  if (!rawId) return null;
  if (typeof rawId === "string") return rawId.trim() || null;
  if (typeof rawId === "object") {
    const obj = rawId as Record<string, unknown>;
    const candidate = obj._serialized || obj.id || obj.keyId;
    if (typeof candidate === "string" && candidate.trim()) {
      return candidate.trim();
    }
  }
  return null;
}

function extractWahaCustomerPhone(
  payloadData: Record<string, unknown>,
  targetJid: string
): string {
  const dataObj =
    payloadData._data && typeof payloadData._data === "object"
      ? (payloadData._data as Record<string, unknown>)
      : null;
  const keyObj =
    dataObj?.key && typeof dataObj.key === "object"
      ? (dataObj.key as Record<string, unknown>)
      : null;
  const infoObj =
    dataObj?.Info && typeof dataObj.Info === "object"
      ? (dataObj.Info as Record<string, unknown>)
      : null;

  const altJid = String(
    keyObj?.remoteJidAlt || infoObj?.SenderAlt || infoObj?.Chat || ""
  ).trim();

  if (targetJid.endsWith("@lid") && altJid && !altJid.endsWith("@lid")) {
    return normalizePhoneDigits(altJid);
  }
  return normalizePhoneDigits(targetJid);
}

function normalizeCompareText(raw: string): string {
  return raw.replace(/\r\n/g, "\n").trim();
}

/**
 * Parses incoming webhook payloads from WAHA, Fonnte, or Meta WhatsApp Cloud API
 * into one unified structure. Returns null cleanly for status/non-chat notifications.
 */
export function parseIncomingWaWebhook(
  payload: Record<string, unknown>
): NormalizedWaEvent | null {
  // 1. WAHA (WhatsApp HTTP API) — listens on `message` or `message.any`
  if (
    typeof payload?.event === "string" &&
    payload?.payload &&
    typeof payload.payload === "object"
  ) {
    const eventName = payload.event;
    if (eventName !== "message" && eventName !== "message.any") {
      return null;
    }
    const p = payload.payload as Record<string, unknown>;
    const from = String(p.from || "");
    const to = String(p.to || "");
    const fromMe = Boolean(p.fromMe);
    const targetJid = fromMe ? to || from : from;

    if (
      !targetJid ||
      from === "status@broadcast" ||
      targetJid === "status@broadcast" ||
      targetJid.endsWith("@g.us") ||
      targetJid.endsWith("@newsletter")
    ) {
      return null;
    }

    const body = String(p.body || p.caption || "").trim();
    if (!body) return null;

    const dataObj =
      p._data && typeof p._data === "object"
        ? (p._data as Record<string, unknown>)
        : null;

    return {
      provider: "waha",
      externalMessageId: extractWahaMessageId(p.id),
      chatId: targetJid,
      customerPhone: extractWahaCustomerPhone(p, targetJid),
      customerName: dataObj?.notifyName ? String(dataObj.notifyName) : null,
      fromMe,
      body,
      session: payload.session ? String(payload.session) : undefined,
    };
  }

  // 2. Meta WhatsApp Business Cloud API
  if (
    payload?.object === "whatsapp_business_account" &&
    Array.isArray(payload?.entry)
  ) {
    const entry0 = payload.entry[0] as Record<string, unknown> | undefined;
    const changes = Array.isArray(entry0?.changes)
      ? (entry0.changes[0] as Record<string, unknown> | undefined)
      : undefined;
    const value =
      changes?.value && typeof changes.value === "object"
        ? (changes.value as Record<string, unknown>)
        : undefined;

    if (!value || !Array.isArray(value.messages) || value.messages.length === 0) {
      return null;
    }

    const msg = value.messages[0] as Record<string, unknown>;
    if (msg.type !== "text") return null;

    const textObj =
      msg.text && typeof msg.text === "object"
        ? (msg.text as Record<string, unknown>)
        : undefined;
    const body = String(textObj?.body || "").trim();
    const from = String(msg.from || "");
    if (!body || !from) return null;

    const contacts = Array.isArray(value.contacts)
      ? (value.contacts[0] as Record<string, unknown> | undefined)
      : undefined;
    const profile =
      contacts?.profile && typeof contacts.profile === "object"
        ? (contacts.profile as Record<string, unknown>)
        : undefined;

    return {
      provider: "meta",
      externalMessageId: msg.id ? String(msg.id) : null,
      chatId: normalizePhoneDigits(from),
      customerPhone: normalizePhoneDigits(from),
      customerName: profile?.name ? String(profile.name) : null,
      fromMe: false,
      body,
    };
  }

  // 3. Fonnte Gateway
  if (
    typeof payload?.sender === "string" &&
    (payload.message !== undefined || payload.text !== undefined)
  ) {
    const sender = String(payload.sender || "");
    const device = String(payload.device || "");
    const isGroup = Boolean(payload.isgroup) || sender.endsWith("@g.us");
    if (isGroup || sender === "status@broadcast") {
      return null;
    }

    const body = String(payload.message ?? payload.text ?? "").trim();
    if (!body) return null;

    const senderDigits = normalizePhoneDigits(sender);
    const deviceDigits = normalizePhoneDigits(device);
    const explicitFromMe =
      Boolean(payload.me) ||
      Boolean(payload.fromMe) ||
      (Boolean(deviceDigits) && senderDigits === deviceDigits);

    const targetRaw = explicitFromMe
      ? String(payload.member || payload.target || sender)
      : sender;

    return {
      provider: "fonnte",
      externalMessageId: payload.id ? String(payload.id) : null,
      chatId: normalizePhoneDigits(targetRaw),
      customerPhone: normalizePhoneDigits(targetRaw),
      customerName: payload.name
        ? String(payload.name)
        : payload.pushname
          ? String(payload.pushname)
          : null,
      fromMe: explicitFromMe,
      body,
    };
  }

  return null;
}

/**
 * Generates an accurate Indonesian response from AI SDK (when AI_GATEWAY_API_KEY / OIDC
 * is available) or falls back cleanly to the deterministic Supabase catalog engine.
 */
async function buildWhatsAppReplyText(
  customerText: string,
  historyRows: { role: string; body: string }[]
): Promise<string> {
  const hasAiGateway = Boolean(
    (process.env.AI_GATEWAY_API_KEY || "").trim() ||
      (process.env.VERCEL_OIDC_TOKEN || "").trim()
  );

  if (hasAiGateway) {
    try {
      const { store, knowledge } = await getWebStoreAndKnowledge();
      const tools = createStoreTools(store);

      const priorMessages: ModelMessage[] = historyRows.map((m) => ({
        role: m.role === "customer" ? "user" : "assistant",
        content: m.body,
      }));

      const system = [
        buildChatbotSystemPrompt(store, knowledge),
        "FORMAT KHUSUS WHATSAPP: Gunakan *tebal* satu tanda bintang (bukan **dua bintang**), jangan gunakan format link markdown [label](url) melainkan tulis URL langsung atau cukup beri info nama produk, harga, stok, dan link https://tokoamensnack.vercel.app.",
      ].join("\n");

      const result = await generateText({
        model: process.env.AI_MODEL || "google/gemini-3-flash",
        system,
        messages: [...priorMessages, { role: "user", content: customerText }],
        stopWhen: isStepCount(5),
        tools,
      });

      if (result.text && result.text.trim()) {
        return formatWhatsAppMarkdown(result.text);
      }
    } catch (err) {
      console.warn(
        "[WhatsApp Bot] AI Gateway fallback to Smart Catalog Engine:",
        err
      );
    }
  }

  const fallback = await generateSmartStoreReply(
    customerText,
    historyRows.map((m) => ({
      role: m.role === "customer" ? "user" : "assistant",
      text: m.body,
    }))
  );
  return formatWhatsAppMarkdown(fallback);
}

/**
 * Sends best-effort WAHA read receipt & typing indicator so customers see
 * natural feedback while Supabase / AI generates the store reply.
 */
async function sendWahaPresence(
  event: NormalizedWaEvent,
  mode: "start" | "stop"
): Promise<void> {
  if (event.provider !== "waha") return;
  const baseUrl = (process.env.WAHA_API_URL || "").trim().replace(/\/$/, "");
  if (!baseUrl) return;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const apiKey = (process.env.WAHA_API_KEY || "").trim();
  if (apiKey) headers["X-Api-Key"] = apiKey;

  const session = event.session || (process.env.WAHA_SESSION || "default").trim();
  const body = JSON.stringify({ session, chatId: event.chatId });

  try {
    if (mode === "start") {
      await Promise.allSettled([
        fetch(`${baseUrl}/api/sendSeen`, {
          method: "POST",
          headers,
          body,
          signal: AbortSignal.timeout(1200),
        }),
        fetch(`${baseUrl}/api/startTyping`, {
          method: "POST",
          headers,
          body,
          signal: AbortSignal.timeout(1200),
        }),
      ]);
    } else {
      await fetch(`${baseUrl}/api/stopTyping`, {
        method: "POST",
        headers,
        body,
        signal: AbortSignal.timeout(1000),
      });
    }
  } catch {
    // Non-fatal: older/minimal WAHA builds may omit typing endpoints
  }
}

/**
 * Sends a text message back through the matching WhatsApp provider API.
 * If provider send credentials aren't configured yet, logs cleanly in dry-run mode.
 */
export async function sendWhatsAppReply(
  event: NormalizedWaEvent,
  text: string
): Promise<{ sent: boolean; externalMessageId?: string | null; error?: string }> {
  try {
    if (event.provider === "waha") {
      const baseUrl = (process.env.WAHA_API_URL || "").trim().replace(/\/$/, "");
      if (!baseUrl) {
        return {
          sent: false,
          error: "WAHA_API_URL belum dikonfigurasi (dry-run)",
        };
      }
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };
      const apiKey = (process.env.WAHA_API_KEY || "").trim();
      if (apiKey) headers["X-Api-Key"] = apiKey;

      const res = await fetch(`${baseUrl}/api/sendText`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          session:
            event.session || (process.env.WAHA_SESSION || "default").trim(),
          chatId: event.chatId,
          text,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        return { sent: false, error: `WAHA HTTP ${res.status}` };
      }
      return {
        sent: true,
        externalMessageId: extractWahaMessageId(data?.id),
      };
    }

    if (event.provider === "fonnte") {
      const token = (process.env.FONNTE_TOKEN || "").trim();
      if (!token || token === "SIMULATION_MODE") {
        return {
          sent: false,
          error: "FONNTE_TOKEN belum dikonfigurasi (dry-run)",
        };
      }
      const res = await fetch("https://api.fonnte.com/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          target: event.customerPhone,
          message: text,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.status === false) {
        return {
          sent: false,
          error: data?.reason || `Fonnte HTTP ${res.status}`,
        };
      }
      const idVal = Array.isArray(data?.id) ? data.id[0] : data?.id;
      return { sent: true, externalMessageId: idVal ? String(idVal) : null };
    }

    // Meta Cloud API
    const accessToken = (process.env.META_WA_ACCESS_TOKEN || "").trim();
    const phoneNumberId = (process.env.META_WA_PHONE_NUMBER_ID || "").trim();
    if (!accessToken || !phoneNumberId) {
      return {
        sent: false,
        error: "META_WA_ACCESS_TOKEN / META_WA_PHONE_NUMBER_ID belum diset (dry-run)",
      };
    }

    const res = await fetch(
      `https://graph.facebook.com/v22.0/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: event.customerPhone,
          type: "text",
          text: { preview_url: false, body: text },
        }),
      }
    );
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return {
        sent: false,
        error: data?.error?.message || `Meta API HTTP ${res.status}`,
      };
    }
    const msgId = data?.messages?.[0]?.id ? String(data.messages[0].id) : null;
    return { sent: true, externalMessageId: msgId };
  } catch (err) {
    return {
      sent: false,
      error: err instanceof Error ? err.message : "Unknown send error",
    };
  }
}

async function safeUpsertConversation(event: NormalizedWaEvent): Promise<{
  id: string;
  human_paused_until: string | null;
  last_bot_reply_text: string | null;
  last_bot_reply_at: string | null;
} | null> {
  if (!isDatabaseConfigured()) return null;
  try {
    const rows = await queryDb<{
      id: string;
      human_paused_until: string | null;
      last_bot_reply_text: string | null;
      last_bot_reply_at: string | null;
    }>(
      `INSERT INTO wa_conversations (provider, customer_phone, customer_name, last_message_at)
       VALUES ($1, $2, $3, NOW())
       ON CONFLICT (customer_phone) DO UPDATE SET
         provider = EXCLUDED.provider,
         customer_name = COALESCE(EXCLUDED.customer_name, wa_conversations.customer_name),
         last_message_at = NOW()
       RETURNING id, human_paused_until, last_bot_reply_text, last_bot_reply_at`,
      [event.provider, event.customerPhone, event.customerName]
    );
    return rows[0] || null;
  } catch (err) {
    console.warn("[WA DB] Conversation upsert skipped:", err);
    return null;
  }
}

/**
 * Full pipeline: dedup -> persist -> check Human Takeover pause -> generate reply -> send.
 */
export async function processNormalizedWaEvent(
  event: NormalizedWaEvent
): Promise<WaProcessOutcome> {
  const pauseMinutes = getPauseMinutes();
  const conv = await safeUpsertConversation(event);

  // Deduplicate exact external_message_id retries or our own echoed bot messages
  if (conv && event.externalMessageId) {
    try {
      const dup = await queryDb<{ id: string }>(
        `SELECT id FROM wa_messages WHERE external_message_id = $1 LIMIT 1`,
        [event.externalMessageId]
      );
      if (dup.length > 0) {
        return {
          ok: true,
          provider: event.provider,
          action: "duplicate_ignored",
          customerPhone: event.customerPhone,
        };
      }
    } catch {}
  }

  // Handle outgoing Admin replies (`fromMe === true`) -> distinguish bot echo vs Admin HP
  if (event.fromMe) {
    if (conv?.last_bot_reply_text && conv.last_bot_reply_at) {
      const elapsedMs = Date.now() - new Date(conv.last_bot_reply_at).getTime();
      if (
        elapsedMs >= 0 &&
        elapsedMs < 45_000 &&
        normalizeCompareText(conv.last_bot_reply_text) ===
          normalizeCompareText(event.body)
      ) {
        if (event.externalMessageId) {
          await queryDb(
            `UPDATE wa_messages
             SET external_message_id = COALESCE(external_message_id, $1)
             WHERE id = (
               SELECT id FROM wa_messages
               WHERE conversation_id = $2 AND role = 'bot'
               ORDER BY created_at DESC LIMIT 1
             )`,
            [event.externalMessageId, conv.id]
          ).catch(() => {});
        }
        return {
          ok: true,
          provider: event.provider,
          action: "bot_echo_ignored",
          customerPhone: event.customerPhone,
        };
      }
    }

    // Genuine manual reply or command typed by Admin in WhatsApp Business HP
    if (conv) {
      await queryDb(
        `INSERT INTO wa_messages (conversation_id, external_message_id, role, sender_channel, body)
         VALUES ($1, $2, 'admin', $3, $4)
         ON CONFLICT (external_message_id) DO NOTHING`,
        [conv.id, event.externalMessageId, event.provider, event.body]
      ).catch(() => {});

      const lowerCmd = event.body.trim().toLowerCase();
      if (/^#(bot|lanjut|aktif|resume)\b/.test(lowerCmd)) {
        await queryDb(
          `UPDATE wa_conversations SET human_paused_until = NULL WHERE id = $1`,
          [conv.id]
        ).catch(() => {});
        return {
          ok: true,
          provider: event.provider,
          action: "bot_resumed_by_admin",
          customerPhone: event.customerPhone,
        };
      }

      const minutes = /^#(stop|pause|jeda|admin)\b/.test(lowerCmd)
        ? 720
        : pauseMinutes;
      await queryDb(
        `UPDATE wa_conversations
         SET human_paused_until = NOW() + make_interval(mins => $2)
         WHERE id = $1`,
        [conv.id, minutes]
      ).catch(() => {});
    }

    return {
      ok: true,
      provider: event.provider,
      action: "admin_manual_reply_paused",
      customerPhone: event.customerPhone,
    };
  }

  // Incoming Customer Message (`fromMe === false`)
  if (conv) {
    await queryDb(
      `INSERT INTO wa_messages (conversation_id, external_message_id, role, sender_channel, body)
       VALUES ($1, $2, 'customer', $3, $4)
       ON CONFLICT (external_message_id) DO NOTHING`,
      [conv.id, event.externalMessageId, event.provider, event.body]
    ).catch(() => {});

    // Admin has recently taken over this chat -> do not auto-reply!
    if (
      conv.human_paused_until &&
      new Date(conv.human_paused_until).getTime() > Date.now()
    ) {
      return {
        ok: true,
        provider: event.provider,
        action: "paused_for_human_admin",
        customerPhone: event.customerPhone,
      };
    }
  }

  // Customer explicitly asks for human admin
  const wantsHumanAdmin =
    /^(?:mau\s+|ingin\s+|minta\s+)?(?:bicara|ngomong|chat|hubungi|disambungkan)\s+(?:sama\s+|dengan\s+|ke\s+)?(?:admin|cs|orang|penjual|owner)\b|^#admin$/i.test(
      event.body.trim()
    );

  let replyText: string;
  let action: WaProcessOutcome["action"] = "replied";

  if (wantsHumanAdmin) {
    replyText = `Baik Kak, pesan ini diteruskan langsung ke Admin Toko Amen Snack (0813-6872-2622). Asisten otomatis kami jeda sementara (${pauseMinutes} menit) agar Admin bisa membalas langsung di chat ini ya.`;
    action = "escalated_to_human";
    if (conv) {
      await queryDb(
        `UPDATE wa_conversations
         SET human_paused_until = NOW() + make_interval(mins => $2)
         WHERE id = $1`,
        [conv.id, pauseMinutes]
      ).catch(() => {});
    }
  } else {
    await sendWahaPresence(event, "start");
    let historyRows: { role: string; body: string }[] = [];
    if (conv) {
      try {
        const rows = await queryDb<{ role: string; body: string }>(
          `SELECT role, body
           FROM wa_messages
           WHERE conversation_id = $1
           ORDER BY created_at DESC
           LIMIT 7`,
          [conv.id]
        );
        // Exclude the just-inserted customer message and reverse oldest -> newest
        historyRows = rows.slice(1).reverse();
      } catch {}
    }
    replyText = await buildWhatsAppReplyText(event.body, historyRows);
    await sendWahaPresence(event, "stop");
  }

  // Record bot reply text BEFORE sending so rapid WAHA `message.any` echo is safely recognized
  if (conv) {
    await queryDb(
      `UPDATE wa_conversations
       SET last_bot_reply_text = $2, last_bot_reply_at = NOW()
       WHERE id = $1`,
      [conv.id, replyText]
    ).catch(() => {});
  }

  const sendResult = await sendWhatsAppReply(event, replyText);

  if (conv) {
    await queryDb(
      `INSERT INTO wa_messages (conversation_id, external_message_id, role, sender_channel, body)
       VALUES ($1, $2, 'bot', $3, $4)
       ON CONFLICT (external_message_id) DO NOTHING`,
      [conv.id, sendResult.externalMessageId || null, event.provider, replyText]
    ).catch(() => {});
  }

  return {
    ok: true,
    provider: event.provider,
    action: sendResult.sent ? action : "reply_generated_dry_run",
    customerPhone: event.customerPhone,
    replyText,
    sendResult,
  };
}
