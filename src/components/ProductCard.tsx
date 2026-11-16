import React from "react";
import { MessageCircle, ShoppingBag, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { MediaImage } from "@/components/MediaImage";
import { getProductWhatsappUrl, type ProductItem } from "@/payload/seed-data";
import type { WebProduct } from "@/lib/catalog";

type ProductCardInput = ProductItem | WebProduct;

/**
 * Reusable Bangka product card with retail/wholesale pricing, stock indicator, WhatsApp CTA, and Shopee link.
 */
export function ProductCard({ product }: { product: ProductCardInput }) {
  const waHref = getProductWhatsappUrl(product.name, product.formattedPrice);
  const wholesalePrice =
    "formattedWholesalePrice" in product ? product.formattedWholesalePrice : null;
  const stock = "stock" in product ? product.stock : null;
  const weightGrams = "weightGrams" in product ? product.weightGrams : null;
  const unit = "unit" in product ? product.unit : null;

  const metaBits: string[] = [];
  if (weightGrams) {
    metaBits.push(
      weightGrams >= 1000
        ? `${(weightGrams / 1000).toFixed(weightGrams % 1000 === 0 ? 0 : 1)} kg`
        : `${weightGrams}g`
    );
  }
  if (unit) metaBits.push(unit);

  return (
    <Card className="brand-card rounded-2xl border border-slate-200/80 bg-white overflow-hidden h-full flex flex-col">
      <div className="relative w-full aspect-square bg-[#fafaf8]">
        <MediaImage
          src={product.imageUrl}
          alt={product.name}
          fallbackLabel={product.name}
          fill
          sizes="(min-width: 1280px) 23vw, (min-width: 768px) 32vw, 48vw"
          className="object-contain p-4"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-brand-orange text-white px-2.5 py-1 text-[10px] font-bold tracking-wide shadow-sm">
            {product.badge}
          </span>
        )}
        {stock !== null && (
          <span
            className={`absolute bottom-2.5 right-2.5 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold border ${
              stock > 0
                ? "bg-emerald-50/95 text-emerald-800 border-emerald-200"
                : "bg-rose-50/95 text-rose-700 border-rose-200"
            }`}
          >
            {stock > 0 ? "Stok Ready" : "Stok Habis"}
          </span>
        )}
      </div>

      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-3">
        <div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-red/80 truncate">
              {product.category}
            </span>
            {metaBits.length > 0 ? (
              <span className="text-[10px] font-semibold text-slate-500 shrink-0">
                {metaBits.join(" • ")}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 shrink-0">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                {product.rating.toFixed(1)}
              </span>
            )}
          </div>

          <h3 className="font-bold text-sm sm:text-base text-brand-dark mt-1.5 line-clamp-2 leading-snug">
            {product.name}
          </h3>

          <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100">
          <div className="flex items-baseline justify-between gap-2 mb-1">
            <span className="text-[11px] font-medium text-slate-500">Harga Eceran</span>
            <span className="font-extrabold text-base text-brand-red">
              {product.formattedPrice}
            </span>
          </div>
          {wholesalePrice && (
            <div className="flex items-baseline justify-between gap-2 mb-2.5">
              <span className="text-[11px] font-medium text-slate-500">Harga Grosir</span>
              <span className="font-bold text-xs text-brand-orange-dark bg-rose-50 px-2 py-0.5 rounded-full">
                {wholesalePrice}
              </span>
            </div>
          )}
          {!wholesalePrice && <div className="mb-2" />}

          <div className="grid grid-cols-2 gap-2">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs py-2.5 px-2.5 transition-colors shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>WhatsApp</span>
            </a>
            <a
              href={product.shopeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-brand-red/30 text-brand-red hover:bg-slate-50 font-semibold text-xs py-2.5 px-2.5 transition-colors"
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
