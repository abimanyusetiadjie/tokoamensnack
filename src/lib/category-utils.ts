const LEGACY_CATEGORY_ALIASES: Record<string, string> = {
  all: "semua",
  "kemplang-pasir": "kemplang-goreng",
  "getas-kerupuk": "getas-ampiang-kericu",
  "kericu-olahan-laut": "getas-ampiang-kericu",
  "bumbu-terasi": "terasi-bumbu-laut",
  "kopi-produk-khas": "kopi-sirup-minuman",
};

/**
 * Normalizes legacy and current Bangka snack category query slugs cleanly on client and server.
 */
export function normalizeCategorySlug(raw?: string | null): string {
  const clean = (raw || "semua").trim().toLowerCase();
  if (!clean) return "semua";
  return LEGACY_CATEGORY_ALIASES[clean] || clean;
}
