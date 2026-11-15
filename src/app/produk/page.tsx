import type { Metadata } from "next";
import React, { Suspense } from "react";
import { ProdukClient } from "./ProdukClient";

export const metadata: Metadata = {
  title: "Katalog Produk Oleh-Oleh Bangka",
  description:
    "Jelajahi katalog lengkap Kemplang Panggang, Kemplang Pasir Cap AMEN, Getas Ikan, Kericu, Kecap Asin Cap SS, Kopi Curah, dan Indomie Kaldu Udang Bangka.",
};

export default function ProdukPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-soft" />}>
      <ProdukClient />
    </Suspense>
  );
}
