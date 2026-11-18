import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  isStepCount,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai";
import { getWebStoreAndKnowledge } from "@/lib/catalog";
import { createStoreTools } from "@/lib/chatbot-tools";
import {
  buildChatbotSystemPrompt,
  generateSmartStoreWebReply,
  type ChatbotUiPayload,
} from "@/lib/chatbot-fallback";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

function extractLastUserText(messages: UIMessage[]): string {
  for (let i = messages.length - 1; i >= 0; i--) {
    const msg = messages[i];
    if (msg.role === "user") {
      const textParts = (msg.parts || [])
        .filter((p): p is { type: "text"; text: string } => p.type === "text")
        .map((p) => p.text)
        .join(" ")
        .trim();
      if (textParts) return textParts;
    }
  }
  return "";
}

function extractHistoryEntries(
  messages: UIMessage[]
): { role: string; text: string }[] {
  if (messages.length <= 1) return [];
  return messages.slice(0, -1).map((m) => ({
    role: m.role,
    text: (m.parts || [])
      .filter((p): p is { type: "text"; text: string } => p.type === "text")
      .map((p) => p.text)
      .join(" ")
      .trim(),
  }));
}

function buildTextStreamResponse(
  replyText: string,
  uiData?: ChatbotUiPayload
): Response {
  const textId = `txt-${Date.now()}`;
  const stream = createUIMessageStream({
    execute: ({ writer }) => {
      writer.write({ type: "start" });
      writer.write({ type: "start-step" });
      writer.write({ type: "text-start", id: textId });
      writer.write({ type: "text-delta", id: textId, delta: replyText });
      writer.write({ type: "text-end", id: textId });
      if (uiData && (uiData.products.length > 0 || uiData.suggestions.length > 0)) {
        writer.write({
          type: "data-store-ui",
          data: uiData,
        });
      }
      writer.write({ type: "finish-step" });
      writer.write({ type: "finish", finishReason: "stop" });
    },
  });
  return createUIMessageStreamResponse({ stream });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages: UIMessage[] = Array.isArray(body?.messages)
      ? body.messages
      : [];

    if (messages.length === 0) {
      return buildTextStreamResponse(
        "Halo! Pilih salah satu skenario belanja di atas atau tanyakan harga, stok, dan rekomendasi oleh-oleh khas Bangka.",
        {
          products: [],
          suggestions: [
            "Paket oleh-oleh < 150rb",
            "Produk unggulan AMS",
            "Jam buka & alamat toko",
          ],
        }
      );
    }

    const lastUserText = extractLastUserText(messages);
    const historyEntries = extractHistoryEntries(messages);
    const hasAiGateway = Boolean(
      (process.env.AI_GATEWAY_API_KEY || "").trim() ||
        (process.env.VERCEL_OIDC_TOKEN || "").trim()
    );

    if (!hasAiGateway) {
      const smartReply = await generateSmartStoreWebReply(
        lastUserText,
        historyEntries
      );
      return buildTextStreamResponse(smartReply.text, smartReply.ui);
    }

    const { store, knowledge } = await getWebStoreAndKnowledge();
    const tools = createStoreTools(store);

    try {
      const result = streamText({
        model: process.env.AI_MODEL || "google/gemini-3-flash",
        system: buildChatbotSystemPrompt(store, knowledge),
        messages: await convertToModelMessages(messages),
        stopWhen: isStepCount(5),
        tools,
      });

      return createUIMessageStreamResponse({
        stream: toUIMessageStream({ stream: result.stream, tools }),
      });
    } catch (aiErr) {
      console.warn(
        "[POST /api/chat] AI Gateway error, falling back to Smart DB Assistant:",
        aiErr
      );
      const smartReply = await generateSmartStoreWebReply(
        lastUserText,
        historyEntries
      );
      return buildTextStreamResponse(smartReply.text, smartReply.ui);
    }
  } catch (err) {
    console.error("[POST /api/chat]", err);
    return buildTextStreamResponse(
      "Maaf, sistem asisten sedang mengalami gangguan sesaat. Silakan langsung hubungi Admin Toko Amen Snack via WhatsApp di 0813-6872-2622."
    );
  }
}
