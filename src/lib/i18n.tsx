"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Lang = "id" | "en";

const STORAGE_KEY = "amen_lang";

interface LanguageContextValue {
  lang: Lang;
  isEn: boolean;
  setLang: (next: Lang) => void;
  toggleLang: () => void;
  tx: <T>(idVal: T, enVal: T) => T;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "id",
  isEn: false,
  setLang: () => {},
  toggleLang: () => {},
  tx: (idVal) => idVal,
});

/**
 * Lightweight zero-dependency i18n provider:
 * - SSR always renders Indonesian ("id") to prevent React hydration mismatch (#418).
 * - Persisted user preference is applied client-side right after mount (~0 ms).
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("id");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "id") {
        setLangState(saved);
        document.documentElement.lang = saved;
      }
    } catch {
      // Ignore storage errors in restricted private browsing modes
    }
  }, []);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
      document.documentElement.lang = next;
    } catch {
      // Ignore storage errors
    }
  };

  const toggleLang = () => setLang(lang === "id" ? "en" : "id");

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      isEn: lang === "en",
      setLang,
      toggleLang,
      tx: <T,>(idVal: T, enVal: T) => (lang === "en" ? enVal : idVal),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  return useContext(LanguageContext);
}

export const FOUNDED_DATE_EN = "June 1, 2007";

export const NAV_LABELS_EN: Record<string, string> = {
  "/": "Home",
  "/katalog": "Promos",
  "/produk": "Products",
  "/lokasi": "Store Location",
  "/about": "About Us",
  "/blog": "Blog",
};

export const FLYER_EN: Record<
  string,
  { title: string; badge: string; period: string; description: string; ctaLabel: string }
> = {
  "promo-cap-amen": {
    title: "Kemplang & Signature AMS Snacks",
    badge: "In-House AMS Production",
    period: "Available Daily",
    description:
      "Getas Bangka AMS, Kericu Telor Cumi AMS, Terasi Toboali AMS & Terasi Bubuk AMS crafted directly by Toko Amen Snack.",
    ctaLabel: "View AMS Products",
  },
  "promo-pengiriman-nasional": {
    title: "Nationwide Souvenir Delivery Across Indonesia",
    badge: "Online & In-Store",
    period: "Nationwide Shipping",
    description:
      "Order conveniently from anywhere via our official Shopee amensnack store or message our WhatsApp team at 0813-6872-2622.",
    ctaLabel: "Shop on Shopee",
  },
  "promo-paket-wisatawan": {
    title: "Visit Our Store at Jl. Muhidin No.106",
    badge: "Sisparnas Kemenpar • 4.5★ Google Maps",
    period: "Open Daily",
    description:
      "Shop fresh grilled kemplang, fish crackers (getas), Bangka roasted coffee, and curated souvenir hampers in Sungailiat.",
    ctaLabel: "Store Directions",
  },
};

export const CATEGORY_EN: Record<string, { title: string; description: string }> = {
  "kemplang-panggang": {
    title: "Grilled & Oven Kemplang",
    description: "Charcoal-grilled and oven-baked Bangka fish crackers with signature terasi chili dip.",
  },
  "kemplang-pasir": {
    title: "Sand-Roasted & Fried Kemplang",
    description: "Oil-free sand-roasted kemplang and crispy fried squid & fish crackers from Bangka.",
  },
  "getas-kerupuk": {
    title: "Getas & Fish Crackers",
    description: "Crispy Spanish mackerel getas crackers and authentic Bangka seafood snacks.",
  },
  "kericu-olahan-laut": {
    title: "Kericu & Seafood Snacks",
    description: "Savory squid-egg sticks (kericu) and dried coastal delicacies from Bangka Island.",
  },
  "bumbu-terasi": {
    title: "Bangka Spices & Shrimp Paste",
    description: "Authentic Bangka shrimp paste (terasi), traditional soy sauce, and culinary seasonings.",
  },
  "kopi-produk-khas": {
    title: "Coffee & Bangka Exclusives",
    description: "Traditional Bangka ground coffee, heritage cakes, and Bangka-exclusive instant noodles.",
  },
};

/** Maps live Supabase catalog category slugs on /produk to concise English labels. */
export const CATALOG_SLUG_EN: Record<string, string> = {
  "kemplang-panggang": "Grilled & Oven Kemplang",
  "kemplang-goreng": "Fried Kemplang & Crackers",
  "kemplang-pasir": "Sand-Roasted Kemplang",
  "getas-ampiang-kericu": "Getas, Ampiang & Kericu",
  "getas-kerupuk": "Getas & Fish Crackers",
  "terasi-bumbu-laut": "Terasi, Rusip & Seafood",
  "bumbu-terasi": "Spices & Terasi",
  "kopi-sirup-minuman": "Bangka Coffee, Syrup & Drinks",
  "kopi-produk-khas": "Coffee & Local Exclusives",
  "kue-dodol": "Traditional Cakes & Dodol",
  "camilan-kacang-keripik": "Snacks, Nuts, Chips & Floss",
  "permen-manisan": "Candies, Sweets & Preserves",
  sembako: "Daily Essentials",
  souvenir: "Bangka Shirts & Souvenirs",
};

export const PRODUCT_EN: Record<
  string,
  { badge: string; category: string; description: string }
> = {
  "prd-01": {
    badge: "In-House AMS",
    category: "Spices & Terasi",
    description: "Authentic 240g Bangka fermented shrimp paste crafted directly by AMS (121 sold).",
  },
  "prd-02": {
    badge: "AMS Bestseller (4.9★)",
    category: "Getas & Crackers",
    description: "Crispy round Spanish mackerel getas crackers crafted in-house by AMS, 250g pack (375 sold).",
  },
  "prd-03": {
    badge: "In-House AMS",
    category: "Getas & Crackers",
    description: "Crispy elongated Spanish mackerel getas crackers crafted in-house by AMS, 250g pack.",
  },
  "prd-04": {
    badge: "Convenient & Pure",
    category: "Spices & Terasi",
    description: "Ready-to-sprinkle Bangka fermented shrimp paste powder crafted by AMS (75 sold).",
  },
  "prd-05": {
    badge: "AMS Signature (4.9★)",
    category: "Kericu & Seafood",
    description: "Savory crunchy squid-egg kericu sticks (250g) crafted by AMS with zero preservatives (145 sold).",
  },
  "prd-06": {
    badge: "Bestseller (4.9★)",
    category: "Getas & Crackers",
    description: "Crispy savory mackerel fish crackers in a handy 250g pack (7,000+ sold).",
  },
  "prd-07": {
    badge: "Bangka Exclusive",
    category: "Bangka Exclusives",
    description: "Prawn-broth instant noodles distributed exclusively in Bangka (1,000+ sold).",
  },
  "prd-08": {
    badge: "Traveler Favorite",
    category: "Bangka Exclusives",
    description: "Special Bangka/Sumatra regional edition fried noodles loved by travelers.",
  },
  "prd-09": {
    badge: "Best Seller",
    category: "Grilled Kemplang",
    description: "Crispy grilled Belinyu fish crackers Cap JJ complete with rich spicy chili sauce.",
  },
  "prd-10": {
    badge: "Premium Quality",
    category: "Grilled Kemplang",
    description: "Authentic Belinyu grilled kemplang made with fresh Spanish mackerel.",
  },
  "prd-11": {
    badge: "Culinary Sauce",
    category: "Spices & Terasi",
    description: "Legendary Bangka savory light soy sauce for cooking and dipping.",
  },
  "prd-12": {
    badge: "Rich Aroma",
    category: "Coffee & Drinks",
    description: "No. 1 loose Bangka roasted ground coffee with bold, fragrant flavor.",
  },
};

export const PILLAR_EN: Record<string, { title: string; description: string }> = {
  "pillar-1": {
    title: "Authentic & Quality-Checked",
    description:
      "Featuring our own direct in-house AMS snacks and condiments alongside Bangka's finest local makers.",
  },
  "pillar-2": {
    title: "Honest Retail & Wholesale Prices",
    description:
      "Fair daily prices starting from Rp5,000 with value bundles for families and resellers.",
  },
  "pillar-3": {
    title: "Easy In-Store & Online Ordering",
    description:
      "Conveniently located on Jl. Muhidin Sungailiat with nationwide shipping via WhatsApp and Shopee.",
  },
};

export const TESTIMONIAL_EN: Record<string, { role: string; quote: string }> = {
  "testi-1": {
    role: "Traveler from Jakarta • Google Review",
    quote:
      "Every trip to Sungailiat always ends at Toko Amen Snack. AMS Bangka Getas, AMS Kericu, and Cap Obor getas are super crunchy, great terasi dip, and honest prices!",
  },
  "testi-2": {
    role: "Sungailiat Local • Google Review",
    quote:
      "Most complete Bangka souvenir shop on Jl. Muhidin. You can find Bangka Indomie Kaldu Udang, Cap SS soy sauce, and Belinyu grilled kemplang all in one stop.",
  },
  "testi-3": {
    role: "Shopee amensnack Customer",
    quote:
      "Regularly order kemplang boxes to Bandung via Shopee amensnack and WhatsApp. Secure packing — everything arrives intact and fresh.",
  },
  "testi-4": {
    role: "Out-of-Town Visitor • Google Review",
    quote:
      "Warm service and helpful staff when picking gifts for family in Palembang. Loose Bangka coffee and JJ 2.5 grilled kemplang are always favorites.",
  },
};

export const BLOG_EN: Record<
  string,
  {
    publishedAt: string;
    readTime: string;
    category: string;
    title: string;
    excerpt: string;
    content: string[];
  }
> = {
  "blog-1": {
    publishedAt: "Bangka Culinary Guide",
    readTime: "3 min read",
    category: "Snack Education",
    title: "Grilled Kemplang vs Sand-Roasted Kemplang vs Getas: What's the Difference?",
    excerpt:
      "Although all three share Spanish mackerel and tapioca flour, each cooking technique creates a distinct crunch and aroma.",
    content: [
      "Kemplang Panggang (Grilled Kemplang) is toasted over charcoal embers or baked until crisp with a smoky aroma, best paired with Bangka's sweet-spicy shrimp-paste chili dip.",
      "Kemplang Pasir is roasted in hot clean sand without cooking oil, keeping it crunchy, savory, and non-greasy for long trips.",
      "Getas are dense, bite-sized cylindrical or round fish crackers deep-fried to golden crispiness. Getas Bangka AMS (round & long) and Getas Istimewa Cap Obor are among our top sellers for their rich mackerel flavor.",
    ],
  },
  "blog-2": {
    publishedAt: "Traveler Picks",
    readTime: "4 min read",
    category: "Souvenir Tips",
    title: "5 Must-Buy Bangka Souvenirs When Visiting Sungailiat",
    excerpt:
      "Wondering what gifts to pack after visiting Sungailiat's beaches? Here are the 5 traveler favorites at Toko Amen Snack.",
    content: [
      "1. Getas Bangka AMS & Kericu Telor Cumi AMS — Signature in-house snacks crafted directly by Toko Amen Snack.",
      "2. Kemplang Panggang Belinyu & JJ 2.5 Blue Tie — Crisp grilled fish crackers prized for authentic Spanish mackerel flavor.",
      "3. Terasi AMS 240g & Terasi Bubuk AMS — Authentic Bangka fermented shrimp paste produced in-house by AMS.",
      "4. Cap SS Bangka Soy Sauce & Shrimp Paste — Essential Bangka pantry staples for home cooks.",
      "5. No. 1 Bangka Coffee & Indomie Kaldu Udang — Unique local finds that bring Bangka flavor straight to your kitchen.",
    ],
  },
  "blog-3": {
    publishedAt: "Local Exclusive",
    readTime: "3 min read",
    category: "Product Story",
    title: "Why Bangka's Exclusive Indomie Kaldu Udang Is a Traveler Favorite",
    excerpt:
      "Beyond fish crackers, travelers love grabbing Bangka-exclusive Prawn Broth and Bangka Fried Indomie as fun budget souvenirs.",
    content: [
      "Indomie Kaldu Udang (Prawn Broth) is not widely distributed outside Bangka, making it an unexpected souvenir gem inspired by coastal Bangka cuisine.",
      "At Toko Amen Snack Sungailiat, Indomie Kaldu Udang (Rp5,000) and Indomie Goreng Khas Bangka (Rp7,000) are top add-ons both in-store and on Shopee amensnack.",
      "Affordable and lightweight to pack, both regional varieties make thoughtful treats for friends and instant-noodle enthusiasts.",
    ],
  },
};
