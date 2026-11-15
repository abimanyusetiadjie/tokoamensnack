export interface PayloadField {
  name: string;
  type: "text" | "textarea" | "number" | "checkbox" | "date" | "upload" | "relationship" | "array";
  required?: boolean;
  label?: string;
}

export interface PayloadCollectionConfig {
  slug: string;
  labels: {
    singular: string;
    plural: string;
  };
  admin: {
    useAsTitle: string;
    defaultColumns: string[];
  };
  fields: PayloadField[];
}

export interface PayloadCMSConfig {
  serverURL: string;
  collections: PayloadCollectionConfig[];
  globals: {
    slug: string;
    label: string;
    fields: PayloadField[];
  }[];
}

export const payloadConfig: PayloadCMSConfig = {
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  collections: [
    {
      slug: "flyers",
      labels: { singular: "Highlight Promo", plural: "Banner & Promo" },
      admin: { useAsTitle: "title", defaultColumns: ["title", "badge", "isActive"] },
      fields: [
        { name: "title", type: "text", required: true },
        { name: "badge", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
        { name: "imageUrl", type: "text", required: true },
        { name: "alt", type: "text", required: true },
        { name: "isActive", type: "checkbox" },
      ],
    },
    {
      slug: "products",
      labels: { singular: "Produk", plural: "Katalog Produk" },
      admin: { useAsTitle: "name", defaultColumns: ["code", "name", "category", "formattedPrice"] },
      fields: [
        { name: "code", type: "text", required: true },
        { name: "name", type: "text", required: true },
        { name: "category", type: "text", required: true },
        { name: "categorySlug", type: "text", required: true },
        { name: "price", type: "number" },
        { name: "formattedPrice", type: "text", required: true },
        { name: "badge", type: "text", required: true },
        { name: "rating", type: "number", required: true },
        { name: "description", type: "textarea", required: true },
        { name: "imageUrl", type: "text", required: true },
      ],
    },
    {
      slug: "categories",
      labels: { singular: "Kategori", plural: "Kategori Produk" },
      admin: { useAsTitle: "title", defaultColumns: ["title", "slug", "iconName"] },
      fields: [
        { name: "slug", type: "text", required: true },
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
        { name: "iconName", type: "text", required: true },
      ],
    },
    {
      slug: "testimonials",
      labels: { singular: "Testimoni", plural: "Ulasan Pelanggan" },
      admin: { useAsTitle: "name", defaultColumns: ["name", "rating"] },
      fields: [
        { name: "name", type: "text", required: true },
        { name: "role", type: "text", required: true },
        { name: "quote", type: "textarea", required: true },
        { name: "rating", type: "number", required: true },
      ],
    },
    {
      slug: "stores",
      labels: { singular: "Lokasi Toko", plural: "Lokasi Toko" },
      admin: { useAsTitle: "name", defaultColumns: ["name", "phone", "featuredOnHomepage"] },
      fields: [
        { name: "name", type: "text", required: true },
        { name: "branchCode", type: "text", required: true },
        { name: "address", type: "textarea", required: true },
        { name: "phone", type: "text", required: true },
        { name: "whatsappNumber", type: "text", required: true },
        { name: "mapsUrl", type: "text", required: true },
        { name: "wazeUrl", type: "text", required: true },
        { name: "openingHoursWeekday", type: "text", required: true },
        { name: "openingHoursSunday", type: "text", required: true },
        { name: "featuredOnHomepage", type: "checkbox" },
      ],
    },
    {
      slug: "blogs",
      labels: { singular: "Artikel Kuliner", plural: "Cerita & Kuliner Khas Bangka" },
      admin: { useAsTitle: "title", defaultColumns: ["title", "publishedAt"] },
      fields: [
        { name: "slug", type: "text", required: true },
        { name: "title", type: "text", required: true },
        { name: "publishedAt", type: "text", required: true },
        { name: "excerpt", type: "textarea", required: true },
        { name: "imageUrl", type: "text", required: true },
      ],
    },
  ],
  globals: [
    {
      slug: "site-settings",
      label: "Store Info & Site Settings",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "tagline", type: "text", required: true },
        { name: "address", type: "textarea", required: true },
        { name: "phone", type: "text", required: true },
        { name: "whatsappUrl", type: "text", required: true },
        { name: "instagramUrl", type: "text", required: true },
        { name: "shopeeUrl", type: "text", required: true },
        { name: "wazeUrl", type: "text", required: true },
      ],
    },
  ],
};
