import React from "react";
import Link from "next/link";
import {
  Clock,
  Instagram,
  MapPin,
  MessageCircle,
  Navigation,
  ShoppingBag,
  Store,
} from "lucide-react";
import { STORE_INFO } from "@/payload/seed-data";

export function Footer() {
  return (
    <footer className="footer-gradient w-full text-white" role="contentinfo">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[10%] py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Column 1: Brand Summary */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/15 text-white">
                <Store className="w-5 h-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-xl font-extrabold tracking-tight leading-none">
                  {STORE_INFO.logoTitle}
                </h2>
                <p className="text-xs text-rose-100 mt-1">{STORE_INFO.logoSubtitle}</p>
              </div>
            </div>

            <p className="text-sm text-rose-50/90 leading-relaxed max-w-md">
              {STORE_INFO.footerDescription}
            </p>

            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold text-amber-100">
              <span>🏆 Terdaftar Sisparnas Kemenpar • {STORE_INFO.rating}★ Google Maps</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 space-y-3.5">
            <h3 className="text-base font-bold">Tautan Cepat</h3>
            <ul className="space-y-2.5 text-sm text-rose-50/90">
              <li>
                <Link href="/" className="hover:text-amber-200 transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/produk" className="hover:text-amber-200 transition-colors">
                  Katalog Produk
                </Link>
              </li>
              <li>
                <Link href="/lokasi" className="hover:text-amber-200 transition-colors">
                  Lokasi Toko
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-amber-200 transition-colors">
                  Cerita &amp; Kuliner Bangka
                </Link>
              </li>
              <li>
                <a
                  href={STORE_INFO.shopeeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-amber-200 transition-colors"
                >
                  <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
                  Shopee Official Store (amensnack)
                </a>
              </li>
              <li>
                <a
                  href={STORE_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-amber-200 transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" aria-hidden="true" />
                  Instagram ({STORE_INFO.instagramHandle})
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Opening Hours */}
          <div className="md:col-span-4 space-y-3.5">
            <h3 className="text-base font-bold">Kontak &amp; Alamat</h3>
            <div className="space-y-3 text-sm text-rose-50/90">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-amber-200" aria-hidden="true" />
                <span>{STORE_INFO.address}</span>
              </div>

              <a
                href={STORE_INFO.whatsappDirectCta}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-amber-200 transition-colors font-semibold"
              >
                <MessageCircle className="w-4 h-4 shrink-0 text-amber-200" aria-hidden="true" />
                <span>WA: {STORE_INFO.phoneInternational}</span>
              </a>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 shrink-0 mt-0.5 text-amber-200" aria-hidden="true" />
                <div className="text-xs leading-relaxed">
                  <p>Senin – Sabtu: {STORE_INFO.openingHours.mondayToSaturday}</p>
                  <p>Minggu: {STORE_INFO.openingHours.sunday}</p>
                </div>
              </div>

              <div className="pt-1 flex flex-wrap gap-2">
                <a
                  href={STORE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/15 hover:bg-white/25 px-3 py-1.5 text-xs font-semibold transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                  Google Maps
                </a>
                <a
                  href={STORE_INFO.wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/15 hover:bg-white/25 px-3 py-1.5 text-xs font-semibold transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" aria-hidden="true" />
                  Waze
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-rose-100/90">
          <p>© {new Date().getFullYear()} {STORE_INFO.officialName}. Seluruh hak cipta dilindungi.</p>
          <p>Sungailiat, Kabupaten Bangka • Kepulauan Bangka Belitung</p>
        </div>
      </div>
    </footer>
  );
}
