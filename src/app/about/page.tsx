import type { Metadata } from "next";
import { AboutClient } from "./AboutClient";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Profil Toko Amen Snack Sungailiat — Amenitas Pariwisata resmi Bangka di Sisparnas Kemenpar dengan lini produk produksi internal bermerek AMS dan rating 4,5★ Google Maps.",
};

export default function AboutPage() {
  return <AboutClient />;
}
