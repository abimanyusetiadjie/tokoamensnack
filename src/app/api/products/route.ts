import { NextResponse } from "next/server";
import {
  getPaginatedCuratedPhotoProducts,
  normalizeCategorySlug,
  searchWebProducts,
} from "@/lib/catalog";

export const dynamic = "force-dynamic";

/**
 * Public catalog search & filter endpoint backed by curated Shopee photo catalog or live Supabase products.
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = normalizeCategorySlug(searchParams.get("kategori"));

    if (searchParams.get("curated") === "1") {
      const limit = Math.min(Math.max(Number(searchParams.get("limit") || 8), 1), 24);
      const offset = Math.max(Number(searchParams.get("offset") || 0), 0);
      const result = getPaginatedCuratedPhotoProducts({
        categorySlug: category,
        offset,
        limit,
      });

      return NextResponse.json(
        {
          source: "curated",
          offset,
          limit,
          total: result.total,
          hasMore: result.hasMore,
          activeCategoryTitle: result.activeCategoryTitle,
          categories: result.categories,
          items: result.items,
        },
        {
          headers: {
            "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
          },
        }
      );
    }

    const q = searchParams.get("q") || "";
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
    const shopeeOnly = searchParams.get("shopee") === "1";

    const result = await searchWebProducts({
      q,
      category,
      wholesaleOnly,
      inStockOnly,
      shopeeOnly,
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
