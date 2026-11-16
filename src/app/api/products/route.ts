import { NextResponse } from "next/server";
import { normalizeCategorySlug, searchWebProducts } from "@/lib/catalog";

export const dynamic = "force-dynamic";

/**
 * Public catalog search & filter endpoint backed by live Supabase products.
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";
    const category = normalizeCategorySlug(searchParams.get("kategori"));
    const page = Math.max(Number(searchParams.get("page") || 1), 1);
    const limit = Math.min(Math.max(Number(searchParams.get("limit") || 24), 1), 60);
    const offset = (page - 1) * limit;
    const sortParam = searchParams.get("sort");
    const sort =
      sortParam === "price_asc" ||
      sortParam === "price_desc" ||
      sortParam === "name_asc"
        ? sortParam
        : "featured";
    const wholesaleOnly = searchParams.get("grosir") === "1";
    const inStockOnly = searchParams.get("ready") === "1";

    const result = await searchWebProducts({
      q,
      category,
      wholesaleOnly,
      inStockOnly,
      sort,
      limit,
      offset,
    });

    return NextResponse.json({
      source: result.source,
      page,
      limit,
      total: result.total,
      hasMore: offset + result.items.length < result.total,
      categories: result.categories,
      items: result.items,
    });
  } catch (err) {
    console.error("[GET /api/products]", err);
    return NextResponse.json(
      { error: "Gagal memuat katalog produk." },
      { status: 500 }
    );
  }
}
