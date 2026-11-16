import { NextResponse } from "next/server";
import {
  parseIncomingWaWebhook,
  processNormalizedWaEvent,
  verifyMetaSignature,
} from "@/lib/whatsapp-service";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

/**
 * GET /api/webhooks/whatsapp
 * Handles Meta WhatsApp Cloud API webhook verification (`hub.verify_token`)
 * as well as basic webhook readiness diagnostics.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && challenge) {
    const expectedToken = (process.env.META_WA_VERIFY_TOKEN || "").trim();
    if (expectedToken && token === expectedToken) {
      return new Response(challenge, {
        status: 200,
        headers: { "Content-Type": "text/plain" },
      });
    }
    return NextResponse.json(
      { error: "Invalid Meta verify token." },
      { status: 403 }
    );
  }

  return NextResponse.json({
    ok: true,
    service: "Toko Amen Snack Multi-Provider WhatsApp Webhook",
    supportedProviders: ["waha", "fonnte", "meta"],
    configured: {
      waha: Boolean((process.env.WAHA_API_URL || "").trim()),
      fonnte: Boolean(
        (process.env.FONNTE_TOKEN || "").trim() &&
          process.env.FONNTE_TOKEN !== "SIMULATION_MODE"
      ),
      meta: Boolean(
        (process.env.META_WA_ACCESS_TOKEN || "").trim() &&
          (process.env.META_WA_PHONE_NUMBER_ID || "").trim()
      ),
    },
  });
}

/**
 * POST /api/webhooks/whatsapp
 * Unified webhook receiver for WAHA (`message.any`), Fonnte, and Meta Cloud API.
 */
export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const contentType = req.headers.get("content-type") || "";
    const { searchParams } = new URL(req.url);

    let parsedBody: Record<string, unknown> = {};
    if (contentType.includes("application/x-www-form-urlencoded")) {
      parsedBody = Object.fromEntries(new URLSearchParams(rawBody).entries());
    } else if (rawBody.trim()) {
      parsedBody = JSON.parse(rawBody) as Record<string, unknown>;
    }

    // Security check: Meta signature for Meta payloads, or shared secret for WAHA/Fonnte if set
    const isMetaPayload = parsedBody?.object === "whatsapp_business_account";
    if (isMetaPayload) {
      const sig = req.headers.get("x-hub-signature-256");
      if (!verifyMetaSignature(rawBody, sig)) {
        return NextResponse.json(
          { error: "Invalid Meta webhook signature." },
          { status: 401 }
        );
      }
    } else {
      const expectedSecret = (process.env.WA_WEBHOOK_SECRET || "").trim();
      if (expectedSecret) {
        const providedSecret =
          req.headers.get("x-webhook-secret") ||
          searchParams.get("secret") ||
          "";
        if (providedSecret !== expectedSecret) {
          return NextResponse.json(
            { error: "Unauthorized webhook request." },
            { status: 401 }
          );
        }
      }
    }

    const normalized = parseIncomingWaWebhook(parsedBody);
    if (!normalized) {
      return NextResponse.json({ ok: true, action: "ignored_non_chat_event" });
    }

    const outcome = await processNormalizedWaEvent(normalized);
    return NextResponse.json(outcome);
  } catch (err) {
    console.error("[POST /api/webhooks/whatsapp]", err);
    return NextResponse.json(
      { ok: false, error: "Webhook processing error" },
      { status: 500 }
    );
  }
}
