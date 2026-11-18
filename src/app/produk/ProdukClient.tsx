import React from "react";
import Link from "next/link";
import { ArrowLeft, MessageCircle, ShoppingBag } from "lucide-react";
import { PageHeroBanner } from "@/components/PageHeroBanner";
import { ProductCard } from "@/components/ProductCard";
import { STORE_INFO } from "@/payload/seed-data";
import type { WebProduct } from "@/lib/catalog";

interface ProdukClientProps {
  items: WebProduct[];
  activeCategoryTitle: string | null;
}

/**
 * Clean, lightweight product showcase displaying only verified products with real WebP photos
 * (no heavy filter bars, no empty placeholder cards, no 1,000-row load-more pagination), matching tokomama.com/produk.
 */
export function ProdukClient({
  items,
  activeCategoryTitle,
}: ProdukClientProps) {
  return (
    <div className="min-h-screen bg-brand-soft overflow-x-clip">
      <PageHeroBanner
        breadcrumb="Produk"
        badge="100% Foto Asli Produk • Cap AMEN & Oleh-Oleh Bangka"
        title="Koleksi Produk Terlengkap"
        subtitle="Pilihan oleh-oleh khas Pulau Bangka berkualitas dengan foto asli produk tersedia langsung di Toko Amen Snack Sungailiat dan Shopee Official."
      />

      <section className="py-10 sm:py-14">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[10%]">
          {activeCategoryTitle && (
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white border border-slate-200/80 px-4 py-3 shadow-xs">
              <p className="text-xs sm:text-sm font-semibold text-brand-dark">
                Kategori:{" "}
                <span className="text-brand-red font-bold">{activeCategoryTitle}</span>
              </p>
              <Link
                href="/produk"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-red hover:text-brand-red-dark transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Lihat Semua Produk</span>
              </Link>
            </div>
          )}

          {items.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-12 px-6 rounded-2xl bg-white border border-slate-200/80 text-center max-w-xl mx-auto">
              <ShoppingBag className="w-9 h-9 text-brand-red mx-auto mb-3" />
              <p className="text-sm sm:text-base font-bold text-brand-dark">
                Produk untuk kategori ini sedang diperbarui
              </p>
              <Link
                href="/produk"
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand-red hover:bg-brand-red-dark text-white font-semibold text-xs px-5 py-2.5 transition-colors"
              >
                Lihat Semua Produk
              </Link>
            </div>
          )}

          {/* Clean Shopee & WhatsApp Ordering Strip matching tokomama.com simplicity */}
          <div className="mt-12 rounded-2xl bg-white border border-slate-200/80 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 brand-card">
            <div>
              <h2 className="font-inter font-bold text-lg sm:text-xl text-brand-dark">
                Ingin Cek Varian Lain atau Pesan Partai Besar?
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                Belanja praktis dengan pengiriman nasional lewat toko resmi{" "}
                <strong>Shopee amensnack</strong> atau hubungi langsung Admin WhatsApp kami di{" "}
                <strong>{STORE_INFO.phone}</strong>.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={STORE_INFO.shopeeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#EE4D2D] hover:bg-[#d93d1f] text-white font-semibold text-xs sm:text-sm px-5 py-3 shadow-xs transition-colors"
              >
                <ShoppingBag className="w-4 h-4 shrink-0" />
                <span>Shopee amensnack</span>
              </a>
              <a
                href={STORE_INFO.whatsappDirectCta}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs sm:text-sm px-5 py-3 shadow-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>Chat WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
