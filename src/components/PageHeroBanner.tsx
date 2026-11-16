import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface PageHeroBannerProps {
  breadcrumb: string;
  badge?: string;
  title: string;
  subtitle: string;
}

/**
 * Shared top header banner for inner pages (/katalog, /produk, /lokasi, /about, /blog).
 */
export function PageHeroBanner({
  breadcrumb,
  badge,
  title,
  subtitle,
}: PageHeroBannerProps) {
  return (
    <section className="bg-brand-soft pt-8 pb-10 sm:pt-10 sm:pb-12 border-b border-teal-900/10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[10%]">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-3"
        >
          <Link href="/" className="hover:text-brand-red transition-colors">
            Beranda
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-brand-red font-semibold">{breadcrumb}</span>
        </nav>

        {badge && (
          <span className="inline-block rounded-full bg-brand-red/10 text-brand-red font-semibold text-xs px-3 py-1 mb-3">
            {badge}
          </span>
        )}

        <h1 className="font-inter font-extrabold text-3xl sm:text-4xl lg:text-[42px] text-brand-dark leading-tight">
          {title}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
