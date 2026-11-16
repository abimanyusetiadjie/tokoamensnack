import { tool } from "ai";
import { z } from "zod";
import {
  formatRupiah,
  getWebStoreAndKnowledge,
  normalizeCategorySlug,
  searchWebProducts,
  type WebStoreProfile,
} from "@/lib/catalog";

/**
 * Shared AI SDK tool suite backed by live Supabase catalog & store info,
 * reused across both the Web UI Chatbot (/api/chat) and WhatsApp Bot (/api/webhooks/whatsapp).
 */
export function createStoreTools(store: WebStoreProfile) {
  return {
    searchProducts: tool({
      description:
        "Cari produk oleh-oleh & snack Toko Amen Snack di database live Supabase berdasarkan kata kunci, kategori, grosir, atau batas harga.",
      inputSchema: z.object({
        query: z
          .string()
          .optional()
          .describe(
            "Kata kunci produk, contoh: kemplang, getas 250g, terasi, kopi, lempuk"
          ),
        categorySlug: z
          .string()
          .optional()
          .describe(
            "Opsional slug kategori: kemplang-panggang, kemplang-goreng, getas-ampiang-kericu, terasi-bumbu-laut, kopi-sirup-minuman, kue-dodol-lempuk, camilan-kacang-abon, permen-coklat-manisan, sembako-harian, kaos-souvenir"
          ),
        wholesaleOnly: z
          .boolean()
          .optional()
          .describe(
            "Set true jika pelanggan menanyakan produk dengan harga grosir"
          ),
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
          sort: "featured",
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
        "Ambil profil resmi Toko Amen Snack Sungailiat: alamat, jam buka Senin-Minggu, link Google Maps, Waze, Shopee, WhatsApp, serta FAQ layanan.",
      inputSchema: z.object({
        topic: z
          .string()
          .optional()
          .describe(
            "Topik pertanyaan, mis. jam_buka, lokasi, grosir_pengiriman"
          ),
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
          (i) =>
            `- ${i.name} x${i.qty} (${formatRupiah(i.qty * i.unitPrice)})`
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
}
