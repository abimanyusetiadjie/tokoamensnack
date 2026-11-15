import React from "react";
import Link from "next/link";
import { Instagram, MapPin, Navigation, Phone, ShoppingBag } from "lucide-react";
import { STORE_INFO } from "@/payload/seed-data";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-brand-red-dark via-brand-red to-brand-orange-dark text-white">
      <div className="container mx-auto px-6 py-16 max-w-7xl">
        {/* Exact 1:1 3-Column Structure from tokomama.com */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1: Customer Inquiry Hotline & Store Address */}
          <div>
            <h2 className="text-xl font-bold mb-6">Ada pertanyaan?</h2>
            <p className="text-sm text-rose-100 mb-6 leading-relaxed">
              Kami siap membantu pemesanan oleh-oleh khas Bangka untuk oleh-oleh keluarga, paket wisata, maupun pengiriman luar kota!
            </p>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold mb-1 text-rose-100">
                  Telepon &amp; WhatsApp Admin
                </p>
                <a
                  href={STORE_INFO.whatsappDirectCta}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl font-bold text-amber-200 hover:text-white transition-colors inline-block"
                >
                  {STORE_INFO.phone}
                </a>
                <p className="text-xs text-rose-100 mt-1">
                  Senin – Sabtu ({STORE_INFO.openingHours.mondayToSaturday}) • Minggu ({STORE_INFO.openingHours.sunday})
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold mb-1 text-rose-100">
                  Alamat Toko Fisik Sungailiat
                </p>
                <a
                  href={STORE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/95 hover:text-amber-200 transition-colors inline-flex items-start gap-2 leading-relaxed"
                >
                  <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-amber-200" />
                  <span>{STORE_INFO.address}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Explore & Grow Together */}
          <div>
            <h2 className="text-xl font-bold mb-6">Jelajahi Amen Snack</h2>
            <ul className="space-y-3 text-sm text-rose-50">
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
            <ul className="space-y-3 text-sm text-rose-50">
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
        <div className="mt-12 pt-8 pb-8 border-t border-b border-white/20 flex flex-col items-center justify-center gap-3 text-center">
          <h3 className="text-lg sm:text-xl font-bold">
            Follow us on social media
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={STORE_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Toko Amen Snack"
              className="inline-flex items-center gap-2 rounded-full bg-white/15 hover:bg-white/25 px-4 py-2 text-xs font-semibold text-white transition-colors"
            >
              <Instagram className="h-4 w-4" />
              {STORE_INFO.instagramHandle}
            </a>
            <a
              href={STORE_INFO.shopeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Shopee Toko Amen Snack"
              className="inline-flex items-center gap-2 rounded-full bg-white/15 hover:bg-white/25 px-4 py-2 text-xs font-semibold text-white transition-colors"
            >
              <ShoppingBag className="h-4 w-4" />
              Shopee: {STORE_INFO.shopeeHandle}
            </a>
            <a
              href={STORE_INFO.whatsappDirectCta}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Toko Amen Snack"
              className="inline-flex items-center gap-2 rounded-full bg-white/15 hover:bg-white/25 px-4 py-2 text-xs font-semibold text-white transition-colors"
            >
              <Phone className="h-4 w-4" />
              {STORE_INFO.phone}
            </a>
            <a
              href={STORE_INFO.wazeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Navigasi Waze Toko Amen Snack"
              className="inline-flex items-center gap-2 rounded-full bg-white/15 hover:bg-white/25 px-4 py-2 text-xs font-semibold text-white transition-colors"
            >
              <Navigation className="h-4 w-4" />
              Waze
            </a>
          </div>
        </div>

        {/* Centered Copyright Row */}
        <div className="mt-8 text-center text-xs sm:text-sm text-rose-100 space-y-1">
          <p>
            &copy; 2026 {STORE_INFO.officialName}. Terdaftar di Sisparnas Kemenpar RI.
          </p>
          <p className="text-rose-100/85">
            {STORE_INFO.address} &bull; Reputasi {STORE_INFO.rating}★ ({STORE_INFO.reviewCount}+ ulasan Google Maps)
          </p>
        </div>
      </div>
    </footer>
  );
}
