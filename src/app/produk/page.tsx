import type { Metadata } from "next";
import React, { Suspense } from "react";
import { ProdukClient } from "./ProdukClient";
import { normalizeCategorySlug, searchWebProducts } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Katalog Produk Oleh-Oleh Bangka",
  description:
    "Jelajahi katalog lengkap Toko Amen Snack Sungailiat: Kemplang Panggang, Kemplang Cap AMEN, Getas Ikan, Kericu, Terasi Bangka, Lempuk Durian, Kopi Bangka, dan camilan lainnya.",
};

export default async function ProdukPage({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string; q?: string }>;
}) {
  const sp = await searchParams;
  const initialCategory = normalizeCategorySlug(sp?.kategori);
  const initialQuery = (sp?.q || "").trim();

  const initialData = await searchWebProducts({
    q: initialQuery,
    category: initialCategory,
    sort: "featured",
    limit: 24,
    offset: 0,
  });

  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-soft" />}>
      <ProdukClient
        initialItems={initialData.items}
        initialTotal={initialData.total}
        initialCategories={initialData.categories}
        initialCategory={initialCategory}
        initialQuery={initialQuery}
        dataSource={initialData.source}
      />
    </Suspense>
  );
}
