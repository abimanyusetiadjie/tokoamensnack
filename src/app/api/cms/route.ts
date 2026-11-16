import { NextResponse } from "next/server";
import { payloadConfig } from "@/payload/payload.config";
import {
  getWebStoreAndKnowledge,
  searchWebProducts,
} from "@/lib/catalog";
import {
  BLOGS_COLLECTION,
  FLYERS_COLLECTION,
  STORE_INFO,
  STORES_COLLECTION,
  TESTIMONIALS_COLLECTION,
  VALUE_PILLARS,
} from "@/payload/seed-data";

export const dynamic = "force-dynamic";

/**
 * Public Store CMS & Catalog Summary API (Supabase live + static brand fallbacks).
 */
export async function GET() {
  const [{ store, knowledge, source }, catalog] = await Promise.all([
    getWebStoreAndKnowledge(),
    searchWebProducts({ featuredOnly: true, limit: 24, offset: 0 }),
  ]);

  return NextResponse.json({
    cms: "Toko Amen Snack CMS & Live Catalog API",
    source,
    config: {
      collections: payloadConfig.collections.map((c) => c.slug),
      globals: payloadConfig.globals.map((g) => g.slug),
    },
    storeInfo: {
      ...STORE_INFO,
      name: store.name,
      officialName: store.officialName,
      address: store.address,
      phone: store.phone,
      whatsappUrl: store.whatsappUrl,
      shopeeUrl: store.shopeeUrl,
      wazeUrl: store.wazeUrl,
      googleMapsUrl: store.mapsUrl,
      openingHours: {
        mondayToSaturday: store.openingHoursWeekday,
        sunday: store.openingHoursSunday,
      },
    },
    knowledge,
    totalLiveProducts:
      catalog.categories.reduce((acc, c) => acc + c.productCount, 0) ||
      catalog.total,
    featuredProducts: catalog.items,
    categories: catalog.categories,
    data: {
      storeInfo: STORE_INFO,
      flyers: FLYERS_COLLECTION,
      products: catalog.items,
      categories: catalog.categories,
      valuePillars: VALUE_PILLARS,
      testimonials: TESTIMONIALS_COLLECTION,
      stores: STORES_COLLECTION,
      blogs: BLOGS_COLLECTION,
    },
  });
}
