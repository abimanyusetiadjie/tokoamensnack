import React from "react";
import {
  Clock,
  ExternalLink,
  Instagram,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  ShoppingBag,
  Star,
} from "lucide-react";
import { PageHeroBanner } from "@/components/PageHeroBanner";
import { Card } from "@/components/ui/card";
import { STORE_INFO, STORES_COLLECTION } from "@/payload/seed-data";

/**
 * Physical store location, opening hours, Google Maps & Waze navigation page.
 */
export function LokasiClient() {
  const store = STORES_COLLECTION[0];

  return (
    <div className="min-h-screen bg-white overflow-x-clip">
      <PageHeroBanner
        breadcrumb="Lokasi Toko"
        badge="Amenitas Pariwisata Sisparnas Kemenpar • Rating 4.5★"
        title="Lokasi Toko Amen Snack Sungailiat"
        subtitle="Belanja langsung oleh-oleh khas Bangka di Jl. Muhidin No.106, Sungailiat atau pesan online ke seluruh Indonesia via WhatsApp dan Shopee."
      />

      <section className="py-12 sm:py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[10%]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Store Info Card */}
            <Card className="lg:col-span-7 brand-card rounded-3xl p-6 sm:p-8 border border-slate-200/80 bg-brand-soft flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-block text-xs font-bold uppercase tracking-wider text-white bg-brand-red px-3 py-1 rounded-full">
                    {store.branchCode}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    {STORE_INFO.rating} / 5.0 ({STORE_INFO.reviewCount}+ Ulasan)
                  </span>
                </div>

                <h2 className="font-inter font-extrabold text-2xl sm:text-3xl text-brand-dark">
                  {store.name}
                </h2>

                <div className="space-y-3.5 text-sm sm:text-base text-slate-700 pt-2">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-brand-dark">Alamat Lengkap</p>
                      <p className="mt-0.5 leading-relaxed">{STORE_INFO.address}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        Google Maps Place ID: {store.placeId}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-brand-dark">Jam Operasional</p>
                      <p className="mt-0.5">Senin – Sabtu: {store.openingHoursWeekday}</p>
                      <p>Minggu: {store.openingHoursSunday}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-brand-dark">Telepon &amp; WhatsApp Business</p>
                      <p className="mt-0.5 font-medium">
                        {STORE_INFO.phone} / {STORE_INFO.phoneInternational}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-200">
                <a
                  href={store.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-red hover:bg-brand-red-dark text-white font-semibold text-sm py-3.5 px-4 transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Buka di Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
                <a
                  href={store.wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-brand-red bg-white hover:bg-brand-soft text-brand-red font-semibold text-sm py-3.5 px-4 transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Navigasi via Waze</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
              </div>
            </Card>

            {/* Online Order & Social Channels Card */}
            <Card className="lg:col-span-5 rounded-3xl p-6 sm:p-8 border border-slate-800/10 bg-[#1C224F] text-white flex flex-col justify-between gap-6">
              <div>
                <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-amber-300 mb-3">
                  Pemesanan Daring &amp; Pengiriman Nasional
                </span>
                <h3 className="font-inter font-bold text-2xl">
                  Belanja dari Luar Pulau Bangka?
                </h3>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  Tidak sempat mampir ke Jl. Muhidin No.106 Sungailiat? Anda tetap bisa memesan
                  Kemplang Pasir Cap AMEN, Kemplang Panggang, Getas, dan oleh-oleh khas Bangka
                  lainnya secara online dengan pengiriman ke seluruh Indonesia.
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href={STORE_INFO.whatsappDirectCta}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm py-3.5 px-5 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Pesan via WhatsApp ({STORE_INFO.phone})</span>
                </a>

                <a
                  href={STORE_INFO.shopeeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-orange hover:bg-brand-orange-dark text-white font-bold text-sm py-3.5 px-5 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Shopee Official Store (amensnack)</span>
                </a>

                <a
                  href={STORE_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm py-3 px-5 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Follow Instagram {STORE_INFO.instagramHandle}</span>
                </a>
              </div>
            </Card>
          </div>

          {/* Bottom Pre-Order & Group Gift CTA Banner (1:1 Template Architecture) */}
          <div className="mt-10 rounded-3xl footer-gradient p-7 sm:p-10 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-200 mb-2">
                Layanan Rombongan &amp; Luar Kota
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold">
                Pesan Paket Oleh-Oleh Rombongan atau Kirim Luar Pulau
              </h2>
              <p className="text-sm text-slate-200 mt-2 leading-relaxed">
                Jadwalkan pengambilan paket oleh-oleh di Jl. Muhidin No.106 agar langsung siap bawa saat tiba di Sungailiat, atau kirim ke seluruh Indonesia via Shopee.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href={STORE_INFO.whatsappDirectCta}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white hover:bg-[#20bd5a] transition-colors shadow-sm"
              >
                <MessageCircle className="h-4 w-4" />
                Pre-Order via WhatsApp
              </a>
              <a
                href={STORE_INFO.shopeeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 py-3 text-sm font-bold text-white hover:bg-white/20 transition-colors"
              >
                <ShoppingBag className="h-4 w-4" />
                Kunjungi Shopee
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
