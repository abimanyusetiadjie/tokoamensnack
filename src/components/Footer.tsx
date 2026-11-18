"use client";

import React from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { STORE_INFO } from "@/payload/seed-data";
import { FOUNDED_DATE_EN, useLanguage } from "@/lib/i18n";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.81a8.24 8.24 0 0 0 4.76 1.5v-3.4a4.85 4.85 0 0 1-1-.22z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.5 1.6-1.5h1.6V4.9c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1V11H8v3h2.7v8h2.8z" />
    </svg>
  );
}

const EXPLORE_LINKS = [
  { href: "/about", idLabel: "Tentang Toko & AMS", enLabel: "About Store & AMS" },
  { href: "/produk", idLabel: "Katalog Produk", enLabel: "Product Catalog" },
  { href: "/katalog", idLabel: "Promo & Flyer", enLabel: "Promos & Flyers" },
  { href: "/lokasi", idLabel: "Lokasi Toko", enLabel: "Store Location" },
] as const;

const SERVICE_LINKS = [
  { href: STORE_INFO.shopeeUrl, idLabel: "Shopee Official", enLabel: "Official Shopee", external: true },
  { href: STORE_INFO.whatsappDirectCta, idLabel: "Chat WhatsApp", enLabel: "WhatsApp Chat", external: true },
  { href: STORE_INFO.googleMapsUrl, idLabel: "Google Maps", enLabel: "Google Maps", external: true },
  { href: STORE_INFO.wazeUrl, idLabel: "Rute via Waze", enLabel: "Directions via Waze", external: true },
  { href: "/blog", idLabel: "Panduan Kuliner", enLabel: "Culinary Guide", external: false },
] as const;

export function Footer() {
  const { tx } = useLanguage();

  return (
    <footer className="footer-gradient w-full overflow-x-clip text-white border-t-[3px] border-brand-orange pb-24 sm:pb-24 md:pb-10">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-[10%] pt-10 sm:pt-14 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-7 md:gap-10 items-start">
          {/* Column 1: Customer Inquiry Hotline & Store Address */}
          <div className="md:col-span-5">
            <h2 className="text-lg sm:text-xl font-bold tracking-tight">
              {tx("Ada pertanyaan?", "Have a question?")}
            </h2>
            <p className="text-xs sm:text-sm text-slate-200/90 mt-1.5 leading-relaxed max-w-md">
              {tx("Melayani oleh-oleh khas Bangka sejak", "Serving authentic Bangka souvenirs since")}{" "}
              <strong className="text-white">
                {tx(STORE_INFO.foundedDate, FOUNDED_DATE_EN)}
              </strong>{" "}
              {tx(
                "untuk keluarga, paket wisata, maupun kirim ke luar kota.",
                "for families, tour groups, and nationwide delivery."
              )}
            </p>

            <div className="mt-4 rounded-2xl bg-white/[0.08] border border-white/15 p-4 space-y-3.5">
              <div>
                <p className="text-[11px] uppercase tracking-wider font-semibold text-blue-100/85">
                  {tx("Telepon & WhatsApp Admin", "Phone & Admin WhatsApp")}
                </p>
                <a
                  href={STORE_INFO.whatsappDirectCta}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-2 text-lg sm:text-xl font-bold text-amber-200 hover:text-white transition-colors"
                >
                  <WhatsAppIcon className="h-5 w-5 shrink-0 text-[#25D366]" />
                  <span>WhatsApp {STORE_INFO.phone}</span>
                </a>
                <p className="text-[11px] sm:text-xs text-slate-200/85 mt-1 leading-relaxed">
                  {tx("Sen–Sab", "Mon–Sat")} {STORE_INFO.openingHours.mondayToSaturday} &bull;{" "}
                  {tx("Minggu", "Sunday")} {STORE_INFO.openingHours.sunday}
                </p>
              </div>

              <div className="border-t border-white/10 pt-3">
                <p className="text-[11px] uppercase tracking-wider font-semibold text-blue-100/85 mb-1">
                  {tx("Alamat Toko Sungailiat", "Sungailiat Store Address")}
                </p>
                <a
                  href={STORE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm text-white/95 hover:text-amber-200 transition-colors inline-flex items-start gap-2 leading-relaxed break-words"
                >
                  <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-amber-200" />
                  <span>{STORE_INFO.address}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Columns 2 & 3: Side-by-Side 2 Columns on Mobile & Desktop */}
          <div className="md:col-span-7 grid grid-cols-2 gap-6 sm:gap-10 pt-6 border-t border-white/15 md:border-t-0 md:pt-0">
            <div>
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-200 mb-3 sm:mb-4">
                {tx("Jelajahi Toko", "Explore Store")}
              </h2>
              <ul className="space-y-1 text-[13px] sm:text-sm text-slate-100/90">
                {EXPLORE_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-flex py-1.5 hover:text-amber-200 transition-colors"
                    >
                      {tx(item.idLabel, item.enLabel)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-200 mb-3 sm:mb-4">
                {tx("Layanan & Akses", "Services & Access")}
              </h2>
              <ul className="space-y-1 text-[13px] sm:text-sm text-slate-100/90">
                {SERVICE_LINKS.map((item) => (
                  <li key={item.idLabel}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex py-1.5 hover:text-amber-200 transition-colors"
                      >
                        {tx(item.idLabel, item.enLabel)}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="inline-flex py-1.5 hover:text-amber-200 transition-colors"
                      >
                        {tx(item.idLabel, item.enLabel)}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Centered Social Media Band: Instagram, TikTok, Facebook */}
        <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-white/15 flex flex-col items-center justify-center gap-3.5 text-center">
          <div>
            <h3 className="text-sm sm:text-base font-bold tracking-wide text-white">
              {tx("Ikuti Media Sosial Kami", "Follow Our Social Media")}
            </h3>
            <p className="text-xs text-slate-200/80 mt-0.5">
              {tx(
                "Info produk segar, promo oleh-oleh, dan kiriman luar kota",
                "Fresh batch updates, souvenir deals, and nationwide shipping"
              )}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3.5">
            <a
              href={STORE_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Toko Amen Snack"
              className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-white/10 hover:bg-pink-500/25 border border-white/15 hover:border-pink-300/45 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white transition-all"
            >
              <InstagramIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
              <span>Instagram</span>
            </a>

            <a
              href={STORE_INFO.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok Toko Amen Snack"
              className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 hover:border-cyan-300/45 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white transition-all"
            >
              <TikTokIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
              <span>TikTok</span>
            </a>

            <a
              href={STORE_INFO.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook Toko Amen Snack"
              className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-white/10 hover:bg-blue-500/25 border border-white/15 hover:border-blue-300/45 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white transition-all"
            >
              <FacebookIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
              <span>Facebook</span>
            </a>
          </div>

          <p className="text-[11px] sm:text-xs text-slate-200/85 mt-1 leading-relaxed">
            {tx(
              `Berdiri Sejak ${STORE_INFO.foundedDate} • Terdaftar di Sisparnas Kemenpar RI • Reputasi ${STORE_INFO.rating}★ (${STORE_INFO.reviewCount}+ Ulasan Google Maps)`,
              `Est. ${FOUNDED_DATE_EN} • Registered on Sisparnas Kemenpar RI • Rated ${STORE_INFO.rating}★ (${STORE_INFO.reviewCount}+ Google Maps Reviews)`
            )}
          </p>
        </div>

        {/* Centered Copyright Row */}
        <div className="mt-4 pt-3 text-center text-[11px] sm:text-sm text-slate-200/95">
          Copyright 2026 &copy; {STORE_INFO.officialName}
        </div>
      </div>
    </footer>
  );
}
