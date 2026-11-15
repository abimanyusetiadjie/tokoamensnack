"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BadgePercent,
  Calendar,
  Clock,
  ExternalLink,
  Instagram,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  ShoppingBag,
  Star,
  Truck,
  X,
  ZoomIn,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { CategoryIcon } from "@/components/CategoryIcon";
import { MediaImage } from "@/components/MediaImage";
import { ProductCard } from "@/components/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  BLOGS_COLLECTION,
  CATEGORIES_COLLECTION,
  FLYERS_COLLECTION,
  PRODUCTS_COLLECTION,
  STORE_INFO,
  STORES_COLLECTION,
  TESTIMONIALS_COLLECTION,
  VALUE_PILLARS,
  type FlyerItem,
} from "@/payload/seed-data";

const PILLAR_ICONS = {
  award: Award,
  badgePercent: BadgePercent,
  truck: Truck,
};

/**
 * Main Homepage View mapped section-by-section from project.md for Toko Amen Snack Sungailiat.
 */
export function HomeClient() {
  const [selectedFlyer, setSelectedFlyer] = useState<FlyerItem | null>(null);
  const mainStore = STORES_COLLECTION[0];

  return (
    <div className="min-h-screen bg-brand-soft overflow-x-hidden">
      {/* Seksi 2: Hero Section */}
      <section className="relative bg-brand-soft pt-8 pb-14 md:py-14 lg:py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[10%]">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-8 lg:gap-12">
            {/* Hero Copy & CTAs */}
            <div className="md:col-span-6 text-center md:text-left order-2 md:order-1">
              <div className="inline-flex items-center gap-2 rounded-full bg-white border border-rose-200 px-3.5 py-1.5 text-xs font-semibold text-brand-red shadow-2xs mb-4">
                <span>{STORE_INFO.heroBadge}</span>
              </div>

              <h1 className="font-inter font-extrabold text-3xl sm:text-4xl lg:text-[46px] xl:text-[52px] leading-[1.12] tracking-tight text-brand-dark">
                Pusat Oleh-Oleh &amp; Camilan{" "}
                <span className="text-brand-red">Khas Bangka</span>{" "}
                <span className="text-brand-orange">Terlengkap</span>
              </h1>

              <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-slate-700 leading-relaxed max-w-xl mx-auto md:mx-0">
                {STORE_INFO.heroSubtitle}
              </p>

              <div className="mt-7 sm:mt-8 flex flex-wrap items-center justify-center md:justify-start gap-3.5">
                <a
                  href="#katalog"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-red hover:bg-brand-red-dark text-white font-semibold text-sm sm:text-base px-6 py-3.5 shadow-sm transition-all"
                >
                  <span>Lihat Katalog Produk</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>

                <a
                  href={STORE_INFO.whatsappDirectCta}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white hover:bg-orange-50 text-brand-dark border-2 border-brand-orange font-semibold text-sm sm:text-base px-6 py-3 transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-brand-orange" aria-hidden="true" />
                  <span>Chat WhatsApp ({STORE_INFO.phone})</span>
                </a>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-xs text-slate-600 font-medium">
                <span className="inline-flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                  <strong>{STORE_INFO.rating} / 5.0</strong> ({STORE_INFO.reviewCount}+ Ulasan)
                </span>
                <span>•</span>
                <span>
                  House Brand: <strong className="text-brand-red">{STORE_INFO.houseBrand}</strong>
                </span>
                <span>•</span>
                <span>Jl. Muhidin No.106, Sungailiat</span>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="md:col-span-6 order-1 md:order-2">
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-rose-100 bg-white">
                <MediaImage
                  src={STORE_INFO.heroImage}
                  alt="Toko Amen Snack — Pusat Oleh-Oleh Khas Bangka di Sungailiat"
                  fallbackLabel="Toko Amen Snack Sungailiat"
                  fill
                  priority
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seksi 3: Banner Promo / Highlight Layanan */}
      <section className="relative bg-white rounded-t-[32px] pt-12 pb-14 shadow-[0_-8px_30px_rgba(15,23,42,0.03)]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[10%]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-brand-orange">
                Sorotan &amp; Layanan Kami
              </span>
              <h2 className="font-inter font-bold text-2xl sm:text-3xl text-brand-dark mt-1">
                Promo Unggulan &amp; Pengiriman Nasional
              </h2>
            </div>
            <Link
              href="/katalog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-red hover:text-brand-red-dark shrink-0"
            >
              <span>Lihat Halaman Promo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {FLYERS_COLLECTION.map((flyer) => (
              <Card
                key={flyer.id}
                className="brand-card rounded-2xl overflow-hidden border border-rose-100 bg-brand-slate flex flex-col"
              >
                <button
                  type="button"
                  onClick={() => setSelectedFlyer(flyer)}
                  className="group relative w-full aspect-[16/10] bg-brand-soft overflow-hidden cursor-pointer text-left"
                >
                  <MediaImage
                    src={flyer.imageUrl}
                    alt={flyer.alt}
                    fallbackLabel={flyer.title}
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/15 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-2 rounded-full bg-white text-brand-dark px-4 py-2 text-xs font-semibold shadow-md">
                      <ZoomIn className="w-4 h-4 text-brand-red" />
                      Perbesar Banner
                    </span>
                  </div>
                </button>

                <div className="p-5 sm:p-6 bg-white flex-1 flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="inline-flex items-center rounded-full bg-brand-soft text-brand-red px-3 py-1 text-[11px] font-bold">
                        {flyer.badge}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500">
                        <Calendar className="w-3.5 h-3.5 text-brand-orange" aria-hidden="true" />
                        {flyer.period}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg text-brand-dark">{flyer.title}</h3>
                    <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
                      {flyer.description}
                    </p>
                  </div>

                  <div>
                    {flyer.isExternal ? (
                      <a
                        href={flyer.ctaHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-orange-dark hover:underline"
                      >
                        <span>{flyer.ctaLabel}</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    ) : (
                      <Link
                        href={flyer.ctaHref}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-red hover:underline"
                      >
                        <span>{flyer.ctaLabel}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Seksi 4: Katalog Produk Unggulan (#katalog) */}
      <section id="katalog" className="scroll-mt-24 bg-white py-14 border-t border-rose-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[10%]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-brand-red">
                Etalase Toko Amen Snack
              </span>
              <h2 className="font-inter font-bold text-2xl sm:text-3xl lg:text-4xl text-brand-dark mt-1">
                Oleh-Oleh &amp; Camilan Terlaris
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-1.5">
                Pilihan produk favorit keluarga dan wisatawan dengan kualitas terjamin.
              </p>
            </div>
            <Link
              href="/produk"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-red hover:text-brand-red-dark shrink-0"
            >
              <span>Filter &amp; Cari Produk</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PRODUCTS_COLLECTION.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Seksi 5: Grid 6 Kategori Produk (#kategori) */}
      <section id="kategori" className="scroll-mt-24 bg-brand-slate py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[10%]">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-brand-orange">
              Jelajahi Berdasarkan Jenis
            </span>
            <h2 className="font-inter font-bold text-2xl sm:text-3xl lg:text-4xl text-brand-dark mt-1">
              Kategori Produk Pilihan
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Semua oleh-oleh khas Bangka Belitung ada di Toko Amen Snack.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CATEGORIES_COLLECTION.map((category) => (
              <Link key={category.id} href={`/produk?kategori=${category.slug}`}>
                <Card className="brand-card rounded-2xl border border-rose-100 bg-white hover:bg-brand-soft/60 p-5 sm:p-6 h-full flex items-start gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-brand-red to-brand-orange text-white flex items-center justify-center shadow-sm">
                    <CategoryIcon name={category.iconName} className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base text-brand-dark">{category.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Seksi 6: Value Proposition — 3 Pilar Keunggulan (#keunggulan) & Ulasan */}
      <section id="keunggulan" className="scroll-mt-24 bg-brand-soft py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[10%]">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-brand-red">
              Komitmen Kami Sejak Awal
            </span>
            <h2 className="font-inter font-bold text-2xl sm:text-3xl lg:text-4xl text-brand-dark mt-1">
              Mengapa Belanja di Toko Amen Snack?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {VALUE_PILLARS.map((pillar) => {
              const Icon = PILLAR_ICONS[pillar.iconName];
              return (
                <Card
                  key={pillar.id}
                  className="brand-card bg-white rounded-2xl p-6 sm:p-8 border border-rose-100 text-center flex flex-col items-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-brand-soft text-brand-red flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7" aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-lg text-brand-dark">{pillar.title}</h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    {pillar.description}
                  </p>
                </Card>
              );
            })}
          </div>

          {/* Customer Reviews Carousel */}
          <div className="mt-14">
            <div className="text-center mb-7">
              <h3 className="font-inter font-bold text-xl sm:text-2xl text-brand-dark">
                Kata Pelanggan &amp; Wisatawan ({STORE_INFO.rating}★ Google Maps)
              </h3>
            </div>
            <Carousel opts={{ align: "start", loop: true }} showDots className="w-full">
              <CarouselContent className="-ml-4 pb-2">
                {TESTIMONIALS_COLLECTION.map((item) => (
                  <CarouselItem
                    key={item.id}
                    className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                  >
                    <Card className="bg-white rounded-2xl p-6 border border-rose-100 shadow-2xs h-full flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-0.5 mb-3">
                          {Array.from({ length: item.rating }).map((_, idx) => (
                            <Star
                              key={idx}
                              className="w-4 h-4 fill-amber-400 text-amber-400"
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                        <p className="text-sm text-slate-700 leading-relaxed">
                          &ldquo;{item.quote}&rdquo;
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-rose-50">
                        <p className="font-bold text-sm text-brand-dark">{item.name}</p>
                        <p className="text-xs text-slate-500">{item.role}</p>
                      </div>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex -left-3 lg:-left-5" />
              <CarouselNext className="hidden sm:flex -right-3 lg:-right-5" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Seksi 7: Lokasi Toko & Navigasi (#lokasi) */}
      <section id="lokasi" className="scroll-mt-24 bg-white py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[10%]">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-brand-orange">
              Sungailiat, Kabupaten Bangka
            </span>
            <h2 className="font-inter font-bold text-2xl sm:text-3xl lg:text-4xl text-brand-dark mt-1">
              Kunjungi Toko Fisik Kami di Sungailiat
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Belanja langsung aneka kemplang, getas, dan oleh-oleh khas Bangka segar setiap hari.
            </p>
          </div>

          <Card className="brand-card rounded-3xl border border-rose-100 bg-brand-soft/45 p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-brand-red text-white px-3 py-1 text-xs font-bold">
                    {mainStore.branchCode}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 text-amber-800 px-3 py-1 text-xs font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" aria-hidden="true" />
                    {STORE_INFO.rating}★ ({STORE_INFO.reviewCount}+ ulasan)
                  </span>
                </div>

                <h3 className="font-inter font-extrabold text-2xl text-brand-dark">
                  {mainStore.name}
                </h3>

                <div className="space-y-3 text-sm sm:text-base text-slate-700">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-brand-red shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{mainStore.address}</span>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p>
                        <strong>Senin – Sabtu:</strong> {mainStore.openingHoursWeekday}
                      </p>
                      <p>
                        <strong>Minggu:</strong> {mainStore.openingHoursSunday}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-brand-red shrink-0" aria-hidden="true" />
                    <span className="font-semibold text-brand-dark">
                      {mainStore.phone} / {STORE_INFO.phoneInternational}
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-3">
                <a
                  href={mainStore.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-red hover:bg-brand-red-dark text-white font-semibold text-sm py-3.5 px-5 transition-colors shadow-sm"
                >
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                  <span>Buka di Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" aria-hidden="true" />
                </a>

                <a
                  href={mainStore.wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold text-sm py-3.5 px-5 transition-colors shadow-sm"
                >
                  <Navigation className="w-4 h-4" aria-hidden="true" />
                  <span>Navigasi via Waze</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" aria-hidden="true" />
                </a>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <a
                    href={STORE_INFO.whatsappDirectCta}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-2xl border border-slate-300 bg-white hover:bg-slate-50 text-brand-dark font-semibold text-xs sm:text-sm py-3 px-4 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" aria-hidden="true" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={STORE_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-2xl border border-slate-300 bg-white hover:bg-slate-50 text-brand-dark font-semibold text-xs sm:text-sm py-3 px-4 transition-colors"
                  >
                    <Instagram className="w-4 h-4 text-brand-red" aria-hidden="true" />
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Seksi 8: Artikel & Edukasi Kuliner (#blog) */}
      <section id="blog" className="scroll-mt-24 bg-brand-slate py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[10%]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-brand-red">
                Artikel &amp; Edukasi Kuliner
              </span>
              <h2 className="font-inter font-bold text-2xl sm:text-3xl lg:text-4xl text-brand-dark mt-1">
                Cerita &amp; Kuliner Khas Bangka
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-red hover:text-brand-red-dark shrink-0"
            >
              <span>Baca Semua Artikel</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOGS_COLLECTION.map((post) => (
              <Link key={post.id} href={`/blog#${post.slug}`} className="block h-full">
                <Card className="brand-card rounded-2xl overflow-hidden bg-white border border-rose-100 h-full flex flex-col">
                  <div className="relative w-full aspect-[16/10] bg-brand-soft">
                    <MediaImage
                      src={post.imageUrl}
                      alt={post.title}
                      fallbackLabel={post.title}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-semibold text-brand-orange">
                        {post.publishedAt} • {post.readTime}
                      </span>
                      <h3 className="font-bold text-base text-brand-dark line-clamp-2 mt-1.5 leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 mt-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-red mt-4">
                      Baca selengkapnya <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal for Highlight Banner Inspection */}
      {selectedFlyer && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedFlyer.title}
          onClick={() => setSelectedFlyer(null)}
          className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-rose-100">
              <div>
                <h3 className="font-bold text-base text-brand-dark">{selectedFlyer.title}</h3>
                <p className="text-xs text-brand-red font-medium">{selectedFlyer.period}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedFlyer(null)}
                aria-label="Tutup tampilan banner"
                className="p-1.5 rounded-full hover:bg-brand-soft text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative w-full aspect-[16/10] bg-brand-slate">
              <MediaImage
                src={selectedFlyer.imageUrl}
                alt={selectedFlyer.alt}
                fallbackLabel={selectedFlyer.title}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
