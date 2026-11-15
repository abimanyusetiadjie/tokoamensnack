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
      <div className="hidden lg:flex h-8 bg-[#BE123C] px-6 lg:px-[100px] py-2 justify-between items-center text-white">
        <div className="text-[11px] font-medium text-rose-100 truncate mr-4">
          {STORE_INFO.announcementText}
        </div>
        <div className="flex justify-end items-center gap-6 font-inter font-semibold text-xs text-white shrink-0">
          <Link
            href="/about#supplier"
            className="hover:opacity-80 whitespace-nowrap transition-opacity"
          >
            Mitra Pengrajin
          </Link>
          <Link
            href="/lokasi"
            className="hover:opacity-80 whitespace-nowrap transition-opacity"
          >
            Lokasi Sungailiat
          </Link>
          <a
            href={STORE_INFO.shopeeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 whitespace-nowrap transition-opacity"
          >
            Belanja di Shopee
          </a>
          <a
            href={STORE_INFO.whatsappDirectCta}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 whitespace-nowrap transition-opacity"
          >
            Chat WhatsApp
          </a>
        </div>
      </div>

      {/* Tier 2 Sticky Main Header — Mirrored 1:1 from tokomama.com */}
      <header className="sticky top-0 z-40 w-full transition-colors bg-brand-soft/95 backdrop-blur-sm border-b border-black/[0.04]">
        <div className="h-20 px-4 sm:px-6 lg:px-[10%] py-4 flex justify-between items-center max-w-[1600px] mx-auto">
          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Buka Menu Navigasi"
            className="lg:hidden p-2 text-brand-dark hover:bg-black/5 rounded-md transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Stacked Lowercase Friendly Brand Logo (Toko Mama signature silhouette) */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <span className="flex flex-col leading-none">
              <span className="font-inter font-extrabold text-[11px] tracking-[0.04em] lowercase text-brand-red -mb-0.5 pl-0.5">
                toko
              </span>
              <span className="font-inter font-black text-2xl sm:text-[26px] tracking-tight lowercase text-brand-red leading-none">
                amen snack
              </span>
            </span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-orange text-white shadow-sm group-hover:scale-105 transition-transform shrink-0">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <circle cx="9" cy="10" r="1.4" fill="currentColor" />
                <circle cx="15" cy="10" r="1.4" fill="currentColor" />
                <path
                  d="M8 14C9.1 15.6 10.5 16.4 12 16.4C13.5 16.4 14.9 15.6 16 14"
                  stroke="currentColor"
                  strokeWidth="2.1"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </Link>

          {/* Desktop Navigation — Clean Single Row matching tokomama.com */}
          <nav
            aria-label="Navigasi Utama"
            className="hidden lg:flex gap-8 items-center"
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
                    "relative font-inter font-semibold text-[15px] leading-7 py-1 whitespace-nowrap transition-opacity hover:opacity-80",
                    isActive ? "text-brand-red" : "text-brand-red/75"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute left-0 right-0 -bottom-0.5 h-[3px] rounded-full bg-brand-red" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Right Quick Action */}
          <a
            href={STORE_INFO.whatsappDirectCta}
            target="_blank"
            rel="noopener noreferrer"
            className="lg:hidden inline-flex items-center gap-1 rounded-full bg-brand-red/10 text-brand-red px-2.5 py-1 text-[11px] font-semibold"
          >
            <Phone className="w-3 h-3" />
            <span>WhatsApp</span>
          </a>
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
