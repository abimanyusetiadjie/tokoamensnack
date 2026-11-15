import type { Metadata } from "next";
import { BlogClient } from "./BlogClient";

export const metadata: Metadata = {
  title: "Cerita & Kuliner Khas Bangka",
  description:
    "Artikel edukasi kuliner khas Bangka: perbedaan kemplang panggang, kemplang pasir, getas ikan, 5 oleh-oleh wajib Sungailiat, hingga keunikan Indomie Kaldu Udang Bangka.",
};

export default function BlogPage() {
  return <BlogClient />;
}
