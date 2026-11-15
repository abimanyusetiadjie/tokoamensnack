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
import { CategoryIcon } from "@/components/CategoryIcon";
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
  "bg-brand-red-dark",
];

function QuoteGlyph({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`w-6 h-6 text-brand-orange/35 shrink-0 ${flip ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path d="M11 7H5.5C4.1 7 3 8.1 3 9.5V15C3 16.4 4.1 17.5 5.5 17.5H8.5C9.9 17.5 11 16.4 11 15V12.5C11 11.1 9.9 10 8.5 10H6.5V9.5C6.5 8.9 6.9 8.5 7.5 8.5H11V7ZM21 7H15.5C14.1 7 13 8.1 13 9.5V15C13 16.4 14.1 17.5 15.5 17.5H18.5C19.9 17.5 21 16.4 21 15V12.5C21 11.1 19.9 10 18.5 10H16.5V9.5C16.5 8.9 16.9 8.5 17.5 8.5H21V7Z" />
    </svg>
  );
}

export function HomeClient() {
  const [selectedFlyer, setSelectedFlyer] = useState<FlyerItem | null>(null);
  const featuredStore = STORES_COLLECTION[0];

  return (
    <div className="min-h-screen bg-brand-soft overflow-x-hidden">
      {/* ================================================================= */}
      {/* SECTION 1: HERO SECTION (1:1 tokomama.com Split Layout)           */}
      {/* ================================================================= */}
      <section className="relative bg-brand-soft pt-8 pb-12 md:py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[10%] grid grid-cols-1 md:grid-cols-12 items-center gap-8 lg:gap-12">
          {/* Left Content Column */}
          <div className="md:col-span-6 text-center md:text-left order-2 md:order-1">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-red/10 px-3.5 py-1.5 text-xs font-semibold text-brand-red mb-4">
              <Store className="w-3.5 h-3.5 shrink-0" />
              <span>
                Sisparnas Kemenpar &bull; Rating {STORE_INFO.rating}★ Google Maps
              </span>
            </span>

            <h1 className="font-inter font-extrabold text-3xl sm:text-4xl lg:text-[42px] xl:text-[48px] leading-[1.18] sm:leading-[1.16] lg:leading-[1.14] tracking-tight text-gray-900">
              Oleh-Oleh <span className="text-brand-red">KHAS</span>
              <br />
              Bangka Terlengkap
            </h1>

            <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed max-w-xl mx-auto md:mx-0">
              {STORE_INFO.heroSubtitle}
            </p>

            {/* Primary & Secondary Action Pills */}
            <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3.5 sm:gap-4">
              <a
                href="#katalog"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-brand-red hover:bg-brand-red-dark text-white font-semibold rounded-full px-7 h-12 shadow-md shadow-rose-500/20 text-sm sm:text-base transition-colors"
              >
                <span>Lihat Katalog Produk</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </a>

              <a
                href={STORE_INFO.whatsappDirectCta}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-white hover:bg-rose-50 text-brand-red border-2 border-brand-red font-semibold rounded-full px-7 h-12 text-sm sm:text-base transition-colors"
              >
                <span>Hubungi Kami</span>
              </a>
            </div>
          </div>

          {/* Right Borderless Unboxed Illustration */}
          <div className="md:col-span-6 order-1 md:order-2 flex justify-center">
            <div className="relative w-full aspect-[4/3] max-h-[440px]">
              <MediaImage
                src="/images/hero/toko-amen-hero.webp"
                alt="Etalase Produk Oleh-Oleh Khas Bangka Toko Amen Snack Sungailiat"
                fill
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-contain object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 2: WATERMARK STRIP + OVERLAPPING ROUNDED WHITE SHEET      */}
      {/* + PROMO FLYER EMBLA CAROUSEL (1:1 Template Signature)             */}
      {/* ================================================================= */}
      <section className="relative bg-brand-soft pt-12 sm:pt-14">
        {/* Subtle Repeated Vector Monogram Watermark Strip */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-32 opacity-30 overflow-hidden"
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
        <div className="relative z-10 bg-white rounded-t-[32px] pt-12 sm:pt-14 pb-14 shadow-[0_-8px_30px_rgba(0,0,0,0.03)]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[10%]">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <h2 className="font-inter font-bold text-2xl sm:text-3xl lg:text-4xl text-gray-900">
                  Promo &amp; Produk Unggulan
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mt-1.5">
                  Cek penawaran spesial produk Cap AMEN dan layanan kirim seluruh Indonesia.
                </p>
              </div>
              <Link
                href="/katalog"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-red hover:text-brand-red-dark transition-colors shrink-0"
              >
                <span>Lihat Semua Katalog</span>
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
                {FLYERS_COLLECTION.map((flyer) => (
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
                      className="group relative w-full rounded-2xl overflow-hidden bg-brand-soft border border-rose-100 shadow-sm cursor-pointer"
                    >
                      <div className="relative w-full aspect-[16/9] overflow-hidden bg-brand-soft">
                        <MediaImage
                          src={flyer.imageUrl}
                          alt={flyer.alt}
                          fill
                          sizes="(min-width: 1024px) 75vw, 95vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-2 rounded-full bg-white/95 text-gray-900 px-4 py-2 text-xs font-semibold shadow-lg">
                            <ZoomIn className="w-4 h-4 text-brand-red" />
                            Perbesar Banner Promo
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-rose-50">
                        <span className="font-semibold text-sm text-gray-900 truncate">
                          {flyer.title}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-brand-red shrink-0 ml-2">
                          <Calendar className="w-3.5 h-3.5" />
                          {flyer.period}
                        </span>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
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
      <section id="katalog" className="bg-white pb-16 scroll-mt-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[10%]">
          {/* Part 3A: Featured Products Horizontal Carousel */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="font-inter font-bold text-2xl sm:text-3xl lg:text-4xl text-gray-900">
                Oleh-Oleh &amp; Camilan Terlaris
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mt-1.5">
                Pilihan produk favorit keluarga dan wisatawan khas Pulau Bangka.
              </p>
            </div>
            <Link
              href="/produk"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-red hover:text-brand-red-dark transition-colors shrink-0"
            >
              <span>Jelajahi Semua Produk</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full"
          >
            <CarouselContent>
              {PRODUCTS_COLLECTION.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                >
                  <Link
                    href={`/produk?kategori=${product.categorySlug}`}
                    className="group block rounded-2xl bg-white border border-gray-100 brand-card overflow-hidden transition-all hover:-translate-y-1"
                  >
                    <div className="relative aspect-square bg-[#fafaf8] overflow-hidden">
                      <MediaImage
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        sizes="(min-width: 1024px) 20vw, 45vw"
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-red">
                        {product.badge}
                      </span>
                      <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 mt-1 min-h-[40px]">
                        {product.name}
                      </h3>
                      <p className="text-xs font-bold text-gray-700 mt-2">
                        {product.formattedPrice}
                      </p>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:inline-flex -left-4" />
            <CarouselNext className="hidden md:inline-flex -right-4" />
          </Carousel>

          {/* Part 3B: 6-Category 3x2 Tinted Grid with Square White Frames */}
          <div id="kategori" className="mt-16 pt-4 scroll-mt-24">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h2 className="font-inter font-bold text-2xl sm:text-3xl text-gray-900">
                Kategori Produk Pilihan
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mt-1.5">
                Semua oleh-oleh khas Bangka Belitung ada di Toko Amen Snack.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
              {CATEGORIES_COLLECTION.map((cat, idx) => (
                <Link
                  key={cat.id}
                  href={`/produk?kategori=${cat.slug}`}
                  className="group rounded-2xl border border-rose-900/5 bg-brand-soft/65 hover:bg-brand-soft p-4 sm:p-5 transition-all brand-card flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3.5 sm:gap-4"
                >
                  <div
                    className={`w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-xl bg-white p-2 shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform ${
                      idx % 2 === 0 ? "text-brand-red" : "text-brand-orange"
                    }`}
                  >
                    <CategoryIcon
                      name={cat.iconName}
                      className="w-8 h-8 sm:w-9 sm:h-9"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-inter font-bold text-sm sm:text-base text-gray-900 group-hover:text-brand-red transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 4: SIGNATURE OVERLAPPING FULL-BLEED TESTIMONIALS BAND     */}
      {/* (bg-brand-red with -mb-28 md:-mb-36 card overlap into Section 5!) */}
      {/* ================================================================= */}
      <section className="relative bg-brand-red pt-14 pb-8">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[10%]">
          <div className="text-center text-white max-w-2xl mx-auto">
            <h2 className="font-inter font-bold text-2xl sm:text-3xl lg:text-4xl">
              Kata Pelanggan &amp; Wisatawan
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-white/90">
              Dipercaya wisatawan dan pelanggan online dengan reputasi{" "}
              <strong className="text-white">
                {STORE_INFO.rating}★ ({STORE_INFO.reviewCount}+ ulasan Google Maps)
              </strong>
              .
            </p>
          </div>

          <div className="relative z-20 -mb-28 md:-mb-36 mt-10">
            <Carousel
              opts={{ align: "start", loop: true }}
              showDots
              dotVariant="light"
              dotsClassName="mt-5"
            >
              <CarouselContent>
                {TESTIMONIALS_COLLECTION.map((testi, testiIdx) => (
                  <CarouselItem
                    key={testi.id}
                    className="basis-full sm:basis-1/2 lg:basis-1/3"
                  >
                    <Card className="brand-card bg-white rounded-2xl p-6 flex flex-col justify-between h-full border border-rose-100/80 shadow-lg">
                      <div>
                        {/* Header: Circular Avatar + Name + 5 Stars directly beneath Name */}
                        <div className="flex items-center gap-3.5 mb-4">
                          <div
                            className={`w-12 h-12 rounded-full ${
                              AVATAR_BG_FALLBACKS[testiIdx % AVATAR_BG_FALLBACKS.length]
                            } text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-sm`}
                          >
                            {testi.avatarInitials}
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-base text-gray-900 truncate">
                              {testi.name}
                            </div>
                            <div className="flex items-center gap-0.5 mt-0.5">
                              {Array.from({ length: testi.rating }).map((_, idx) => (
                                <Star
                                  key={idx}
                                  className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Non-italic Quote Framed cleanly by Top-Left & Bottom-Right Quote Marks */}
                        <div className="space-y-1">
                          <QuoteGlyph />
                          <p className="text-sm text-gray-600 leading-relaxed pl-1">
                            {testi.quote}
                          </p>
                          <div className="flex justify-end">
                            <QuoteGlyph flip />
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 mt-3 border-t border-rose-50 text-xs font-medium text-brand-red truncate">
                        {testi.role}
                      </div>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:inline-flex -left-4" />
              <CarouselNext className="hidden md:inline-flex -right-4" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 5: VALUE PILLARS & 3 PROPOSITION BANNERS                  */}
      {/* (Receives overlapping -mb-28 md:-mb-36 cards with pt-36 md:pt-48!)*/}
      {/* ================================================================= */}
      <section
        id="keunggulan"
        className="relative z-10 bg-brand-soft pt-36 md:pt-48 pb-16 scroll-mt-24"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[10%]">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-inter font-bold text-2xl sm:text-3xl lg:text-4xl text-gray-900">
              Mengapa Belanja di Toko Amen Snack?
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2">
              Tiga pilar komitmen kami menjaga kualitas oleh-oleh khas Bangka untuk keluarga Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUE_PILLARS.map((pillar, idx) => {
              const Icon = PILLAR_ICONS[pillar.iconName];
              return (
                <div
                  key={pillar.id}
                  className="brand-card bg-white rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center"
                >
                  <Icon
                    className={`w-14 h-14 sm:w-16 sm:h-16 mb-4 ${
                      idx % 2 === 0 ? "text-brand-red" : "text-brand-orange"
                    }`}
                  />
                  <h3 className="font-inter font-bold text-lg text-brand-red-dark mb-2.5">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* 3 Visual Proposition Banners (1:1 tokomama.com Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
            {PROPOSITION_BANNERS.map((banner) => (
              <Link
                key={banner.id}
                href={banner.href}
                className="group relative aspect-[16/10] rounded-2xl overflow-hidden bg-white border border-rose-100 brand-card block"
              >
                <MediaImage
                  src={banner.imageUrl}
                  alt={banner.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
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
      <section id="lokasi" className="bg-white py-16 scroll-mt-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[10%]">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-inter font-bold text-2xl sm:text-3xl lg:text-4xl text-gray-900">
              Kunjungi Toko Fisik Kami
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2">
              Temukan Toko Amen Snack di pusat kota Sungailiat, Bangka Belitung!
            </p>
          </div>

          {featuredStore && (
            <div className="max-w-3xl mx-auto brand-card rounded-2xl p-6 sm:p-8 border border-gray-100 bg-brand-soft/35 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-brand-red bg-white px-2.5 py-1 rounded-md border border-rose-100">
                    {featuredStore.branchCode}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {STORE_INFO.rating}★ ({STORE_INFO.reviewCount}+ Ulasan)
                  </span>
                </div>

                <h3 className="font-inter font-bold text-lg sm:text-xl text-gray-900">
                  {featuredStore.name}
                </h3>

                <p className="text-sm text-gray-600 mt-2.5 leading-relaxed flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                  <span>{featuredStore.address}</span>
                </p>

                <div className="mt-4 space-y-2 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-brand-red shrink-0" />
                    <span className="font-semibold text-gray-900">
                      {featuredStore.phone}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                    <span>
                      Senin – Sabtu ({featuredStore.openingHoursWeekday}) &bull; Minggu ({featuredStore.openingHoursSunday})
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-rose-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href={featuredStore.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-red hover:text-brand-red-dark transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    Petunjuk Arah Google Maps
                  </a>
                  <a
                    href={featuredStore.wazeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-orange hover:text-brand-orange-dark transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    Navigasi Waze
                  </a>
                </div>
                <a
                  href={STORE_INFO.whatsappDirectCta}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Hubungi Toko
                </a>
              </div>
            </div>
          )}

          <div className="mt-10 flex justify-center">
            <Link
              href="/lokasi"
              className="inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white rounded-full px-8 h-12 font-semibold text-sm shadow-md shadow-rose-500/20 transition-colors"
            >
              <span>Lihat Detail Lokasi &amp; Peta</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 7: BLOG & CULINARY ARTICLES CAROUSEL                      */}
      {/* ================================================================= */}
      <section className="bg-brand-soft py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[10%]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="font-inter font-bold text-2xl sm:text-3xl lg:text-4xl text-gray-900">
                Cerita &amp; Kuliner Khas Bangka
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mt-1.5">
                Panduan memilih kemplang asli, rekomendasi wisata kuliner Sungailiat, dan tips pengiriman.
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-red hover:text-brand-red-dark transition-colors shrink-0"
            >
              <span>Baca Semua Artikel</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <Carousel
            opts={{ align: "start", loop: true }}
            showDots
            className="w-full"
          >
            <CarouselContent>
              {BLOGS_COLLECTION.map((post) => (
                <CarouselItem
                  key={post.id}
                  className="basis-full sm:basis-1/2 md:basis-1/3"
                >
                  <Link
                    href={`/blog#${post.slug}`}
                    className="group block brand-card rounded-2xl overflow-hidden bg-white h-full flex flex-col"
                  >
                    <div className="relative aspect-[16/10] bg-rose-50 overflow-hidden">
                      <MediaImage
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-medium text-brand-orange">
                          {post.category} &bull; {post.readTime}
                        </span>
                        <h3 className="font-inter font-bold text-base sm:text-lg text-gray-900 mt-2 line-clamp-2 group-hover:text-brand-red transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>
                      <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand-red">
                        Baca selengkapnya <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:inline-flex -left-4" />
            <CarouselNext className="hidden md:inline-flex -right-4" />
          </Carousel>
        </div>
      </section>

      {/* ================================================================= */}
      {/* FLYER LIGHTBOX MODAL                                              */}
      {/* ================================================================= */}
      {selectedFlyer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedFlyer(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
              <div>
                <h3 className="font-bold text-gray-900">
                  {selectedFlyer.title}
                </h3>
                <span className="text-xs text-gray-500">
                  {selectedFlyer.badge} &bull; {selectedFlyer.period}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedFlyer(null)}
                aria-label="Tutup"
                className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="relative w-full aspect-[16/9] bg-gray-100">
              <MediaImage
                src={selectedFlyer.imageUrl}
                alt={selectedFlyer.alt}
                fill
                className="object-contain"
              />
            </div>
            <div className="px-5 py-4 bg-white border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-xs sm:text-sm text-gray-600">
                {selectedFlyer.description}
              </p>
              <a
                href={STORE_INFO.whatsappDirectCta}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 shrink-0 rounded-full bg-brand-red px-5 py-2.5 text-xs font-bold text-white hover:bg-brand-red-dark"
              >
                <ShoppingBag className="h-4 w-4" />
                Pesan Sekarang
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
