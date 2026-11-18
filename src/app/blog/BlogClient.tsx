"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, X } from "lucide-react";
import { PageHeroBanner } from "@/components/PageHeroBanner";
import { Card } from "@/components/ui/card";
import { MediaImage } from "@/components/MediaImage";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { buttonVariants } from "@/components/ui/button";
import { BLOGS_COLLECTION, STORE_INFO, type BlogPostItem } from "@/payload/seed-data";
import { BLOG_EN, useLanguage } from "@/lib/i18n";

/**
 * Culinary stories & Bangka souvenir guide page.
 */
export function BlogClient() {
  const { isEn, tx } = useLanguage();
  const [activePost, setActivePost] = useState<BlogPostItem | null>(null);
  const activeEn = activePost && isEn ? BLOG_EN[activePost.id] : undefined;

  return (
    <div className="min-h-screen bg-white overflow-x-clip">
      <PageHeroBanner
        breadcrumb={tx("Cerita & Kuliner", "Culinary Stories")}
        badge={tx("Edukasi Oleh-Oleh Khas Bangka", "Authentic Bangka Souvenir Guide")}
        title={tx("Cerita & Kuliner Khas Bangka", "Bangka Culinary Stories")}
        subtitle={tx(
          "Kenali perbedaan kemplang panggang, kemplang pasir, getas ikan, hingga oleh-oleh unik wajib bawa saat berkunjung ke Sungailiat.",
          "Explore differences between grilled kemplang, sand-roasted kemplang, mackerel getas, and must-buy souvenirs from Sungailiat."
        )}
      />

      <section className="py-12 sm:py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[10%]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOGS_COLLECTION.map((post) => {
              const enPost = isEn ? BLOG_EN[post.id] : undefined;
              return (
              <Card
                key={post.id}
                id={post.slug}
                className="scroll-mt-28 brand-card rounded-2xl overflow-hidden border border-slate-200/80 bg-white flex flex-col"
              >
                <div className="relative w-full aspect-[16/10] bg-brand-soft">
                  <MediaImage
                    src={post.imageUrl}
                    alt={enPost?.title ?? post.title}
                    fallbackLabel={enPost?.title ?? post.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-orange">
                      <Calendar className="w-3.5 h-3.5" />
                      {enPost?.publishedAt ?? post.publishedAt} • {enPost?.readTime ?? post.readTime}
                    </span>
                    <h2 className="font-bold text-lg text-brand-dark mt-2 leading-snug">
                      {enPost?.title ?? post.title}
                    </h2>
                    <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                      {enPost?.excerpt ?? post.excerpt}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActivePost(post)}
                    className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-red hover:text-brand-red-dark cursor-pointer w-fit"
                  >
                    <span>{tx("Baca Artikel Lengkap", "Read Full Article")}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Article Reader Modal */}
      {activePost && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeEn?.title ?? activePost.title}
          onClick={() => setActivePost(null)}
          className="fixed inset-0 z-50 bg-slate-900/80 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-2xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/80">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-red">
                <Calendar className="w-3.5 h-3.5" />
                {activeEn?.publishedAt ?? activePost.publishedAt} • {activeEn?.readTime ?? activePost.readTime}
              </span>
              <button
                type="button"
                onClick={() => setActivePost(null)}
                aria-label={tx("Tutup artikel", "Close article")}
                className="p-1.5 rounded-full hover:bg-brand-soft text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-6">
              <div className="relative w-full aspect-[16/10] min-h-[180px] sm:min-h-[260px] shrink-0 rounded-xl overflow-hidden mb-5 bg-brand-soft">
                <MediaImage
                  src={activePost.imageUrl}
                  alt={activeEn?.title ?? activePost.title}
                  fallbackLabel={activeEn?.title ?? activePost.title}
                  fill
                  priority
                  sizes="(min-width: 768px) 640px, 100vw"
                  className="object-cover"
                />
              </div>
              <h3 className="font-inter font-bold text-xl sm:text-2xl text-brand-dark leading-snug">
                {activeEn?.title ?? activePost.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-700 mt-4 leading-relaxed font-medium">
                {activeEn?.excerpt ?? activePost.excerpt}
              </p>
              <div className="mt-4 space-y-3">
                {(activeEn?.content ?? activePost.content).map((paragraph, index) => (
                  <p key={index} className="text-sm text-slate-600 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-slate-200/80 flex flex-wrap gap-3">
                <Link
                  href="/produk"
                  className={buttonVariants({
                    className: "rounded-full text-xs font-semibold",
                  })}
                >
                  {tx("Lihat Katalog Produk", "Browse Product Catalog")}
                </Link>
                <a
                  href={STORE_INFO.whatsappDirectCta}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({
                    variant: "outline",
                    className: "rounded-full text-xs font-semibold gap-1.5",
                  })}
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
