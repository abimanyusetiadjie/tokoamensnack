import type { Metadata } from "next";
import { LokasiClient } from "./LokasiClient";

export const metadata: Metadata = {
  title: "Lokasi Toko Sungailiat",
  description:
    "Kunjungi Toko Amen Snack di Jl. Muhidin No.106, Sungailiat, Kabupaten Bangka. Buka Senin–Sabtu (07.00–21.00 WIB) & Minggu (10.00–15.00 WIB).",
};

export default function LokasiPage() {
  return <LokasiClient />;
}
