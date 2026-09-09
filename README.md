# SnapMoment • Live Photobooth

Aplikasi web **Landing Page & Live Photobooth** modern, mobile-first, dan 100% client-side. Tidak membutuhkan backend, database, WebRTC, atau Socket.IO.

## Fitur Utama

- **Landing Page Modern & Estetik**:
  - Hero section dengan dual CTA (*Mulai Photobooth Live* & *Lihat Cara Kerja*).
  - 4 Kartu Fitur (Instant Photos, Beautiful Frames, Fast & Simple, Download Instantly).
  - Alur 3 Langkah (*How It Works*).
  - Interactive Photobooth Mockup Preview.
  - CTA Banner & Footer.
- **Photobooth Live (100% Client-Side)**:
  - Akses kamera perangkat (`navigator.mediaDevices.getUserMedia`).
  - Ganti kamera depan / belakang (Switch Camera) & toggle mirror mode.
  - Sesi otomatis 4 foto dengan animasi hitungan mundur (*3, 2, 1, 📸*), efek flash, dan audio shutter.
  - Penanganan izin kamera ramah pengguna dengan panduan HTTPS/localhost.
- **Pilihan Template & Canvas Compositing**:
  - **Photobooth Strip**: Strip foto photobooth autentik ala Korea dengan branding `SNAPMOMENT` dan tahun `2026`.
  - **Vertical Strip**: Susunan 4 foto vertikal bersih dan modern.
  - **2 × 2 Grid**: Kolase 4 foto kotak seimbang.
  - Pilihan warna frame (*Classic White*, *Noir Black*, *Warm Cream*, *Soft Pink*, *Lavender*).
- **Download & Retake**:
  - Unduh foto langsung beresolusi tinggi dalam format PNG (`snapmoment-photobooth.png`).
  - Tombol retake untuk mengulang sesi foto baru.

## Cara Menjalankan

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Jalankan Aplikasi**:
   ```bash
   npm run dev
   ```

3. **Buka di Browser**:
   - Komputer: [https://localhost:5173](https://localhost:5173) (atau `http://localhost:5173`)
   - HP / Jaringan LAN: `https://<IP-Lokal>:5173` *(contoh: `https://10.10.27.190:5173`)*
