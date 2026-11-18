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

/**
 * About page detailing Toko Amen Snack Bangka profile, Sisparnas status, Cap AMEN brand, and value pillars.
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
                  "Oleh-Oleh 100% Asli Bangka Langsung dari Pengrajin & Cap AMEN",
                  "100% Authentic Bangka Souvenirs from Local Artisans & House Brand Cap AMEN"
                )}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-4 leading-relaxed">
                {tx("Berdiri sejak", "Established since")}{" "}
                <strong>{tx(STORE_INFO.foundedDate, FOUNDED_DATE_EN)}</strong>,{" "}
                <strong>{STORE_INFO.name}</strong>{" "}
                {tx(
                  "terdaftar sebagai salah satu Amenitas Pariwisata Resmi di Kabupaten Bangka pada Sistem Informasi Kepariwisataan Nasional (Sisparnas Kementerian Pariwisata) serta memiliki lini produk internal",
                  "is officially listed as a Tourism Amenity in Bangka Regency on Indonesia's Ministry of Tourism Sisparnas directory and produces our signature line"
                )}{" "}
                <strong>&ldquo;Cap AMEN&rdquo;</strong>.
              </p>

              <ul className="mt-6 space-y-3">
                {(isEn
                  ? [
                      `Trusted heritage since ${FOUNDED_DATE_EN} with a 4.5★ Google Maps reputation among travelers`,
                      "100% Authentic Bangka snacks crafted by local makers alongside house brand Cap AMEN",
                      "Sungailiat's fullest selection: grilled/sand-roasted/fried kemplang, getas, kericu, terasi, coffee, and Bangka noodles",
                      "Available for walk-in shopping at Jl. Muhidin No.106 or nationwide delivery via WhatsApp & Shopee",
                    ]
                  : [
                      `Berpengalaman sejak ${STORE_INFO.foundedDate}: dipercaya wisatawan dan pelanggan oleh-oleh khas Bangka dengan reputasi 4,5★ Google Maps`,
                      "100% Asli Bangka: produk olahan hasil laut & camilan langsung dari pengrajin lokal serta Cap AMEN",
                      "Katalog Terlengkap di Sungailiat: kemplang panggang/pasir/oven/goreng, getas, kericu, terasi, kopi, dan mi khas Bangka",
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
