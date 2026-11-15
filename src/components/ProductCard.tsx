import React from "react";
import { MessageCircle, ShoppingBag, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { MediaImage } from "@/components/MediaImage";
import { getProductWhatsappUrl, type ProductItem } from "@/payload/seed-data";

/**
 * Reusable Bangka product card with price, badge, rating, WhatsApp CTA, and Shopee link.
 */
export function ProductCard({ product }: { product: ProductItem }) {
  const waHref = getProductWhatsappUrl(product.name, product.formattedPrice);

  return (
    <Card className="brand-card rounded-2xl border border-rose-100 bg-white overflow-hidden h-full flex flex-col">
      <div className="relative w-full aspect-square bg-brand-slate">
        <MediaImage
          src={product.imageUrl}
          alt={product.name}
          fallbackLabel={product.name}
          fill
          sizes="(min-width: 1280px) 23vw, (min-width: 768px) 32vw, 48vw"
          className="object-contain p-3"
        />
        <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-brand-red text-white px-2.5 py-1 text-[10px] font-bold tracking-wide shadow-sm">
          {product.badge}
        </span>
      </div>

      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-3">
        <div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-orange">
              {product.category}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
              {product.rating.toFixed(1)}
            </span>
          </div>

          <h3 className="font-bold text-sm sm:text-base text-brand-dark mt-1.5 line-clamp-2 leading-snug">
            {product.name}
          </h3>

          <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="pt-3 border-t border-rose-50">
          <div className="flex items-baseline justify-between mb-3">
            <span className="text-[11px] font-medium text-slate-500">Harga Acuan</span>
            <span className="font-extrabold text-base text-brand-red">
              {product.formattedPrice}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand-red hover:bg-brand-red-dark text-white font-semibold text-xs py-2.5 px-2.5 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>WhatsApp</span>
            </a>
            <a
              href={product.shopeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-brand-orange text-brand-orange-dark hover:bg-orange-50 font-semibold text-xs py-2.5 px-2.5 transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>Shopee</span>
            </a>
          </div>
        </div>
      </div>
    </Card>
  );
}
