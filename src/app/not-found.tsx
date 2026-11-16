import React from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Store } from "lucide-react";

/**
 * Custom branded 404 Not Found page matching Toko Amen Snack Navy (#2E3677) & Crimson (#E93433) theme.
 */
export default function NotFound() {
  return (
    <section className="min-h-[70vh] bg-brand-soft flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full bg-white rounded-3xl border border-slate-200/80 brand-card p-8 sm:p-10 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-red/10 px-4 py-1.5 text-xs font-bold text-brand-red mb-4">
          <Store className="w-3.5 h-3.5" />
          Error 404 &bull; Halaman Tidak Ditemukan
        </span>

        <h1 className="font-inter font-extrabold text-2xl sm:text-3xl text-brand-dark">
          Maaf, Halaman Ini Tidak Tersedia
        </h1>
        <p className="mt-3 text-sm text-gray-600 leading-relaxed">
          Tautan yang Anda buka mungkin sudah berpindah atau tidak tersedia. Silakan kembali ke
          beranda atau telusuri langsung katalog oleh-oleh khas Bangka kami.
        </p>

        <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-brand-red hover:bg-brand-red-dark text-white font-semibold text-sm px-6 py-3 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>
          <Link
            href="/produk"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border-2 border-brand-red bg-white hover:bg-brand-soft text-brand-red font-semibold text-sm px-6 py-3 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Lihat Katalog Produk</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
