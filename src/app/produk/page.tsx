import type { Metadata } from "next";
import React from "react";
import { ProdukClient } from "./ProdukClient";
import { getPaginatedCuratedPhotoProducts } from "@/lib/catalog";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Koleksi Produk Oleh-Oleh Bangka",
  description:
    "Koleksi produk pilihan Toko Amen Snack Sungailiat dengan foto produk asli: Terasi AMS, Getas Bangka AMS, Kericu Telor Cumi AMS, Kemplang Panggang, Kopi Bangka, dan Indomie Kaldu Udang.",
};

/**
 * Statically pre-rendered initial 8-item showcase (/produk) so Navbar clicks resolve instantly
 * from Next.js cache with SSR cards already in HTML, and further 8-item batches load per process.
 */
export default function ProdukPage() {
  const initialBatch = getPaginatedCuratedPhotoProducts({
    categorySlug: "semua",
    offset: 0,
    limit: 8,
  });

  return (
    <ProdukClient
      initialItems={initialBatch.items}
      initialTotal={initialBatch.total}
      initialHasMore={initialBatch.hasMore}
      categories={initialBatch.categories}
    />
  );
}
