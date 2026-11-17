# Target Hardware & Browser Rules — Toko Amen Snack Sungailiat

Seluruh pengembangan **Website (`src/`)** dan **Sistem Kasir POS (`svelte-minimarket/`)** wajib mematuhi batas perangkat keras komputer kasir resmi di toko:

## Spesifikasi PC Kasir Toko (Observed via Control Panel Windows 7)
- **OS:** Windows 7 Ultimate Service Pack 1 (64-bit)
- **CPU / APU:** AMD PRO A4-3350B APU with Radeon R4 Graphics @ 2.00 GHz (Dual-Core)
- **RAM:** 4,00 GB (3,44 GB usable)
- **Batas Browser Maksimum:** Google Chrome 109 / Microsoft Edge 109 / Mozilla Firefox 115 ESR

## 5 Aturan Rekayasa Wajib
1. **Tailwind CSS v3.4 Only (Dilarang Tailwind v4):**
   - CSS hasil build harus memiliki **`0` `oklch()`**, **`0` `color-mix()`**, dan **`0` `@property`**.
   - Jangan gunakan `@tailwindcss/vite` atau fitur CSS modern pasca-2023 tanpa fallback kompatibel Chrome 109 / Firefox 115 ESR.
2. **Pagination & Batas Render DOM (24–50 Item):**
   - Website Katalog (`/produk`): maksimal `24` kartu produk per muat (`Muat Lebih Banyak`).
   - Kasir POS (`/pos` modal katalog), Admin Inventaris (`/admin/inventory`), Dropdown Gudang Masuk (`/admin/gudang/masuk`), dan Barcode (`/admin/barcodes` `51` item = 17 baris 3-kolom): wajib terpaginasi dan tidak me-render > 51 item sekaligus di DOM.
3. **Server-Side Search & Debounce `250 ms`:**
   - Filter produk wajib dijalankan di server PostgreSQL/Supabase dengan parameter terindeks, bukan mem-fetch 1.446–5.000 baris ke browser lokal.
4. **Efisiensi Memori & Cache Browser:**
   - Hindari polling latar belakang tanpa kondisi atau penulisan sinkron berulang ke `localStorage`. Cache katalog POS dibatasi maksimal `300` entri dengan penulisan ter-debounce `250 ms`.
   - Tidak perlu menginstal Node.js di PC Windows 7 (Node 18+ tidak mendukung Win 7); PC toko bertindak sebagai thin browser client yang terhubung ke server Cloud/VPS.
5. **Keamanan Data Harga Modal (HPP):**
   - Endpoint publik dan Chatbot dilarang keras mengambil atau menampilkan kolom `cost_price` maupun `base_hpp`.
