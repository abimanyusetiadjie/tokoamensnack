import type { Metadata } from "next";
import React from "react";
import { ProdukClient } from "./ProdukClient";
import { getCuratedPhotoProducts, normalizeCategorySlug } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Koleksi Produk Oleh-Oleh Bangka",
  description:
    "Koleksi produk pilihan Toko Amen Snack Sungailiat dengan foto produk asli: Kemplang Panggang, Kemplang Cap AMEN, Getas Ikan, Kericu, Terasi Bangka, Kopi Bangka, dan Indomie Kaldu Udang.",
};

export default async function ProdukPage({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string }>;
}) {
  const sp = await searchParams;
  const initialCategory = normalizeCategorySlug(sp?.kategori);
  const { items, activeCategoryTitle } = getCuratedPhotoProducts(initialCategory, 24);

  return (
    <ProdukClient
      items={items}
      activeCategoryTitle={activeCategoryTitle}
    />
  );
}
