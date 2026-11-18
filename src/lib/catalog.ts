import { isDatabaseConfigured, queryDb } from "@/lib/db";
import {
  SHOPEE_CATALOG_ITEMS,
  resolveShopeeMediaMatch,
} from "@/lib/shopee-catalog-map";
import {
  CATEGORIES_COLLECTION,
  PRODUCTS_COLLECTION,
  STORE_INFO,
  type CategoryIconName,
} from "@/payload/seed-data";

export interface WebCategory {
  id: string;
  slug: string;
  title: string;
  description: string;
  iconName: CategoryIconName;
  sortOrder: number;
  productCount: number;
}

export interface WebProduct {
  id: string;
  sku: string;
  barcode: string | null;
  name: string;
  supplierName: string;
  category: string;
  categorySlug: string;
  price: number | null;
  wholesalePrice: number | null;
  formattedPrice: string;
  formattedWholesalePrice: string | null;
  stock: number;
  unit: string;
  weightGrams: number | null;
  badge: string | null;
  rating: number;
  description: string;
  imageUrl: string;
  shopeeUrl: string;
  isFeatured: boolean;
}

export interface WebStoreProfile {
  code: string;
  name: string;
  officialName: string;
  address: string;
  phone: string;
  whatsappNumber: string;
  whatsappUrl: string;
  whatsappDirectCta: string;
  shopeeUrl: string;
  instagramHandle: string;
  mapsUrl: string;
  wazeUrl: string;
  openingHoursWeekday: string;
  openingHoursSunday: string;
  openingHoursNote: string;
}

export interface StoreKnowledgeItem {
  topicKey: string;
  title: string;
  content: string;
}

export interface CatalogSearchParams {
  q?: string;
  category?: string;
  featuredOnly?: boolean;
  wholesaleOnly?: boolean;
  inStockOnly?: boolean;
  shopeeOnly?: boolean;
  maxPrice?: number;
  sort?: "featured" | "price_asc" | "price_desc" | "name_asc";
  limit?: number;
  offset?: number;
}

export interface CatalogSearchResult {
  items: WebProduct[];
  total: number;
  categories: WebCategory[];
  source: "supabase" | "seed";
}

const LEGACY_CATEGORY_ALIASES: Record<string, string> = {
  all: "semua",
  "kemplang-pasir": "kemplang-goreng",
  "getas-kerupuk": "getas-ampiang-kericu",
  "kericu-olahan-laut": "getas-ampiang-kericu",
  "bumbu-terasi": "terasi-bumbu-laut",
  "kopi-produk-khas": "kopi-sirup-minuman",
};

const CATEGORY_TITLES: Record<string, string> = {
  "kemplang-panggang": "Kemplang Panggang & Oven",
  "kemplang-goreng": "Kemplang & Kerupuk Goreng",
  "getas-ampiang-kericu": "Getas, Ampiang & Kericu",
  "terasi-bumbu-laut": "Terasi, Rusip & Hasil Laut",
  "kopi-sirup-minuman": "Kopi Bangka, Sirup & Minuman",
  "kue-dodol-lempuk": "Kue Tradisional, Lempuk & Dodol",
  "camilan-kacang-abon": "Camilan, Kacang, Keripik & Abon",
  "permen-coklat-manisan": "Permen, Coklat, Asinan & Manisan",
  "sembako-harian": "Sembako & Kebutuhan Harian",
  "kaos-souvenir": "Kaos & Souvenir Khas Bangka",
};

export function normalizeCategorySlug(raw?: string | null): string {
  const clean = (raw || "semua").trim().toLowerCase();
  if (!clean) return "semua";
  return LEGACY_CATEGORY_ALIASES[clean] || clean;
}

export function resolveCategoryIcon(slug: string): CategoryIconName {
  switch (slug) {
    case "kemplang-panggang":
      return "flame";
    case "kemplang-goreng":
      return "cookie";
    case "getas-ampiang-kericu":
      return "fish";
    case "terasi-bumbu-laut":
      return "utensils";
    case "kopi-sirup-minuman":
      return "coffee";
    default:
      return "sparkles";
  }
}

export function formatRupiah(amount: number): string {
  return `Rp${Math.round(amount).toLocaleString("id-ID")}`;
}

export function resolveMatchedProductMedia(
  imageUrl: string | null,
  name: string,
  sku: string
): { imageUrl: string; shopeeUrl: string } {
  const shopeeMatch = resolveShopeeMediaMatch(name, sku);
  if (imageUrl && imageUrl.trim()) {
    return {
      imageUrl: imageUrl.trim(),
      shopeeUrl: shopeeMatch.shopeeUrl,
    };
  }
  return shopeeMatch;
}

export function resolveMatchedProductImage(
  imageUrl: string | null,
  name: string,
  sku: string
): string {
  return resolveMatchedProductMedia(imageUrl, name, sku).imageUrl;
}

function getSeedCategoriesFallback(): WebCategory[] {
  return CATEGORIES_COLLECTION.map((c, idx) => ({
    id: c.id,
    slug: normalizeCategorySlug(c.slug),
    title: c.title,
    description: c.description,
    iconName: c.iconName,
    sortOrder: idx + 1,
    productCount: PRODUCTS_COLLECTION.filter(
      (p) => normalizeCategorySlug(p.categorySlug) === normalizeCategorySlug(c.slug)
    ).length,
  }));
}

function getSeedProductsFallback(): WebProduct[] {
  return PRODUCTS_COLLECTION.map((p) => ({
    id: p.id,
    sku: p.code,
    barcode: null,
    name: p.name,
    supplierName: "Toko Amen Snack",
    category: p.category,
    categorySlug: normalizeCategorySlug(p.categorySlug),
    price: p.price,
    wholesalePrice: null,
    formattedPrice: p.formattedPrice,
    formattedWholesalePrice: null,
    stock: 25,
    unit: "Pcs",
    weightGrams: null,
    badge: p.badge,
    rating: p.rating,
    description: p.description,
    imageUrl: p.imageUrl,
    shopeeUrl: p.shopeeUrl,
    isFeatured: true,
  }));
}

export function getDefaultStoreAndKnowledge(): {
  store: WebStoreProfile;
  knowledge: StoreKnowledgeItem[];
} {
  return {
    store: {
      code: "AMEN-SGL-01",
      name: STORE_INFO.name,
      officialName: STORE_INFO.officialName,
      address: STORE_INFO.address,
      phone: STORE_INFO.phone,
      whatsappNumber: STORE_INFO.whatsappNumber,
      whatsappUrl: STORE_INFO.whatsappUrl,
      whatsappDirectCta: STORE_INFO.whatsappDirectCta,
      shopeeUrl: STORE_INFO.shopeeUrl,
      instagramHandle: STORE_INFO.instagramHandle,
      mapsUrl: STORE_INFO.googleMapsUrl,
      wazeUrl: STORE_INFO.wazeUrl,
      openingHoursWeekday: `Senin - Sabtu: ${STORE_INFO.openingHours.mondayToSaturday}`,
      openingHoursSunday: `Minggu: ${STORE_INFO.openingHours.sunday}`,
      openingHoursNote: STORE_INFO.tagline,
    },
    knowledge: [
      {
        topicKey: "jam_buka",
        title: "Jam Operasional Toko Amen Snack",
        content: `Senin - Sabtu: ${STORE_INFO.openingHours.mondayToSaturday}. Minggu: ${STORE_INFO.openingHours.sunday}.`,
      },
      {
        topicKey: "lokasi",
        title: "Alamat Toko Fisik",
        content: STORE_INFO.address,
      },
      {
        topicKey: "grosir_pengiriman",
        title: "Pembelian Grosir & Pengiriman Luar Bangka",
        content:
          "Melayani eceran maupun partai grosir/reseller. Pengiriman seluruh Indonesia melalui Shopee (shopee.co.id/amensnack) atau ekspedisi via WhatsApp 0813-6872-2622.",
      },
    ],
  };
}

/**
 * Loads store profile and structured knowledge base from Supabase for web & chatbot.
 */
export async function getWebStoreAndKnowledge(): Promise<{
  store: WebStoreProfile;
  knowledge: StoreKnowledgeItem[];
  source: "supabase" | "seed";
}> {
  const fallback = getDefaultStoreAndKnowledge();
  if (!isDatabaseConfigured()) {
    return { ...fallback, source: "seed" };
  }

  try {
    const [storeRows, kbRows] = await Promise.all([
      queryDb<{
        code: string;
        name: string;
        official_name: string | null;
        address: string | null;
        phone: string | null;
        whatsapp_number: string | null;
        opening_hours_weekday: string | null;
        opening_hours_sunday: string | null;
        opening_hours_note: string | null;
        shopee_url: string | null;
        instagram_handle: string | null;
        maps_url: string | null;
        waze_url: string | null;
      }>(
        `SELECT code, name, official_name, address, phone, whatsapp_number,
                opening_hours_weekday, opening_hours_sunday, opening_hours_note,
                shopee_url, instagram_handle, maps_url, waze_url
         FROM stores
         ORDER BY created_at ASC
         LIMIT 1`
      ),
      queryDb<{ topic_key: string; title: string; content: string }>(
        `SELECT topic_key, title, content
         FROM store_knowledge
         WHERE is_active = TRUE
         ORDER BY topic_key ASC`
      ),
    ]);

    const s = storeRows[0];
    const waNumber = (s?.whatsapp_number || STORE_INFO.whatsappNumber).replace(/\D/g, "");
    return {
      store: s
        ? {
            code: s.code,
            name: s.name,
            officialName: s.official_name || STORE_INFO.officialName,
            address: s.address || STORE_INFO.address,
            phone: s.phone || STORE_INFO.phone,
            whatsappNumber: waNumber,
            whatsappUrl: `https://wa.me/${waNumber}`,
            whatsappDirectCta: STORE_INFO.whatsappDirectCta,
            shopeeUrl: s.shopee_url || STORE_INFO.shopeeUrl,
            instagramHandle: s.instagram_handle || STORE_INFO.instagramHandle,
            mapsUrl: s.maps_url || STORE_INFO.googleMapsUrl,
            wazeUrl: s.waze_url || STORE_INFO.wazeUrl,
            openingHoursWeekday:
              s.opening_hours_weekday || fallback.store.openingHoursWeekday,
            openingHoursSunday:
              s.opening_hours_sunday || fallback.store.openingHoursSunday,
            openingHoursNote:
              s.opening_hours_note || fallback.store.openingHoursNote,
          }
        : fallback.store,
      knowledge:
        kbRows.length > 0
          ? kbRows.map((k) => ({
              topicKey: k.topic_key,
              title: k.title,
              content: k.content,
            }))
          : fallback.knowledge,
      source: "supabase",
    };
  } catch (err) {
    console.warn("[Catalog] Failed to read stores from Supabase, using fallback:", err);
    return { ...fallback, source: "seed" };
  }
}

/**
 * Loads public storefront categories that currently contain visible priced retail items.
 */
export async function getWebCategories(): Promise<WebCategory[]> {
  if (!isDatabaseConfigured()) {
    return getSeedCategoriesFallback();
  }

  try {
    const rows = await queryDb<{
      id: string;
      slug: string;
      name: string;
      description: string | null;
      sort_order: number;
      product_count: number;
    }>(
      `SELECT c.id, c.slug, c.name, c.description, c.sort_order,
              COUNT(p.id)::int AS product_count
       FROM categories c
       INNER JOIN products p
         ON p.category_id = c.id
        AND p.is_active = TRUE
        AND p.is_web_visible = TRUE
        AND p.price > 0
       GROUP BY c.id, c.slug, c.name, c.description, c.sort_order
       HAVING COUNT(p.id) > 0
       ORDER BY c.sort_order ASC, c.name ASC`
    );

    return rows.map((r) => ({
      id: r.id,
      slug: r.slug,
      title: CATEGORY_TITLES[r.slug] || r.name,
      description: r.description || `Pilihan produk kategori ${r.name}.`,
      iconName: resolveCategoryIcon(r.slug),
      sortOrder: Number(r.sort_order || 0),
      productCount: Number(r.product_count || 0),
    }));
  } catch (err) {
    console.warn("[Catalog] Failed to read categories from Supabase:", err);
    return getSeedCategoriesFallback();
  }
}

function normalizeProductQueryTokens(raw?: string): string[] {
  if (!raw) return [];
  const normalized = raw
    .trim()
    .toLowerCase()
    .replace(/\b(\d+)\s*(?:gr|gram|grm)\b/g, "$1g")
    .replace(/\b(\d+)\s*kg\b/g, "$1kg")
    .replace(/\bcap\s+amen\b/g, "amen")
    .replace(/\s+/g, " ");
  return normalized
    .split(" ")
    .filter((t) => t.length > 0)
    .slice(0, 5);
}

function expandTokenVariants(token: string): string[] {
  const lower = token.toLowerCase();
  const variants = new Set<string>([lower]);
  if (lower === "indomie") variants.add("indomi");
  if (lower === "indomi") variants.add("indomie");
  if (lower === "amen") variants.add("ams");
  if (lower === "panggang") variants.add("oven");
  if (lower === "1kg" || lower === "kg" || lower === "kilo") variants.add("bal");
  if (lower === "camilan" || lower === "cemilan" || lower === "snack") variants.add("kripik");
  return Array.from(variants);
}

/**
 * Searches public retail products safely (strictly excludes cost_price, base_hpp, users).
 */
export async function searchWebProducts(
  params: CatalogSearchParams = {}
): Promise<CatalogSearchResult> {
  const limit = Math.min(Math.max(Number(params.limit || 24), 1), 100);
  const offset = Math.max(Number(params.offset || 0), 0);
  const categorySlug = normalizeCategorySlug(params.category);
  const sort = params.sort || "featured";

  if (params.shopeeOnly) {
    return filterShopeeCatalog(params, categorySlug, limit, offset);
  }

  if (!isDatabaseConfigured()) {
    return filterSeedFallback(params, categorySlug, limit, offset);
  }

  try {
    const categories = await getWebCategories();
    const whereClauses: string[] = [
      "p.is_active = TRUE",
      "p.is_web_visible = TRUE",
      "p.price > 0",
    ];
    const queryParams: unknown[] = [];

    if (categorySlug !== "semua") {
      queryParams.push(categorySlug);
      whereClauses.push(`c.slug = $${queryParams.length}`);
    }

    if (params.featuredOnly) {
      whereClauses.push("p.is_featured = TRUE");
    }

    if (params.wholesaleOnly) {
      whereClauses.push("p.wholesale_price > 0");
    }

    if (params.inStockOnly) {
      whereClauses.push("p.stock > 0");
    }

    if (params.maxPrice && params.maxPrice > 0) {
      queryParams.push(params.maxPrice);
      whereClauses.push(`p.price <= $${queryParams.length}`);
    }

    const tokens = normalizeProductQueryTokens(params.q);
    const nameMatchConditions: string[] = [];

    for (const token of tokens) {
      const variants = expandTokenVariants(token);
      const tokenOrClauses: string[] = [];
      const tokenNameClauses: string[] = [];
      for (const variant of variants) {
        queryParams.push(`%${variant}%`);
        const idx = queryParams.length;
        tokenNameClauses.push(`p.name ILIKE $${idx}`);
        tokenOrClauses.push(
          `(p.name ILIKE $${idx} OR p.sku ILIKE $${idx} OR COALESCE(p.barcode, '') ILIKE $${idx} OR COALESCE(p.supplier_name, '') ILIKE $${idx} OR c.name ILIKE $${idx})`
        );
      }
      whereClauses.push(`(${tokenOrClauses.join(" OR ")})`);
      nameMatchConditions.push(`(${tokenNameClauses.join(" OR ")})`);
    }

    const whereSql = whereClauses.join(" AND ");

    let orderSql =
      "p.is_featured DESC, CASE WHEN p.wholesale_price > 0 THEN 0 ELSE 1 END, p.name ASC";
    if (sort === "featured" && nameMatchConditions.length > 0) {
      orderSql = `CASE WHEN (${nameMatchConditions.join(" AND ")}) THEN 0 WHEN ${nameMatchConditions[0]} THEN 1 ELSE 2 END, p.is_featured DESC, CASE WHEN p.wholesale_price > 0 THEN 0 ELSE 1 END, p.name ASC`;
    } else if (sort === "price_asc") {
      orderSql = "p.price ASC, p.name ASC";
    } else if (sort === "price_desc") {
      orderSql = "p.price DESC, p.name ASC";
    } else if (sort === "name_asc") {
      orderSql = "p.name ASC";
    }

    const countRows = await queryDb<{ total: number }>(
      `SELECT COUNT(*)::int AS total
       FROM products p
       INNER JOIN categories c ON p.category_id = c.id
       WHERE ${whereSql}`,
      queryParams
    );
    const total = Number(countRows[0]?.total || 0);

    const dataParams = [...queryParams, limit, offset];
    const limitIdx = queryParams.length + 1;
    const offsetIdx = queryParams.length + 2;

    const productRows = await queryDb<{
      id: string;
      sku: string;
      barcode: string | null;
      name: string;
      supplier_name: string | null;
      category_slug: string;
      price: string | number;
      wholesale_price: string | number | null;
      stock: number;
      unit: string | null;
      weight_grams: number | null;
      description: string | null;
      image_url: string | null;
      badge: string | null;
      is_featured: boolean;
    }>(
      `SELECT p.id, p.sku, p.barcode, p.name, p.supplier_name,
              c.slug AS category_slug, p.price, p.wholesale_price,
              p.stock, p.unit, p.weight_grams, p.description,
              p.image_url, p.badge, p.is_featured
       FROM products p
       INNER JOIN categories c ON p.category_id = c.id
       WHERE ${whereSql}
       ORDER BY ${orderSql}
       LIMIT $${limitIdx} OFFSET $${offsetIdx}`,
      dataParams
    );

    const items: WebProduct[] = productRows.map((row) => {
      const priceNum = Number(row.price || 0);
      const wholesaleNum = Number(row.wholesale_price || 0);
      const catTitle = CATEGORY_TITLES[row.category_slug] || row.category_slug;
      const media = resolveMatchedProductMedia(row.image_url, row.name, row.sku);
      return {
        id: row.id,
        sku: row.sku,
        barcode: row.barcode,
        name: row.name,
        supplierName: row.supplier_name || "Toko Amen Snack",
        category: catTitle,
        categorySlug: row.category_slug,
        price: priceNum,
        wholesalePrice: wholesaleNum > 0 ? wholesaleNum : null,
        formattedPrice: formatRupiah(priceNum),
        formattedWholesalePrice:
          wholesaleNum > 0 ? formatRupiah(wholesaleNum) : null,
        stock: Number(row.stock || 0),
        unit: row.unit || "Pcs",
        weightGrams: row.weight_grams ? Number(row.weight_grams) : null,
        badge:
          row.badge ||
          (row.is_featured
            ? "Best Seller"
            : wholesaleNum > 0
              ? "Harga Grosir"
              : "Tersedia"),
        rating: 4.8,
        description:
          row.description || `${row.name} - Oleh-oleh & camilan Toko Amen Snack.`,
        imageUrl: media.imageUrl,
        shopeeUrl: media.shopeeUrl,
        isFeatured: Boolean(row.is_featured),
      };
    });

    return { items, total, categories, source: "supabase" };
  } catch (err) {
    console.warn("[Catalog] Falling back to static seed catalog:", err);
    return filterSeedFallback(params, categorySlug, limit, offset);
  }
}

/**
 * Shared in-memory filter/sort/pagination pipeline used for Shopee catalog & seed fallback.
 */
function applyMemoryCatalogFilter(
  sourceItems: WebProduct[],
  params: CatalogSearchParams,
  categorySlug: string,
  limit: number,
  offset: number
): { items: WebProduct[]; total: number } {
  const tokens = normalizeProductQueryTokens(params.q);

  let filtered = sourceItems.filter((p) => {
    if (categorySlug !== "semua" && p.categorySlug !== categorySlug) return false;
    if (params.maxPrice && (p.price || 0) > params.maxPrice) return false;
    if (tokens.length > 0) {
      const hay = `${p.name} ${p.sku} ${p.category} ${p.description}`.toLowerCase();
      if (
        !tokens.every((t) =>
          expandTokenVariants(t).some((variant) => hay.includes(variant))
        )
      ) {
        return false;
      }
    }
    return true;
  });

  if (params.sort === "price_asc") {
    filtered = [...filtered].sort((a, b) => (a.price || 0) - (b.price || 0));
  } else if (params.sort === "price_desc") {
    filtered = [...filtered].sort((a, b) => (b.price || 0) - (a.price || 0));
  } else if (params.sort === "name_asc") {
    filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  }

  return {
    items: filtered.slice(offset, offset + limit),
    total: filtered.length,
  };
}

function getShopeeWebProducts(): WebProduct[] {
  return SHOPEE_CATALOG_ITEMS.filter((item) => item.inStock).map((item) => ({
    id: item.id,
    sku: item.sku,
    barcode: null,
    name: item.name,
    supplierName: `Shopee ${STORE_INFO.shopeeHandle}`,
    category: item.category,
    categorySlug: item.categorySlug,
    price: item.price,
    wholesalePrice: null,
    formattedPrice: item.formattedPrice,
    formattedWholesalePrice: null,
    stock: 25,
    unit: "Pcs",
    weightGrams: null,
    badge: item.sold ? `Shopee • ${item.sold}` : "Shopee Resmi",
    rating: item.rating,
    description: `${item.name} — Tersedia langsung di toko resmi Shopee Toko Amen Snack (${STORE_INFO.shopeeHandle})${item.sold ? `, ${item.sold}` : ""}.`,
    imageUrl: item.imageUrl,
    shopeeUrl: item.shopeeUrl,
    isFeatured: true,
  }));
}

function getShopeeCategories(shopeeProducts: WebProduct[]): WebCategory[] {
  const counts = new Map<string, { title: string; count: number }>();
  for (const p of shopeeProducts) {
    const existing = counts.get(p.categorySlug);
    if (existing) {
      existing.count += 1;
    } else {
      counts.set(p.categorySlug, { title: p.category, count: 1 });
    }
  }
  return Array.from(counts.entries()).map(([slug, info], idx) => ({
    id: `shp-cat-${idx + 1}`,
    slug,
    title: info.title,
    description: `Produk resmi Shopee ${STORE_INFO.shopeeHandle} kategori ${info.title}.`,
    iconName: resolveCategoryIcon(slug),
    sortOrder: idx + 1,
    productCount: info.count,
  }));
}

function filterShopeeCatalog(
  params: CatalogSearchParams,
  categorySlug: string,
  limit: number,
  offset: number
): CatalogSearchResult {
  const allShopee = getShopeeWebProducts();
  const { items, total } = applyMemoryCatalogFilter(
    allShopee,
    params,
    categorySlug,
    limit,
    offset
  );
  return {
    items,
    total,
    categories: getShopeeCategories(allShopee),
    source: isDatabaseConfigured() ? "supabase" : "seed",
  };
}

function filterSeedFallback(
  params: CatalogSearchParams,
  categorySlug: string,
  limit: number,
  offset: number
): CatalogSearchResult {
  const all = getSeedProductsFallback();
  const { items, total } = applyMemoryCatalogFilter(
    all,
    params,
    categorySlug,
    limit,
    offset
  );

  return {
    items,
    total,
    categories: getSeedCategoriesFallback(),
    source: "seed",
  };
}
