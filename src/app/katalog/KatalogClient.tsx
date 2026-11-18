"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calendar, ExternalLink, MapPin, ShoppingBag, X, ZoomIn } from "lucide-react";
import { PageHeroBanner } from "@/components/PageHeroBanner";
import { Card } from "@/components/ui/card";
import { MediaImage } from "@/components/MediaImage";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { buttonVariants } from "@/components/ui/button";
import { FLYERS_COLLECTION, STORE_INFO, type FlyerItem } from "@/payload/seed-data";
import { FLYER_EN, useLanguage } from "@/lib/i18n";

/**
 * Promo & Highlight catalog view for Toko Amen Snack Bangka.
 */
export function KatalogClient() {
  const { isEn, tx } = useLanguage();
  const [selectedFlyer, setSelectedFlyer] = useState<FlyerItem | null>(null);

  return (
    <div className="min-h-screen bg-white overflow-x-clip">
      <PageHeroBanner
        breadcrumb={tx("Promo & Highlight", "Promos & Highlights")}
        badge={tx("Produksi Langsung AMS & Pengiriman Nasional", "In-House Brand AMS & Nationwide Shipping")}
        title={tx("Sorotan Promo Toko Amen Snack", "Toko Amen Snack Promo Highlights")}
        subtitle={tx(
          "Klik banner di bawah untuk memperbesar detail promo unggulan produk AMS dan layanan pengiriman oleh-oleh khas Bangka ke seluruh Indonesia.",
          "Click any banner below to view details of featured AMS promos and nationwide Bangka souvenir shipping."
        )}
      />

      <section className="py-12 sm:py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[10%]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {FLYERS_COLLECTION.map((flyer) => {
              const enFlyer = isEn ? FLYER_EN[flyer.id] : undefined;
              return (
              <Card
                key={flyer.id}
                className="brand-card rounded-2xl overflow-hidden border border-slate-200/80 bg-white flex flex-col"
              >
                <button
                  type="button"
                  onClick={() => setSelectedFlyer(flyer)}
                  className="group relative w-full aspect-[16/10] bg-brand-soft overflow-hidden cursor-pointer"
                >
                  <MediaImage
                    src={flyer.imageUrl}
                    alt={flyer.alt}
                    fallbackLabel={enFlyer?.title ?? flyer.title}
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-2 rounded-full bg-white text-brand-dark px-4 py-2 text-xs font-semibold shadow-md">
                      <ZoomIn className="w-4 h-4 text-brand-red" />
                      {tx("Perbesar Banner", "Enlarge Banner")}
                    </span>
                  </div>
                </button>

                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-4">
                  <div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-red mb-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {enFlyer?.period ?? flyer.period}
                    </span>
                    <h2 className="font-bold text-lg text-brand-dark">
                      {enFlyer?.title ?? flyer.title}
                    </h2>
                    <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
                      {enFlyer?.description ?? flyer.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => setSelectedFlyer(flyer)}
                      className={buttonVariants({
                        variant: "outline",
                        className: "rounded-full text-xs cursor-pointer",
                      })}
                    >
                      {tx("Perbesar Banner", "Enlarge Banner")}
                    </button>
                    {flyer.isExternal ? (
                      <a
                        href={flyer.ctaHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={buttonVariants({
                          className: "rounded-full text-xs gap-1.5",
                        })}
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>{enFlyer?.ctaLabel ?? flyer.ctaLabel}</span>
                      </a>
                    ) : (
                      <Link
                        href={flyer.ctaHref}
                        className={buttonVariants({
                          className: "rounded-full text-xs gap-1.5",
                        })}
                      >
                        <span>{enFlyer?.ctaLabel ?? flyer.ctaLabel}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              </Card>
              );
            })}
          </div>

          {/* Store CTA Banner */}
          <div className="mt-12 rounded-2xl bg-brand-soft p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-200">
            <div>
              <h3 className="font-bold text-xl text-brand-dark">
                {tx("Pesan Oleh-Oleh Bangka Praktis Sekarang", "Order Bangka Souvenirs Easily Today")}
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                {tx("Kunjungi langsung toko kami di", "Visit our physical store at")} {STORE_INFO.shortAddress}{" "}
                {tx("atau pesan cepat lewat WhatsApp & Shopee Official Store.", "or order directly via WhatsApp & Official Shopee.")}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                href="/lokasi"
                className={buttonVariants({
                  className: "rounded-full gap-2 text-xs sm:text-sm font-semibold",
                })}
              >
                <MapPin className="w-4 h-4" />
                {tx("Lokasi Sungailiat", "Sungailiat Store")}
              </Link>
              <a
                href={STORE_INFO.whatsappDirectCta}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-2.5 gap-2 text-xs sm:text-sm font-semibold transition-colors shadow-xs"
              >
                <WhatsAppIcon className="w-4 h-4 shrink-0" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {selectedFlyer && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedFlyer.title}
          onClick={() => setSelectedFlyer(null)}
          className="fixed inset-0 z-50 bg-slate-900/85 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200/80">
              <div>
                <h3 className="font-bold text-base text-brand-dark">{selectedFlyer.title}</h3>
                <p className="text-xs text-brand-red font-medium">{selectedFlyer.period}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedFlyer(null)}
                aria-label="Tutup tampilan promo"
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
