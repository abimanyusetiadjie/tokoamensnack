"use client";

import React, { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { Package } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaImageProps extends Omit<ImageProps, "onError" | "src"> {
  src?: string | null;
  fallbackLabel?: string;
}

/**
 * Wrapper around Next.js Image that gracefully displays a clean branded fallback
 * card if an image URL is not yet uploaded or fails to load.
 */
export function MediaImage({
  src,
  alt,
  className,
  fallbackLabel,
  ...props
}: MediaImageProps) {
  const [hasError, setHasError] = useState(false);
  const cleanSrc = typeof src === "string" ? src.trim() : "";

  if (!cleanSrc || hasError) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-slate-50 via-white to-slate-100/80 text-center p-4",
          className
        )}
      >
        <div className="w-11 h-11 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center mb-2.5">
          <Package className="w-5 h-5" aria-hidden="true" />
        </div>
        <span className="text-xs font-bold text-brand-dark line-clamp-2 leading-snug max-w-[180px]">
          {fallbackLabel || alt}
        </span>
        <span className="text-[10px] font-medium text-slate-500 mt-1">
          Toko Amen Snack • Bangka
        </span>
      </div>
    );
  }

  return (
    <Image
      src={cleanSrc}
      alt={alt}
      decoding={props.decoding ?? "async"}
      className={className}
      onError={() => setHasError(true)}
      {...props}
    />
  );
}
