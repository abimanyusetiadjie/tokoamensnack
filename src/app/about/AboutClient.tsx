import React from "react";
import Link from "next/link";
import {
  Award,
  BadgePercent,
  CheckCircle2,
  MapPin,
  MessageCircle,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { PageHeroBanner } from "@/components/PageHeroBanner";
import { Card } from "@/components/ui/card";
import { MediaImage } from "@/components/MediaImage";
import { buttonVariants } from "@/components/ui/button";
import { STORE_INFO, VALUE_PILLARS } from "@/payload/seed-data";

const PILLAR_ICONS = {
  award: Award,
  badgePercent: BadgePercent,
  truck: Truck,
};

/**
 * About page detailing Toko Amen Snack Bangka profile, Sisparnas status, Cap AMEN brand, and value pillars.
 */
export function AboutClient() {
  return (
    <div className="min-h-screen bg-white">
      <PageHeroBanner
        breadcrumb="Tentang Kami"
        badge="Sisparnas Kemenpar • House Brand Cap AMEN"
        title={`Tentang ${STORE_INFO.officialName}`}
        subtitle="Pusat oleh-oleh khas Bangka, toko camilan, dan ritel makanan ringan di Sungailiat dengan reputasi 4,5★ di Google Maps."
      />

      {/* Brand Story Split */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[10%]">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10">
            <div className="lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden bg-brand-soft border border-rose-100">
              <MediaImage
                src={STORE_INFO.heroImage}
                alt={STORE_INFO.officialName}
                fallbackLabel={STORE_INFO.name}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="lg:col-span-6">
              <h2 className="font-inter font-bold text-2xl sm:text-3xl text-brand-dark leading-snug">
                Oleh-Oleh 100% Asli Bangka Langsung dari Pengrajin &amp; Cap AMEN
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-4 leading-relaxed">
                <strong>{STORE_INFO.name}</strong> terdaftar sebagai salah satu{" "}
                <strong>Amenitas Pariwisata Resmi di Kabupaten Bangka</strong> pada Sistem
                Informasi Kepariwisataan Nasional (Sisparnas Kementerian Pariwisata) serta
                memiliki lini produk internal <strong>&ldquo;Cap AMEN&rdquo;</strong>.
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  "100% Asli Bangka: produk olahan hasil laut & camilan langsung dari pengrajin lokal serta Cap AMEN",
                  "Katalog Terlengkap di Sungailiat: kemplang panggang/pasir/oven/goreng, getas, kericu, terasi, kopi, dan mi khas Bangka",
                  "Melayani pembelian langsung di Jl. Muhidin No.106 maupun pengiriman nasional via WhatsApp & Shopee",
                ].map((point) => (
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
                  Lihat Katalog Produk
                </Link>
                <Link
                  href="/lokasi"
                  className={buttonVariants({
                    variant: "outline",
                    className: "rounded-full font-semibold text-sm gap-1.5",
                  })}
                >
                  <MapPin className="w-4 h-4" />
                  Kunjungi Toko di Sungailiat
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
              Mengapa Belanja di Toko Amen Snack?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Tiga nilai utama yang menjaga kualitas rasa, harga bersahabat, dan kemudahan belanja.
            </p>
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
        </div>
      </section>

      {/* Online Order CTA */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[10%]">
          <Card className="rounded-3xl border border-rose-100 bg-brand-slate p-6 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="font-inter font-bold text-xl sm:text-2xl text-brand-dark">
                Siap Memesan Oleh-Oleh Khas Bangka?
              </h2>
              <p className="text-sm text-slate-600 mt-2 max-w-xl">
                Konsultasikan pilihan kemplang, getas, atau paket oleh-oleh keluarga dengan admin
                kami atau checkout langsung melalui Shopee Official Store.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href={STORE_INFO.whatsappDirectCta}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({
                  className: "rounded-full gap-2 text-xs sm:text-sm font-semibold",
                })}
              >
                <MessageCircle className="w-4 h-4" />
                Pesan via WhatsApp
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
                Belanja di Shopee
              </a>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
