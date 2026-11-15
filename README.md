# Toko Amen Snack Sungailiat — Pusat Oleh-Oleh & Camilan Khas Bangka

Aplikasi web resmi **Toko Amen Snack** (Toko Oleh-Oleh Khas Bangka Amen Snack) di Sungailiat, Kabupaten Bangka, dibangun menggunakan **Next.js 15 App Router**, **React 19**, **TypeScript**, dan **Tailwind CSS**.

Spesifikasi lengkap profil bisnis, katalog produk, sistem desain, dan pemetaan konten tersimpan di [project.md](project.md).

## Tech Stack

| Layer | Teknologi | Keterangan |
| :--- | :--- | :--- |
| **Framework & Routing** | Next.js 15 App Router + React 19 | Multi-route SSR/Static pages + API routes |
| **Language & Dev Server** | TypeScript + Turbopack | Strict typing & fast HMR (`npm run dev`) |
| **Styling & UI** | Tailwind CSS + Lucide React | Tema kuliner Bangka (`#E11D48`, `#F97316`, `#0F172A`, `#FFF1F2`) |
| **Carousels** | Embla Carousel (`embla-carousel-react`) | Carousel ulasan pelanggan |
| **Catalog & CMS API** | Structured Seed Data + `GET /api/cms` | Koleksi `products`, `categories`, `flyers`, `stores`, `blogs`, `testimonials` |
| **Local SEO** | Next.js Metadata API & Schema.org `LocalBusiness` | JSON-LD lengkap alamat Jl. Muhidin No.106 & jam operasional |
| **Infrastructure** | Nginx + Docker (port 3000) | `Dockerfile` & `nginx/nginx.conf` |

## Struktur Direktori

```text
Toko Amen Snack/
├── project.md                    # Spesifikasi lengkap konten & sistem desain
├── nginx/nginx.conf              # Reverse proxy + gzip + cache /_next/static/
├── public/
│   ├── images/                   # Placeholder terstruktur .webp (hero, banners, products, blog)
│   └── preview-standalone.html   # Preview HTML statis mandiri
├── src/
│   ├── app/
│   │   ├── about/                # /about — Profil Toko Amen Snack & Sisparnas Kemenpar
│   │   ├── api/cms/route.ts      # GET /api/cms — JSON storeInfo, featuredProducts & koleksi
│   │   ├── blog/                 # /blog — 3 artikel edukasi kuliner khas Bangka
│   │   ├── katalog/              # /katalog — Banner promo Cap AMEN & pengiriman nasional
│   │   ├── lokasi/               # /lokasi — Lokasi Jl. Muhidin No.106 Sungailiat + Maps & Waze
│   │   ├── produk/               # /produk — Filter 6 kategori + pencarian produk
│   │   ├── globals.css           # Design tokens Merah (#E11D48) & Oranye (#F97316)
│   │   ├── layout.tsx            # SEO Metadata, Google Fonts, & JSON-LD LocalBusiness
│   │   └── page.tsx              # Beranda (/)
│   ├── components/
│   │   ├── ui/                   # button.tsx, card.tsx, carousel.tsx
│   │   ├── CategoryIcon.tsx      # Mapping 6 ikon kategori Lucide
│   │   ├── Footer.tsx            # Footer gradasi merah-oranye & tautan kanal digital
│   │   ├── HomeClient.tsx        # Seluruh seksi utama halaman beranda
│   │   ├── MediaImage.tsx        # Next Image wrapper dengan graceful fallback
│   │   ├── Navbar.tsx            # Top announcement bar + sticky navbar + CTA Shopee/WA
│   │   ├── PageHeroBanner.tsx    # Banner header halaman dalam
│   │   ├── ProductCard.tsx       # Kartu produk dengan CTA WhatsApp & Shopee
│   │   └── WhatsAppFab.tsx       # Floating WhatsApp action button (0813-6872-2622)
│   ├── lib/utils.ts              # clsx + tailwind-merge helper
│   └── payload/
│       ├── payload.config.ts     # Skema koleksi Payload CMS
│       └── seed-data.ts          # Dataset resmi Toko Amen Snack Sungailiat
├── Dockerfile
├── next.config.ts
└── package.json
```

## Cara Menjalankan

```bash
# 1. Install dependencies (jika belum)
npm install

# 2. Jalankan development server (Turbopack)
npm run dev
# Buka http://localhost:3000

# 3. Build & jalankan production server
npm run build
npm run start
```
