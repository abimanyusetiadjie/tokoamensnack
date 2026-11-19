"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BadgePercent,
  Calendar,
  Clock,
  MapPin,
  Navigation,
  Phone,
  ShoppingBag,
  Star,
  Store,
  Truck,
  X,
  ZoomIn,
} from "lucide-react";
import {
  STORE_INFO,
  FLYERS_COLLECTION,
  PRODUCTS_COLLECTION,
  CATEGORIES_COLLECTION,
  VALUE_PILLARS,
  PROPOSITION_BANNERS,
  TESTIMONIALS_COLLECTION,
  STORES_COLLECTION,
  BLOGS_COLLECTION,
  type FlyerItem,
} from "@/payload/seed-data";
import { MediaImage } from "@/components/MediaImage";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import {
  BLOG_EN,
  CATEGORY_EN,
  FLYER_EN,
  FOUNDED_DATE_EN,
  PILLAR_EN,
  PRODUCT_EN,
  TESTIMONIAL_EN,
  useLanguage,
} from "@/lib/i18n";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const PILLAR_ICONS = {
  award: Award,
  badgePercent: BadgePercent,
  truck: Truck,
};

const AVATAR_BG_FALLBACKS = [
  "bg-brand-red",
  "bg-brand-orange",
  "bg-brand-dark",
  "bg-emerald-800",
];

function QuoteGlyph({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`w-5 h-5 sm:w-6 sm:h-6 text-brand-orange/35 shrink-0 ${flip ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path d="M11 7H5.5C4.1 7 3 8.1 3 9.5V15C3 16.4 4.1 17.5 5.5 17.5H8.5C9.9 17.5 11 16.4 11 15V12.5C11 11.1 9.9 10 8.5 10H6.5V9.5C6.5 8.9 6.9 8.5 7.5 8.5H11V7ZM21 7H15.5C14.1 7 13 8.1 13 9.5V15C13 16.4 14.1 17.5 15.5 17.5H18.5C19.9 17.5 21 16.4 21 15V12.5C21 11.1 19.9 10 18.5 10H16.5V9.5C16.5 8.9 16.9 8.5 17.5 8.5H21V7Z" />
    </svg>
  );
}

interface HomeClientProps {
  liveOpeningHoursWeekday?: string;
  liveOpeningHoursSunday?: string;
}

export function HomeClient({
  liveOpeningHoursWeekday,
  liveOpeningHoursSunday,
}: HomeClientProps = {}) {
  const { isEn, tx } = useLanguage();
  const [selectedFlyer, setSelectedFlyer] = useState<FlyerItem | null>(null);
  const featuredStore = STORES_COLLECTION[0];
  const displayCategories = CATEGORIES_COLLECTION;

  return (
    <div className="min-h-screen bg-brand-soft overflow-x-clip">
      {/* ================================================================= */}
      {/* SECTION 1: HERO SECTION (Skenario A — Full-Bleed Seamless Blend)  */}
      {/* ================================================================= */}
      <section className="relative bg-brand-soft md:min-h-[490px] lg:min-h-[540px] flex flex-col justify-center overflow-x-clip">
        {/* Desktop Full-Bleed Right Store Canvas with Seamless Left Scrim (tokomama.com pattern) */}
        <div
          aria-hidden="true"
          className="hidden md:block absolute inset-y-0 right-0 w-[68%] lg:w-[64%] overflow-hidden pointer-events-none"
        >
          <MediaImage
            src={STORE_INFO.heroImage}
            alt="Suasana Rak Camilan & Kemplang Gantung Asli Toko Amen Snack Sungailiat Bangka"
            fill
            priority
            sizes="(min-width: 1024px) 64vw, 68vw"
            className="object-cover object-[72%_center]"
          />
          <div className="hero-scrim-desktop absolute inset-0" />
        </div>

        {/* Mobile Full-Bleed Top Store Canvas with Soft Bottom Fade */}
        <div className="md:hidden relative w-full h-[265px] sm:h-[320px] overflow-hidden">
          <MediaImage
            src={STORE_INFO.heroImage}
            alt="Suasana Rak Camilan & Kemplang Gantung Asli Toko Amen Snack Sungailiat Bangka"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div aria-hidden="true" className="hero-scrim-mobile absolute inset-0" />
        </div>

        {/* Foreground Content Column (Matches tokomama.com left text / mobile bottom layout) */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[10%] -mt-7 sm:-mt-8 md:mt-0 pb-8 md:py-16">
          <div className="md:w-[56%] lg:w-[52%] text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-slate-200/80 shadow-sm px-3.5 py-1.5 text-[11px] sm:text-xs font-semibold text-brand-red mb-2.5 sm:mb-4 whitespace-nowrap">
              <Store className="w-3.5 h-3.5 shrink-0" />
              <span>{tx(`Sejak ${STORE_INFO.foundedDate}`, `Est. ${FOUNDED_DATE_EN}`)}</span>
            </span>

            <h1 className="font-inter font-extrabold text-[27px] sm:text-4xl lg:text-[42px] xl:text-[48px] leading-[1.16] lg:leading-[1.14] tracking-tight text-gray-900">
              {tx(
                <>
                  Oleh-Oleh <span className="text-brand-red">KHAS</span>
                  <br />
                  Bangka Terlengkap
                </>,
                <>
                  Authentic <span className="text-brand-red">BANGKA</span>
                  <br />
                  Souvenirs &amp; Snacks
                </>
              )}
            </h1>

            <p className="mt-2.5 sm:mt-5 text-[13px] sm:text-base lg:text-lg text-gray-700 leading-relaxed max-w-xl mx-auto md:mx-0 px-2 sm:px-0">
              {tx(
                STORE_INFO.heroSubtitle,
                "Discover crispy Grilled Kemplang, Getas Bangka AMS, Kericu Telor Cumi AMS, Terasi Bangka AMS, and exclusive Bangka Island treats — fresh daily at honest prices!"
              )}
            </p>

            {/* Mobile: compact 2-row stack (matching tokomama.com height); Desktop: 1 row */}
            <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row sm:flex-wrap xl:flex-nowrap items-center justify-center md:justify-start gap-2 sm:gap-3">
              <a
                href="#katalog"
                className="w-full max-w-[330px] sm:w-auto sm:max-w-none inline-flex items-center justify-center bg-brand-red hover:bg-brand-red-dark text-white font-semibold rounded-lg sm:rounded-xl px-4 xl:px-5 h-11 sm:h-12 shadow-md shadow-indigo-950/15 text-xs xl:text-sm whitespace-nowrap transition-colors"
              >
                <span>{tx("Lihat Katalog Produk", "Browse Product Catalog")}</span>
                <ArrowRight className="w-4 h-4 ml-1.5 shrink-0" />
              </a>

              <div className="grid grid-cols-2 sm:contents gap-2 w-full max-w-[330px] sm:w-auto">
                <a
                  href={STORE_INFO.shopeeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 bg-[#EE4D2D] hover:bg-[#d93d1f] text-white font-semibold rounded-lg sm:rounded-xl px-3 sm:px-4 xl:px-5 h-11 sm:h-12 shadow-sm text-xs xl:text-sm whitespace-nowrap transition-colors"
                >
                  <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span>{tx("Shopee Resmi", "Official Shopee")}</span>
                </a>

                <a
                  href={STORE_INFO.whatsappDirectCta}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-brand-soft text-brand-red border-2 border-brand-red font-semibold rounded-lg sm:rounded-xl px-3 sm:px-4 xl:px-5 h-11 sm:h-12 text-xs xl:text-sm whitespace-nowrap transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 2: REAL STORE SHELF STRIP + OVERLAPPING ROUNDED WHITE     */}
      {/* SHEET + PROMO FLYER EMBLA CAROUSEL (1:1 tokomama.com Signature)   */}
      {/* ================================================================= */}
      <section className="relative bg-brand-soft pt-16 sm:pt-24 md:pt-32 overflow-x-clip">
        {/* Panoramic Store Shelf & Price Tag Strip matching tokomama.com */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-24 sm:h-36 md:h-44 opacity-95 overflow-hidden border-y border-slate-200/80"
        >
          <MediaImage
            src="/images/banners/watermark-pattern.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-top"
          />
        </div>

        {/* Rounded White Overlapping Container Sheet */}
        <div className="relative z-10 bg-white rounded-t-[28px] sm:rounded-t-[40px] pt-7 sm:pt-14 pb-9 sm:pb-14 shadow-[0_-10px_35px_rgba(15,23,42,0.08)]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[10%]">
            <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-2.5 sm:gap-4 mb-6 sm:mb-8 text-center sm:text-left">
              <div>
                <h2 className="font-inter font-bold text-2xl sm:text-3xl lg:text-4xl text-gray-900">
                  {tx("Promo & Produk Unggulan", "Featured Promos & Highlights")}
                </h2>
                <p className="text-xs sm:text-base text-gray-600 mt-1.5">
                  {tx(
                    "Cek penawaran spesial produk unggulan AMS dan layanan kirim seluruh Indonesia.",
                    "Explore special direct-packed AMS offers and nationwide souvenir shipping across Indonesia."
                  )}
                </p>
              </div>
              <Link
                href="/katalog"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-red hover:text-brand-red-dark transition-colors shrink-0"
              >
                <span>{tx("Lihat Semua Katalog", "View All Promos")}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Promo Carousel Slider */}
            <Carousel
              opts={{ align: "center", loop: true }}
              showDots
              className="w-full"
            >
              <CarouselContent>
                {FLYERS_COLLECTION.map((flyer) => {
                  const enFlyer = isEn ? FLYER_EN[flyer.id] : undefined;
                  return (
                  <CarouselItem
                    key={flyer.id}
                    className="basis-full md:basis-[85%] lg:basis-[78%]"
                  >
                    <div
                      onClick={() => setSelectedFlyer(flyer)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedFlyer(flyer);
                        }
                      }}
                      className="group relative w-full rounded-2xl overflow-hidden bg-brand-soft border border-slate-200/80 shadow-sm cursor-pointer"
                    >
                      <div className="relative w-full aspect-[16/10] overflow-hidden bg-brand-soft">
                        <MediaImage
                          src={flyer.imageUrl}
                          alt={flyer.alt}
                          fill
                          sizes="(min-width: 1024px) 75vw, 95vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                        <div className="hidden sm:flex absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-2 rounded-full bg-white/95 text-gray-900 px-4 py-2 text-xs font-semibold shadow-lg">
                            <ZoomIn className="w-4 h-4 text-brand-red" />
                            {tx("Perbesar Banner Promo", "Enlarge Promo Banner")}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-2 px-3.5 sm:px-4 py-2.5 sm:py-3 bg-white border-t border-slate-100">
                        <span className="font-semibold text-xs sm:text-sm text-gray-900 truncate min-w-0">
                          {enFlyer?.title ?? flyer.title}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-medium text-brand-red shrink-0">
                          <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          {enFlyer?.period ?? flyer.period}
                        </span>
                      </div>
                    </div>
                  </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:inline-flex left-3" />
              <CarouselNext className="hidden sm:inline-flex right-3" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 3: 5-COL PRODUCT SHOWCASE & 6-CATEGORY 3x2 GRID           */}
      {/* ================================================================= */}
      <section id="katalog" className="bg-white pb-12 sm:pb-16 scroll-mt-24 overflow-x-clip">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[10%]">
          {/* Part 3A: Featured Products Horizontal Carousel (2 cols visible on Mobile like tokomama.com!) */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-2.5 sm:gap-4 mb-6 sm:mb-8 text-center sm:text-left">
            <div>
              <h2 className="font-inter font-bold text-2xl sm:text-3xl lg:text-4xl text-gray-900">
                {tx("Oleh-Oleh & Camilan Terlaris", "Bestselling Souvenirs & Snacks")}
              </h2>
              <p className="text-xs sm:text-base text-gray-600 mt-1.5">
                {tx(
                  "Pilihan produk favorit keluarga dan wisatawan khas Pulau Bangka.",
                  "Top picks loved by families and travelers visiting Bangka Island."
                )}
              </p>
            </div>
            <div className="flex items-center justify-center sm:justify-end gap-4 shrink-0">
              <a
                href={STORE_INFO.shopeeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#EE4D2D] hover:text-[#d93d1f] transition-colors"
              >
                <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                <span>Shopee amensnack</span>
              </a>
              <Link
                href="/produk"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-red hover:text-brand-red-dark transition-colors"
              >
                <span>{tx("Lihat Semua Produk", "View All Products")}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <Carousel
            opts={{ align: "start", loop: true }}
            showDots
            className="w-full"
          >
            <CarouselContent>
              {PRODUCTS_COLLECTION.map((product) => {
                const enProd = isEn ? PRODUCT_EN[product.id] : undefined;
                return (
                <CarouselItem
                  key={product.id}
                  className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                >
                  <div className="group flex flex-col rounded-2xl bg-white border border-gray-100 brand-card card-contain overflow-hidden transition-shadow duration-150 h-full">
                    <Link
                      href={`/produk?kategori=${product.categorySlug}`}
                      className="block flex-1"
                    >
                      <div className="relative aspect-square bg-slate-50 overflow-hidden">
                        <MediaImage
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          sizes="(min-width: 1024px) 20vw, 45vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-3 sm:p-3.5 pb-1">
                        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-brand-red block truncate">
                          {enProd?.badge ?? product.badge}
                        </span>
                        <h3 className="font-semibold text-xs sm:text-sm text-gray-900 line-clamp-2 mt-1 min-h-[34px] sm:min-h-[40px]">
                          {product.name}
                        </h3>
                      </div>
                    </Link>
                    <div className="px-3 sm:px-3.5 pb-3 sm:pb-3.5 pt-1.5 flex items-center justify-between gap-2">
                      <p className="text-xs font-bold text-gray-800">
                        {product.formattedPrice}
                      </p>
                      <a
                        href={product.shopeeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={tx(`Beli ${product.name} di Shopee`, `Buy ${product.name} on Shopee`)}
                        className="inline-flex items-center gap-1 rounded-lg bg-orange-50 hover:bg-[#EE4D2D] text-[#EE4D2D] hover:text-white border border-[#EE4D2D]/25 px-2.5 py-1 text-[10px] font-bold transition-colors shrink-0"
                      >
                        <ShoppingBag className="w-3 h-3 shrink-0" />
                        <span>Shopee</span>
                      </a>
                    </div>
                  </div>
                </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="hidden md:inline-flex -left-4" />
            <CarouselNext className="hidden md:inline-flex -right-4" />
          </Carousel>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 3B: KATEGORI PRODUK PILIHAN (White Photo Cards on Soft    */}
      {/* Tinted Band — matching tokomama.com Mobile 2x3 & Desktop 3x2)     */}
      {/* ================================================================= */}
      <section id="kategori" className="bg-brand-soft py-12 sm:py-16 scroll-mt-24 overflow-x-clip">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[10%]">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-9">
            <h2 className="font-inter font-bold text-2xl sm:text-3xl lg:text-4xl text-brand-red">
              {tx("Kategori Produk Pilihan", "Featured Product Categories")}
            </h2>
            <p className="text-xs sm:text-base text-gray-600 mt-1.5">
              {tx(
                "Lengkap! Semua oleh-oleh khas Bangka Belitung ada di Toko Amen Snack.",
                "Complete selection! Find every Bangka Belitung souvenir at Toko Amen Snack."
              )}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
            {displayCategories.map((cat) => {
              const enCat = isEn ? CATEGORY_EN[cat.slug] : undefined;
              return (
              <Link
                key={cat.id}
                href={`/produk?kategori=${cat.slug}`}
                className="group rounded-2xl border border-slate-200/70 bg-white hover:border-brand-red/30 p-3.5 sm:p-6 transition-colors brand-card card-contain flex flex-col items-center text-center gap-3 sm:gap-4"
              >
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-xl overflow-hidden bg-slate-50 shrink-0">
                  <MediaImage
                    src={cat.imageUrl}
                    alt={enCat?.title ?? cat.title}
                    fill
                    sizes="(min-width: 768px) 160px, 120px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="font-inter font-bold text-[13px] sm:text-base text-brand-red group-hover:text-brand-red-dark transition-colors leading-snug">
                    {enCat?.title ?? cat.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-gray-600 mt-1 line-clamp-2 leading-relaxed">
                    {enCat?.description ?? cat.description}
                  </p>
                </div>
              </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 4: SIGNATURE OVERLAPPING FULL-BLEED TESTIMONIALS BAND     */}
      {/* (overflow-x-clip keeps vertical -mb overlap without side scroll)  */}
      {/* ================================================================= */}
      <section className="relative bg-brand-red border-t-[3px] border-brand-orange pt-11 sm:pt-14 pb-8 overflow-x-clip">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[10%]">
          <div className="text-center text-white max-w-2xl mx-auto">
            <h2 className="font-inter font-bold text-2xl sm:text-3xl lg:text-4xl">
              {tx("Kata Pelanggan & Wisatawan", "What Customers & Travelers Say")}
            </h2>
            <p className="mt-2 sm:mt-2.5 text-xs sm:text-base text-white/90">
              {tx("Dipercaya wisatawan dan pelanggan online dengan reputasi", "Trusted by travelers and online shoppers with a")}{" "}
              <strong className="text-white">
                {STORE_INFO.rating}★ ({STORE_INFO.reviewCount}+ {tx("ulasan Google Maps", "Google Maps reviews")})
              </strong>
              .
            </p>
          </div>

          <div className="relative z-20 -mb-24 sm:-mb-28 md:-mb-36 mt-7 sm:mt-10">
            <Carousel
              opts={{ align: "start", loop: true }}
              showDots
              dotVariant="light"
              dotsClassName="mt-4 sm:mt-5"
            >
              <CarouselContent>
                {TESTIMONIALS_COLLECTION.map((testi, testiIdx) => {
                  const enTesti = isEn ? TESTIMONIAL_EN[testi.id] : undefined;
                  return (
                  <CarouselItem
                    key={testi.id}
                    className="basis-[82%] sm:basis-1/2 lg:basis-1/3"
                  >
                    <Card className="brand-card bg-white rounded-2xl p-5 sm:p-6 flex flex-col justify-between h-full border border-slate-200 shadow-lg text-center">
                      <div>
                        {/* Centered Rounded-2xl Avatar + Customer Name matching tokomama.com */}
                        <div className="flex flex-col items-center mb-3 sm:mb-4">
                          <div
                            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${
                              AVATAR_BG_FALLBACKS[testiIdx % AVATAR_BG_FALLBACKS.length]
                            } text-white font-extrabold text-base sm:text-lg flex items-center justify-center shrink-0 shadow-md`}
                          >
                            {testi.avatarInitials}
                          </div>
                          <div className="font-bold text-sm sm:text-base text-gray-900 mt-2.5">
                            {testi.name}
                          </div>
                          <div className="text-[11px] font-medium text-brand-red mt-0.5">
                            {enTesti?.role ?? testi.role}
                          </div>
                        </div>

                        {/* Non-italic Quote Framed cleanly by Top-Left & Bottom-Right Quote Marks */}
                        <div className="space-y-1 text-left">
                          <QuoteGlyph />
                          <p className="text-[13px] sm:text-sm text-gray-600 leading-relaxed text-center px-2">
                            {enTesti?.quote ?? testi.quote}
                          </p>
                          <div className="flex justify-end">
                            <QuoteGlyph flip />
                          </div>
                        </div>
                      </div>

                      {/* Centered 5 Gold Stars at Bottom matching tokomama.com */}
                      <div className="pt-3 mt-2 flex items-center justify-center gap-1">
                        {Array.from({ length: testi.rating }).map((_, idx) => (
                          <Star
                            key={idx}
                            className="h-4 w-4 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>
                    </Card>
                  </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="hidden md:inline-flex -left-4" />
              <CarouselNext className="hidden md:inline-flex -right-4" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 5: VALUE PILLARS & 3 PROPOSITION BANNERS                  */}
      {/* (Open clean pillars on Mobile & Desktop matching tokomama.com)    */}
      {/* ================================================================= */}
      <section
        id="keunggulan"
        className="relative z-10 bg-white pt-32 sm:pt-36 md:pt-48 pb-10 sm:pb-16 scroll-mt-24 overflow-x-clip"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[10%]">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <h2 className="font-inter font-bold text-2xl sm:text-3xl lg:text-4xl text-brand-red">
              {tx("Mengapa Belanja di Toko Amen Snack?", "Why Shop at Toko Amen Snack?")}
            </h2>
            <p className="text-xs sm:text-base text-gray-600 mt-1.5 sm:mt-2">
              {tx(
                "Tiga pilar komitmen kami menjaga kualitas oleh-oleh khas Bangka untuk keluarga Anda.",
                "Three core pillars behind our authentic Bangka flavors and service."
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {VALUE_PILLARS.map((pillar, idx) => {
              const Icon = PILLAR_ICONS[pillar.iconName];
              const enPillar = isEn ? PILLAR_EN[pillar.id] : undefined;
              return (
                <div
                  key={pillar.id}
                  className="bg-transparent px-1 sm:p-2 md:p-3 flex flex-row md:flex-col items-start md:items-center text-left md:text-center gap-4 md:gap-0"
                >
                  <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-2xl bg-brand-soft shadow-sm border border-slate-100 flex items-center justify-center shrink-0 md:mb-5">
                    <Icon
                      className={`w-8 h-8 md:w-10 md:h-10 ${
                        idx % 2 === 0 ? "text-brand-red" : "text-brand-orange"
                      }`}
                    />
                  </div>
                  <div className="min-w-0 max-w-xs">
                    <h3 className="font-inter font-bold text-base sm:text-lg text-gray-900 mb-1 sm:mb-2">
                      {enPillar?.title ?? pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {enPillar?.description ?? pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Proposition Banners: Horizontal Swipe Peek Carousel matching tokomama.com */}
          <div className="md:hidden mt-8">
            <Carousel opts={{ align: "start", loop: true }} showDots className="w-full">
              <CarouselContent>
                {PROPOSITION_BANNERS.map((banner) => (
                  <CarouselItem key={banner.id} className="basis-[85%]">
                    <Link
                      href={banner.href}
                      className="group relative aspect-[16/10] rounded-2xl overflow-hidden bg-white border border-slate-200/80 brand-card block"
                    >
                      <MediaImage
                        src={banner.imageUrl}
                        alt={banner.alt}
                        fill
                        sizes="85vw"
                        className="object-cover"
                      />
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          {/* Desktop Proposition Banners: Exact 3-Column Grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-5 mt-10">
            {PROPOSITION_BANNERS.map((banner) => (
              <Link
                key={banner.id}
                href={banner.href}
                className="group relative aspect-[16/10] rounded-2xl overflow-hidden bg-white border border-slate-200/80 brand-card block"
              >
                <MediaImage
                  src={banner.imageUrl}
                  alt={banner.alt}
                  fill
                  sizes="33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 6: STORE LOCATION SECTION (#lokasi)                       */}
      {/* ================================================================= */}
      <section id="lokasi" className="bg-white py-12 sm:py-16 scroll-mt-24 overflow-x-clip">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[10%]">
          <div className="text-center max-w-2xl mx-auto mb-7 sm:mb-10">
            <h2 className="font-inter font-bold text-2xl sm:text-3xl lg:text-4xl text-gray-900">
              {tx("Kunjungi Toko Fisik Kami", "Visit Our Physical Store")}
            </h2>
            <p className="text-xs sm:text-base text-gray-600 mt-1.5 sm:mt-2">
              {tx(
                "Temukan Toko Amen Snack di pusat kota Sungailiat, Bangka Belitung!",
                "Find Toko Amen Snack right in downtown Sungailiat, Bangka Belitung!"
              )}
            </p>
          </div>

          {featuredStore && (
            <div className="max-w-5xl mx-auto brand-card rounded-2xl overflow-hidden border border-gray-100 bg-brand-soft/35 grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {(featuredStore.galleryImages?.[1]?.url || featuredStore.imageUrl) && (
                <div className="lg:col-span-6 relative aspect-[3/2] lg:aspect-auto lg:min-h-[340px] bg-slate-100 overflow-hidden">
                  <MediaImage
                    src={featuredStore.galleryImages?.[1]?.url || featuredStore.imageUrl!}
                    alt={`${featuredStore.name} — Area Kasir & Stok Kemplang Khas Bangka`}
                    fallbackLabel={featuredStore.name}
                    fill
                    sizes="(min-width: 1024px) 520px, 100vw"
                    className="object-cover object-center"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/60 to-transparent" />
                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-gray-900 shadow-sm">
                    <Store className="w-3.5 h-3.5 text-brand-red shrink-0" />
                    <span>{tx("Area Kasir & Stok Toko Sungailiat", "Sungailiat Store & Cashier Counter")}</span>
                  </span>
                </div>
              )}

              <div
                className={`${
                  featuredStore.imageUrl ? "lg:col-span-6" : "lg:col-span-12"
                } p-5 sm:p-8 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="inline-block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-brand-red bg-white px-2.5 py-1 rounded-md border border-slate-200">
                      {tx(featuredStore.branchCode, "SUNGAILIAT FLAGSHIP")}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {STORE_INFO.rating}★ ({STORE_INFO.reviewCount}+ {tx("Ulasan", "Reviews")})
                    </span>
                  </div>

                  <h3 className="font-inter font-bold text-base sm:text-xl text-gray-900">
                    {featuredStore.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 mt-2.5 leading-relaxed flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                    <span className="min-w-0 break-words">{featuredStore.address}</span>
                  </p>

                  <div className="mt-3.5 space-y-1.5 sm:space-y-2 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-brand-red shrink-0" />
                      <span className="font-semibold text-gray-900">
                        {featuredStore.phone}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
                      <span>
                        {liveOpeningHoursWeekday && liveOpeningHoursSunday
                          ? `${liveOpeningHoursWeekday} • ${liveOpeningHoursSunday}`
                          : `${tx("Senin – Sabtu", "Mon – Sat")} (${featuredStore.openingHoursWeekday}) • ${tx("Minggu", "Sun")} (${featuredStore.openingHoursSunday})`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Clean Side-by-Side Action Buttons Inside Card */}
                <div className="mt-5 sm:mt-6 pt-4 border-t border-slate-200/80 grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5">
                  <a
                    href={featuredStore.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg sm:rounded-xl bg-brand-red hover:bg-brand-red-dark text-white px-3.5 py-2.5 text-xs font-semibold transition-colors shadow-sm whitespace-nowrap"
                  >
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>Google Maps</span>
                  </a>
                  <a
                    href={featuredStore.wazeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg sm:rounded-xl bg-white hover:bg-brand-soft text-brand-red border border-brand-red px-3.5 py-2.5 text-xs font-semibold transition-colors whitespace-nowrap"
                  >
                    <Navigation className="w-3.5 h-3.5 shrink-0" />
                    <span>{tx("Navigasi Waze", "Waze Route")}</span>
                  </a>
                  <a
                    href={STORE_INFO.whatsappDirectCta}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="col-span-2 sm:col-span-1 sm:ml-auto inline-flex items-center justify-center gap-1.5 rounded-lg sm:rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white px-3.5 py-2.5 text-xs font-semibold transition-colors shadow-sm whitespace-nowrap"
                  >
                    <WhatsAppIcon className="w-4 h-4 shrink-0" />
                    <span>{tx("WhatsApp Toko", "Store WhatsApp")}</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          <div className="mt-7 sm:mt-10 flex justify-center">
            <Link
              href="/lokasi"
              className="inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white rounded-lg sm:rounded-xl px-7 h-11 sm:h-12 font-semibold text-xs sm:text-sm shadow-md shadow-indigo-950/15 transition-colors"
            >
              <span>{tx("Lihat Detail Lokasi & Peta", "Store Location & Map Details")}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 7: BLOG & CULINARY ARTICLES CAROUSEL                      */}
      {/* ================================================================= */}
      <section className="bg-brand-soft py-12 sm:py-16 overflow-x-clip">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[10%]">
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-2.5 sm:gap-4 mb-6 sm:mb-8 text-center sm:text-left">
            <div>
              <h2 className="font-inter font-bold text-2xl sm:text-3xl lg:text-4xl text-brand-red">
                {tx("Cerita & Kuliner Khas Bangka", "Bangka Culinary Stories")}
              </h2>
              <p className="text-xs sm:text-base text-gray-600 mt-1.5">
                {tx(
                  "Panduan memilih kemplang asli, rekomendasi wisata kuliner Sungailiat, dan tips pengiriman.",
                  "Guides to authentic kemplang crackers, Sungailiat treats, and travel packing tips."
                )}
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-red hover:text-brand-red-dark transition-colors shrink-0"
            >
              <span>{tx("Baca Semua Artikel", "Read All Articles")}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <Carousel
            opts={{ align: "start", loop: true }}
            showDots
            className="w-full"
          >
            <CarouselContent>
              {BLOGS_COLLECTION.map((post) => {
                const enPost = isEn ? BLOG_EN[post.id] : undefined;
                return (
                <CarouselItem
                  key={post.id}
                  className="basis-[54%] sm:basis-1/2 md:basis-1/3"
                >
                  <Link
                    href={`/blog#${post.slug}`}
                    className="group block brand-card rounded-2xl overflow-hidden bg-white h-full flex flex-col"
                  >
                    <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                      <MediaImage
                        src={post.imageUrl}
                        alt={enPost?.title ?? post.title}
                        fill
                        sizes="(min-width: 768px) 33vw, 55vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] sm:text-xs font-medium text-brand-orange block truncate">
                          {enPost?.category ?? post.category} &bull; {enPost?.readTime ?? post.readTime}
                        </span>
                        <h3 className="font-inter font-bold text-xs sm:text-lg text-gray-900 mt-1 sm:mt-2 line-clamp-2 group-hover:text-brand-red transition-colors">
                          {enPost?.title ?? post.title}
                        </h3>
                        <p className="hidden sm:line-clamp-2 text-xs sm:text-sm text-gray-600 mt-2">
                          {enPost?.excerpt ?? post.excerpt}
                        </p>
                      </div>
                      <span className="mt-2 sm:mt-4 inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-brand-red">
                        {tx("Baca", "Read")} <span className="hidden sm:inline">{tx("selengkapnya", "more")}</span> <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </span>
                    </div>
                  </Link>
                </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="hidden md:inline-flex -left-4" />
            <CarouselNext className="hidden md:inline-flex -right-4" />
          </Carousel>
        </div>
      </section>

      {/* ================================================================= */}
      {/* FLYER LIGHTBOX MODAL                                              */}
      {/* ================================================================= */}
      {selectedFlyer && (() => {
        const enFlyer = isEn ? FLYER_EN[selectedFlyer.id] : undefined;
        return (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedFlyer(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-3.5 border-b border-gray-100">
              <div className="min-w-0 pr-2">
                <h3 className="font-bold text-sm sm:text-base text-gray-900 truncate">
                  {enFlyer?.title ?? selectedFlyer.title}
                </h3>
                <span className="text-[11px] sm:text-xs text-gray-500">
                  {enFlyer?.badge ?? selectedFlyer.badge} &bull; {enFlyer?.period ?? selectedFlyer.period}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedFlyer(null)}
                aria-label={tx("Tutup", "Close")}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="relative w-full aspect-[16/10] bg-gray-100">
              <MediaImage
                src={selectedFlyer.imageUrl}
                alt={selectedFlyer.alt}
                fill
                className="object-contain"
              />
            </div>
            <div className="px-4 sm:px-5 py-3.5 sm:py-4 bg-white border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-xs sm:text-sm text-gray-600">
                {enFlyer?.description ?? selectedFlyer.description}
              </p>
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                {selectedFlyer.isExternal ? (
                  <a
                    href={selectedFlyer.ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#EE4D2D] hover:bg-[#d93d1f] px-4 py-2.5 text-xs font-bold text-white transition-colors"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" />
                    {enFlyer?.ctaLabel ?? selectedFlyer.ctaLabel}
                  </a>
                ) : (
                  <Link
                    href={selectedFlyer.ctaHref}
                    onClick={() => setSelectedFlyer(null)}
                    className="inline-flex items-center justify-center gap-1.5 rounded-full border border-brand-red/30 text-brand-red hover:bg-brand-soft px-4 py-2.5 text-xs font-bold transition-colors"
                  >
                    {enFlyer?.ctaLabel ?? selectedFlyer.ctaLabel}
                  </Link>
                )}
                <a
                  href={STORE_INFO.whatsappDirectCta}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#20bd5a]"
                >
                  <WhatsAppIcon className="h-4 w-4 shrink-0" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        );
      })()}
    </div>
  );
}
