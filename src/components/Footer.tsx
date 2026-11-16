import React from "react";
import Link from "next/link";
import { Instagram, MapPin, Navigation, Phone, ShoppingBag } from "lucide-react";
import { STORE_INFO } from "@/payload/seed-data";

export function Footer() {
  return (
    <footer className="footer-gradient w-full overflow-x-clip text-white pb-6">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-[10%] py-10 sm:py-14">
        {/* Exact 1:1 3-Column Structure from tokomama.com */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          {/* Column 1: Customer Inquiry Hotline & Store Address */}
          <div>
            <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Ada pertanyaan?</h2>
            <p className="text-sm text-teal-100 mb-5 sm:mb-6 leading-relaxed">
              Kami siap membantu pemesanan oleh-oleh khas Bangka untuk oleh-oleh keluarga, paket wisata, maupun pengiriman luar kota!
            </p>
            <div className="space-y-4">
              <div>
                <p className="text-xs sm:text-sm font-semibold mb-1 text-teal-100">
                  Telepon &amp; WhatsApp Admin
                </p>
                <a
                  href={STORE_INFO.whatsappDirectCta}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl sm:text-2xl font-bold text-amber-200 hover:text-white transition-colors inline-block"
                >
                  {STORE_INFO.phone}
                </a>
                <p className="text-xs text-teal-100 mt-1">
                  Senin – Sabtu ({STORE_INFO.openingHours.mondayToSaturday}) • Minggu ({STORE_INFO.openingHours.sunday})
                </p>
              </div>

              <div>
                <p className="text-xs sm:text-sm font-semibold mb-1 text-teal-100">
                  Alamat Toko Fisik Sungailiat
                </p>
                <a
                  href={STORE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/95 hover:text-amber-200 transition-colors inline-flex items-start gap-2 leading-relaxed break-words"
                >
                  <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-amber-200" />
                  <span>{STORE_INFO.address}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Explore & Grow Together */}
          <div>
            <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Mari Tumbuh Bersama</h2>
            <ul className="space-y-3 text-sm text-teal-50">
              <li>
                <Link
                  href="/about"
                  className="hover:text-amber-200 transition-colors"
                >
                  Tentang Kami &amp; Cap AMEN
                </Link>
              </li>
              <li>
                <Link
                  href="/katalog"
                  className="hover:text-amber-200 transition-colors"
                >
                  Katalog Promo &amp; Flyer
                </Link>
              </li>
              <li>
                <Link
                  href="/produk"
                  className="hover:text-amber-200 transition-colors"
                >
                  Katalog Produk Lengkap
                </Link>
              </li>
              <li>
                <Link
                  href="/lokasi"
                  className="hover:text-amber-200 transition-colors"
                >
                  Lokasi Toko Sungailiat
                </Link>
              </li>
              <li>
                <Link
                  href="/about#supplier"
                  className="hover:text-amber-200 transition-colors"
                >
                  Mitra Pengrajin &amp; Reseller
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Official Channels & Navigation */}
          <div>
            <h2 className="text-xl font-bold mb-6">Layanan Pelanggan</h2>
            <ul className="space-y-3 text-sm text-teal-50">
              <li>
                <a
                  href={STORE_INFO.shopeeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-200 transition-colors"
                >
                  Shopee Official Store ({STORE_INFO.shopeeHandle})
                </a>
              </li>
              <li>
                <a
                  href={STORE_INFO.whatsappDirectCta}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-200 transition-colors"
                >
                  Pesan Langsung via WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={STORE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-200 transition-colors"
                >
                  Buka Rute di Google Maps
                </a>
              </li>
              <li>
                <a
                  href={STORE_INFO.wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-200 transition-colors"
                >
                  Navigasi Langsung via Waze
                </a>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-amber-200 transition-colors"
                >
                  Cerita &amp; Panduan Kuliner Bangka
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Centered Social Media Band — 1:1 Mirror of tokomama.com */}
        <div className="mt-14 pt-8 border-t border-white/20 flex flex-col items-center justify-center gap-3 text-center">
          <h3 className="text-xl font-bold mb-1">
            Follow us on social media
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={STORE_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Toko Amen Snack"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href={STORE_INFO.shopeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Shopee ${STORE_INFO.shopeeHandle}`}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors"
            >
              <ShoppingBag className="h-5 w-5" />
            </a>
            <a
              href={STORE_INFO.whatsappDirectCta}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Toko Amen Snack"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors"
            >
              <Phone className="h-5 w-5" />
            </a>
            <a
              href={STORE_INFO.wazeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Navigasi Waze Toko Amen Snack"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors"
            >
              <Navigation className="h-5 w-5" />
            </a>
          </div>
          <p className="text-xs text-teal-100/90 mt-1">
            Terdaftar di Sisparnas Kemenpar RI &bull; Reputasi {STORE_INFO.rating}★ ({STORE_INFO.reviewCount}+ ulasan Google Maps)
          </p>
        </div>

        {/* Centered Copyright Row */}
        <div className="mt-8 text-center text-sm text-teal-100">
          Copyright 2026 &copy; {STORE_INFO.officialName}
        </div>
      </div>
    </footer>
  );
}
