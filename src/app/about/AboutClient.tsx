"use client";

import React from "react";
import Link from "next/link";
import {
  Award,
  BadgePercent,
  CheckCircle2,
  MapPin,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { PageHeroBanner } from "@/components/PageHeroBanner";
import { Card } from "@/components/ui/card";
import { MediaImage } from "@/components/MediaImage";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { buttonVariants } from "@/components/ui/button";
import {
  PROPOSITION_BANNERS,
  STORE_INFO,
  VALUE_PILLARS,
} from "@/payload/seed-data";
import { FOUNDED_DATE_EN, PILLAR_EN, useLanguage } from "@/lib/i18n";

const PILLAR_ICONS = {
  award: Award,
  badgePercent: BadgePercent,
  truck: Truck,
};

const AMS_HIGHLIGHT_PRODUCTS = [
  {
    id: "ams-terasi-240",
    name: "Terasi AMS Asli Bangka (240g)",
    enName: "Authentic Bangka Shrimp Paste AMS (240g)",
    tag: "Produksi Langsung AMS",
    enTag: "In-House AMS",
    description: "Terasi udang rebon murni buatan Toko Amen Snack dengan aroma gurih autentik.",
    enDescription: "Pure fermented shrimp paste crafted directly by Toko Amen Snack with rich savory aroma.",
    imageUrl: "/images/products/shopee/shp-019-terasi-ams-240g.webp",
    shopeeUrl: "https://shopee.co.id/Terasi-AMS-240g-i.284836006.8490717110",
  },
  {
    id: "ams-getas-bulat",
    name: "Getas Bangka AMS Bulat (250g)",
    enName: "Bangka Fish Cracker Getas AMS Round (250g)",
    tag: "Best Seller AMS",
    enTag: "AMS Bestseller",
    description: "Kerupuk getas ikan tenggiri renyah produksi langsung Toko Amen Snack tanpa pengawet.",
    enDescription: "Crispy mackerel getas crackers made in-house by Toko Amen Snack with zero preservatives.",
    imageUrl: "/images/products/shopee/shp-022-getas-bangka-ams-250g-bulat.webp",
    shopeeUrl: "https://shopee.co.id/Getas-Bangka-AMS-250g-bulat-i.284836006.7242381399",
  },
  {
    id: "ams-kericu-250",
    name: "Kericu Stick Telor Cumi AMS (250g)",
    enName: "Squid-Egg Kericu Sticks AMS (250g)",
    tag: "Andalan AMS",
    enTag: "AMS Signature",
    description: "Stik kericu telur cumi renyah & gurih olahan dapur produksi Toko Amen Snack Sungailiat.",
    enDescription: "Savory crunchy squid-egg kericu sticks crafted by Toko Amen Snack's own production kitchen.",
    imageUrl: "/images/products/shopee/shp-058-kericu-stick-telor-cumi-ams-250g.webp",
    shopeeUrl: "https://shopee.co.id/Kericu-Stick-Telor-Cumi-AMS-250g-i.284836006.5642388968",
  },
  {
    id: "ams-terasi-bubuk",
    name: "Terasi Bubuk Praktis AMS",
    enName: "Ready-to-Use Shrimp Paste Powder AMS",
    tag: "Praktis & Higienis",
    enTag: "Convenient & Pure",
    description: "Terasi Bangka siap tabur dalam bentuk bubuk halus produksi internal bermerek AMS.",
    enDescription: "Finely milled ready-to-cook Bangka terasi powder produced exclusively under the AMS label.",
    imageUrl: "/images/products/shopee/shp-041-terasi-bubuk-ams.webp",
    shopeeUrl: "https://shopee.co.id/Terasi-Bubuk-AMS-i.284836006.4258560015",
  },
] as const;

/**
 * About page detailing Toko Amen Snack Bangka profile, Sisparnas status, direct AMS in-house products, and value pillars.
 */
export function AboutClient() {
  const { isEn, tx } = useLanguage();

  return (
    <div className="min-h-screen bg-white overflow-x-clip">
      <PageHeroBanner
        breadcrumb={tx("Tentang Kami", "About Us")}
        badge={tx(
          `Berdiri Sejak ${STORE_INFO.foundedDate} • Sisparnas Kemenpar`,
          `Est. ${FOUNDED_DATE_EN} • Registered on Sisparnas Kemenpar`
        )}
        title={tx(`Tentang ${STORE_INFO.officialName}`, `About ${STORE_INFO.officialName}`)}
        subtitle={tx(
          `Pusat oleh-oleh khas Bangka, toko camilan, dan ritel makanan ringan di Sungailiat sejak ${STORE_INFO.foundedDate} dengan reputasi 4,5★ di Google Maps.`,
          `Sungailiat's authentic Bangka souvenir center and snack store since ${FOUNDED_DATE_EN}, rated 4.5★ on Google Maps.`
        )}
      />

      {/* Brand Story Split */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[10%]">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10">
            <div className="lg:col-span-6 relative aspect-[3/2] rounded-3xl overflow-hidden bg-brand-soft border border-slate-200/80 shadow-md">
              <MediaImage
                src="/images/stores/toko-interior-kasir.webp"
                alt={`Suasana interior dan layanan kasir ${STORE_INFO.officialName}`}
                fallbackLabel={STORE_INFO.name}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="lg:col-span-6">
              <h2 className="font-inter font-bold text-2xl sm:text-3xl text-brand-dark leading-snug">
                {tx(
                  "Oleh-Oleh 100% Asli Bangka Langsung dari Pengrajin & Produksi AMS",
                  "100% Authentic Bangka Souvenirs from Local Artisans & In-House Brand AMS"
                )}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-4 leading-relaxed">
                {tx("Berdiri sejak", "Established since")}{" "}
                <strong>{tx(STORE_INFO.foundedDate, FOUNDED_DATE_EN)}</strong>,{" "}
                <strong>{STORE_INFO.name}</strong>{" "}
                {tx(
                  "terdaftar sebagai salah satu Amenitas Pariwisata Resmi di Kabupaten Bangka pada Sistem Informasi Kepariwisataan Nasional (Sisparnas Kementerian Pariwisata) serta memproduksi langsung lini produk internal bermerek",
                  "is officially listed as a Tourism Amenity in Bangka Regency on Indonesia's Ministry of Tourism Sisparnas directory and produces our in-house signature line branded"
                )}{" "}
                <strong className="text-brand-red">&ldquo;AMS&rdquo;</strong>{" "}
                {tx(
                  "(Amen Snack) seperti Terasi AMS, Getas AMS, dan Kericu Telor Cumi AMS.",
                  "(Amen Snack), including AMS Shrimp Paste (Terasi), AMS Getas Crackers, and AMS Squid-Egg Kericu."
                )}
              </p>

              <ul className="mt-6 space-y-3">
                {(isEn
                  ? [
                      `Trusted heritage since ${FOUNDED_DATE_EN} with a 4.5★ Google Maps reputation among travelers`,
                      "Direct In-House Brand AMS: produced directly by Toko Amen Snack for guaranteed freshness, hygiene, and consistent taste",
                      "Sungailiat's fullest selection: grilled/sand-roasted/fried kemplang, AMS getas & kericu, AMS terasi, coffee, and Bangka noodles",
                      "Available for walk-in shopping at Jl. Muhidin No.106 or nationwide delivery via WhatsApp & Shopee",
                    ]
                  : [
                      `Berpengalaman sejak ${STORE_INFO.foundedDate}: dipercaya wisatawan dan pelanggan oleh-oleh khas Bangka dengan reputasi 4,5★ Google Maps`,
                      "Produk Produksi Langsung AMS: diolah langsung oleh Toko Amen Snack untuk menjaga kesegaran, kehigienisan, dan mutu rasa asli Bangka",
                      "Katalog Terlengkap di Sungailiat: produk AMS (Terasi, Getas, Kericu, Rusip, Ampiang), aneka Kemplang Panggang & Pasir, kopi, dan mi khas Bangka",
                      "Melayani pembelian langsung di Jl. Muhidin No.106 maupun pengiriman nasional via WhatsApp & Shopee",
                    ]
                ).map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/produk"
                  className={buttonVariants({
                    className: "rounded-full font-semibold text-sm",
                  })}
                >
                  {tx("Lihat Katalog Produk", "Browse Product Catalog")}
                </Link>
                <Link
                  href="/lokasi"
                  className={buttonVariants({
                    variant: "outline",
                    className: "rounded-full font-semibold text-sm gap-1.5",
                  })}
                >
                  <MapPin className="w-4 h-4" />
                  {tx("Kunjungi Toko di Sungailiat", "Visit Store in Sungailiat")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Production AMS Highlight */}
      <section className="bg-white pb-14 sm:pb-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[10%]">
          <div className="rounded-3xl border border-slate-200/80 bg-brand-soft/60 p-6 sm:p-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-7">
              <div className="max-w-2xl">
                <span className="inline-block rounded-full bg-brand-red text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 mb-2.5">
                  {tx("Produksi Langsung Toko Amen Snack", "In-House Production by Toko Amen Snack")}
                </span>
                <h2 className="font-inter font-bold text-2xl sm:text-3xl text-brand-dark">
                  {tx("Highlight Lini Produk Unggulan AMS", "Featured In-House Products: AMS Series")}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                  {tx(
                    "Produk berlabel AMS diolah dan dikemas langsung oleh Toko Amen Snack Sungailiat — menjaga standar kesegaran harian, kebersihan kemasan, serta cita rasa otentik Bangka.",
                    "Items carrying the AMS label are crafted and packed directly by Toko Amen Snack Sungailiat — guaranteeing daily freshness, hygienic packing, and authentic Bangka flavor."
                  )}
                </p>
              </div>
              <Link
                href="/produk"
                className={buttonVariants({
                  variant: "outline",
                  className: "rounded-full text-xs sm:text-sm font-semibold shrink-0 bg-white",
                })}
              >
                {tx("Jelajahi Semua Produk AMS", "Explore All AMS Products")}
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {AMS_HIGHLIGHT_PRODUCTS.map((item) => (
                <Card
                  key={item.id}
                  className="brand-card rounded-2xl overflow-hidden border border-slate-200/80 bg-white flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-square bg-slate-50 overflow-hidden">
                      <MediaImage
                        src={item.imageUrl}
                        alt={isEn ? item.enName : item.name}
                        fill
                        sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                        className="object-cover"
                      />
                      <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-brand-orange text-white px-2.5 py-1 text-[10px] font-bold tracking-wide shadow-sm">
                        {isEn ? item.enTag : item.tag}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-sm text-brand-dark leading-snug">
                        {isEn ? item.enName : item.name}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-3">
                        {isEn ? item.enDescription : item.description}
                      </p>
                    </div>
                  </div>
                  <div className="px-4 pb-4 pt-1">
                    <a
                      href={item.shopeeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#EE4D2D]/35 text-[#EE4D2D] hover:bg-orange-50 font-semibold text-xs py-2 transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                      <span>{tx("Beli di Shopee Official", "Shop on Official Shopee")}</span>
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3 Value Pillars */}
      <section className="bg-brand-soft py-14 sm:py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[10%]">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-inter font-bold text-2xl sm:text-3xl text-brand-dark">
              {tx("Mengapa Belanja di Toko Amen Snack?", "Why Shop at Toko Amen Snack?")}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              {tx(
                "Tiga nilai utama yang menjaga kualitas rasa, harga bersahabat, dan kemudahan belanja.",
                "Three core values behind our consistent taste, fair pricing, and convenient service."
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {VALUE_PILLARS.map((pillar) => {
              const Icon = PILLAR_ICONS[pillar.iconName];
              const enPillar = isEn ? PILLAR_EN[pillar.id] : undefined;
              return (
                <Card
                  key={pillar.id}
                  className="brand-card bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 text-center flex flex-col items-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-brand-soft text-brand-red flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7" aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-lg text-brand-dark">
                    {enPillar?.title ?? pillar.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    {enPillar?.description ?? pillar.description}
                  </p>
                </Card>
              );
            })}
          </div>

          {/* 3 Visual Proposition Banners (1:1 Template Architecture) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
            {PROPOSITION_BANNERS.map((banner) => (
              <Link
                key={banner.id}
                href={banner.href}
                className="group relative aspect-[16/10] rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 block"
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

      {/* Online Order CTA */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[10%]">
          <Card className="rounded-3xl border border-slate-200/80 bg-brand-soft p-6 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="font-inter font-bold text-xl sm:text-2xl text-brand-dark">
                {tx("Siap Memesan Oleh-Oleh Khas Bangka?", "Ready to Order Authentic Bangka Souvenirs?")}
              </h2>
              <p className="text-sm text-slate-600 mt-2 max-w-xl">
                {tx(
                  "Konsultasikan pilihan kemplang, getas, atau paket oleh-oleh keluarga dengan admin kami atau checkout langsung melalui Shopee Official Store.",
                  "Ask our team about kemplang, getas crackers, and family gift hampers via WhatsApp, or check out on Official Shopee."
                )}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href={STORE_INFO.whatsappDirectCta}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-2.5 gap-2 text-xs sm:text-sm font-semibold transition-colors shadow-xs"
              >
                <WhatsAppIcon className="w-4 h-4 shrink-0" />
                <span>WhatsApp</span>
              </a>
              <a
                href={STORE_INFO.shopeeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({
                  variant: "secondary",
                  className: "rounded-full gap-2 text-xs sm:text-sm font-semibold",
                })}
              >
                <ShoppingBag className="w-4 h-4" />
                {tx("Belanja di Shopee", "Shop on Shopee")}
              </a>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
