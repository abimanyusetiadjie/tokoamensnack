import {
  formatRupiah,
  getWebStoreAndKnowledge,
  searchWebProducts,
  type StoreKnowledgeItem,
  type WebProduct,
  type WebStoreProfile,
} from "@/lib/catalog";

const STOP_WORDS = new Set([
  "halo",
  "hai",
  "hi",
  "min",
  "admin",
  "kak",
  "bang",
  "bro",
  "sis",
  "pak",
  "bu",
  "permisi",
  "selamat",
  "pagi",
  "siang",
  "sore",
  "malam",
  "tolong",
  "bantu",
  "tanya",
  "cek",
  "lihat",
  "info",
  "berapa",
  "berapakah",
  "harga",
  "harganya",
  "stok",
  "stoknya",
  "ada",
  "ready",
  "apakah",
  "jual",
  "beli",
  "mau",
  "ingin",
  "pesan",
  "order",
  "cari",
  "carikan",
  "rekomendasi",
  "rekomendasikan",
  "dong",
  "ya",
  "yah",
  "nih",
  "sih",
  "yang",
  "yg",
  "di",
  "ke",
  "dari",
  "untuk",
  "buat",
  "oleh",
  "oleh-oleh",
  "khas",
  "bangka",
  "toko",
  "snack",
  "sungailiat",
  "saya",
  "aku",
  "kami",
  "kita",
  "atau",
  "dan",
  "sama",
  "dengan",
  "dg",
  "bisa",
  "budget",
  "bawah",
  "atas",
  "kurang",
  "lebih",
  "dibawah",
  "maksimal",
  "sekitar",
  "produk",
  "daftar",
  "paket",
  "partai",
  "reseller",
  "grosir",
  "grosiran",
  "murah",
  "terlaris",
  "unggulan",
  "best",
  "seller",
  "cap",
  "merek",
  "merk",
  "varian",
  "berapaan",
]);

export function buildChatbotSystemPrompt(
  store: WebStoreProfile,
  knowledge: StoreKnowledgeItem[]
): string {
  const kbLines = knowledge
    .map((k) => `- ${k.title}: ${k.content}`)
    .join("\n");

  return [
    `Anda adalah Asisten Virtual resmi "${store.name}" (${store.officialName}).`,
    `Alamat toko: ${store.address}.`,
    `Jam operasional: ${store.openingHoursWeekday}; ${store.openingHoursSunday}.`,
    `WhatsApp Admin: ${store.phone} (${store.whatsappUrl}) | Shopee: ${store.shopeeUrl}.`,
    kbLines ? `Pengetahuan Resmi Toko:\n${kbLines}` : "",
    "",
    "ATURAN WAJIB:",
    "1. Jawab dalam Bahasa Indonesia yang ramah, ringkas, jelas, dan membantu.",
    "2. JANGAN PERNAH mengarang harga, stok, atau SKU. Selalu panggil tool `searchProducts` terlebih dahulu sebelum menyebut harga atau ketersediaan barang.",
    "3. Untuk jam buka, alamat, Google Maps, Waze, pengiriman, atau Shopee, panggil `getStoreProfile`.",
    "4. Saat menampilkan produk, sebutkan nama persis produk, harga ritel, harga grosir (jika tersedia), ukuran/gramasi (jika ada), dan status stok (`Stok Ready` / `Habis`).",
    "5. Jangan pernah membocorkan atau membahas harga modal/HPP maupun data internal toko.",
    "6. Jika pelanggan ingin memesan atau butuh checkout cepat, panggil `buildOrderSummary` atau sertakan tautan WhatsApp Admin dalam format markdown `[Pesan via WhatsApp](https://wa.me/6281368722622?text=...)`.",
  ]
    .filter(Boolean)
    .join("\n");
}

function parseMaxPriceBudget(text: string): number | undefined {
  const m = text
    .toLowerCase()
    .match(/(?:rp\.?\s*|budget\s+|di\s*bawah\s+|maksimal\s+|<\s*)?(\d+(?:[.,]\d+)?)\s*(ribu|rb|k)\b/);
  if (m) {
    const val = Number(m[1].replace(",", "."));
    if (!Number.isNaN(val) && val > 0) return Math.round(val * 1000);
  }
  const rpFull = text.toLowerCase().match(/(?:rp\.?\s*)(\d{1,3}(?:\.\d{3})+)/);
  if (rpFull) {
    const digits = Number(rpFull[1].replace(/\./g, ""));
    if (!Number.isNaN(digits) && digits >= 1000) return digits;
  }
  return undefined;
}

function detectCategoryHint(lower: string): string {
  if (lower.includes("panggang") || lower.includes("oven")) return "kemplang-panggang";
  if (lower.includes("kemplang") || lower.includes("kerupuk")) return "kemplang-goreng";
  if (lower.includes("getas") || lower.includes("ampiang") || lower.includes("kericu") || lower.includes("amplang")) {
    return "getas-ampiang-kericu";
  }
  if (lower.includes("terasi") || lower.includes("rusip") || lower.includes("kecap") || lower.includes("lada") || lower.includes("calok")) {
    return "terasi-bumbu-laut";
  }
  if (lower.includes("kopi") || lower.includes("sirup") || lower.includes("madu") || lower.includes("minum")) {
    return "kopi-sirup-minuman";
  }
  if (lower.includes("lempuk") || lower.includes("dodol") || lower.includes("kue") || lower.includes("rintak") || lower.includes("semprong") || lower.includes("bolu")) {
    return "kue-dodol-lempuk";
  }
  if (lower.includes("abon") || lower.includes("kacang") || lower.includes("keripik") || lower.includes("basreng")) {
    return "camilan-kacang-abon";
  }
  if (lower.includes("kaos") || lower.includes("souvenir")) return "kaos-souvenir";
  return "semua";
}

function extractProductKeywords(text: string): string {
  const cleaned = text
    .toLowerCase()
    .replace(/\btoko\s+amen\s+snack\b/g, " ")
    .replace(/\bdi\s+bawah\b/g, " ")
    .replace(/(?:\brp\.?\s*)?\d+(?:[.,]\d+)?\s*(?:ribu|rb|k)\b|\brp\.?\s*\d+(?:[.,]\d+)+\b/gi, " ")
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .split(/\s+/)
    .filter((w) => w.length > 0 && !STOP_WORDS.has(w));
  return cleaned.slice(0, 4).join(" ");
}

function formatProductBullets(items: WebProduct[], waUrl: string): string {
  return items
    .map((p) => {
      const grosir = p.formattedWholesalePrice
        ? ` | Grosir: **${p.formattedWholesalePrice}**`
        : "";
      const weight = p.weightGrams ? ` (${p.weightGrams}g)` : "";
      const stockText = p.stock > 0 ? "Stok Ready" : "Stok Habis";
      const msg = encodeURIComponent(
        `Halo Admin Toko Amen Snack, saya mau tanya/pesan ${p.name} (${p.formattedPrice}). Apakah tersedia?`
      );
      return `• **${p.name}**${weight}\n  Harga Eceran: **${p.formattedPrice}**${grosir} • ${stockText} · [Pesan via WA](${waUrl}?text=${msg})`;
    })
    .join("\n\n");
}

/**
 * Deterministic Supabase-backed store assistant used when an LLM Gateway key
 * is not yet configured (also directly reusable for WhatsApp webhook channels).
 */
export async function generateSmartStoreReply(userText: string): Promise<string> {
  const trimmed = userText.trim();
  const lower = trimmed.toLowerCase();
  const { store, knowledge } = await getWebStoreAndKnowledge();

  const isStoreInfoIntent =
    /\b(jam|buka|tutup|operasional|alamat|lokasi|dimana|di mana|maps|waze|kirim|ongkir|pengiriman|shopee|ig|instagram|kontak|nomor|telepon|wa|whatsapp)\b/i.test(
      lower
    );

  const isGreetingOnly =
    /^(halo|hai|hi|hei|hello|assalam\w*|selamat (pagi|siang|sore|malam)|permisi|tes|test)[!.,?\s]*$/i.test(
      trimmed
    );

  if (isGreetingOnly) {
    return [
      `Halo! Selamat datang di **${store.name}** Sungailiat.`,
      "",
      "Saya siap membantu mengecek **harga eceran/grosir**, **ketersediaan stok produk**, **jam buka**, dan **pemesanan WhatsApp** secara langsung.",
      "",
      "Anda bisa tanyakan misalnya:",
      "• *\"Harga Kemplang Cap AMEN atau Getas 250g\"*",
      "• *\"Rekomendasi oleh-oleh di bawah 50rb\"*",
      "• *\"Jam buka & lokasi Toko Amen Snack\"*",
    ].join("\n");
  }

  const parts: string[] = [];

  if (isStoreInfoIntent) {
    parts.push(
      `📍 **Lokasi ${store.name}:**\n${store.address}`,
      `🕒 **Jam Operasional:**\n• ${store.openingHoursWeekday}\n• ${store.openingHoursSunday}`,
      `🔗 **Pemesanan & Petunjuk Arah:**\n• [Chat Admin WhatsApp (${store.phone})](${store.whatsappDirectCta})\n• [Toko Resmi Shopee](${store.shopeeUrl})\n• [Buka di Google Maps](${store.mapsUrl})`
    );
    const shippingKb = knowledge.find((k) => k.topicKey === "grosir_pengiriman");
    if (shippingKb && (lower.includes("kirim") || lower.includes("ongkir") || lower.includes("grosir"))) {
      parts.push(`📦 **Info Pengiriman & Grosir:**\n${shippingKb.content}`);
    }
  }

  const wholesaleOnly = /\b(grosir|grosiran|partai|reseller)\b/i.test(lower);
  const maxPrice = parseMaxPriceBudget(lower);
  const keywords = extractProductKeywords(trimmed);
  const categoryHint = detectCategoryHint(lower);

  const shouldSearchProducts =
    keywords.length > 0 ||
    categoryHint !== "semua" ||
    wholesaleOnly ||
    Boolean(maxPrice) ||
    !isStoreInfoIntent;

  if (shouldSearchProducts) {
    let searchRes = await searchWebProducts({
      q: keywords,
      category: keywords ? "semua" : categoryHint,
      wholesaleOnly,
      maxPrice,
      featuredOnly: !keywords && categoryHint === "semua" && !wholesaleOnly && !maxPrice,
      sort: "featured",
      limit: 5,
      offset: 0,
    });

    // Broaden search if strict filter returned empty
    if (searchRes.items.length === 0 && (wholesaleOnly || categoryHint !== "semua")) {
      searchRes = await searchWebProducts({
        q: keywords,
        category: categoryHint,
        maxPrice,
        sort: "featured",
        limit: 5,
        offset: 0,
      });
    }

    // Fallback to first/primary token if multi-token query returned 0 matches
    if (searchRes.items.length === 0 && keywords.includes(" ")) {
      const primaryToken = keywords.split(/\s+/)[0];
      searchRes = await searchWebProducts({
        q: primaryToken,
        maxPrice,
        sort: "featured",
        limit: 5,
        offset: 0,
      });
    }

    if (searchRes.items.length > 0) {
      const heading = wholesaleOnly
        ? "🏷️ **Produk Tersedia dengan Harga Grosir:**"
        : maxPrice
          ? `💡 **Rekomendasi Produk ≤ ${formatRupiah(maxPrice)}:**`
          : keywords
            ? `🛍️ **Hasil Katalog Toko (${searchRes.total} ditemukan, menampilkan ${searchRes.items.length} teratas):**`
            : "⭐ **Rekomendasi Oleh-Oleh Khas Bangka Unggulan:**";

      parts.push(heading);
      parts.push(formatProductBullets(searchRes.items, store.whatsappUrl));

      const siteCatalogUrl = keywords
        ? `/produk?q=${encodeURIComponent(keywords)}`
        : categoryHint !== "semua"
          ? `/produk?kategori=${encodeURIComponent(categoryHint)}`
          : "/produk";
      parts.push(
        `Ketik nama barang lebih spesifik (mis. berat gramasi) atau lihat [Semua Hasil di Katalog](${siteCatalogUrl}).`
      );
    } else if (!isStoreInfoIntent) {
      const waMissing = encodeURIComponent(
        `Halo Admin Toko Amen Snack, saya sedang mencari "${trimmed}". Apakah tersedia di toko?`
      );
      parts.push(
        `Maaf, kata kunci **"${keywords || trimmed}"** belum ditemukan di daftar katalog aktif kami.\n\nSilakan coba kata kunci lain (mis. *kemplang*, *getas*, *ampiang*, *terasi*, *kopi*, *lempuk*) atau langsung tanyakan ke admin toko:\n• [Tanya Stok Langsung via WhatsApp](${store.whatsappUrl}?text=${waMissing})\n• [Kunjungi Shopee Toko Amen Snack](${store.shopeeUrl})`
      );
    }
  }

  return parts.join("\n\n");
}
