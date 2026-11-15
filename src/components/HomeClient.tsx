"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BadgePercent,
  Clock,
  ExternalLink,
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
import { ProductCard } from "@/components/ProductCard";
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
    <div className="flex flex-col">
      {/* ================================================================= */}
      {/* SECTION 1: HERO SECTION (1:1 tokomama.com Split Grid)            */}
      {/* ================================================================= */}
      <section className="relative bg-brand-soft pt-6 pb-10 md:py-12 lg:py-14">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-8 lg:gap-12">
            {/* Left Copy & CTAs */}
            <div className="md:col-span-6 text-center md:text-left order-2 md:order-1">
              <div className="inline-flex items-center gap-2 rounded-full bg-white border border-rose-200 px-3.5 py-1.5 text-xs font-semibold text-brand-red shadow-sm mb-4">
                <Award className="h-3.5 w-3.5 text-brand-orange shrink-0" />
                <span>
                  Terdaftar di Sisparnas Kemenpar &mdash; Rating 4.5★ Google Maps
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[52px] font-extrabold text-brand-dark leading-[1.12] tracking-tight mb-4">
                Pusat Oleh-Oleh &amp; Camilan Khas{" "}
                <span className="text-brand-red">Bangka</span> Terlengkap
              </h1>

              <p className="text-sm sm:text-base text-brand-muted leading-relaxed max-w-xl mx-auto md:mx-0 mb-6">
                {STORE_INFO.heroSubtitle}
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <a
                  href="#katalog"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-red px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-brand-red-dark transition-colors"
                >
                  Lihat Katalog Produk
                  <ArrowRight className="h-4 w-4" />
                </a>

                <a
                  href={STORE_INFO.whatsappDirectCta}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-red/30 bg-white px-5 py-3 text-sm font-bold text-brand-red shadow-sm hover:bg-rose-50 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  Chat WhatsApp ({STORE_INFO.phone})
                </a>
              </div>

              {/* Trust Proof Strip */}
              <div className="mt-6 pt-5 border-t border-rose-200/70 flex flex-wrap items-center justify-center md:justify-start gap-x-5 gap-y-2 text-xs text-brand-dark/80 font-medium">
                <span className="inline-flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <strong>4.5 / 5.0</strong> (100+ Ulasan)
                </span>
                <span className="text-rose-300" aria-hidden="true">
                  &bull;
                </span>
                <span>
                  House Brand: <strong className="text-brand-red">Cap AMEN</strong>
                </span>
                <span className="text-rose-300" aria-hidden="true">
                  &bull;
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-brand-red" />
                  Jl. Muhidin No.106, Sungailiat
                </span>
              </div>
            </div>

            {/* Right Borderless Illustrated Visual */}
            <div className="md:col-span-6 order-1 md:order-2 flex justify-center items-center">
              <div className="relative w-full aspect-[4/3] max-h-[430px] rounded-3xl overflow-hidden shadow-[0_18px_45px_rgba(225,29,72,0.12)]">
                <MediaImage
                  src="/images/hero/toko-amen-hero.webp"
                  alt="Etalase Produk Oleh-Oleh Khas Bangka Toko Amen Snack Sungailiat"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 2: WATERMARK STRIP + OVERLAPPING ROUNDED WHITE SHEET      */}
      {/* + PROMO FLYER EMBLA CAROUSEL (1:1 Template Signature)             */}
      {/* ================================================================= */}
      <section className="relative bg-brand-soft pt-4">
        {/* Subtle Brand Watermark Strip behind Rounded Sheet */}
        <div
          aria-hidden="true"
          className="h-24 sm:h-28 overflow-hidden opacity-[0.16] select-none pointer-events-none flex items-center justify-around gap-8 text-brand-red font-extrabold tracking-[0.22em] text-lg sm:text-2xl uppercase whitespace-nowrap"
        >
          <span>CAP AMEN &bull; SUNGAILIAT</span>
          <span>AMEN SNACK BANGKA</span>
          <span className="hidden md:inline">KEMPLANG PANGGANG &bull; PASIR</span>
        </div>

        {/* Overlapping White Top Sheet */}
        <div className="relative z-10 -mt-10 sm:-mt-12 bg-white rounded-t-[32px] pt-10 sm:pt-14 pb-14 shadow-[0_-8px_30px_rgba(15,23,42,0.04)]">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-xl sm:text-2xl font-bold text-center text-brand-dark mb-1">
              Promo Unggulan &amp; Pengiriman Nasional
            </h2>
            <p className="text-center text-sm text-brand-muted mb-8">
              Nikmati penawaran spesial Cap AMEN atau{" "}
              <Link
                href="/katalog"
                className="text-brand-red font-semibold hover:underline"
              >
                lihat semua banner promo &rarr;
              </Link>
            </p>

            {/* Centered Embla Flyer Carousel */}
            <div className="relative px-2 sm:px-6">
              <Carousel opts={{ align: "center", loop: true }} showDots>
                <CarouselContent>
                  {FLYERS_COLLECTION.map((flyer) => (
                    <CarouselItem
                      key={flyer.id}
                      className="basis-full md:basis-[86%] lg:basis-[78%]"
                    >
                      <div className="group rounded-2xl overflow-hidden border border-rose-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() => setSelectedFlyer(flyer)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setSelectedFlyer(flyer);
                            }
                          }}
                          className="relative aspect-[16/9] cursor-pointer overflow-hidden bg-brand-soft"
                        >
                          <MediaImage
                            src={flyer.imageUrl}
                            alt={flyer.alt}
                            fill
                            sizes="(max-width: 768px) 100vw, 80vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors flex items-center justify-center">
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-1.5 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-brand-dark shadow-md">
                              <ZoomIn className="h-4 w-4 text-brand-red" />
                              Perbesar Banner
                            </span>
                          </div>
                        </div>

                        <div className="p-4 sm:p-5 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span className="inline-block rounded-full bg-brand-soft px-2.5 py-0.5 text-[11px] font-bold text-brand-red">
                                {flyer.badge}
                              </span>
                              <span className="text-xs text-brand-muted">
                                {flyer.period}
                              </span>
                            </div>
                            <h3 className="font-bold text-base sm:text-lg text-brand-dark">
                              {flyer.title}
                            </h3>
                          </div>

                          {flyer.isExternal ? (
                            <a
                              href={flyer.ctaHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-1.5 shrink-0 rounded-full bg-brand-orange px-4 py-2 text-xs font-bold text-white hover:bg-brand-orange-dark transition-colors"
                            >
                              {flyer.ctaLabel}
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          ) : (
                            <Link
                              href={flyer.ctaHref}
                              className="inline-flex items-center justify-center gap-1.5 shrink-0 rounded-full bg-brand-red px-4 py-2 text-xs font-bold text-white hover:bg-brand-red-dark transition-colors"
                            >
                              {flyer.ctaLabel}
                              <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:inline-flex" />
                <CarouselNext className="hidden sm:inline-flex" />
              </Carousel>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 3: FEATURED PRODUCTS CAROUSEL & 6-CATEGORY GRID (3x2)     */}
      {/* ================================================================= */}
      <section id="katalog" className="bg-white pb-16 scroll-mt-24">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* 3A: Featured Products Horizontal Carousel */}
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-brand-dark mb-1">
              Oleh-Oleh &amp; Camilan Terlaris
            </h2>
            <p className="text-sm text-brand-muted">
              Pilihan produk favorit keluarga dan wisatawan &mdash;{" "}
              <Link
                href="/produk"
                className="text-brand-red font-semibold hover:underline"
              >
                lihat semua katalog &amp; filter &rarr;
              </Link>
            </p>
          </div>

          <div className="relative px-2 sm:px-6">
            <Carousel opts={{ align: "start", loop: true }} showDots>
              <CarouselContent>
                {PRODUCTS_COLLECTION.map((product) => (
                  <CarouselItem
                    key={product.id}
                    className="basis-1/2 sm:basis-1/3 md:basis-1/4"
                  >
                    <ProductCard product={product} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:inline-flex" />
              <CarouselNext className="hidden sm:inline-flex" />
            </Carousel>
          </div>

          {/* 3B: 6-Category 3x2 Tinted Grid with Square White Frames (1:1 Template) */}
          <div id="kategori" className="mt-16 scroll-mt-24">
            <div className="text-center mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-brand-dark mb-1">
                Kategori Produk Pilihan
              </h2>
              <p className="text-sm text-brand-muted">
                Semua oleh-oleh khas Pulau Bangka ada di Toko Amen Snack.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
              {CATEGORIES_COLLECTION.map((cat, idx) => (
                <Link
                  key={cat.id}
                  href={`/produk?kategori=${cat.slug}`}
                  className="group rounded-2xl border border-rose-900/5 bg-brand-soft/70 hover:bg-brand-soft p-4 sm:p-5 transition-all hover:shadow-md hover:-translate-y-0.5 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3.5 sm:gap-4 h-full"
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
                    <h3 className="font-bold text-sm sm:text-base text-brand-dark group-hover:text-brand-red transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-brand-muted line-clamp-2 mt-1 leading-relaxed">
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
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white">
              Kata Pelanggan &amp; Wisatawan
            </h2>
            <p className="text-xs sm:text-sm text-rose-100 mt-1.5">
              Dipercaya wisatawan dan pelanggan online dengan rating{" "}
              <strong className="text-white">
                {STORE_INFO.rating}★ ({STORE_INFO.reviewCount}+ ulasan Google Maps)
              </strong>
            </p>
          </div>

          <div className="relative z-20 -mb-28 md:-mb-36 mt-8 px-2 sm:px-6">
            <Carousel
              opts={{ align: "start", loop: true }}
              showDots
              dotVariant="light"
              dotsClassName="mt-5"
            >
              <CarouselContent>
                {TESTIMONIALS_COLLECTION.map((testi) => (
                  <CarouselItem
                    key={testi.id}
                    className="basis-full sm:basis-1/2 lg:basis-1/3"
                  >
                    <Card className="bg-white rounded-2xl p-6 border border-rose-100 shadow-lg h-full flex flex-col justify-between">
                      <div>
                        {/* Avatar + Name Header */}
                        <div className="flex items-center gap-3 mb-4">
                          <div
                            className={`w-11 h-11 rounded-full ${testi.avatarBg} text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-sm`}
                          >
                            {testi.avatarInitials}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-sm text-brand-dark truncate">
                              {testi.name}
                            </p>
                            <p className="text-xs text-brand-muted truncate">
                              {testi.role}
                            </p>
                          </div>
                        </div>

                        {/* 5-Star Rating */}
                        <div className="flex items-center gap-1 mb-3">
                          {Array.from({ length: testi.rating }).map((_, idx) => (
                            <Star
                              key={idx}
                              className="h-4 w-4 fill-amber-400 text-amber-400"
                            />
                          ))}
                        </div>

                        {/* Quote Text with Signature Marks */}
                        <div className="flex items-start gap-2">
                          <QuoteGlyph />
                          <p className="text-sm text-brand-dark/90 leading-relaxed italic">
                            {testi.quote}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-end mt-3">
                        <QuoteGlyph flip />
                      </div>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:inline-flex" />
              <CarouselNext className="hidden sm:inline-flex" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 5: VALUE PILLARS & 3 PROPOSITION BANNERS                  */}
      {/* (Receives -mb-28 md:-mb-36 cards with pt-36 md:pt-48!)            */}
      {/* ================================================================= */}
      <section
        id="keunggulan"
        className="relative z-10 bg-brand-soft pt-36 md:pt-48 pb-16 scroll-mt-24"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-brand-dark">
              Mengapa Belanja di Toko Amen Snack?
            </h2>
            <p className="text-sm text-brand-muted mt-1">
              Tiga keunggulan utama pusat oleh-oleh favorit di Sungailiat, Bangka
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {VALUE_PILLARS.map((pillar, idx) => {
              const Icon = PILLAR_ICONS[pillar.iconName];
              return (
                <div
                  key={pillar.id}
                  className="bg-white rounded-2xl p-6 text-center border border-rose-100 shadow-sm flex flex-col items-center"
                >
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${
                      idx % 2 === 0
                        ? "bg-rose-50 text-brand-red"
                        : "bg-orange-50 text-brand-orange"
                    }`}
                  >
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-bold text-base text-brand-dark mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-brand-muted leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* 3 Visual Proposition Banners (Exact 1:1 tokomama.com Grid!) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
            {PROPOSITION_BANNERS.map((banner) => (
              <Link
                key={banner.id}
                href={banner.href}
                className="group relative aspect-[16/10] rounded-2xl overflow-hidden bg-white border border-rose-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 block"
              >
                <MediaImage
                  src={banner.imageUrl}
                  alt={banner.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
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
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-brand-dark">
              Kunjungi Toko Fisik Kami di Sungailiat
            </h2>
            <p className="text-sm text-brand-muted mt-1">
              Belanja langsung lebih leluasa memilih aneka kemplang, getas, dan bumbu asli Bangka
            </p>
          </div>

          {featuredStore && (
            <div className="max-w-4xl mx-auto rounded-2xl border border-rose-100 bg-brand-soft/50 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-rose-200/70">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-bold text-brand-red shadow-sm">
                  <Store className="h-3.5 w-3.5" />
                  {featuredStore.branchCode}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  {STORE_INFO.rating}★ ({STORE_INFO.reviewCount}+ ulasan Google Maps)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-5">
                <div className="md:col-span-7 space-y-3 text-sm">
                  <h3 className="text-lg sm:text-xl font-bold text-brand-dark">
                    {featuredStore.name}
                  </h3>
                  <p className="flex items-start gap-2.5 text-brand-muted leading-relaxed">
                    <MapPin className="h-4 w-4 text-brand-red shrink-0 mt-1" />
                    <span>{featuredStore.address}</span>
                  </p>
                  <p className="flex items-start gap-2.5 text-brand-muted">
                    <Clock className="h-4 w-4 text-brand-orange shrink-0 mt-0.5" />
                    <span>
                      Senin &ndash; Sabtu:{" "}
                      <strong className="text-brand-dark">
                        {featuredStore.openingHoursWeekday}
                      </strong>{" "}
                      &bull; Minggu:{" "}
                      <strong className="text-brand-dark">
                        {featuredStore.openingHoursSunday}
                      </strong>
                    </span>
                  </p>
                  <p className="flex items-center gap-2.5 text-brand-muted">
                    <Phone className="h-4 w-4 text-brand-red shrink-0" />
                    <span className="font-bold text-brand-dark">
                      {featuredStore.phone}
                    </span>
                  </p>
                </div>

                <div className="md:col-span-5 flex flex-col gap-2.5">
                  <a
                    href={featuredStore.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-red px-5 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-brand-red-dark transition-colors shadow-sm"
                  >
                    <MapPin className="h-4 w-4" />
                    Buka di Google Maps
                  </a>
                  <a
                    href={featuredStore.wazeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-orange bg-white px-5 py-2.5 text-xs sm:text-sm font-bold text-brand-orange hover:bg-orange-50 transition-colors"
                  >
                    <Navigation className="h-4 w-4" />
                    Navigasi via Waze
                  </a>
                  <Link
                    href="/lokasi"
                    className="inline-flex items-center justify-center gap-1.5 rounded-full border border-rose-200 bg-white px-5 py-2 text-xs font-semibold text-brand-dark hover:text-brand-red hover:border-brand-red/40 transition-colors"
                  >
                    Detail Jam Buka &amp; Rute Lengkap
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 7: BLOG & CULINARY ARTICLES CAROUSEL                      */}
      {/* ================================================================= */}
      <section className="bg-brand-soft py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-brand-dark">
                Cerita &amp; Kuliner Khas Bangka
              </h2>
              <p className="text-sm text-brand-muted mt-1">
                Panduan memilih kemplang asli, rekomendasi wisata kuliner Sungailiat, dan tips pengiriman
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-sm font-bold text-brand-red hover:underline shrink-0"
            >
              Lihat semua artikel
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="relative px-2 sm:px-6">
            <Carousel opts={{ align: "start", loop: true }} showDots>
              <CarouselContent>
                {BLOGS_COLLECTION.map((post) => (
                  <CarouselItem
                    key={post.id}
                    className="basis-full sm:basis-1/2 lg:basis-1/3"
                  >
                    <Link
                      href={`/blog#${post.slug}`}
                      className="group block h-full rounded-2xl overflow-hidden bg-white border border-rose-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
                    >
                      <div className="relative aspect-[16/10] bg-rose-50 overflow-hidden">
                        <MediaImage
                          src={post.imageUrl}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-5 flex flex-col gap-2">
                        <div className="flex items-center justify-between text-xs text-brand-muted">
                          <span className="font-bold text-brand-orange">
                            {post.category}
                          </span>
                          <span>{post.readTime}</span>
                        </div>
                        <h3 className="font-bold text-base text-brand-dark group-hover:text-brand-red transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-xs text-brand-muted line-clamp-2 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:inline-flex" />
              <CarouselNext className="hidden sm:inline-flex" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* FLYER LIGHTBOX MODAL                                              */}
      {/* ================================================================= */}
      {selectedFlyer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/75 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedFlyer(null)}
        >
          <div
            className="relative w-full max-w-3xl rounded-2xl bg-white overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedFlyer(null)}
              aria-label="Tutup pratinjau promo"
              className="absolute right-3 top-3 z-10 rounded-full bg-white/95 p-2 text-brand-dark shadow-md hover:bg-rose-50"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="relative aspect-[16/9] bg-brand-soft">
              <MediaImage
                src={selectedFlyer.imageUrl}
                alt={selectedFlyer.alt}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-brand-red uppercase tracking-wider">
                  {selectedFlyer.badge} &bull; {selectedFlyer.period}
                </span>
                <h3 className="text-lg font-bold text-brand-dark mt-0.5">
                  {selectedFlyer.title}
                </h3>
                <p className="text-sm text-brand-muted mt-1">
                  {selectedFlyer.description}
                </p>
              </div>
              <a
                href={STORE_INFO.whatsappDirectCta}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 shrink-0 rounded-full bg-brand-red px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-red-dark"
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
