import { NextResponse } from "next/server";
import { payloadConfig } from "@/payload/payload.config";
import {
  BLOGS_COLLECTION,
  CATEGORIES_COLLECTION,
  FLYERS_COLLECTION,
  PRODUCTS_COLLECTION,
  STORE_INFO,
  STORES_COLLECTION,
  TESTIMONIALS_COLLECTION,
  VALUE_PILLARS,
} from "@/payload/seed-data";

export async function GET() {
  return NextResponse.json({
    cms: "Toko Amen Snack CMS & Catalog API",
    config: {
      collections: payloadConfig.collections.map((c) => c.slug),
      globals: payloadConfig.globals.map((g) => g.slug),
    },
    storeInfo: {
      name: STORE_INFO.name,
      tagline: STORE_INFO.tagline,
      address: STORE_INFO.address,
      phone: STORE_INFO.phone,
      whatsappUrl: STORE_INFO.whatsappUrl,
      instagramUrl: STORE_INFO.instagramUrl,
      shopeeUrl: STORE_INFO.shopeeUrl,
      wazeUrl: STORE_INFO.wazeUrl,
      googleMapsUrl: STORE_INFO.googleMapsUrl,
      rating: STORE_INFO.rating,
      reviewCount: STORE_INFO.reviewCount,
      openingHours: STORE_INFO.openingHours,
    },
    featuredProducts: PRODUCTS_COLLECTION.map((p) => ({
      id: p.id,
      code: p.code,
      name: p.name,
      category: p.category,
      categorySlug: p.categorySlug,
      price: p.price,
      formattedPrice: p.formattedPrice,
      badge: p.badge,
      rating: p.rating,
      description: p.description,
      imageUrl: p.imageUrl,
    })),
    data: {
      storeInfo: STORE_INFO,
      flyers: FLYERS_COLLECTION,
      products: PRODUCTS_COLLECTION,
      categories: CATEGORIES_COLLECTION,
      valuePillars: VALUE_PILLARS,
      testimonials: TESTIMONIALS_COLLECTION,
      stores: STORES_COLLECTION,
      blogs: BLOGS_COLLECTION,
    },
  });
}
