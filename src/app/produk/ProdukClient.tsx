"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MessageCircle, Search, ShoppingBag } from "lucide-react";
import { PageHeroBanner } from "@/components/PageHeroBanner";
import { Card } from "@/components/ui/card";
import { CategoryIcon } from "@/components/CategoryIcon";
import { ProductCard } from "@/components/ProductCard";
import {
  CATEGORIES_COLLECTION,
  PRODUCTS_COLLECTION,
  STORE_INFO,
} from "@/payload/seed-data";
import { cn } from "@/lib/utils";

/**
 * Interactive Bangka souvenir & snack catalog with category filter and search.
 */
export function ProdukClient() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>("semua");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const paramCat = searchParams.get("kategori");
    if (paramCat) {
      setSelectedCategory(paramCat);
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS_COLLECTION.filter((product) => {
      const matchCat =
        selectedCategory === "semua" || product.categorySlug === selectedCategory;
      const matchQuery =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [selectedCategory, query]);

  return (
    <div className="min-h-screen bg-white">
      <PageHeroBanner
        breadcrumb="Katalog Produk"
        badge="100% Asli Bangka • Cap AMEN & Produk Pilihan"
        title="Katalog Oleh-Oleh Toko Amen Snack"
        subtitle="Pilih aneka kemplang panggang, kemplang pasir Cap AMEN, getas tenggiri, terasi, kecap asin, kopi curah, hingga mi instan eksklusif Bangka."
      />

      <section className="py-10 sm:py-14">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[10%]">
          {/* Filter Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-8 border-b border-rose-100">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedCategory("semua")}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-semibold transition-colors cursor-pointer",
                  selectedCategory === "semua"
                    ? "bg-brand-red text-white"
                    : "bg-brand-soft text-brand-dark hover:bg-rose-100"
                )}
              >
                Semua ({PRODUCTS_COLLECTION.length})
              </button>
              {CATEGORIES_COLLECTION.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={cn(
                    "rounded-full px-4 py-2 text-xs font-semibold transition-colors cursor-pointer",
                    selectedCategory === cat.slug
                      ? "bg-brand-red text-white"
                      : "bg-brand-soft text-brand-dark hover:bg-rose-100"
                  )}
                >
                  {cat.title}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari kemplang, getas, kopi..."
                aria-label="Cari produk"
                className="w-full rounded-full border border-rose-200 bg-brand-slate pl-10 pr-4 py-2 text-sm text-brand-dark focus:outline-none focus:border-brand-red focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Filtered Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-14 px-6 mt-8 rounded-2xl bg-brand-soft/60 border border-rose-100 text-center max-w-2xl mx-auto">
              <ShoppingBag className="w-10 h-10 text-brand-red mx-auto mb-3" />
              <p className="text-base font-bold text-brand-dark">
                Stok kategori ini tersedia langsung di toko &amp; admin kami
              </p>
              <p className="text-sm text-slate-600 mt-1.5">
                Silakan hubungi WhatsApp admin untuk menanyakan varian kericu, olahan laut kering,
                atau produk oleh-oleh Bangka lainnya yang sedang ready hari ini.
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={STORE_INFO.whatsappDirectCta}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-red hover:bg-brand-red-dark text-white font-semibold text-xs px-5 py-2.5 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Tanya Stok via WhatsApp
                </a>
                <a
                  href={STORE_INFO.shopeeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-brand-orange text-brand-orange-dark hover:bg-orange-50 font-semibold text-xs px-5 py-2.5 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Cek Etalase Shopee
                </a>
              </div>
            </div>
          )}

          {/* Category Showcase Cards */}
          <div className="mt-16 pt-12 border-t border-rose-100">
            <h2 className="font-inter font-bold text-2xl text-brand-dark mb-6">
              6 Kategori Utama Oleh-Oleh Khas Bangka
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {CATEGORIES_COLLECTION.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.slug)}
                  className="text-left cursor-pointer"
                >
                  <Card
                    className={cn(
                      "brand-card rounded-2xl p-5 flex items-start gap-4 border transition-colors h-full",
                      selectedCategory === category.slug
                        ? "border-brand-red bg-brand-soft"
                        : "border-rose-100 bg-brand-slate hover:bg-brand-soft/60"
                    )}
                  >
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-brand-red to-brand-orange text-white flex items-center justify-center shadow-sm">
                      <CategoryIcon name={category.iconName} className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-brand-dark">{category.title}</h3>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                  </Card>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
