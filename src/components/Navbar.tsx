"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag, MapPin, Globe } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { STORE_INFO } from "@/payload/seed-data";
import { NAV_LABELS_EN, useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/katalog", label: "Katalog" },
  { href: "/produk", label: "Produk" },
  { href: "/lokasi", label: "Lokasi Toko" },
  { href: "/about", label: "Tentang Kami" },
  { href: "/blog", label: "Blog" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, isEn, toggleLang, tx } = useLanguage();

  return (
    <>
      {/* Single Clean Sticky Header (1:1 Clean Mobile Concept Applied Across Desktop & Mobile) */}
      <header className="sticky top-0 z-40 w-full transition-colors bg-white/[0.98] border-b border-slate-200/80 shadow-[0_1px_12px_rgba(15,23,42,0.03)]">
        <div className="relative h-16 lg:h-20 px-4 sm:px-6 lg:px-8 xl:px-[6%] 2xl:px-[10%] flex items-center justify-center lg:justify-between lg:gap-6 max-w-[1600px] mx-auto">
          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label={tx("Buka Menu Navigasi", "Open Navigation Menu")}
            className="lg:hidden absolute left-3 p-2 text-brand-red hover:bg-slate-100 rounded-md transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Official AMEN SNACK Logo + Wordmark (cleanly centered on mobile matching tokomama.com) */}
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
            <Image
              src="/images/logo-amen-snack.webp"
              alt={tx("Logo Resmi Toko Amen Snack", "Toko Amen Snack Official Logo")}
              width={44}
              height={48}
              priority
              className="h-9 sm:h-11 lg:h-12 w-auto object-contain group-hover:scale-105 transition-transform shrink-0"
            />
            <span className="flex flex-col leading-none">
              <span className="font-inter font-extrabold text-[9px] sm:text-[10px] uppercase tracking-[0.14em] text-brand-orange">
                {tx("Oleh-Oleh Bangka", "Bangka Souvenirs")}
              </span>
              <span className="font-inter font-black text-base sm:text-lg lg:text-xl tracking-tight text-brand-red leading-tight whitespace-nowrap">
                Toko Amen Snack
              </span>
            </span>
          </Link>

          {/* Mobile Right Language Switcher — Globe + Active Lang Code (ID / EN) */}
          <button
            type="button"
            onClick={toggleLang}
            aria-label={isEn ? "Ganti bahasa ke Indonesia" : "Switch language to English"}
            title={isEn ? "Bahasa Indonesia (ID)" : "English (EN)"}
            className="lg:hidden absolute right-3 inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 text-brand-red font-bold text-[11px] px-2.5 py-1.5 transition-colors cursor-pointer shrink-0"
          >
            <Globe className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>{lang.toUpperCase()}</span>
          </button>

          {/* Desktop Navigation — Globe Switcher Left of Beranda + Clean Single Row */}
          <nav
            aria-label={tx("Navigasi Utama", "Main Navigation")}
            className="hidden lg:flex items-center gap-4 xl:gap-6 lg:ml-6"
          >
            <button
              type="button"
              onClick={toggleLang}
              aria-label={isEn ? "Ganti bahasa ke Indonesia" : "Switch language to English"}
              title={isEn ? "Bahasa Indonesia (ID)" : "English (EN)"}
              className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-[11px] px-2.5 py-1 transition-colors cursor-pointer shrink-0 whitespace-nowrap"
            >
              <Globe className="w-3.5 h-3.5 text-brand-red shrink-0" aria-hidden="true" />
              <span className={lang === "id" ? "text-brand-red" : "text-slate-400"}>ID</span>
              <span className="text-slate-300">/</span>
              <span className={lang === "en" ? "text-brand-red" : "text-slate-400"}>EN</span>
            </button>
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative font-inter font-semibold text-[15px] leading-7 py-1 whitespace-nowrap transition-colors",
                    isActive
                      ? "text-brand-red font-bold"
                      : "text-slate-600 hover:text-brand-red"
                  )}
                >
                  {isEn ? NAV_LABELS_EN[link.href] || link.label : link.label}
                  {isActive && (
                    <span className="absolute left-0 right-0 -bottom-0.5 h-[3px] rounded-full bg-brand-orange" />
                  )}
                </Link>
              );
            })}
            <a
              href={STORE_INFO.shopeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:inline-flex items-center gap-1.5 rounded-lg bg-[#EE4D2D] hover:bg-[#d93d1f] text-white font-semibold text-xs px-3.5 py-2 whitespace-nowrap shadow-xs transition-colors shrink-0"
            >
              <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
              <span>Shopee Official</span>
            </a>
          </nav>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu Mobile"
        >
          <div
            className="fixed inset-0 bg-slate-900/60"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="fixed top-0 left-0 bottom-0 w-72 max-w-[82vw] bg-white shadow-2xl p-6 flex flex-col justify-between z-10 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-slate-200">
                <div className="flex items-center gap-2.5">
                  <Image
                    src="/images/logo-amen-snack.webp"
                    alt="Logo Resmi Toko Amen Snack"
                    width={38}
                    height={42}
                    className="h-9 w-auto object-contain shrink-0"
                  />
                  <span className="flex flex-col leading-none">
                    <span className="font-inter font-extrabold text-[9px] uppercase tracking-[0.14em] text-brand-orange">
                      Oleh-Oleh Bangka
                    </span>
                    <span className="font-inter font-black text-base text-brand-red leading-tight">
                      Toko Amen Snack
                    </span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Tutup Menu"
                  className="p-2 rounded-lg hover:bg-slate-100 text-brand-red"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-1.5 mt-5">
                {NAV_LINKS.map((link) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname?.startsWith(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors",
                        isActive
                          ? "bg-brand-red/10 text-brand-red font-bold border-l-4 border-brand-orange"
                          : "text-brand-dark hover:bg-brand-soft"
                      )}
                    >
                      {isEn ? NAV_LABELS_EN[link.href] || link.label : link.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="space-y-3 border-t border-slate-200 pt-5 mt-6">
              <div className="rounded-xl bg-brand-soft border border-slate-200 p-3.5 text-xs text-brand-dark space-y-1">
                <p className="font-bold flex items-center gap-1.5 text-brand-red">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  {tx("Toko Sungailiat", "Sungailiat Store")}
                </p>
                <p className="text-slate-600 leading-relaxed">
                  {STORE_INFO.address}
                </p>
                <p className="font-semibold text-brand-dark pt-0.5">
                  {tx("Senin – Sabtu", "Mon – Sat")}: {STORE_INFO.openingHours.mondayToSaturday}
                </p>
              </div>

              <a
                href={STORE_INFO.shopeeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full border border-brand-red/30 px-4 py-2.5 text-sm font-semibold text-brand-red hover:bg-brand-soft"
              >
                <ShoppingBag className="h-4 w-4" />
                Shopee Official ({STORE_INFO.shopeeHandle})
              </a>

              <a
                href={STORE_INFO.whatsappDirectCta}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#20bd5a] shadow-sm"
              >
                <WhatsAppIcon className="h-4 w-4 shrink-0" />
                <span>WhatsApp {STORE_INFO.phone}</span>
              </a>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
