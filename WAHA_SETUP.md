# Panduan Menjalankan Chatbot WhatsApp (WAHA) Tanpa Beli Server Baru

Arsitektur chatbot **Toko Amen Snack** memakai **1 otak yang sama** (terhubung live ke database produk, harga eceran/grosir, dan jam buka toko) untuk:
- **Website Widget `"Tanya Toko"`** (`/api/chat`)
- **WhatsApp Business Otomatis via WAHA** (`/api/webhooks/whatsapp`)

---

## Opsi A — Jalankan WAHA Gratis di Laptop Anda + Tunnel ke Vercel (Cocok untuk Demo/Pitching Besok)

Prasyarat: Docker Desktop menyala di laptop Anda.

1. Jalankan container WAHA ringan (`NOWEB` engine):
   ```powershell
   docker compose -f docker-compose.waha.yml up -d
   ```
2. Buka dashboard WAHA di `http://localhost:3005/dashboard` (atau cek QR lewat log `docker logs -f amen-snack-waha`), lalu **scan QR menggunakan WhatsApp cadangan/demo**.
3. Agar server Vercel (`tokoamensnack.vercel.app`) dapat memanggil WAHA Anda untuk mengirim balasan (jika belum memakai VPS publik), ekspos port `3005` memakai Cloudflare Quick Tunnel gratis:
   ```powershell
   cloudflared tunnel --url http://localhost:3005
   ```
4. Atur Environment Variable berikut di **Vercel Project Settings** (atau `.env.local` saat testing lokal):
   - `WAHA_API_URL` = URL tunnel atau IP/domain VPS WAHA (contoh `https://xxxx.trycloudflare.com` atau `https://waha.domainanda.com`)
   - `WAHA_API_KEY` = `amen_waha_local_demo` (ganti dengan key acak kuat untuk produksi)
   - `WAHA_SESSION` = `default`
   - `WA_HUMAN_PAUSE_MINUTES` = `30` *(opsional)*

---

## Opsi B — Jalankan WAHA di VPS yang Sudah Ada (`abimanyuserver` / Sisa RAM ~992 MB)

Jika ingin aktif 24 jam tanpa membeli VPS baru sambil **Website tetap di Vercel** dan **Database tetap di Supabase**:
1. Salin `docker-compose.waha.yml` ke VPS Anda.
2. Pastikan menggunakan engine **`NOWEB`** (bukan `WEBJS` Chrome) — hanya memakan ~150–220 MB RAM.
3. Pasang reverse proxy (Nginx / Caddy) dengan HTTPS ke port `3005`, lalu set `WAHA_API_URL` di Vercel.

---

## Fitur Keamanan & Kontrol Admin dari HP WhatsApp

Saat Admin membuka WhatsApp di HP dan membalas chat pelanggan secara manual:
- **Auto-Pause 30 Menit:** Bot otomatis berhenti membalas pelanggan tersebut selama 30 menit agar Admin dan Bot tidak bertabrakan.
- **`#stop` atau `#admin`** (ketik dari HP Admin di chat pelanggan): Bot langsung berhenti total selama 12 jam untuk pelanggan tersebut.
- **`#bot` atau `#lanjut`** (ketik dari HP Admin di chat pelanggan): Bot aktif kembali melayani pelanggan tersebut.
- **Anti-Echo & Anti-Grup:** Bot otomatis mengabaikan grup (`@g.us`), status WhatsApp, channel (`@newsletter`), dan pantulan pesan bot sendiri (`message.any`).
- **Catatan Keamanan Nomor Utama:** Untuk uji coba & pitching, selalu gunakan **nomor WhatsApp cadangan/demo** dan pakai khusus untuk membalas chat masuk (*inbound*), **jangan** dipakai untuk *blast* massal.
