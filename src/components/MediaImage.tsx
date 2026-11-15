"use client";

import React, { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaImageProps extends Omit<ImageProps, "onError"> {
  fallbackLabel?: string;
}

/**
 * Wrapper around Next.js Image that gracefully displays a clean branded fallback
 * card if a local placeholder or photo file is unavailable.
 */
export function MediaImage({
  alt,
  className,
  fallbackLabel,
  ...props
}: MediaImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center w-full h-full bg-brand-soft text-center p-4 border border-dashed border-brand-red/30",
          className
        )}
      >
        <ImageIcon className="w-8 h-8 text-brand-red/60 mb-2" aria-hidden="true" />
        <span className="text-xs font-semibold text-brand-dark line-clamp-2">
          {fallbackLabel || alt}
        </span>
        <span className="text-[10px] text-slate-500 mt-1">Foto produk (.webp)</span>
      </div>
    );
  }

  return (
    <Image
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      {...props}
    />
  );
}
