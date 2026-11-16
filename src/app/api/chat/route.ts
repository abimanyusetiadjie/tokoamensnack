import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  isStepCount,
  streamText,
  tool,
  toUIMessageStream,
  type UIMessage,
} from "ai";
import { z } from "zod";
import {
  formatRupiah,
  getWebStoreAndKnowledge,
  normalizeCategorySlug,
  searchWebProducts,
} from "@/lib/catalog";
import {
  buildChatbotSystemPrompt,
  generateSmartStoreReply,
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

function buildTextStreamResponse(replyText: string): Response {
  const textId = `txt-${Date.now()}`;
  const stream = createUIMessageStream({
    execute: ({ writer }) => {
      writer.write({ type: "start" });
      writer.write({ type: "start-step" });
      writer.write({ type: "text-start", id: textId });
      writer.write({ type: "text-delta", id: textId, delta: replyText });
      writer.write({ type: "text-end", id: textId });
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
        "Halo! Silakan tanyakan harga, ketersediaan stok, rekomendasi oleh-oleh khas Bangka, atau jam buka Toko Amen Snack."
      );
    }

    const lastUserText = extractLastUserText(messages);
    const hasAiGateway = Boolean(
      (process.env.AI_GATEWAY_API_KEY || "").trim() ||
        (process.env.VERCEL_OIDC_TOKEN || "").trim()
    );

    if (!hasAiGateway) {
      const replyText = await generateSmartStoreReply(lastUserText);
      return buildTextStreamResponse(replyText);
    }

    const { store, knowledge } = await getWebStoreAndKnowledge();

    const tools = {
      searchProducts: tool({
        description:
          "Cari produk oleh-oleh & snack Toko Amen Snack di database live Supabase berdasarkan kata kunci, kategori, grosir, atau batas harga.",
        inputSchema: z.object({
          query: z
            .string()
            .optional()
            .describe("Kata kunci produk, contoh: kemplang, getas 250g, terasi, kopi, lempuk"),
          categorySlug: z
            .string()
            .optional()
            .describe(
              "Opsional slug kategori: kemplang-panggang, kemplang-goreng, getas-ampiang-kericu, terasi-bumbu-laut, kopi-sirup-minuman, kue-dodol-lempuk, camilan-kacang-abon, permen-coklat-manisan, sembako-harian, kaos-souvenir"
            ),
          wholesaleOnly: z
            .boolean()
            .optional()
            .describe("Set true jika pelanggan menanyakan produk dengan harga grosir"),
          maxPrice: z
            .number()
            .optional()
            .describe("Batas maksimum harga ritel dalam Rupiah jika ada budget"),
          limit: z
            .number()
            .int()
            .min(1)
            .max(10)
            .optional()
            .describe("Jumlah maksimal hasil yang diambil (default 6)"),
        }),
        execute: async ({
          query,
          categorySlug,
          wholesaleOnly,
          maxPrice,
          limit,
        }) => {
          const res = await searchWebProducts({
            q: query,
            category: normalizeCategorySlug(categorySlug),
            wholesaleOnly,
            maxPrice,
            sort: maxPrice ? "price_asc" : "featured",
            limit: limit || 6,
            offset: 0,
          });
          return {
            source: res.source,
            totalMatches: res.total,
            products: res.items.map((p) => ({
              sku: p.sku,
              name: p.name,
              category: p.category,
              retailPrice: p.price,
              formattedPrice: p.formattedPrice,
              wholesalePrice: p.wholesalePrice,
              formattedWholesalePrice: p.formattedWholesalePrice,
              weightGrams: p.weightGrams,
              unit: p.unit,
              inStock: p.stock > 0,
              stock: p.stock,
            })),
          };
        },
      }),

      getStoreProfile: tool({
        description:
          "Ambil profil resmi Toko Amen Snack Sungailiat: alamat, jam buka Senin–Minggu, link Google Maps, Waze, Shopee, WhatsApp, serta FAQ layanan.",
        inputSchema: z.object({
          topic: z
            .string()
            .optional()
            .describe("Topik pertanyaan, mis. jam_buka, lokasi, grosir_pengiriman"),
        }),
        execute: async () => {
          return await getWebStoreAndKnowledge();
        },
      }),

      buildOrderSummary: tool({
        description:
          "Hitung estimasi total harga & berat paket dari item pilihan pelanggan dan buat link checkout WhatsApp Admin.",
        inputSchema: z.object({
          items: z
            .array(
              z.object({
                name: z.string(),
                qty: z.number().int().min(1),
                unitPrice: z.number().min(0),
                weightGrams: z.number().nullable().optional(),
              })
            )
            .min(1),
          customerNote: z.string().optional(),
        }),
        execute: async ({ items, customerNote }) => {
          const subtotal = items.reduce(
            (sum, i) => sum + i.qty * i.unitPrice,
            0
          );
          const totalGrams = items.reduce(
            (sum, i) => sum + i.qty * Number(i.weightGrams || 0),
            0
          );
          const lines = items.map(
            (i) => `- ${i.name} x${i.qty} (${formatRupiah(i.qty * i.unitPrice)})`
          );
          const msg = [
            "Halo Admin Toko Amen Snack, saya ingin memesan:",
            ...lines,
            `Estimasi Subtotal: ${formatRupiah(subtotal)}`,
            totalGrams > 0
              ? `Estimasi Berat: ${(totalGrams / 1000).toFixed(2)} kg`
              : "",
            customerNote ? `Catatan: ${customerNote}` : "",
          ]
            .filter(Boolean)
            .join("\n");

          return {
            subtotal,
            formattedSubtotal: formatRupiah(subtotal),
            estimatedWeightKg:
              totalGrams > 0 ? Number((totalGrams / 1000).toFixed(2)) : null,
            whatsappUrl: `${store.whatsappUrl}?text=${encodeURIComponent(msg)}`,
          };
        },
      }),
    };

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
      const replyText = await generateSmartStoreReply(lastUserText);
      return buildTextStreamResponse(replyText);
    }
  } catch (err) {
    console.error("[POST /api/chat]", err);
    return buildTextStreamResponse(
      "Maaf, sistem asisten sedang mengalami gangguan sesaat. Silakan langsung hubungi Admin Toko Amen Snack via WhatsApp di 0813-6872-2622."
    );
  }
}
