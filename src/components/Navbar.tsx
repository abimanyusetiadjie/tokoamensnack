"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ShoppingBag, MapPin } from "lucide-react";
import { STORE_INFO } from "@/payload/seed-data";
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

  return (
    <>
      {/* Tier 1 Top Bar — Mirrored 1:1 from tokomama.com */}
      <div className="hidden lg:flex h-8 bg-brand-red-dark px-6 xl:px-[100px] py-2 justify-between items-center text-white text-[12px]">
        <div className="font-medium truncate mr-6 flex items-center gap-2">
          <span>{STORE_INFO.announcementText}</span>
        </div>
        <div className="flex items-center shrink-0">
          <Link
            href="/about#supplier"
            className="text-white/95 hover:text-amber-200 px-3.5 border-r border-white/25 whitespace-nowrap transition-colors"
          >
            Mitra Pengrajin Lokal
          </Link>
          <Link
            href="/lokasi"
            className="text-white/95 hover:text-amber-200 px-3.5 border-r border-white/25 whitespace-nowrap transition-colors"
          >
            Jam Buka &amp; Rute
          </Link>
          <Link
            href="/about#tenant"
            className="text-white/95 hover:text-amber-200 pl-3.5 whitespace-nowrap transition-colors"
          >
            Reseller &amp; Grosir
          </Link>
        </div>
      </div>

      {/* Tier 2 Sticky Main Header */}
      <header className="sticky top-0 z-40 w-full transition-colors bg-brand-soft/95 backdrop-blur-md border-b border-rose-900/5 shadow-sm">
        <div className="h-20 px-4 sm:px-6 lg:px-[6%] xl:px-[10%] flex justify-between items-center max-w-[1600px] mx-auto gap-4">
          {/* Left: Hamburger + Stacked Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Buka Menu Navigasi"
              className="lg:hidden p-2 rounded-lg hover:bg-rose-100 text-brand-dark transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>

            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-red text-white shadow-sm group-hover:bg-brand-red-dark transition-colors">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path
                    d="M4.5 9.5C4.5 6.8 6.8 5 12 5C17.2 5 19.5 6.8 19.5 9.5C19.5 14.8 16.5 19 12 19C7.5 19 4.5 14.8 4.5 9.5Z"
                    stroke="currentColor"
                    strokeWidth="1.9"
                  />
                  <path
                    d="M8.5 13C9.3 14.3 10.6 15 12 15C13.4 15 14.7 14.3 15.5 13"
                    stroke="#FDE68A"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="9.2" cy="10.2" r="1.1" fill="#FFFFFF" />
                  <circle cx="14.8" cy="10.2" r="1.1" fill="#FFFFFF" />
                </svg>
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-red whitespace-nowrap">
                  Oleh-Oleh Khas Bangka
                </span>
                <span className="text-xl sm:text-[22px] font-extrabold tracking-tight text-brand-dark whitespace-nowrap">
                  AMEN SNACK
                </span>
              </span>
            </Link>
          </div>

          {/* Center: Single-line Navigation Links + Signature Bottom Underline */}
          <nav
            aria-label="Navigasi Utama"
            className="hidden lg:flex items-center gap-5 xl:gap-7 shrink-0"
          >
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
                    "relative py-1 text-[14px] xl:text-[15px] font-medium whitespace-nowrap transition-colors",
                    isActive
                      ? "text-brand-red font-semibold"
                      : "text-brand-dark hover:text-brand-red"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-[26px] left-0 right-0 h-[3px] rounded-full bg-brand-red" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Compact Action Pills (Zero Wrap) */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <a
              href={STORE_INFO.shopeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-brand-orange bg-white px-3.5 py-2 text-xs xl:text-sm font-semibold text-brand-orange hover:bg-orange-50 whitespace-nowrap transition-colors"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span className="hidden xl:inline">Belanja di Shopee</span>
              <span className="xl:hidden">Shopee</span>
            </a>

            <a
              href={STORE_INFO.whatsappDirectCta}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-red px-3.5 sm:px-4 py-2 text-xs xl:text-sm font-semibold text-white hover:bg-brand-red-dark whitespace-nowrap shadow-sm transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Pesan WhatsApp</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>
          </div>
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
            className="fixed inset-0 bg-slate-900/45 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="fixed top-0 left-0 bottom-0 w-72 max-w-[85vw] bg-white shadow-2xl p-6 flex flex-col justify-between z-10 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-rose-100">
                <span className="flex flex-col leading-none">
                  <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-brand-red">
                    Oleh-Oleh Khas Bangka
                  </span>
                  <span className="text-lg font-extrabold text-brand-dark mt-0.5">
                    AMEN SNACK
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Tutup Menu"
                  className="p-2 rounded-lg hover:bg-rose-50 text-brand-muted hover:text-brand-dark"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-col gap-1.5 mt-5">
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
                        "rounded-xl px-4 py-3 text-base font-medium transition-colors",
                        isActive
                          ? "bg-brand-soft text-brand-red font-semibold"
                          : "text-brand-dark hover:bg-rose-50"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              <div className="border-t border-rose-100 mt-5 pt-4 flex flex-col gap-1 text-sm text-brand-muted">
                <Link
                  href="/about#supplier"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 hover:text-brand-red transition-colors"
                >
                  Mitra Pengrajin Lokal
                </Link>
                <Link
                  href="/about#tenant"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 hover:text-brand-red transition-colors"
                >
                  Kemitraan Reseller &amp; Grosir
                </Link>
              </div>
            </div>

            <div className="space-y-3 border-t border-rose-100 pt-5 mt-6">
              <div className="rounded-xl bg-brand-soft p-3.5 text-xs text-brand-dark space-y-1">
                <p className="font-bold flex items-center gap-1.5 text-brand-red">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  Toko Sungailiat
                </p>
                <p className="text-brand-muted leading-relaxed">
                  {STORE_INFO.address}
                </p>
                <p className="font-semibold text-brand-dark pt-0.5">
                  Senin – Sabtu: {STORE_INFO.openingHours.mondayToSaturday}
                </p>
              </div>

              <a
                href={STORE_INFO.shopeeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full border border-brand-orange px-4 py-2.5 text-sm font-semibold text-brand-orange hover:bg-orange-50"
              >
                <ShoppingBag className="h-4 w-4" />
                Shopee Official ({STORE_INFO.shopeeHandle})
              </a>

              <a
                href={STORE_INFO.whatsappDirectCta}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-red px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-red-dark shadow-sm"
              >
                <Phone className="h-4 w-4" />
                WhatsApp {STORE_INFO.phone}
              </a>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
