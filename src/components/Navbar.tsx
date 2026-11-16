"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
      {/* Tier 1 Top Bar — Deep Navy Identity (#1C224F) */}
      <div className="hidden lg:flex h-8 bg-[#1C224F] px-6 lg:px-[100px] py-2 justify-between items-center text-white">
        <div className="text-[11px] font-medium text-slate-200 truncate mr-4">
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

      {/* Tier 2 Sticky Main Header — Clean White Surface for Official Logo Contrast */}
      <header className="sticky top-0 z-40 w-full transition-colors bg-white/95 backdrop-blur-sm border-b border-slate-200/80 shadow-[0_1px_12px_rgba(15,23,42,0.03)]">
        <div className="relative h-16 lg:h-20 px-4 sm:px-6 lg:px-[10%] flex items-center justify-center lg:justify-between max-w-[1600px] mx-auto">
          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Buka Menu Navigasi"
            className="lg:hidden absolute left-3 p-2 text-brand-red hover:bg-slate-100 rounded-md transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Official AMEN SNACK Logo + Wordmark */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <Image
              src="/images/logo-amen-snack.png"
              alt="Logo Resmi Toko Amen Snack"
              width={44}
              height={48}
              priority
              className="h-10 sm:h-12 w-auto object-contain group-hover:scale-105 transition-transform shrink-0"
            />
            <span className="flex flex-col leading-none">
              <span className="font-inter font-extrabold text-[9px] sm:text-[10px] uppercase tracking-[0.14em] text-brand-orange">
                Oleh-Oleh Bangka
              </span>
              <span className="font-inter font-black text-[17px] sm:text-xl tracking-tight text-brand-red leading-tight">
                Toko Amen Snack
              </span>
            </span>
          </Link>

          {/* Desktop Navigation — Clean Single Row with Red Active Accent */}
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
                    "relative font-inter font-semibold text-[15px] leading-7 py-1 whitespace-nowrap transition-colors",
                    isActive
                      ? "text-brand-red font-bold"
                      : "text-slate-600 hover:text-brand-red"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute left-0 right-0 -bottom-0.5 h-[3px] rounded-full bg-brand-orange" />
                  )}
                </Link>
              );
            })}
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
            className="fixed inset-0 bg-slate-900/45 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="fixed top-0 left-0 bottom-0 w-72 max-w-[82vw] bg-white shadow-2xl p-6 flex flex-col justify-between z-10 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-slate-200">
                <div className="flex items-center gap-2.5">
                  <Image
                    src="/images/logo-amen-snack.png"
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
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="border-t border-slate-200 mt-5 pt-4 flex flex-col gap-1 text-xs font-semibold text-brand-red">
                <Link
                  href="/about#supplier"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 hover:opacity-80 transition-opacity"
                >
                  Mitra Pengrajin Lokal
                </Link>
                <Link
                  href="/about#tenant"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 hover:opacity-80 transition-opacity"
                >
                  Kemitraan Reseller &amp; Grosir
                </Link>
              </div>
            </div>

            <div className="space-y-3 border-t border-slate-200 pt-5 mt-6">
              <div className="rounded-xl bg-brand-soft border border-slate-200 p-3.5 text-xs text-brand-dark space-y-1">
                <p className="font-bold flex items-center gap-1.5 text-brand-red">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  Toko Sungailiat
                </p>
                <p className="text-slate-600 leading-relaxed">
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
