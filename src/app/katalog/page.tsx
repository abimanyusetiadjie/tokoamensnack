import type { Metadata } from "next";
import { KatalogClient } from "./KatalogClient";

export const metadata: Metadata = {
  title: "Promo & Highlight Layanan",
  description:
    "Lihat promo spesial produk bermerek AMS yang dikemas langsung di Toko Amen Snack dan layanan pengiriman oleh-oleh khas Bangka ke seluruh Indonesia via Shopee amensnack dan WhatsApp.",
};

export default function KatalogPage() {
  return <KatalogClient />;
}
