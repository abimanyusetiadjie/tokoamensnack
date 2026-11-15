"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, MessageCircle, ShoppingBag, Store, X } from "lucide-react";
import { STORE_INFO } from "@/payload/seed-data";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/#katalog", label: "Katalog Oleh-Oleh" },
  { href: "/#kategori", label: "Kategori" },
  { href: "/#keunggulan", label: "Keunggulan" },
  { href: "/#lokasi", label: "Lokasi Toko" },
];

export function Navbar() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {/* Tier 1: Top Announcement Bar */}
      <div className="bg-brand-red text-white text-xs py-2 px-4 sm:px-6 lg:px-[10%]">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <p className="font-medium leading-snug">{STORE_INFO.announcementText}</p>
          <div className="hidden md:flex items-center gap-4 text-[11px] font-semibold shrink-0">
            <Link href="/produk" className="hover:underline">
              Semua Produk
            </Link>
            <Link href="/katalog" className="hover:underline">
              Banner Promo
            </Link>
            <Link href="/about" className="hover:underline">
              Tentang Kami
            </Link>
          </div>
        </div>
      </div>

      {/* Tier 2: Main Sticky Navigation Bar */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-rose-100 shadow-2xs">
        <div className="h-20 px-4 sm:px-6 lg:px-[10%] flex justify-between items-center max-w-[1440px] mx-auto gap-4">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Buka menu"
              className="lg:hidden p-2 rounded-lg text-brand-dark hover:bg-brand-soft transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-brand-red to-brand-orange text-white shadow-sm group-hover:scale-105 transition-transform">
                <Store className="w-5 h-5" aria-hidden="true" />
              </span>
              <div className="flex flex-col leading-none select-none">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-brand-dark">
                  {STORE_INFO.logoTitle}
                </span>
                <span className="text-[11px] font-semibold text-brand-red mt-0.5">
                  {STORE_INFO.logoSubtitle}
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav aria-label="Navigasi utama" className="hidden lg:flex gap-6 xl:gap-8 items-center">
            {NAV_LINKS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href ||
                    (item.href === "/#katalog" && pathname === "/produk") ||
                    (item.href === "/#lokasi" && pathname === "/lokasi");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "font-inter font-semibold text-sm transition-colors py-1",
                    isActive
                      ? "text-brand-red"
                      : "text-slate-700 hover:text-brand-red"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right CTA Buttons */}
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href={STORE_INFO.shopeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center gap-1.5 rounded-full border border-brand-orange text-brand-orange-dark hover:bg-orange-50 font-semibold text-xs sm:text-sm px-4 py-2.5 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" aria-hidden="true" />
              <span>Belanja di Shopee</span>
            </a>

            <a
              href={STORE_INFO.whatsappDirectCta}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-brand-red hover:bg-brand-red-dark text-white font-semibold text-xs sm:text-sm px-4 py-2.5 shadow-sm transition-colors"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">Pesan via WhatsApp</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/45 backdrop-blur-xs"
            onClick={() => setDrawerOpen(false)}
          />
          <aside className="fixed top-0 left-0 bottom-0 w-76 max-w-[85vw] bg-white shadow-2xl p-6 flex flex-col justify-between z-10">
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-rose-100">
                <div className="flex flex-col leading-none">
                  <span className="text-lg font-extrabold text-brand-dark">
                    {STORE_INFO.logoTitle}
                  </span>
                  <span className="text-[11px] font-semibold text-brand-red mt-0.5">
                    {STORE_INFO.logoSubtitle}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Tutup menu"
                  className="p-2 rounded-lg text-slate-600 hover:bg-brand-soft"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-1.5">
                {NAV_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setDrawerOpen(false)}
                    className="px-3.5 py-2.5 rounded-xl text-sm font-semibold text-brand-dark hover:bg-brand-soft hover:text-brand-red transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                <hr className="my-2 border-rose-100" />
                <Link
                  href="/produk"
                  onClick={() => setDrawerOpen(false)}
                  className="px-3.5 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-brand-soft hover:text-brand-red"
                >
                  Filter Katalog Lengkap
                </Link>
                <Link
                  href="/katalog"
                  onClick={() => setDrawerOpen(false)}
                  className="px-3.5 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-brand-soft hover:text-brand-red"
                >
                  Promo & Highlight
                </Link>
                <Link
                  href="/blog"
                  onClick={() => setDrawerOpen(false)}
                  className="px-3.5 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-brand-soft hover:text-brand-red"
                >
                  Cerita & Kuliner Bangka
                </Link>
                <Link
                  href="/about"
                  onClick={() => setDrawerOpen(false)}
                  className="px-3.5 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-brand-soft hover:text-brand-red"
                >
                  Tentang Toko Amen Snack
                </Link>
              </nav>
            </div>

            <div className="pt-4 border-t border-rose-100 space-y-2.5">
              <a
                href={STORE_INFO.shopeeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-brand-orange text-brand-orange-dark font-semibold text-xs py-2.5 px-4"
              >
                <ShoppingBag className="w-4 h-4" />
                Belanja di Shopee
              </a>
              <a
                href={STORE_INFO.whatsappDirectCta}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand-red text-white font-semibold text-xs py-2.5 px-4"
              >
                <MessageCircle className="w-4 h-4" />
                Pesan via WhatsApp
              </a>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
