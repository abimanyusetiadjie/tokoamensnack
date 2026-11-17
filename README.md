# Toko Amen Snack — Sungailiat, Bangka

Website katalog resmi, **AI + WhatsApp Store Assistant**, dan ekosistem kasir terintegrasi untuk **Toko Amen Snack Sungailiat** — *Pusat Oleh-Oleh & Camilan Khas Bangka Terlengkap (Terdaftar Resmi di Sisparnas Kemenpar)*.

🌐 **Live Production Website:** [https://tokoamensnack.vercel.app](https://tokoamensnack.vercel.app)

> **Catatan Handover & Dokumen Penting:**
> - [PROJECT_HANDOVER.md](./PROJECT_HANDOVER.md) — **Baca ini terlebih dahulu** untuk memahami seluruh arsitektur, status database, konfigurasi Vercel, status POS, dan roadmap pasca-pitching.
> - [WAHA_SETUP.md](./WAHA_SETUP.md) — Panduan menjalankan WhatsApp Chatbot Gateway (`WAHA NOWEB`) menggunakan Docker lokal atau VPS hemat RAM.
> - [.agent/rules/windows7-hardware-constraints.md](./.agent/rules/windows7-hardware-constraints.md) — Aturan wajib kompatibilitas hardware PC kasir toko (**Windows 7 SP1 / RAM 4 GB / Chrome 109**).

---

## Fitur Utama Website & Ekosistem

1. **Identitas Brand Resmi 60-30-10 (`AMEN SNACK`):**
   - **60% Clean White & Slate Neutral:** `#FFFFFF` / `#F8FAFC`
   - **30% Deep Navy Blue (Logo Segitiga AS):** `#2E3677` / `#1C224F`
   - **10% Crimson Red (Aksen Huruf S):** `#E93433` / `#C82322`
   - Tipografi: `Plus Jakarta Sans` (heading) & `Inter` (body).
   - Tata letak terstruktur: Top Bar informasi 3-tautan kanan, Navbar bersih dengan logo resmi `public/images/logo-amen-snack.png`, Hero banner, Slider Promo, Kategori Unggulan, Produk Terlaris, Edukasi/Blog, dan Footer lengkap.

2. **Sinkronisasi Live Supabase PostgreSQL (`1.446` Master SKU):**
   - Website terhubung langsung ke database PostgreSQL yang sama dengan sistem Kasir POS (`svelte-minimarket/`).
   - Menampilkan **`1.060` produk ritel aktif** dalam **`10` kategori publik** (`12` total kategori di sistem inventaris) lengkap dengan harga eceran, harga grosir, minimum qty grosir, berat pengiriman, dan status stok *real-time*.
   - Paginasi ketat **24 produk per halaman** agar tetap ringan di PC Windows 7 (Chrome 109 / RAM 4 GB) maupun ponsel pengunjung.

3. **Smart Search & Sinonim Khas Bangka (`src/lib/catalog.ts`):**
   - Pencarian server-side yang memahami variasi ejaan dan istilah lokal Bangka (`indomie` ↔ `indomi`, `amen` ↔ `ams`, `panggang` ↔ `oven`, `250 gr`/`250 gram` → `250g`, `1kg` ↔ `bal`) dengan urutan prioritas kecocokan nama produk.

4. **Dual-Engine AI + Deterministic Chatbot (`/api/chat`):**
   - Mendukung **Vercel AI SDK** (`google/gemini-3-flash` via Vercel AI Gateway) serta **Smart Store Assistant Deterministik** yang tetap menjawab akurat 100% langsung dari PostgreSQL walau tanpa kuota LLM:
     - **Multi-Turn Memory** (mengingat nama produk dari pertanyaan sebelumnya).
     - **Perbandingan Multi-Ukuran** (`"Cek Getas 250g & 500g"`).
     - **Kalkulator Pesanan, Estimasi Berat (kg) & Link Checkout WhatsApp Admin Otomatis** (`"Pesan 2 Getas AMS 250g"`).

5. **WhatsApp Business Chatbot Terpadu via WAHA (`/api/webhooks/whatsapp`):**
   - Siap dihubungkan ke container ringan **WAHA `NOWEB`** (`docker-compose.waha.yml`, hanya ~150–220 MB RAM tanpa Chromium).
   - Mendukung resolusi ID privasi `@lid`, status `sendSeen` & `typing`, anti-echo loop, riwayat chat persisten (`wa_conversations` / `wa_messages`), serta **Smart Human-Takeover** (otomatis jeda bot 30 menit saat Admin membalas manual, `#stop`/`#admin` untuk jeda 12 jam, `#bot`/`#lanjut` untuk mengaktifkan ulang).

---

## Struktur Workspace

```text
Toko Amen Snack/
├── src/
│   ├── app/
│   │   ├── page.tsx, layout.tsx, globals.css   # Beranda & tema 60-30-10 Navy/Crimson
│   │   ├── produk/, katalog/, lokasi/, about/, blog/
│   │   └── api/
│   │       ├── products/route.ts               # API katalog live Supabase
│   │       ├── chat/route.ts                   # Chatbot Widget API
│   │       └── webhooks/whatsapp/route.ts      # Webhook WAHA / Fonnte / Meta
│   ├── components/                             # Navbar, Footer, HomeClient, ChatbotWidget, ProductCard
│   ├── lib/                                    # db.ts, catalog.ts, chatbot-fallback.ts, chatbot-tools.ts, whatsapp-service.ts
│   └── payload/seed-data.ts                    # Data fallback darurat & konten artikel blog
├── public/images/                              # Logo resmi, hero, banner promo, proposisi, produk (.webp)
├── svelte-minimarket/                          # Sistem Kasir POS, Gudang & Barcode (SvelteKit 2 + Tailwind v3.4, terpisah di .gitignore)
├── .agent/rules/windows7-hardware-constraints.md
├── docker-compose.waha.yml                     # Docker WAHA engine NOWEB (hemat RAM)
├── WAHA_SETUP.md                               # Panduan aktivasi WhatsApp WAHA
├── PROJECT_HANDOVER.md                         # Dokumen lengkap serah terima antar akun/tim
└── .env.example                                # Template variabel environment
```

---

## Peta Aset Gambar (`public/images/`)

- `public/images/logo-amen-snack.png` — Logo resmi segiempat/segitiga **AMEN SNACK**
- `public/images/hero/toko-amen-hero.webp` — Ilustrasi utama nampan bambu camilan Bangka (transparan RGBA)
- `public/images/banners/watermark-pattern.webp` — Pola watermark latar belakang Navy `#2E3677`
- `public/images/banners/promo-cap-amen.webp` — Banner promo spesial Cap Amen
- `public/images/banners/promo-pengiriman-nasional.webp` — Banner promo pengiriman seluruh Indonesia
- `public/images/banners/promo-paket-wisatawan.webp` — Banner paket oleh-oleh wisatawan
- `public/images/banners/proposition-1.webp` s.d. `proposition-3.webp` — 3 kartu proposisi keunggulan toko
- `public/images/products/prd-01-*.webp` s.d. `prd-08-*.webp` — Visual produk unggulan (Kemplang Pasir, Getas, Indomie Kaldu Udang Bangka, dll.)
- `public/images/blog/blog-1-*.webp` s.d. `blog-3-*.webp` — Gambar artikel blog edukasi

---

## Menjalankan Secara Lokal (Development)

> **Prasyarat Teknis:** Wajib mempertahankan **Tailwind CSS v3.4 (`^3.4.17`)** agar tetap kompatibel 100% dengan browser Chrome 109 di PC Windows 7 kasir toko.

1. Instal dependensi:
   ```bash
   npm install
   ```
2. Salin `.env.example` menjadi `.env.local` dan lengkapi koneksi database:
   ```bash
   cp .env.example .env.local
   ```
   Isi minimal `DATABASE_URL` (PostgreSQL / Supabase Pooler) dan opsional `AI_MODEL="google/gemini-3-flash"`, `AI_GATEWAY_API_KEY`, serta kredensial `WAHA_*`.
3. Jalankan server development:
   ```bash
   npm run dev
   ```
4. Verifikasi typecheck & build produksi:
   ```bash
   npx tsc --noEmit
   npm run build
   ```
   Buka `http://localhost:3000` di browser.

---

## Informasi Kontak Toko

- **Alamat:** Jl. Muhidin No.106, Sungailiat, Kabupaten Bangka, Kepulauan Bangka Belitung 33211 *(Seberang Puncak Mall / Samping Warkop Papa)*
- **WhatsApp Admin / Pemesanan:** `0813-6872-2622`
- **Shopee Official:** `https://shopee.co.id/amensnack`
