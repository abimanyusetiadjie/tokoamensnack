import type { MetadataRoute } from "next";

const BASE_URL = "https://tokoamensnack.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/katalog", "/produk", "/lokasi", "/about", "/blog"];
  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date("2026-11-16"),
    changeFrequency: route === "" || route === "/produk" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route === "/produk" ? 0.9 : 0.8,
  }));
}
