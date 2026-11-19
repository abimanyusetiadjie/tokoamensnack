"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  MessageCircle,
  Plus,
  ShoppingBag,
} from "lucide-react";
import { PageHeroBanner } from "@/components/PageHeroBanner";
import { ProductCard } from "@/components/ProductCard";
import { STORE_INFO } from "@/payload/seed-data";
import { normalizeCategorySlug } from "@/lib/category-utils";
import { CATALOG_SLUG_EN, useLanguage } from "@/lib/i18n";
import type { CuratedCategorySummary, WebProduct } from "@/lib/catalog";

const BATCH_SIZE = 8;
const MAX_DOM_WINDOW = 24;

interface ProdukClientProps {
  initialItems: WebProduct[];
  initialTotal: number;
  initialHasMore: boolean;
  categories: CuratedCategorySummary[];
}

interface CachedPageData {
  items: WebProduct[];
  total: number;
  hasMore: boolean;
  activeCategoryTitle: string | null;
}

/**
 * Isolated query-param observer wrapped inside a zero-fallback Suspense boundary
 * so the main ProdukClient stays statically pre-rendered into /produk HTML.
 */
function CategoryUrlSync({
  onCategoryChange,
}: {
  onCategoryChange: (slug: string) => void;
}) {
  const searchParams = useSearchParams();
  const slug = normalizeCategorySlug(searchParams.get("kategori"));
  const prevSlugRef = useRef<string>("semua");

  useEffect(() => {
    if (prevSlugRef.current === slug) return;
    prevSlugRef.current = slug;
    onCategoryChange(slug);
  }, [slug, onCategoryChange]);

  return null;
}

/**
 * Progressive ("per proses") product showcase:
 * - Renders only 8 cards on initial mount for instant zero-lag menu switching
 * - Loads +8 items step-by-step on demand ("Muat 8 Produk Berikutnya")
 * - Caps active DOM cards at 24 per page window to stay fast on Windows 7 Dual-Core PCs.
 */
export function ProdukClient({
  initialItems,
  initialTotal,
  initialHasMore,
  categories,
}: ProdukClientProps) {
  const router = useRouter();
  const { isEn, tx } = useLanguage();

  const [activeCategory, setActiveCategory] = useState<string>("semua");
  const [activeCategoryTitle, setActiveCategoryTitle] = useState<string | null>(null);
  const [windowStart, setWindowStart] = useState<number>(0);
  const [items, setItems] = useState<WebProduct[]>(initialItems);
  const [total, setTotal] = useState<number>(initialTotal);
  const [hasMoreInTotal, setHasMoreInTotal] = useState<boolean>(initialHasMore);
  const [isLoadingBatch, setIsLoadingBatch] = useState<boolean>(false);

  const cacheRef = useRef<Map<string, CachedPageData>>(
    new Map([
      [
        "semua:0:8",
        {
          items: initialItems,
          total: initialTotal,
          hasMore: initialHasMore,
          activeCategoryTitle: null,
        },
      ],
    ])
  );
  const abortRef = useRef<AbortController | null>(null);
  const gridTopRef = useRef<HTMLDivElement | null>(null);

  const fetchBatch = async (
    categorySlug: string,
    offset: number,
    mode: "replace" | "append"
  ) => {
    const cacheKey = `${categorySlug}:${offset}:${BATCH_SIZE}`;
    const cached = cacheRef.current.get(cacheKey);

    if (cached) {
      setTotal(cached.total);
      setHasMoreInTotal(cached.hasMore);
      setActiveCategoryTitle(cached.activeCategoryTitle);
      setItems((prev) =>
        mode === "append" ? [...prev, ...cached.items] : cached.items
      );
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setIsLoadingBatch(true);

    try {
      const qs = new URLSearchParams({
        curated: "1",
        kategori: categorySlug,
        offset: String(offset),
        limit: String(BATCH_SIZE),
      });
      const res = await fetch(`/api/products?${qs.toString()}`, {
        signal: controller.signal,
      });
      if (!res.ok) return;

      const data = (await res.json()) as CachedPageData;
      cacheRef.current.set(cacheKey, data);

      setTotal(data.total);
      setHasMoreInTotal(Boolean(data.hasMore));
      setActiveCategoryTitle(data.activeCategoryTitle || null);
      setItems((prev) =>
        mode === "append" ? [...prev, ...data.items] : data.items
      );
    } catch (err) {
      if ((err as { name?: string })?.name !== "AbortError") {
        console.warn("[ProdukClient] Failed fetching product batch:", err);
      }
    } finally {
      if (abortRef.current === controller) {
        setIsLoadingBatch(false);
      }
    }
  };

  const handleUrlCategorySync = React.useCallback(
    (incomingSlug: string) => {
      if (incomingSlug === activeCategory) return;
      setActiveCategory(incomingSlug);
      setWindowStart(0);
      if (incomingSlug === "semua") {
        setActiveCategoryTitle(null);
        setItems(initialItems);
        setTotal(initialTotal);
        setHasMoreInTotal(initialHasMore);
        return;
      }
      void fetchBatch(incomingSlug, 0, "replace");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeCategory, initialItems, initialTotal, initialHasMore]
  );

  const handleSelectCategory = (slug: string) => {
    const normalized = normalizeCategorySlug(slug);
    if (normalized === activeCategory && windowStart === 0) return;

    setActiveCategory(normalized);
    setWindowStart(0);

    const targetHref =
      normalized === "semua"
        ? "/produk"
        : `/produk?kategori=${encodeURIComponent(normalized)}`;
    router.replace(targetHref, { scroll: false });

    if (normalized === "semua") {
      setActiveCategoryTitle(null);
      setItems(initialItems);
      setTotal(initialTotal);
      setHasMoreInTotal(initialHasMore);
      return;
    }
    void fetchBatch(normalized, 0, "replace");
  };

  const canLoadMoreWithinWindow =
    hasMoreInTotal && items.length < MAX_DOM_WINDOW;
  const canAdvanceNextWindow =
    hasMoreInTotal && items.length >= MAX_DOM_WINDOW;
  const canReturnPrevWindow = windowStart >= MAX_DOM_WINDOW;

  const handleLoadNextBatch = () => {
    if (isLoadingBatch || !canLoadMoreWithinWindow) return;
    void fetchBatch(activeCategory, windowStart + items.length, "append");
  };

  const handleChangeWindow = (nextStart: number) => {
    if (isLoadingBatch || nextStart < 0) return;
    setWindowStart(nextStart);
    gridTopRef.current?.scrollIntoView({ behavior: "auto", block: "start" });
    void fetchBatch(activeCategory, nextStart, "replace");
  };

  const rangeStart = items.length > 0 ? windowStart + 1 : 0;
  const rangeEnd = windowStart + items.length;
  const processStep = Math.max(1, Math.ceil(items.length / BATCH_SIZE));

  return (
    <div className="min-h-screen bg-brand-soft overflow-x-clip">
      <Suspense fallback={null}>
        <CategoryUrlSync onCategoryChange={handleUrlCategorySync} />
      </Suspense>
      <PageHeroBanner
        breadcrumb={tx("Produk", "Products")}
        badge={tx("100% Foto Asli Produk • Lini Produk AMS & Oleh-Oleh Bangka", "100% Real Product Photos • Direct-Packed AMS & Bangka Souvenirs")}
        title={tx("Koleksi Produk Terlengkap", "Complete Product Collection")}
        subtitle={tx(
          "Pilihan oleh-oleh khas Pulau Bangka berkualitas dengan foto asli produk tersedia langsung di Toko Amen Snack Sungailiat dan Shopee Official.",
          "Authentic Bangka Island souvenirs with verified product photos, available at Toko Amen Snack Sungailiat and Official Shopee."
        )}
      />

      <section className="py-8 sm:py-12">
        <div
          ref={gridTopRef}
          className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[10%] scroll-mt-24"
        >
          {/* Lightweight Horizontally-Scrollable Category Filter Strip */}
          <div className="mb-5 sm:mb-7 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <button
              type="button"
              onClick={() => handleSelectCategory("semua")}
              className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-semibold border transition-colors cursor-pointer ${
                activeCategory === "semua"
                  ? "bg-brand-red text-white border-brand-red shadow-xs"
                  : "bg-white text-slate-700 border-slate-200 hover:border-brand-red/40 hover:text-brand-red"
              }`}
            >
              {tx("Semua", "All")} ({initialTotal})
            </button>
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.slug;
              const catLabel = isEn
                ? CATALOG_SLUG_EN[cat.slug] || cat.title
                : cat.title;
              return (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => handleSelectCategory(cat.slug)}
                  className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-semibold border transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-brand-red text-white border-brand-red shadow-xs"
                      : "bg-white text-slate-700 border-slate-200 hover:border-brand-red/40 hover:text-brand-red"
                  }`}
                >
                  {catLabel} ({cat.count})
                </button>
              );
            })}
          </div>

          {/* Staged Render Progress Status */}
          <div className="mb-5 flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-white border border-slate-200/80 px-4 py-2.5 text-xs text-slate-600">
            <span>
              {activeCategoryTitle ? (
                <>
                  {tx("Kategori", "Category")}:{" "}
                  <strong className="text-brand-red">
                    {isEn ? CATALOG_SLUG_EN[activeCategory] || activeCategoryTitle : activeCategoryTitle}
                  </strong>{" "}
                  &bull;{" "}
                </>
              ) : null}
              {tx("Menampilkan", "Showing")}{" "}
              <strong className="text-brand-dark">
                {rangeStart}–{rangeEnd}
              </strong>{" "}
              {tx("dari", "of")} <strong className="text-brand-dark">{total}</strong>{" "}
              {tx("produk berfoto asli", "products with real photos")}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-semibold text-brand-red">
              {tx(
                `Tahap ${processStep} • Muat Bertahap per ${BATCH_SIZE} Produk`,
                `Step ${processStep} • Staged Load (${BATCH_SIZE}/batch)`
              )}
            </span>
          </div>

          {items.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {items.map((product, idx) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  priority={idx < 2}
                />
              ))}
            </div>
          ) : isLoadingBatch ? (
            <div className="py-12 px-6 rounded-2xl bg-white border border-slate-200/80 text-center max-w-md mx-auto">
              <Loader2 className="w-7 h-7 text-brand-red mx-auto mb-2.5 animate-spin" />
              <p className="text-sm font-semibold text-brand-dark">
                {tx("Memuat 8 produk kategori...", "Loading 8 category products...")}
              </p>
            </div>
          ) : (
            <div className="py-12 px-6 rounded-2xl bg-white border border-slate-200/80 text-center max-w-xl mx-auto">
              <ShoppingBag className="w-9 h-9 text-brand-red mx-auto mb-3" />
              <p className="text-sm sm:text-base font-bold text-brand-dark">
                {tx(
                  "Produk untuk kategori ini sedang diperbarui",
                  "Products for this category are being updated"
                )}
              </p>
              <button
                type="button"
                onClick={() => handleSelectCategory("semua")}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand-red hover:bg-brand-red-dark text-white font-semibold text-xs px-5 py-2.5 transition-colors cursor-pointer"
              >
                {tx("Lihat Semua Produk", "View All Products")}
              </button>
            </div>
          )}

          {/* Staged Batch Controls ("Per Proses Per Proses", Strict Max 24 Cards in DOM) */}
          {(canLoadMoreWithinWindow || canAdvanceNextWindow || canReturnPrevWindow) && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {canReturnPrevWindow && (
                <button
                  type="button"
                  disabled={isLoadingBatch}
                  onClick={() =>
                    handleChangeWindow(Math.max(0, windowStart - MAX_DOM_WINDOW))
                  }
                  className="inline-flex items-center gap-1.5 rounded-full bg-white hover:bg-slate-50 border border-slate-300 text-brand-dark font-semibold text-xs sm:text-sm px-5 py-2.5 shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{tx("Halaman Sebelumnya", "Previous Page")}</span>
                </button>
              )}

              {canLoadMoreWithinWindow && (
                <button
                  type="button"
                  disabled={isLoadingBatch}
                  onClick={handleLoadNextBatch}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-red hover:bg-brand-red-dark text-white font-semibold text-xs sm:text-sm px-6 py-3 shadow-md transition-colors cursor-pointer disabled:opacity-60"
                >
                  {isLoadingBatch ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{tx("Memuat Batch...", "Loading Batch...")}</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>
                        {tx("Muat", "Load")}{" "}
                        {Math.min(
                          BATCH_SIZE,
                          total - (windowStart + items.length),
                          MAX_DOM_WINDOW - items.length
                        )}{" "}
                        {tx("Produk Berikutnya", "More Products")}
                      </span>
                    </>
                  )}
                </button>
              )}

              {canAdvanceNextWindow && (
                <button
                  type="button"
                  disabled={isLoadingBatch}
                  onClick={() => handleChangeWindow(windowStart + MAX_DOM_WINDOW)}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-red hover:bg-brand-red-dark text-white font-semibold text-xs sm:text-sm px-6 py-3 shadow-md transition-colors cursor-pointer disabled:opacity-60"
                >
                  <span>
                    {tx("Produk", "Products")} {windowStart + MAX_DOM_WINDOW + 1}–
                    {Math.min(windowStart + MAX_DOM_WINDOW + BATCH_SIZE, total)}{" "}
                    {tx("Berikutnya", "Next")}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {/* Clean Shopee & WhatsApp Ordering Strip matching tokomama.com simplicity */}
          <div className="mt-12 rounded-2xl bg-white border border-slate-200/80 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 brand-card">
            <div>
              <h2 className="font-inter font-bold text-lg sm:text-xl text-brand-dark">
                {tx(
                  "Ingin Cek Varian Lain atau Pesan Partai Besar?",
                  "Looking for Other Variants or Bulk Wholesale Orders?"
                )}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                {tx(
                  "Belanja praktis dengan pengiriman nasional lewat toko resmi",
                  "Order easily with nationwide shipping via our official store"
                )}{" "}
                <strong>Shopee amensnack</strong>{" "}
                {tx("atau hubungi langsung Admin WhatsApp kami di", "or message our WhatsApp team directly at")}{" "}
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
                <span>{tx("Chat WhatsApp", "WhatsApp Chat")}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
