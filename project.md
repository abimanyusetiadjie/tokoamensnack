# Dokumentasi Proyek & Spesifikasi Konten Website: Toko Amen Snack

Dokumen ini berisi rincian data bisnis, katalog produk, spesifikasi desain, dan panduan pemetaan komponen (*content mapping*) untuk mengadaptasi template website ritel menjadi website resmi **Toko Amen Snack**.

---

## 1. Profil Bisnis & Identitas Utama

* **Nama Resmi Bisnis:** Toko Amen Snack (Toko Oleh-Oleh Khas Bangka Amen Snack).
* **Entitas & Kategori Usaha:** Pusat Oleh-Oleh Khas Bangka, Toko Camilan (*Snack*), dan Ritel Makanan Ringan.
* **Status & Kredibilitas:**
  * Terdaftar sebagai salah satu **Amenitas Pariwisata Resmi di Kabupaten Bangka** pada Sistem Informasi Kepariwisataan Nasional (Sisparnas Kementerian Pariwisata).
  * Memiliki reputasi ulasan pelanggan **4,5 / 5,0 bintang** (100+ ulasan di Google Maps).
  * Memiliki lini produk *house brand* (merek internal) sendiri, yaitu **"Cap AMEN"**.
* **Nilai Jual Utama (*Unique Selling Proposition*):**
  1. **100% Asli Bangka:** Menyediakan produk olahan hasil laut dan camilan tradisional langsung dari pengrajin lokal Bangka serta produksi internal Cap AMEN.
  2. **Katalog Terlengkap di Sungailiat:** Menyediakan berbagai jenis kemplang (panggang, pasir, oven, goreng, mentah), getas, kericu, terasi, hingga kopi dan mi instan khas Bangka.
  3. **Melayani Pembelian Fisik & Pengiriman Nasional:** Pembeli dapat berbelanja langsung di toko fisik Sungailiat atau memesan secara daring melalui WhatsApp dan Shopee.

---

## 2. Informasi Lokasi, Kontak & Kanal Digital

* **Alamat Lengkap:** Jl. Muhidin No.106, Sungailiat, Kec. Sungai Liat, Kabupaten Bangka, Kepulauan Bangka Belitung 33211, Indonesia.
* **Nomor Telepon / WhatsApp Business:** `0813-6872-2622` / `+62 813-6872-2622`.
* **Tautan WhatsApp Direct CTA:** [https://wa.me/6281368722622?text=Halo%20Admin%20Toko%20Amen%20Snack,%20saya%20ingin%20bertanya%20katalog%20oleh-oleh%20khas%20Bangka](https://wa.me/6281368722622?text=Halo%20Admin%20Toko%20Amen%20Snack,%20saya%20ingin%20bertanya%20katalog%20oleh-oleh%20khas%20Bangka)
* **Jam Operasional Toko:**
  * **Senin – Sabtu:** 07.00 – 21.00 WIB.
  * **Minggu:** 10.00 – 15.00 WIB.
* **Kanal Digital & Marketplace Resmi:**
  * **Instagram:** `@toko.amensnack` ([https://www.instagram.com/toko.amensnack/](https://www.instagram.com/toko.amensnack/)).
  * **Shopee Official Store:** `amensnack` ([https://shopee.co.id/amensnack](https://shopee.co.id/amensnack)).
  * **Google Maps Place ID:** `ChIJx6EI03XzIi4RkYWEXb-mtBk`.
  * **Google Maps URL:** [https://www.google.com/maps/place//data=!4m2!3m1!19sChIJx6EI03XzIi4RkYWEXb-mtBk](https://www.google.com/maps/place//data=!4m2!3m1!19sChIJx6EI03XzIi4RkYWEXb-mtBk)
  * **Waze Navigasi URL:** [https://www.waze.com/id/live-map/directions/id/kepulauan-bangka-belitung/toko-amen-snack?to=place.ChIJx6EI03XzIi4RkYWEXb-mtBk](https://www.waze.com/id/live-map/directions/id/kepulauan-bangka-belitung/toko-amen-snack?to=place.ChIJx6EI03XzIi4RkYWEXb-mtBk).

---

## 3. Arsitektur Teknis & Sistem Desain

### 3.1. Stack Teknologi Referensi

* **Framework Frontend:** Next.js (React) / HTML5 Statis.
* **Styling:** Tailwind CSS.
* **Sistem Ikon:** Lucide Icons (`lucide-react` atau CDN Lucide).
* **Strategi Konten:** Data statis terstruktur (JSON / TypeScript / Markdown) untuk katalog produk dan banner promo.

### 3.2. Palet Warna Brand (Adaptasi Kuliner & Oleh-Oleh Khas Bangka)

Mempertahankan nuansa ritel yang hangat dan menggugah selera (*appetizing retail theme*):

* **Primary Red (`#E11D48` / `rose-600`):** Melambangkan warna sambal terasi khas Bangka dan semangat ritel yang ramah.
* **Secondary Warm Orange (`#F97316` / `orange-500`):** Merepresentasikan kerenyahan kemplang panggang dan camilan hangat.
* **Neutral Dark (`#0F172A` / `slate-900`):** Warna tipografi utama agar kontras dan mudah dibaca.
* **Soft Background (`#FFF1F2` / `rose-50` & `#F8FAFC` / `slate-50`):** Warna latar seksi halaman agar terkesan bersih dan modern.

---

## 4. Struktur Kategori & Data Katalog Produk

### 4.1. Daftar Kategori Utama (Untuk Grid 6 Kategori di Homepage)

1. **Kemplang Panggang & Oven:** Kemplang bakar arang/oven khas Bangka lengkap dengan sambal terasi.
2. **Kemplang Pasir & Goreng:** Kemplang sangrai pasir bebas minyak (termasuk produk khas *Cap AMEN*) serta kemplang siap goreng.
3. **Getas & Kerupuk Ikan:** Getas ikan tenggiri renyah dan aneka kerupuk olahan laut Bangka.
4. **Kericu & Olahan Laut:** Camilan telur cumi (kericu) gurih dan hasil laut kering khas Pulau Bangka.
5. **Bumbu & Terasi Bangka:** Terasi udang asli, kecap asin khas Bangka, dan bumbu masak tradisional.
6. **Kopi & Produk Khas Bangka:** Kopi bubuk curah pilihan, kue tradisional, dan mi instan varian eksklusif Bangka.

### 4.2. Data Katalog Produk Unggulan

Data produk berikut diambil dari etalase resmi Toko Amen Snack untuk mengisi komponen *Featured Products*:

| ID | Nama Produk | Kategori | Harga Acuan | Badge / Label | Deskripsi Singkat |
| --- | --- | --- | --- | --- | --- |
| `PRD-01` | **Kemplang Pasir Bantet "Cap AMEN"** | Kemplang Pasir | Rp10.000 | *Signature Brand* | Kemplang sangrai pasir khas produksi Cap AMEN lengkap dengan sambal terasi. |
| `PRD-02` | **Getas Istimewa Cap Obor (250g)** | Getas & Kerupuk | Rp20.000 | *Terlaris (4.9★)* | Kerupuk getas ikan pilihan yang renyah dan gurih dalam kemasan 250 gram. |
| `PRD-03` | **Indomie Kaldu Udang (Eksklusif Bangka)** | Produk Khas Bangka | Rp5.000 | *Eksklusif Bangka* | Varian mi instan rasa Kaldu Udang yang hanya dipasarkan di wilayah Bangka (Rating 4.9). |
| `PRD-04` | **Indomie Goreng Khas Bangka** | Produk Khas Bangka | Rp7.000 | *Favorit Wisatawan* | Varian mi goreng khusus edisi Sumatera/Bangka yang populer sebagai buah tangan. |
| `PRD-05` | **Kemplang Panggang JJ 2.5 Tali Biru** | Kemplang Panggang | Rp32.000 | *Best Seller* | Kemplang ikan panggang berkualitas dengan tekstur renyah dan cocolan sambal pekat. |
| `PRD-06` | **Kemplang Panggang Khas Belinyu** | Kemplang Panggang | Rp37.000 | *Kualitas Premium* | Kemplang panggang autentik khas Belinyu dengan cita rasa ikan tenggiri asli. |
| `PRD-07` | **Kecap Asin Asli Bangka Cap SS (300ml)** | Bumbu & Terasi | Rp16.000 | *Bumbu Kuliner* | Kecap asin legendaris khas Bangka untuk pelengkap hidangan dan cocolan. |
| `PRD-08` | **Kopi Curah No. 1 Khas Bangka (250g)** | Kopi & Minuman | Hubungi CS | *Aroma Khas* | Kopi bubuk pilihan nomor 1 khas Bangka dengan seduhan pekat dan harum. |

---

## 5. Panduan Pemetaan Konten (*Section-by-Section Content Mapping*)

### Seksi 1: Top Announcement Bar & Sticky Navbar

* **Top Bar Text:** `🎉 Pusat Oleh-Oleh & Camilan Khas Bangka Terlengkap di Sungailiat — Melayani Pengiriman ke Seluruh Indonesia!`
* **Logo Brand:** `AMEN SNACK` (Sub-teks kecil: *Oleh-Oleh Khas Bangka*).
* **Menu Navigasi:** `Beranda` | `Katalog Oleh-Oleh` | `Kategori` | `Keunggulan` | `Lokasi Toko`
* **Tombol CTA Kanan:**
  * Tombol Sekunder (Outline): **Belanja di Shopee** → Link ke [https://shopee.co.id/amensnack](https://shopee.co.id/amensnack).
  * Tombol Primer (Solid): **Pesan via WhatsApp** → Link ke [https://wa.me/6281368722622](https://wa.me/6281368722622).

### Seksi 2: Hero Section

* **Badge Atas:** `🏆 Terdaftar di Sisparnas Kemenpar — Rating 4.5★ Google Maps`.
* **Headline Utama:** `Pusat Oleh-Oleh & Camilan Khas Bangka Terlengkap`
* **Sub-headline:** `Nikmati gurih dan renyahnya Kemplang Panggang, Kemplang Pasir Cap AMEN, Getas Ikan, hingga produk eksklusif khas Pulau Bangka. Segar setiap hari dan ramah di kantong!`.
* **Tombol CTA Hero:**
  * CTA 1: `Lihat Katalog Produk` (Scroll ke `#katalog`).
  * CTA 2: `Chat WhatsApp (0813-6872-2622)`.

### Seksi 3: Banner Promo / Highlight Layanan

* **Slide / Kartu 1:** **Produk Spesial "Cap AMEN"** — Kemplang Goreng Pasir & Bantet lengkap dengan sambal terasi khas Bangka mulai Rp10.000.
* **Slide / Kartu 2:** **Kirim Oleh-Oleh ke Seluruh Indonesia** — Pesan praktis dari rumah melalui toko resmi Shopee `amensnack` atau hubungi admin WhatsApp kami.

### Seksi 4: Katalog Produk Unggulan (`#katalog`)

* **Judul Seksi:** `Oleh-Oleh & Camilan Terlaris`
* **Sub-judul:** `Pilihan produk favorit keluarga dan wisatawan dengan kualitas terjamin.`
* **Isi Komponen:** Render 8 kartu produk dari tabel `4.2` lengkap dengan tombol beli per item yang mengarah ke WhatsApp atau Shopee.

### Seksi 5: Grid 6 Kategori Produk (`#kategori`)

* **Judul Seksi:** `Kategori Produk Pilihan`
* **Sub-judul:** `Semua oleh-oleh khas Bangka Belitung ada di Toko Amen Snack.`
* **Isi Komponen:** Render 6 kartu kategori dari daftar `4.1` dengan ikon Lucide yang relevan (`flame`, `cookie`, `fish`, `sparkles`, `utensils`, `coffee`).

### Seksi 6: Value Proposition — 3 Pilar Keunggulan (`#keunggulan`)

* **Judul Seksi:** `Mengapa Belanja di Toko Amen Snack?`
* **Pilar 1 — Asli & Berkualitas:** `Menghadirkan kemplang, getas, dan camilan langsung dari produsen lokal terbaik di Bangka serta produk unggulan Cap AMEN.`
* **Pilar 2 — Harga Jujur & Bersahabat:** `Harga ritel yang terjangkau mulai dari Rp5.000 hingga paket oleh-oleh keluarga yang hemat.`
* **Pilar 3 — Mudah Diakses (Offline & Online):** `Lokasi strategis di Jl. Muhidin Sungailiat serta melayani pemesanan online lewat WhatsApp dan Shopee.`

### Seksi 7: Lokasi Toko & Navigasi (`#lokasi`)

* **Judul Seksi:** `Kunjungi Toko Fisik Kami di Sungailiat`
* **Detail Kartu Lokasi Utama:**
  * **Nama Toko:** Toko Amen Snack — Sungailiat
  * **Alamat:** Jl. Muhidin No.106, Sungailiat, Kabupaten Bangka, Kepulauan Bangka Belitung 33211
  * **Jam Buka:** Senin – Sabtu (07.00 – 21.00 WIB) | Minggu (10.00 – 15.00 WIB)
  * **Telepon / WA:** `0813-6872-2622`
  * **Tombol Navigasi:** `Buka di Google Maps` & `Navigasi via Waze`

### Seksi 8: Artikel & Edukasi Kuliner (`#blog`)

* **Judul Seksi:** `Cerita & Kuliner Khas Bangka`
* **Ide Artikel Statis:**
  1. *Mengenal Perbedaan Kemplang Panggang, Kemplang Pasir, dan Getas Khas Bangka*.
  2. *5 Oleh-Oleh Wajib Saat Berkunjung ke Sungailiat, Kabupaten Bangka*.
  3. *Keunikan Indomie Kaldu Udang yang Hanya Dijual di Pulau Bangka*.

### Seksi 9: Footer

* **Deskripsi Singkat:** `Toko Amen Snack adalah pusat oleh-oleh dan camilan khas Bangka di Sungailiat yang menyediakan aneka kemplang, getas, kericu, dan makanan ringan berkualitas.`
* **Tautan Cepat:** Beranda, Katalog Produk, Lokasi Toko, Shopee Official Store (`shopee.co.id/amensnack`), Instagram (`@toko.amensnack`).
* **Kontak:** Jl. Muhidin No.106 Sungailiat | WA: `+62 813-6872-2622`.

---

## 6. Struktur Data JSON (Siap Pakai untuk Komponen Katalog)

```json
{
  "storeInfo": {
    "name": "Toko Amen Snack",
    "tagline": "Pusat Oleh-Oleh & Camilan Khas Bangka Terlengkap di Sungailiat",
    "address": "Jl. Muhidin No.106, Sungailiat, Kabupaten Bangka, Kepulauan Bangka Belitung 33211",
    "phone": "0813-6872-2622",
    "whatsappUrl": "https://wa.me/6281368722622",
    "instagramUrl": "https://www.instagram.com/toko.amensnack/",
    "shopeeUrl": "https://shopee.co.id/amensnack",
    "wazeUrl": "https://www.waze.com/id/live-map/directions/id/kepulauan-bangka-belitung/toko-amen-snack?to=place.ChIJx6EI03XzIi4RkYWEXb-mtBk",
    "rating": 4.5,
    "reviewCount": 100,
    "openingHours": {
      "mondayToSaturday": "07:00 - 21:00 WIB",
      "sunday": "10:00 - 15:00 WIB"
    }
  },
  "featuredProducts": [
    {
      "id": "prd-01",
      "name": "Kemplang Pasir Bantet Cap AMEN",
      "category": "Kemplang Pasir",
      "price": 10000,
      "formattedPrice": "Rp10.000",
      "badge": "Signature Brand",
      "rating": 4.9
    },
    {
      "id": "prd-02",
      "name": "Getas Istimewa Cap Obor 250g",
      "category": "Getas & Kerupuk",
      "price": 20000,
      "formattedPrice": "Rp20.000",
      "badge": "Terlaris",
      "rating": 4.9
    },
    {
      "id": "prd-03",
      "name": "Indomie Kaldu Udang (Eksklusif Bangka)",
      "category": "Produk Khas Bangka",
      "price": 5000,
      "formattedPrice": "Rp5.000",
      "badge": "Eksklusif Bangka",
      "rating": 4.9
    },
    {
      "id": "prd-04",
      "name": "Kemplang Panggang JJ 2.5 Tali Biru",
      "category": "Kemplang Panggang",
      "price": 32000,
      "formattedPrice": "Rp32.000",
      "badge": "Favorit",
      "rating": 4.8
    },
    {
      "id": "prd-05",
      "name": "Kemplang Panggang Belinyu",
      "category": "Kemplang Panggang",
      "price": 37000,
      "formattedPrice": "Rp37.000",
      "badge": "Premium",
      "rating": 4.9
    },
    {
      "id": "prd-06",
      "name": "Kecap Asin Asli Bangka Cap SS 300ml",
      "category": "Bumbu & Terasi",
      "price": 16000,
      "formattedPrice": "Rp16.000",
      "badge": "Asli Bangka",
      "rating": 4.8
    }
  ]
}
```

---

## 7. Checklist Pengerjaan & Optimasi SEO Lokal

- [x] **Meta Title & Description:** Gunakan judul `"Toko Amen Snack Sungailiat - Pusat Oleh-Oleh & Camilan Khas Bangka"` untuk menangkap pencarian organik wisatawan.
- [x] **Integrasi Tombol WhatsApp & Shopee:** Pastikan seluruh tombol CTA mengarah ke nomor `6281368722622` dan `shopee.co.id/amensnack`.
- [x] **Optimasi Gambar (WebP):** Gunakan foto produk kemplang, getas, dan suasana toko dengan format `.webp` agar skor Lighthouse tetap di atas 90.
- [x] **Schema.org `LocalBusiness`:** Pasang JSON-LD `LocalBusiness` di `<head>` dengan alamat Jl. Muhidin No.106 Sungailiat dan jam operasional resmi.
