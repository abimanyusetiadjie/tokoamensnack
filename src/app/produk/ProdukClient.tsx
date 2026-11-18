"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Bot,
  Loader2,
  MessageCircle,
  Search,
  ShoppingBag,
  Sparkles,
  Tag,
} from "lucide-react";
import { PageHeroBanner } from "@/components/PageHeroBanner";
import { Card } from "@/components/ui/card";
import { CategoryIcon } from "@/components/CategoryIcon";
import { ProductCard } from "@/components/ProductCard";
import { STORE_INFO } from "@/payload/seed-data";
import { cn } from "@/lib/utils";
import type { WebCategory, WebProduct } from "@/lib/catalog";

interface ProdukClientProps {
  initialItems: WebProduct[];
  initialTotal: number;
  initialCategories: WebCategory[];
  initialCategory: string;
  initialQuery: string;
  initialShopeeOnly?: boolean;
  dataSource: "supabase" | "seed";
}

type SortOption = "featured" | "price_asc" | "price_desc" | "name_asc";

export function openStoreChatbot(prompt?: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("amen:open-chat", { detail: { prompt } })
    );
  }
}

/**
 * Interactive live catalog backed by Supabase PostgreSQL with category filters,
 * debounced server search, wholesale toggle, sort selector, and pagination.
 */
export function ProdukClient({
  initialItems,
  initialTotal,
  initialCategories,
  initialCategory,
  initialQuery,
  initialShopeeOnly = false,
  dataSource,
}: ProdukClientProps) {
  const searchParams = useSearchParams();
  const [items, setItems] = useState<WebProduct[]>(initialItems);
  const [total, setTotal] = useState<number>(initialTotal);
  const [categories, setCategories] = useState<WebCategory[]>(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [query, setQuery] = useState<string>(initialQuery);
  const [wholesaleOnly, setWholesaleOnly] = useState<boolean>(false);
  const [shopeeOnly, setShopeeOnly] = useState<boolean>(initialShopeeOnly);
  const [sort, setSort] = useState<SortOption>("featured");
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const isFirstRender = useRef(true);
  const totalAllProducts = categories.reduce((acc, c) => acc + c.productCount, 0);

  const fetchProducts = useCallback(
    async (opts: {
      q: string;
      category: string;
      grosir: boolean;
      shopee: boolean;
      sortBy: SortOption;
      pageNum: number;
      append: boolean;
    }) => {
      if (opts.append) setIsLoadingMore(true);
      else setIsLoading(true);

      try {
        const sp = new URLSearchParams();
        if (opts.q.trim()) sp.set("q", opts.q.trim());
        if (opts.category && opts.category !== "semua") {
          sp.set("kategori", opts.category);
        }
        if (opts.grosir) sp.set("grosir", "1");
        if (opts.shopee) sp.set("shopee", "1");
        sp.set("sort", opts.sortBy);
        sp.set("page", String(opts.pageNum));
        sp.set("limit", "24");

        const res = await fetch(`/api/products?${sp.toString()}`);
        if (!res.ok) return;
        const json = await res.json();
        setItems((prev) => (opts.append ? [...prev, ...(json.items || [])] : json.items || []));
        setTotal(Number(json.total || 0));
        if (Array.isArray(json.categories) && json.categories.length > 0) {
          setCategories(json.categories);
        }
      } catch (err) {
        console.error("[ProdukClient] Failed to load catalog:", err);
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    []
  );

  // Sync URL query params (?kategori=...&q=...&shopee=1) if user navigates client-side
  useEffect(() => {
    const paramCat = searchParams.get("kategori");
    const paramShopee = searchParams.get("shopee") === "1";
    if (paramCat && paramCat !== selectedCategory) {
      setSelectedCategory(paramCat);
    }
    if (paramShopee !== shopeeOnly) {
      setShopeeOnly(paramShopee);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Debounced live fetch when filters change
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const timer = setTimeout(() => {
      setPage(1);
      fetchProducts({
        q: query,
        category: selectedCategory,
        grosir: wholesaleOnly,
        shopee: shopeeOnly,
        sortBy: sort,
        pageNum: 1,
        append: false,
      });
    }, 250);
    return () => clearTimeout(timer);
  }, [query, selectedCategory, wholesaleOnly, shopeeOnly, sort, fetchProducts]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProducts({
      q: query,
      category: selectedCategory,
      grosir: wholesaleOnly,
      shopee: shopeeOnly,
      sortBy: sort,
      pageNum: nextPage,
      append: true,
    });
  };

  return (
    <div className="min-h-screen bg-white overflow-x-clip">
      <PageHeroBanner
        breadcrumb="Katalog Produk"
        badge={
          dataSource === "supabase"
            ? `${totalAllProducts.toLocaleString("id-ID")} Produk Tersinkronisasi Langsung dengan Stok Toko`
            : "100% Asli Bangka • Cap AMEN & Produk Pilihan"
        }
        title="Katalog Oleh-Oleh Toko Amen Snack"
        subtitle="Cari ratusan varian Kemplang Panggang, Kemplang Goreng, Getas Ikan, Ampiang, Kericu, Terasi Bangka, Kopi, hingga paket grosir resmi Sungailiat."
      />

      <section className="py-10 sm:py-14">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[10%]">
          {/* Category Pills Row */}
          <div className="flex sm:flex-wrap items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
            <button
              type="button"
              onClick={() => setSelectedCategory("semua")}
              className={cn(
                "rounded-full px-4 py-2 text-xs font-semibold transition-colors cursor-pointer shrink-0",
                selectedCategory === "semua"
                  ? "bg-brand-red text-white shadow-xs"
                  : "bg-brand-soft text-brand-dark hover:bg-slate-200/70"
              )}
            >
              Semua ({totalAllProducts > 0 ? totalAllProducts.toLocaleString("id-ID") : initialTotal})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-semibold transition-colors cursor-pointer shrink-0",
                  selectedCategory === cat.slug
                    ? "bg-brand-red text-white shadow-xs"
                    : "bg-brand-soft text-brand-dark hover:bg-slate-200/70"
                )}
              >
                {cat.title} ({cat.productCount})
              </button>
            ))}
          </div>

          {/* Search, Wholesale Toggle & Sort Bar */}
          <div className="mt-5 pb-6 border-b border-slate-200/80 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div className="relative w-full lg:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari kemplang, getas 250g, terasi, kopi..."
                aria-label="Cari produk"
                className="w-full rounded-full border border-slate-300 bg-brand-slate pl-10 pr-4 py-2.5 text-sm text-brand-dark focus:outline-none focus:border-brand-red focus:bg-white transition-colors"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setShopeeOnly((prev) => {
                    const next = !prev;
                    if (next) setWholesaleOnly(false);
                    setSelectedCategory("semua");
                    return next;
                  });
                }}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold border transition-colors cursor-pointer",
                  shopeeOnly
                    ? "bg-[#EE4D2D] text-white border-[#EE4D2D] shadow-xs"
                    : "bg-white text-[#EE4D2D] border-[#EE4D2D]/40 hover:bg-orange-50"
                )}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Etalase Shopee (108)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setWholesaleOnly((prev) => {
                    const next = !prev;
                    if (next) setShopeeOnly(false);
                    return next;
                  });
                }}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold border transition-colors cursor-pointer",
                  wholesaleOnly
                    ? "bg-brand-orange text-white border-brand-orange"
                    : "bg-white text-brand-dark border-slate-300 hover:bg-rose-50"
                )}
              >
                <Tag className="w-3.5 h-3.5" />
                <span>Harga Grosir</span>
              </button>

              <a
                href={STORE_INFO.shopeeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-brand-red hover:bg-brand-red-dark text-white px-4 py-2 text-xs font-semibold transition-colors"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Shopee amensnack</span>
              </a>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                aria-label="Urutkan produk"
                className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-brand-dark focus:outline-none focus:border-brand-red cursor-pointer"
              >
                <option value="featured">Urutkan: Unggulan</option>
                <option value="price_asc">Harga Termurah</option>
                <option value="price_desc">Harga Tertinggi</option>
                <option value="name_asc">Nama Produk A–Z</option>
              </select>

              <button
                type="button"
                onClick={() =>
                  openStoreChatbot(
                    query.trim()
                      ? `Bantu rekomendasikan produk terkait "${query.trim()}"`
                      : "Bantu rekomendasikan oleh-oleh khas Bangka best seller"
                  )
                }
                className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft hover:bg-slate-200/80 text-brand-red border border-brand-red/25 px-4 py-2 text-xs font-semibold transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
                <span>Tanya Asisten AI</span>
              </button>
            </div>
          </div>

          {/* Result Status Counter */}
          <div className="mt-5 flex items-center justify-between text-xs text-slate-600">
            <span>
              Menampilkan <strong>{items.length}</strong> dari{" "}
              <strong>{total.toLocaleString("id-ID")}</strong> produk
            </span>
            {isLoading && (
              <span className="inline-flex items-center gap-1.5 text-brand-red font-semibold">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Memperbarui katalog...
              </span>
            )}
          </div>

          {/* Filtered Products Grid */}
          {items.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
                {items.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {items.length < total && (
                <div className="mt-10 flex justify-center">
                  <button
                    type="button"
                    disabled={isLoadingMore}
                    onClick={handleLoadMore}
                    className="inline-flex items-center gap-2 rounded-full bg-brand-red hover:bg-brand-red-dark disabled:opacity-60 text-white font-semibold text-xs sm:text-sm px-7 py-3 shadow-sm transition-colors cursor-pointer"
                  >
                    {isLoadingMore ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Memuat produk lainnya...</span>
                      </>
                    ) : (
                      <span>
                        Muat Lebih Banyak ({(total - items.length).toLocaleString("id-ID")} tersisa)
                      </span>
                    )}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="py-14 px-6 mt-8 rounded-2xl bg-brand-soft border border-slate-200/80 text-center max-w-2xl mx-auto">
              <ShoppingBag className="w-10 h-10 text-brand-red mx-auto mb-3" />
              <p className="text-base font-bold text-brand-dark">
                Produk untuk filter atau kata kunci tersebut belum ditemukan
              </p>
              <p className="text-sm text-slate-600 mt-1.5">
                Coba ubah kata kunci pencarian, reset filter, atau tanya Asisten AI &amp; Admin
                WhatsApp kami untuk cek stok terbaru.
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setSelectedCategory("semua");
                    setWholesaleOnly(false);
                    setShopeeOnly(false);
                  }}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-brand-red bg-white hover:bg-brand-soft text-brand-red font-semibold text-xs px-5 py-2.5 transition-colors cursor-pointer"
                >
                  Reset Pencarian &amp; Filter
                </button>
                <button
                  type="button"
                  onClick={() =>
                    openStoreChatbot(
                      query.trim()
                        ? `Apakah produk "${query.trim()}" tersedia?`
                        : "Rekomendasikan produk unggulan"
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-full bg-brand-red hover:bg-brand-red-dark text-white font-semibold text-xs px-5 py-2.5 transition-colors cursor-pointer"
                >
                  <Bot className="w-4 h-4" />
                  Tanya Asisten AI
                </button>
                <a
                  href={STORE_INFO.whatsappDirectCta}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs px-5 py-2.5 transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat WhatsApp
                </a>
              </div>
            </div>
          )}

          {/* Category Showcase Cards */}
          <div className="mt-16 pt-12 border-t border-slate-200/80">
            <h2 className="font-inter font-bold text-2xl text-brand-dark mb-6">
              Kategori Produk Toko Amen Snack
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(category.slug);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="text-left cursor-pointer"
                >
                  <Card
                    className={cn(
                      "brand-card rounded-2xl p-5 flex items-start gap-4 border transition-colors h-full",
                      selectedCategory === category.slug
                        ? "border-brand-red bg-brand-soft"
                        : "border-slate-200/80 bg-white hover:bg-brand-soft"
                    )}
                  >
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-brand-red text-white flex items-center justify-center shadow-sm">
                      <CategoryIcon name={category.iconName} className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-base text-brand-dark">
                          {category.title}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                        {category.description}
                      </p>
                      <span className="inline-block mt-2 text-[11px] font-bold text-brand-red">
                        {category.productCount} produk tersedia →
                      </span>
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
