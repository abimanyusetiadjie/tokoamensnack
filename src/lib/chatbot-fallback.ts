import {
  formatRupiah,
  getWebCategories,
  getWebStoreAndKnowledge,
  searchWebProducts,
  type StoreKnowledgeItem,
  type WebProduct,
  type WebStoreProfile,
} from "@/lib/catalog";

export interface ChatHistoryEntry {
  role: string;
  text: string;
}

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
  "ambil",
  "cari",
  "carikan",
  "rekomendasi",
  "rekomendasikan",
  "dong",
  "ya",
  "yaa",
  "yah",
  "nih",
  "sih",
  "kah",
  "itu",
  "ini",
  "tuh",
  "kalo",
  "kalau",
  "yang",
  "yg",
  "aja",
  "saja",
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
  "barang",
  "item",
  "menu",
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
  "ukuran",
  "kemasan",
  "bungkus",
  "bks",
  "pcs",
  "pak",
  "pack",
  "kotak",
  "berapaan",
  "ongkir",
  "kirim",
  "luar",
  "kota",
  "pulau",
  "ekspedisi",
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
    .replace(/\b(\d+)\s*(?:gr|gram|grm)\b/g, "$1g")
    .replace(/(?:\brp\.?\s*)?\d+(?:[.,]\d+)?\s*(?:ribu|rb|k)\b|\brp\.?\s*\d+(?:[.,]\d+)+\b/gi, " ")
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .split(/\s+/)
    .filter((w) => w.length > 0 && !STOP_WORDS.has(w));
  return cleaned.slice(0, 4).join(" ");
}

function extractWeightTokens(text: string): string[] {
  const matches = Array.from(
    text.toLowerCase().matchAll(/\b(\d+)\s*(?:g|gr|gram|grm|kg|ml)\b/gi)
  );
  const unique = new Set<string>();
  for (const m of matches) {
    const rawUnit = m[0].toLowerCase().replace(/\s+/g, "");
    const normalized = rawUnit.replace(/(?:gram|grm|gr)$/, "g");
    unique.add(normalized);
  }
  return Array.from(unique);
}

function extractOrderIntent(text: string): { qty: number; productQuery: string } | null {
  const m1 = text.match(
    /(?:mau\s+|ingin\s+|tolong\s+|coba\s+|hitung(?:kan)?\s+)?(?:pesan|order|beli|ambil)\s+(\d+)\s*(?:x|pcs|pc|bungkus|bks|pak|pack|kotak|toples|buah|botol|kaleng|bal|bh)?\s*(.*)$/i
  );
  if (m1) {
    const qty = Math.min(Math.max(Number(m1[1]) || 1, 1), 500);
    return { qty, productQuery: (m1[2] || "").trim() };
  }
  const m2 = text.match(/^(\d+)\s*(?:x|pcs|bungkus|bks|pak)\s+(.+)$/i);
  if (m2) {
    const qty = Math.min(Math.max(Number(m2[1]) || 1, 1), 500);
    return { qty, productQuery: (m2[2] || "").trim() };
  }
  return null;
}

function findPreviousTopicKeywords(history: ChatHistoryEntry[]): string {
  for (let i = history.length - 1; i >= 0; i--) {
    const item = history[i];
    if (item.role !== "user" && item.role !== "customer") continue;
    const kw = extractProductKeywords(item.text || "");
    const weights = new Set(extractWeightTokens(item.text || ""));
    const nonWeight = kw
      .split(/\s+/)
      .filter((w) => w && !weights.has(w) && !/^\d+$/.test(w))
      .join(" ");
    if (nonWeight) return nonWeight;
  }
  return "";
}

function encodeWaText(text: string): string {
  return encodeURIComponent(text).replace(/[()]/g, (ch) =>
    ch === "(" ? "%28" : "%29"
  );
}

function formatProductBullets(items: WebProduct[], waUrl: string): string {
  return items
    .map((p) => {
      const grosir = p.formattedWholesalePrice
        ? ` | Grosir: **${p.formattedWholesalePrice}**`
        : "";
      const weight = p.weightGrams ? ` (${p.weightGrams}g)` : "";
      const stockText = p.stock > 0 ? "Stok Ready" : "Stok Habis";
      const msg = encodeWaText(
        `Halo Admin Toko Amen Snack, saya mau tanya/pesan ${p.name} (${p.formattedPrice}). Apakah tersedia?`
      );
      return `• **${p.name}**${weight}\n  Harga Eceran: **${p.formattedPrice}**${grosir} • ${stockText} · [Pesan via WA](${waUrl}?text=${msg})`;
    })
    .join("\n\n");
}

/**
 * Deterministic Supabase-backed store assistant used when an LLM Gateway key
 * is not yet configured (reused across Web Chatbot & WAHA WhatsApp Webhook).
 */
export async function generateSmartStoreReply(
  userText: string,
  history: ChatHistoryEntry[] = []
): Promise<string> {
  const trimmed = userText.trim();
  const lower = trimmed.toLowerCase();
  const { store, knowledge } = await getWebStoreAndKnowledge();

  const isStoreInfoIntent =
    /\b(jam|buka|tutup|operasional|alamat|lokasi|dimana|di mana|maps|waze|kirim|ongkir|pengiriman|ekspedisi|shopee|ig|instagram|tiktok|kontak|nomor|telepon|wa|whatsapp)\b/i.test(
      lower
    );

  const isCatalogSummaryIntent =
    /\b(total|berapa|daftar|list|apa saja|apa aja|jual apa|macam|kategori)\b.*\b(produk|barang|item|menu|oleh-oleh|snack|camilan|kategori)\b|\b(jual apa saja|jual apa aja|kategori produk)\b/i.test(
      lower
    );

  const isGreetingOnly =
    /^(halo|hai|hi|hei|hello|assalam\w*|selamat (pagi|siang|sore|malam)|permisi|tes|test|p|ping)[!.,?\s]*$/i.test(
      trimmed
    );

  if (isGreetingOnly) {
    return [
      `Halo! Selamat datang di **${store.name}** Sungailiat.`,
      "",
      "Saya siap membantu mengecek **harga eceran/grosir**, **ketersediaan stok produk**, **estimasi total pesanan**, **jam buka**, dan **pemesanan WhatsApp** secara langsung.",
      "",
      "Anda bisa tanyakan misalnya:",
      "• *\"Harga Kemplang Cap AMEN atau Getas 250g\"*",
      "• *\"Indomie Kaldu Udang Bangka atau Kemplang Panggang\"*",
      "• *\"Pesan 2 Getas AMS 250g\"* atau *\"Jam buka & lokasi toko\"*",
    ].join("\n");
  }

  if (isCatalogSummaryIntent && !extractOrderIntent(trimmed)) {
    const categories = await getWebCategories();
    const totalActive = categories.reduce((sum, c) => sum + c.productCount, 0);
    const catLines = categories
      .slice(0, 6)
      .map((c) => `• **${c.title}** (${c.productCount} varian)`)
      .join("\n");
    return [
      `Saat ini tersedia **${totalActive.toLocaleString("id-ID")} varian produk aktif** di katalog online **${store.name}** Sungailiat dalam **${categories.length} kategori**:`,
      catLines,
      `Lihat lengkap & filter harga grosir di [Katalog Produk](/produk), atau ketik nama camilan yang dicari (mis. *kemplang amen*, *getas 500g*, *kopi bangka*).`,
    ].join("\n\n");
  }

  const orderIntent = extractOrderIntent(trimmed);
  if (orderIntent) {
    let rawOrderKw = extractProductKeywords(orderIntent.productQuery);
    if (!rawOrderKw && history.length > 0) {
      rawOrderKw = findPreviousTopicKeywords(history);
    }
    if (rawOrderKw) {
      const orderRes = await searchWebProducts({
        q: rawOrderKw,
        sort: "featured",
        limit: 3,
        offset: 0,
      });
      const chosen = orderRes.items.find((p) => p.price && p.price > 0);
      if (chosen && chosen.price) {
        const qty = orderIntent.qty;
        const subtotal = chosen.price * qty;
        const totalGrams = chosen.weightGrams ? chosen.weightGrams * qty : 0;
        const waOrderMsg = encodeWaText(
          [
            "Halo Admin Toko Amen Snack, saya ingin memesan:",
            `- ${chosen.name} x${qty} (${formatRupiah(subtotal)})`,
            totalGrams > 0 ? `Estimasi Berat: ${(totalGrams / 1000).toFixed(2)} kg` : "",
            "Mohon konfirmasi ketersediaan & total akhirnya ya.",
          ]
            .filter(Boolean)
            .join("\n")
        );
        const wholesaleHint = chosen.formattedWholesalePrice
          ? `\n• Harga Grosir (partai/syarat minimal): **${chosen.formattedWholesalePrice}** / ${chosen.unit}`
          : "";
        const weightHint =
          totalGrams > 0 ? `\n• Estimasi Berat Total: **${(totalGrams / 1000).toFixed(2)} kg**` : "";
        return [
          `🧾 **Estimasi Pesanan Toko Amen Snack:**\n• Produk: **${chosen.name}**\n• Jumlah: **${qty} ${chosen.unit}**\n• Harga Eceran: **${chosen.formattedPrice}** / ${chosen.unit}${wholesaleHint}${weightHint}\n• Estimasi Subtotal: **${formatRupiah(subtotal)}**\n\n👉 [Konfirmasi Pesanan via WhatsApp Admin](${store.whatsappUrl}?text=${waOrderMsg})`,
          orderRes.items.length > 1
            ? `**Pilihan varian serupa:**\n${formatProductBullets(orderRes.items.slice(1), store.whatsappUrl)}`
            : "",
        ]
          .filter(Boolean)
          .join("\n\n");
      }
    }
  }

  const parts: string[] = [];

  if (isStoreInfoIntent) {
    parts.push(
      `📍 **Lokasi ${store.name}:**\n${store.address}`,
      `🕒 **Jam Operasional:**\n• ${store.openingHoursWeekday}\n• ${store.openingHoursSunday}`,
      `🔗 **Pemesanan & Petunjuk Arah:**\n• [Chat Admin WhatsApp (${store.phone})](${store.whatsappDirectCta})\n• [Toko Resmi Shopee](${store.shopeeUrl})\n• [Buka di Google Maps](${store.mapsUrl})`
    );
    const shippingKb = knowledge.find((k) => k.topicKey === "grosir_pengiriman");
    if (
      shippingKb &&
      /\b(kirim|ongkir|pengiriman|ekspedisi|luar|grosir|paket)\b/i.test(lower)
    ) {
      parts.push(`📦 **Info Pengiriman & Grosir:**\n${shippingKb.content}`);
    }
  }

  const wholesaleOnly = /\b(grosir|grosiran|partai|reseller)\b/i.test(lower);
  const maxPrice = parseMaxPriceBudget(lower);
  const weightTokens = extractWeightTokens(trimmed);
  let keywords = extractProductKeywords(trimmed);
  const categoryHint = detectCategoryHint(lower);

  // Follow-up context: e.g. user asks "yang 500g?" or "harga grosirnya?" right after asking "Getas"
  if (!isStoreInfoIntent && history.length > 0) {
    const kwParts = keywords.split(/\s+/).filter(Boolean);
    const onlyModifiers =
      kwParts.length === 0 ||
      kwParts.every((p) => weightTokens.includes(p) || /^\d+$/.test(p));
    if (onlyModifiers && (weightTokens.length > 0 || wholesaleOnly || maxPrice)) {
      const prevTopic = findPreviousTopicKeywords(history);
      if (prevTopic) {
        keywords = [prevTopic, ...kwParts].join(" ").trim();
      }
    }
  }

  const shouldSearchProducts =
    keywords.length > 0 ||
    categoryHint !== "semua" ||
    wholesaleOnly ||
    Boolean(maxPrice) ||
    !isStoreInfoIntent;

  if (shouldSearchProducts) {
    let items: WebProduct[] = [];
    let totalMatches = 0;

    // Multi-size comparison query (e.g., "Cek Getas 250g & 500g")
    if (weightTokens.length >= 2) {
      const weightSet = new Set(weightTokens);
      const baseTokens = keywords
        .split(/\s+/)
        .filter((t) => t && !weightSet.has(t))
        .join(" ");
      const sizeResults = await Promise.all(
        weightTokens.slice(0, 3).map((wt) =>
          searchWebProducts({
            q: [baseTokens, wt].filter(Boolean).join(" "),
            category: baseTokens ? "semua" : categoryHint,
            wholesaleOnly,
            maxPrice,
            sort: "featured",
            limit: 3,
            offset: 0,
          })
        )
      );
      const seen = new Set<string>();
      for (const r of sizeResults) {
        totalMatches += r.total;
        for (const prod of r.items) {
          if (!seen.has(prod.id)) {
            seen.add(prod.id);
            items.push(prod);
          }
        }
      }
      items = items.slice(0, 6);
    } else {
      let searchRes = await searchWebProducts({
        q: keywords,
        category: keywords ? "semua" : categoryHint,
        wholesaleOnly,
        maxPrice,
        featuredOnly:
          !keywords && categoryHint === "semua" && !wholesaleOnly && !maxPrice,
        sort: "featured",
        limit: 5,
        offset: 0,
      });

      // Broaden search if strict filter returned empty
      if (
        searchRes.items.length === 0 &&
        (wholesaleOnly || categoryHint !== "semua")
      ) {
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

      items = searchRes.items;
      totalMatches = searchRes.total;
    }

    if (items.length > 0) {
      const heading = wholesaleOnly
        ? "🏷️ **Produk Tersedia dengan Harga Grosir:**"
        : maxPrice
          ? `💡 **Rekomendasi Produk ≤ ${formatRupiah(maxPrice)}:**`
          : weightTokens.length >= 2
            ? `🛍️ **Perbandingan Varian ${weightTokens.join(" & ")} (${items.length} pilihan teratas):**`
            : keywords
              ? `🛍️ **Hasil Katalog Toko (${totalMatches} ditemukan, menampilkan ${items.length} teratas):**`
              : "⭐ **Rekomendasi Oleh-Oleh Khas Bangka Unggulan:**";

      parts.push(heading);
      parts.push(formatProductBullets(items, store.whatsappUrl));

      const siteCatalogUrl = keywords
        ? `/produk?q=${encodeURIComponent(keywords)}`
        : categoryHint !== "semua"
          ? `/produk?kategori=${encodeURIComponent(categoryHint)}`
          : "/produk";
      parts.push(
        `Ketik jumlah untuk hitung pesanan (mis. *pesan 2 ${items[0].name.split(" ").slice(0, 2).join(" ")}*) atau lihat [Semua Hasil di Katalog](${siteCatalogUrl}).`
      );
    } else if (!isStoreInfoIntent) {
      const waMissing = encodeWaText(
        `Halo Admin Toko Amen Snack, saya sedang mencari "${trimmed}". Apakah tersedia di toko?`
      );
      parts.push(
        `Maaf, kata kunci **"${keywords || trimmed}"** belum ditemukan di daftar katalog aktif kami.\n\nSilakan coba kata kunci lain (mis. *kemplang*, *getas*, *ampiang*, *terasi*, *kopi*, *lempuk*) atau langsung tanyakan ke admin toko:\n• [Tanya Stok Langsung via WhatsApp](${store.whatsappUrl}?text=${waMissing})\n• [Kunjungi Shopee Toko Amen Snack](${store.shopeeUrl})`
      );
    }
  }

  return parts.join("\n\n");
}

/**
 * Converts web Markdown formatting into clean WhatsApp-native formatting
 * (*bold*, single-line URLs with full site domain, no redundant [label](url)).
 */
export function formatWhatsAppMarkdown(
  text: string,
  siteBaseUrl = "https://tokoamensnack.vercel.app"
): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "*$1*")
    .replace(/\[([^\]]+)\]\((\/[^)]+)\)/g, `$1: ${siteBaseUrl}$2`)
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, (_m, label, url) => {
      if (String(url).includes("wa.me/")) {
        return "";
      }
      return `${label} (${url})`;
    })
    .replace(/\s*·\s*\n/g, "\n")
    .replace(/\s*·\s*$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
