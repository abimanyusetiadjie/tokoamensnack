# Toko Amen Snack — Pusat Oleh-Oleh & Camilan Khas Bangka 

Website resmi **Toko Oleh-Oleh Khas Bangka Amen Snack** (*Jl. Muhidin No.106, Sungailiat, Kabupaten Bangka*)
---

## Ringkasan Profil Bisnis & Identitas Brand

- **Nama Resmi:** Toko Amen Snack (Toko Oleh-Oleh Khas Bangka Amen Snack)
- **Status Resmi:** Terdaftar sebagai **Amenitas Pariwisata Resmi di Kabupaten Bangka** pada Sisparnas Kementerian Pariwisata RI
- **Reputasi:** Rating **4,5 / 5,0 bintang** (100+ ulasan Google Maps)
- **House Brand Internal:** **Cap AMEN**
- **Alamat Toko Fisik:** Jl. Muhidin No.106, Sungailiat, Kec. Sungai Liat, Kabupaten Bangka, Kepulauan Bangka Belitung 33211
- **WhatsApp Business:** `0813-6872-2622` / `+62 813-6872-2622`
- **Jam Operasional:** Senin – Sabtu `07.00 – 21.00 WIB` • Minggu `10.00 – 15.00 WIB`
- **Kanal Resmi:** Shopee (`amensnack`), Instagram (`@toko.amensnack`), Google Maps (`ChIJx6EI03XzIi4RkYWEXb-mtBk`), Waze

---

## Pemetaan Arsitektur 

 dipertahankan dan disesuaikan menggunakan palet kuliner khas Bangka (**Primary Red `#E11D48`**, **Warm Orange `#F97316`**, **Soft Rose `#FFF1F2`**, **Dark Slate `#0F172A`**):

1. **Two-Tier Header & Sticky Navbar (`src/components/Navbar.tsx`)**
   - *Top announcement bar* merah tua dengan info layanan & tautan cepat kemitraan (`Mitra Pengrajin Lokal`, `Jam Buka & Rute`, `Reseller & Grosir`).
   - Sticky navbar 1 baris anti-wrap (`Beranda`, `Katalog`, `Produk`, `Lokasi Toko`, `Tentang Kami`, `Blog`) lengkap dengan garis indikator aktif di bawah tab dan pill CTA `Shopee` & `Pesan WhatsApp`.
2. **Hero Split Showcase (`src/components/HomeClient.tsx` Section 1)**
   - Lencana kredibilitas Sisparnas Kemenpar + 4.5★ Google Maps, *headline display*, tombol CTA ke katalog & WhatsApp, *trust proof strip*, serta visual *borderless* produk unggulan di sisi kanan.
3. **Watermark Band & Overlapping Rounded White Sheet Promo Carousel (Section 2)**
   - Strip pola watermark berulang di balik lembar putih membulat (`rounded-t-[32px]`) yang menampung **Embla `<Carousel>` Banner Promo** + modal *Lightbox ZoomIn*.
4. **Product Showcase Carousel & Grid 6 Kategori 3x2 (Section 3)**
   - **Embla `<Carousel>` Produk Terlaris** (`PRD-01` – `PRD-08`) lengkap dengan tombol beli per item ke WhatsApp & Shopee, diikuti grid 6 kategori (`bg-brand-soft/70`) berbingkai ikon putih persegi.
5. **Overlapping Full-Bleed Testimonials Band (Section 4)**
   - Seksi testimoni berlatar penuh `bg-brand-red` dengan kartu putih beravatar inisial & tanda kutip yang **menggantung tumpang-tindih (`-mb-28 md:-mb-36`)** masuk ke seksi di bawahnya.
6. **Value Pillars & 3 Proposition Banners (Section 5)**
   - Menerima kartu testimoni dengan padding atas lega (`pt-36 md:pt-48`), menampilkan 3 pilar keunggulan serta **3 banner proposisi visual (`PROPOSITION_BANNERS`)**.
7. **Lokasi Toko Sungailiat & Carousel Artikel Kuliner (Section 6 & 7)**
   - Kartu informasi lokasi fisik lengkap dengan tautan Google Maps, Waze, jam operasional, dan **Embla `<Carousel>` Artikel Kuliner Bangka**.
8. **3-Column Footer + Centered Social Bar (`src/components/Footer.tsx`)**
   - Gradasi merah-oranye dengan kolom `Ada pertanyaan?`, `Jelajahi Amen Snack`, `Layanan Pelanggan`, seksi `Follow us on social media`, dan catatan hak cipta.

---

## Struktur Halaman & API Route

- `/` — Beranda lengkap 7 seksi (`src/components/HomeClient.tsx`)
- `/katalog` — Galeri banner promo & ringkasan layanan online/offline (`src/app/katalog/`)
- `/produk` — Katalog produk interaktif dengan pencarian & filter 6 kategori (`src/app/produk/`)
- `/lokasi` — Informasi toko Jl. Muhidin No.106 Sungailiat, jam buka, Google Maps, Waze, & CTA pre-order (`src/app/lokasi/`)
- `/about` — Profil Toko Amen Snack, house brand Cap AMEN, 3 banner proposisi, & seksi `#supplier` / `#tenant` (`src/app/about/`)
- `/blog` — Panduan wisata kuliner Bangka (`src/app/blog/`)
- `/api/cms` — Endpoint JSON terstruktur untuk data katalog, kategori, banner promo, testimoni, toko, dan artikel (`src/app/api/cms/route.ts`)
- `/preview-standalone.html` — Pratinjau HTML statis mandiri dari seluruh halaman utama (`public/preview-standalone.html`)

---

## Struktur Aset Gambar (`.webp`)

Seluruh aset visual berada di `public/images/` dan siap diganti kapan saja dengan foto asli toko atau produk fisik tanpa mengubah kode komponen:

- `public/images/hero/toko-amen-hero.webp` (960x720)
- `public/images/banners/promo-cap-amen.webp`, `promo-pengiriman-nasional.webp`, `promo-paket-wisatawan.webp` (1200x675)
- `public/images/banners/proposition-1.webp`, `proposition-2.webp`, `proposition-3.webp` (800x500)
- `public/images/products/prd-01-*.webp` s.d. `prd-08-*.webp` (600x600)
- `public/images/blog/blog-1-*.webp` s.d. `blog-3-*.webp` (960x600)

---

## Pengembangan Lokal & Deployment

```bash
npm install
npm run dev       # Jalankan server lokal di http://localhost:3000
npx tsc --noEmit  # Verifikasi tipe TypeScript
npm run build     # Bangun bundle produksi Next.js
```

Konfigurasi kontainerisasi tersedia di `Dockerfile` dan `nginx.conf`, sedangkan skema koleksi CMS didefinisikan di `src/payload/payload.config.ts` dan `src/payload/seed-data.ts`.
