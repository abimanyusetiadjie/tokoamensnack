# PROJECT HANDOVER — Toko Amen Snack Sungailiat

> **Dokumen Serah Terima Teknis & Bisnis (Single Source of Truth)**  
> Terakhir diperbarui: **2026-11-17** | Posisi Git `main`: commit `c531eca` | Status: **100% Siap Pitching & Live di Vercel**

---

## 1. Prompt Cepat untuk Akun Antigravity Baru (Quick-Start Prompt)

Jika Anda melanjutkan pengerjaan di **akun Antigravity baru** atau **sesi percakapan baru**, cukup salin-tempel prompt ini sebagai pesan pertama:

```text
Tolong baca file PROJECT_HANDOVER.md, README.md, WAHA_SETUP.md, dan .agent/rules/windows7-hardware-constraints.md untuk memahami status terakhir project Toko Amen Snack Sungailiat sebelum kita lanjut kerja.
```

---

## 2. Profil Bisnis & Identitas Brand (Aturan 60-30-10)

| Atribut | Detail Resmi |
| --- | --- |
| **Nama Usaha** | **Toko Amen Snack** — Pusat Oleh-Oleh & Camilan Khas Bangka Terlengkap di Sungailiat |
| **Alamat Toko Fisik** | Jl. Muhidin No.106, Sungailiat, Kabupaten Bangka, Kepulauan Bangka Belitung 33211 *(Seberang Puncak Mall / Samping Warkop Papa)* |
| **WhatsApp Resmi / Admin** | `0813-6872-2622` (`6281368722622`) |
| **Shopee Resmi** | `https://shopee.co.id/amensnack` |
| **Pengakuan Resmi** | Terdaftar di **Sisparnas Kemenpar** (Destinasi Wisata Belanja Resmi Kabupaten Bangka) |
| **Logo Resmi Website** | `public/images/logo-amen-snack.png` |
| **Logo Resmi POS & Gudang** | `svelte-minimarket/static/logo.png` *(disinkronkan identik dari `logo-amen-snack.png`)* |

### Sistem Warna Brand Resmi (60-30-10 Rule)
Diambil langsung dari warna emblem segitiga **AS / AMEN SNACK**:
- **60% Clean White & Slate Neutral:** `#FFFFFF` / `#F8FAFC` *(latar bersih, keterbacaan tinggi, nuansa ritel higienis)*
- **30% Deep Navy Blue (Segitiga AS):** `#2E3677` / `#1C224F` *(warna utama header/footer, tombol aksi utama, kartu highlight, navigasi aktif)*
- **10% Crimson Red (Huruf S):** `#E93433` / `#C82322` *(aksen CTA konversi, badge promo/grosir, indikator penting)*

---

## 3. Aturan Mutlak Perangkat Keras Kasir (Windows 7 Hardware Constraint)

Aturan ini bersifat **permanen** dan terdokumentasi di `.agent/rules/windows7-hardware-constraints.md`.

### Spesifikasi PC Kasir Resmi di Toko Fisik
- **Sistem Operasi:** `Windows 7 Ultimate Service Pack 1 (64-bit)`
- **Prosesor / APU:** `AMD PRO A4-3350B APU with Radeon R4 Graphics @ 2.00 GHz (Dual-Core)`
- **Memori (RAM):** `4,00 GB` *(3,44 GB dapat digunakan)*
- **Batas Browser Maksimum:** `Google Chrome 109` / `Microsoft Edge 109` / `Mozilla Firefox 115 ESR`

### 5 Aturan Rekayasa Wajib
1. **Wajib Tailwind CSS v3.4 Only — DILARANG Upgrade ke Tailwind v4:**
   - Root Website memakai `tailwindcss` `^3.4.17`; POS `svelte-minimarket/` sudah di-downgrade dari Tailwind v4 (`@tailwindcss/vite`) ke `tailwindcss` `^3.4.19` + `postcss.config.js` + `tailwind.config.js`.
   - CSS hasil build **harus memiliki `0` `oklch()`, `0` `color-mix()`, dan `0` `@property`** karena fitur CSS tersebut baru didukung Chrome 111+ dan menyebabkan warna hilang/transparan di Chrome 109 Windows 7.
2. **Wajib Paginasi Ketat & Batas Render DOM (24–51 Item):**
   - Jangan pernah me-render ribuan produk sekaligus di DOM browser 4 GB RAM:
     - **Website `/produk`:** maksimal `24` kartu produk per muat (`Muat Lebih Banyak`).
     - **POS `/pos` Modal Katalog Cepat:** `50` item per halaman (`CATALOG_LIMIT = 50`, pencarian ter-debounce `250 ms`).
     - **Admin Inventaris `/admin/inventory`:** `50` item per halaman (`PAGE_SIZE = 50`).
     - **Dropdown Gudang Masuk `/admin/gudang/masuk`:** maksimal `50` item di DOM (`visibleProductsForSelect`).
     - **Cetak Barcode `/admin/barcodes`:** `51` item per halaman (`PAGE_SIZE = 51`, pas `17 baris × 3 kolom` kertas label thermal roll **Zenpert 4T520** `33×15mm`).
3. **Server-Side Search & Debounce `250 ms`:**
   - Pencarian produk dijalankan di server PostgreSQL/Supabase, bukan mem-fetch ribuan baris ke browser.
4. **Arsitektur Thin Client & Efisiensi Cache:**
   - Node.js 18+ tidak dapat berjalan secara native di Windows 7. PC kasir Windows 7 hanya bertindak sebagai **thin browser client** yang mengakses aplikasi dari Cloud/VPS.
   - Cache katalog lokal di `svelte-minimarket/src/lib/stores/local-catalog.svelte.ts` dibatasi maksimum `MAX_CACHE_ENTRIES = 300` (MRU eviction) dengan penulisan `localStorage` ter-debounce `250 ms` (`schedulePersistCatalog`).
5. **Keamanan Data Modal (HPP):**
   - Endpoint publik dan Chatbot **dilarang keras** mengambil atau menampilkan kolom `cost_price` maupun `base_hpp`.

---

## 4. Arsitektur Workspace (2 Modul Terintegrasi)

Repository workspace ini menaungi dua aplikasi dalam satu folder kerja, berbagi **1 database Supabase PostgreSQL yang sama**:

### Modul 1 — Website Katalog Publik & AI/WAHA Chatbot (`./` Root Directory)
- **Tech Stack:** Next.js 15 (`^15.1.6`, App Router), React 19, TypeScript 5, Tailwind CSS `^3.4.17`, `pg` (PostgreSQL Pool), Vercel AI SDK (`ai` `^7.0.173`, `@ai-sdk/react` `^4.0.177`).
- **Git Remote:** `https://github.com/abimanyusetiadjie/tokoamensnack.git` (branch `main`).
- **Live Production URL:** `https://tokoamensnack.vercel.app`
  - **Vercel Project ID:** `prj_6OcNignWBizqRILbG45vLJXeCCEz`
  - **Vercel Team:** `AS CORP` (`team_xthFS9wu3YSh3Kkz9zmHHT5f`)
  - **Production Deployment Terverifikasi:** `dpl_3i4fiQUfbmpB26P43CcehS7pACqT` (`READY`)
- **Environment Variables Aktif di Vercel (`production` & `preview`):**
  - `DATABASE_URL` *(encrypted — Supabase PostgreSQL Pooler)*
  - `AI_MODEL` = `google/gemini-3-flash`
- **Halaman & Route Penting:**
  - `/` (`src/app/page.tsx`, `src/components/HomeClient.tsx`) — Beranda gaya `tokomama.com` dengan warna Navy/Crimson, promo banner, kategori unggulan, dan produk terlaris.
  - `/produk` (`src/app/produk/page.tsx`) & `/katalog` (`src/app/katalog/page.tsx`) — Katalog live dari Supabase (`1.060` produk).
  - `/lokasi`, `/about`, `/blog` — Profil toko, peta/lokasi Sungailiat, dan artikel edukasi oleh-oleh Bangka.
  - `/api/products` (`src/app/api/products/route.ts`) — API katalog publik dengan smart search & sinonim Bangka.
  - `/api/chat` (`src/app/api/chat/route.ts`) — Endpoint AI & Smart Store Chatbot widget website (`src/components/ChatbotWidget.tsx`).
  - `/api/webhooks/whatsapp` (`src/app/api/webhooks/whatsapp/route.ts`) — Webhook WhatsApp terpadu (WAHA `NOWEB`, Fonnte, Meta Cloud API).

### Modul 2 — Sistem Kasir POS, Gudang & Admin (`./svelte-minimarket/`)
- **Tech Stack:** SvelteKit 2 (`^2.16.0`) + Svelte 5 (`^5.0.0`), Tailwind CSS `^3.4.19`, `pg`, `jsbarcode` + `qrcode` (Zenpert 4T520 3-kolom), `html5-qrcode`, `apexcharts`, `bcryptjs`, `jose`, `@sveltejs/adapter-node` / `adapter-auto`.
- **Status Integrasi Shopee:** **Telah dihapus 100%** dari POS & Admin (termasuk skrip migrasi DB `002_remove_shopee_integration.sql`). Hanya tautan eksternal `stores.shopee_url` yang dipertahankan di database untuk tombol belanja di Website publik.
- **Status Verifikasi Terakhir `svelte-minimarket/`:**
  - `npm run check`: `0 errors` (hanya 8 warning bawaan).
  - `npx vitest run`: `2` file test lulus (`10` test case lulus).
  - `npm run build`: sukses (`✔ done`), CSS terkompilasi (`0.DQQaJgVU.css`, `5.CPCsnbYw.css`, `6.B3CZhFFB.css`) terverifikasi **`oklch=0`, `color-mix=0`, `@property=0`**.
  - Halaman depan `src/routes/+page.server.ts` langsung membaca jumlah produk aktif riil dari PostgreSQL (`1251` item aktif).

> [!IMPORTANT]
> **Catatan Penting `.gitignore` Saat Pindah Akun / Pindah Laptop:**
> File `.gitignore` di root repository me-**ignore** folder `svelte-minimarket/`, `.env.local`, dan seluruh `.env*` (kecuali `!.env.example`).
> - Jika Anda **hanya berganti akun Antigravity di laptop/PC yang sama**, `svelte-minimarket/` dan `.env.local` **tetap aman di disk**.
> - Jika Anda **pindah ke komputer/laptop baru**, selain `git clone`, Anda **wajib menyalin manual** folder `svelte-minimarket/` dan file `.env.local` (serta `svelte-minimarket/.env`).

---

## 5. Status Database (Supabase PostgreSQL — Single Source of Truth)

### Koneksi & Ukuran
- **Engine:** PostgreSQL via Supabase Pooler (`aws-1-ap-northeast-1.pooler.supabase.com:5432`)
- **Format DSN (Disamarkan):** `postgresql://postgres.<PROJECT_REF>:<PASSWORD>@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres` *(simpan nilai asli hanya di `.env.local`, `svelte-minimarket/.env`, dan Vercel Environment Variables — jangan pernah commit ke Git)*.
- **Ukuran Database Saat Ini:** ~`13 MB` (sangat ringkas dan cepat).

### Skema & Statistik Data Riil
Skema SQL tersimpan di `svelte-minimarket/database/`:
1. `001_toko_amen_snack_clean.sql`
2. `002_whatsapp_chat_history.sql`
3. `002_remove_shopee_integration.sql`

Jumlah data terverifikasi saat ini:
- **`products`:** `1.446` total master SKU:
  - `1.251` item aktif di POS (`is_active = true OR is_active IS NULL`).
  - `1.060` item tampil di Website publik (`retail_price > 0`, aktif, non-internal/non-bahan-baku).
- **`product_units`:** `1.446` baris (harga eceran `retail_price`, harga grosir `wholesale_price`, batas qty grosir `min_wholesale_qty`, dan multi-satuan dus/bal/pak/kg/ons).
- **`categories`:** `12` total kategori (`10` kategori publik tampil di `/api/products`).
- **`users`:** `2` akun awal (`owner` & `kasir` — **wajib ganti password sebelum operasional live**).
- **Tabel Pendukung:** `stores`, `store_knowledge`, `wa_conversations`, `wa_messages`, `shifts`, `orders`, `order_items`, `stock_movements`, `audit_logs`, `suppliers`, `promotions`.

### Keputusan Arsitektur Database: Wajib Tetap PostgreSQL (Dilarang Migrasi ke MySQL)
Analisis mendalam telah dilakukan terhadap rencana migrasi ke MySQL dan **ditolak** karena:
- Terdapat **159 titik query SQL** (`18` di Next.js + `141` di SvelteKit POS) yang menggunakan fitur spesifik PostgreSQL:
  - Parameter posisi `$1`, `$2`, pencarian `ILIKE`, filter array `ANY($1)`, `RETURNING`, `ON CONFLICT (...) DO UPDATE`, `LEFT JOIN LATERAL`, `FOR UPDATE OF`, `DATE_TRUNC`, `make_interval`, serta tipe data `UUID`, `TIMESTAMPTZ`, dan `JSONB`.
- Mempertahankan PostgreSQL (Supabase atau nantinya Docker PostgreSQL 16 di VPS) menjaga sistem POS, transaksi kasir, laporan, dan chatbot berjalan **100% stabil tanpa risiko bug inkonsistensi tipe data maupun locking**.
- **Catatan Bila Migrasi ke Docker PostgreSQL Lokal di VPS Nanti:** Periksa pengaturan `ssl` di `src/lib/db.ts` dan `svelte-minimarket/src/lib/server/db.ts`. Saat ini koneksi ke host selain `localhost`/`127.0.0.1` otomatis menyalakan `ssl: { rejectUnauthorized: false }` untuk kebutuhan Supabase.

---

## 6. Sistem AI Chatbot & Integrasi WhatsApp WAHA

Chatbot menggunakan **1 otak terpusat** untuk dua kanal: **Widget Website `"Tanya Toko"`** (`/api/chat`) dan **WhatsApp Otomatis** (`/api/webhooks/whatsapp`).

### A. Dual-Engine AI + Deterministic Store Assistant (`src/app/api/chat/route.ts`, `src/lib/chatbot-fallback.ts`, `src/lib/chatbot-tools.ts`)
1. **Engine 1 — Cloud LLM (Opsional):** Menggunakan Vercel AI SDK (`streamText` + tools `searchProducts`, `getStoreKnowledge`, `calculateShippingEstimate`) saat `AI_GATEWAY_API_KEY` atau Vercel AI Gateway OIDC aktif.
2. **Engine 2 — Deterministic Smart Store Assistant (Aktif 100% Tanpa Kuota LLM):**
   - **Smart Search & Sinonim Bangka (`src/lib/catalog.ts`):** `normalizeProductQueryTokens` dan `expandTokenVariants` menangani variasi istilah populer dan salah ketik (`indomie` ↔ `indomi`, `amen` ↔ `ams`, `panggang` ↔ `oven`, `250 gr`/`250 gram` → `250g`, `1kg`/`kg` ↔ `bal`) serta mengutamakan kecocokan nama produk (`CASE WHEN p.name ILIKE ... THEN 0`).
   - **Multi-Turn Memory (`ChatHistoryEntry[]`):** Mengingat konteks produk dari percakapan sebelumnya (contoh: user bertanya `"Harga Getas AMS berapa?"` lalu lanjut `"yang 500g ada?"`).
   - **Multi-Weight Comparison (`extractWeightTokens`):** Membandingkan beberapa varian berat dalam satu respons (contoh: `"Cek Getas 250g & 500g"`).
   - **Kalkulator Order, Berat & Link Checkout Otomatis (`extractOrderIntent`):** Menghitung subtotal harga, estimasi berat total (kg), info hemat grosir, dan menghasilkan link `https://wa.me/6281368722622?text=...` (dengan `encodeWaText` yang meng-encode `(` dan `)` menjadi `%28` dan `%29` agar Markdown link di `ChatbotWidget.tsx` selalu rapi).
   - **Ringkasan Katalog Live:** Menjawab pertanyaan jumlah stok/produk langsung dari database (`1.060` varian produk aktif dalam `10` kategori publik).

### B. WhatsApp Webhook & WAHA `NOWEB` (`src/lib/whatsapp-service.ts`, `src/app/api/webhooks/whatsapp/route.ts`)
- Konfigurasi kontainer ringan tersedia di `docker-compose.waha.yml` (`devlikeapro/waha:latest`, `WHATSAPP_DEFAULT_ENGINE=NOWEB`, batas memori `450M` — penggunaan riil ~150–220 MB tanpa Chromium).
- Panduan operasional lengkap tanpa beli server baru tersedia di `WAHA_SETUP.md`.
- **Fitur Keandalan Webhook WAHA yang Sudah Diimplementasikan:**
  - `extractWahaMessageId`: membaca ID pesan baik berbentuk string maupun objek `{ _serialized, id }`.
  - `extractWahaCustomerPhone`: memecahkan nomor asli pelanggan di balik format privacy WhatsApp `@lid` lewat `remoteJidAlt` / `SenderAlt` sambil tetap membalas ke `chatId: targetJid`.
  - Dukungan pesan teks maupun caption media (`p.body || p.caption`).
  - Mengabaikan chat grup (`@g.us`), status, dan channel (`@newsletter`).
  - Efek natural WhatsApp: `sendWahaPresence` (`sendSeen`, `startTyping`, `stopTyping`).
  - Anti-loop echo suppression (`normalizeCompareText`) & **Smart Human-Takeover** (otomatis jeda bot 30 menit saat Admin membalas manual, `#stop`/`#admin` untuk jeda 12 jam, `#bot`/`#lanjut` untuk menyalakan kembali).
  - Menyimpan riwayat multi-turn ke `wa_conversations` & `wa_messages` agar percakapan di WA nyambung seperti di Website.

---

## 7. Daftar Milestone yang Sudah Selesai (100% Siap Pitching)

- [x] **Tata Letak & Desain 1:1 Berreferensi Profesional (`tokomama.com`):** Top bar dirapikan ringkas menjadi 3 link kanan (*Mitra Pengrajin*, *Kemitraan Reseller*, *Lokasi Sungailiat*), Navbar bersih, grid kategori & produk terstruktur, Footer responsif desktop/mobile dengan tautan Instagram, TikTok, dan Facebook.
- [x] **Identitas Brand Resmi `AMEN SNACK` (60-30-10):** Logo resmi terpasang di Website dan POS, seluruh elemen & widget chatbot menggunakan Navy `#2E3677` & Crimson `#E93433`.
- [x] **Aset Visual Brand Kustom (`.webp`):** Hero nampan bambu transparan (`hero/toko-amen-hero.webp`), `watermark-pattern.webp`, 3 banner promo, 3 kartu proposisi, dan ilustrasi studio produk di `public/images/`.
- [x] **Integrasi Live Database Supabase (`1.060` Produk Publik / `1.446` Master SKU):** Website Vercel `https://tokoamensnack.vercel.app` tersinkron penuh (`source: "supabase"` terverifikasi).
- [x] **Penyempurnaan Chatbot Website & Webhook WAHA:** Multi-turn memory, sinonim Bangka, perbandingan berat, kalkulator order + berat + link WA checkout, serta handler penuh event WAHA `NOWEB`.
- [x] **Hardening POS `svelte-minimarket/` untuk Kasir Windows 7:** Downgrade ke Tailwind v3.4 (`0 oklch`), paginasi 50/51 item di seluruh daftar & barcode Zenpert 4T520, cache 300 item ter-debounce, serta penghapusan total integrasi Shopee.

---

## 8. Roadmap Selanjutnya (Pasca-Pitching & Deal dengan Owner)

### Kondisi Server Existing Saat Ini (Observasi Terverifikasi)
Hasil `free -h` di VPS pribadi user (`ubuntu@abimanyuserver`):
- `Mem: 1.9Gi total`, `975Mi used`, `992Mi available`, `Swap: 2.0Gi`.
- **Kesimpulan Jujur:** Server `abimanyuserver` **tidak cukup** jika dipaksa menampung seluruh sistem sekaligus (PostgreSQL + Website Next.js + POS SvelteKit + WAHA). Namun **cukup** jika hanya menjalankan **WAHA `NOWEB` (~150–220 MB RAM)** sementara Website tetap di **Vercel** dan Database tetap di **Supabase**.

### Langkah Eksekusi Setelah Deal dengan Owner
1. **Pengadaan Server VPS Produksi Penuh:**
   - **Rekomendasi Terbaik:** **VPS 4 GB RAM, 2 vCPU, 40–50 GB NVMe SSD** *(region Singapore atau Jakarta, OS Ubuntu 22.04/24.04 LTS)* agar PostgreSQL 16, WAHA `NOWEB`, Website Next.js, dan POS SvelteKit `svelte-minimarket/` dapat berjalan lega dalam 1 server terpusat.
   - *Selama masa uji coba sebelum beli VPS baru:* Jalankan WAHA lewat Docker lokal + `cloudflared tunnel` atau di VPS existing (panduan ada di `WAHA_SETUP.md`).
2. **Aktivasi WhatsApp WAHA di Vercel / VPS:**
   - Jalankan `docker compose -f docker-compose.waha.yml up -d`.
   - Scan QR terlebih dahulu memakai **nomor WhatsApp cadangan/sekunder** (khusus *inbound* reply, jangan blast massal).
   - Arahkan webhook ke `https://tokoamensnack.vercel.app/api/webhooks/whatsapp` dan set `WAHA_API_URL`, `WAHA_API_KEY`, `WAHA_SESSION` di Vercel Environment Variables.
3. **Penggantian Bertahap Foto Produk & Toko Asli:**
   - Ganti file `.webp` ilustrasi studio di `public/images/hero/`, `public/images/banners/`, dan `public/images/products/` dengan foto produk asli Toko Amen Snack Sungailiat (dengan mempertahankan nama file atau memperbarui URL gambar produk di POS).
4. **Deployment Sistem POS & Kasir (`svelte-minimarket/`) & Keamanan Akun:**
   - Deploy `svelte-minimarket/` ke VPS/Cloud, lalu login ke `/admin/pegawai` dan **segera ganti password default (`owner` & `kasir`)**.
   - Pasang bookmark aplikasi POS di **Google Chrome 109 / Firefox 115 ESR** pada komputer Windows 7 kasir toko dan uji printer thermal serta barcode Zenpert 4T520.
