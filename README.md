# IziaPhoto • Live Photobooth

Aplikasi web **Landing Page & Live Photobooth** modern, mobile-first, dan 100% client-side. Tidak membutuhkan backend, database, WebRTC, atau Socket.IO.

## Fitur Utama

- **Landing Page Modern, Bersih & Ceria (Light Mode)**:
  - Hero section split-screen 2 kolom dengan visual showroom frame viral nyata.
  - 4 Kartu Fitur modern (Instant Photos, 6+ Viral Frames, Zero Install & Cepat, Download Instantly).
  - Alur 3 Langkah (*How It Works*).
  - Interactive Smartphone Mockup Preview.
  - CTA Banner Ceria & Footer.
- **Photobooth Live (100% Client-Side)**:
  - Akses kamera perangkat (`navigator.mediaDevices.getUserMedia`).
  - Ganti kamera depan / belakang (Switch Camera) & toggle mirror mode.
  - Sesi otomatis foto dengan animasi hitungan mundur (*3, 2, 1, 📸*), efek flash, dan audio shutter.
  - Penanganan izin kamera ramah pengguna dengan panduan HTTPS/localhost.
- **Pilihan Template & Canvas Compositing**:
  - **Koran Jadul (The Vintage Chronicle)**: Layout koran monokrom dengan filter B&W otomatis.
  - **Korean 4-Cut Strip**: Strip foto autentik ala Korea dengan branding `IZIAPHOTO`.
  - **Music Player (The 1975 / Spotify)**: Layout pemutar musik viral.
  - **Retro 35mm Roll Film**: Klise analog dengan lubang sproket.
  - **Cute Fruit Mascot**: Frame circular stiker buah lucu.
  - **Cafe & Mart Receipt**: Desain nota belanja struk kasir termal.
- **Download & Retake**:
  - Unduh foto langsung beresolusi tinggi dalam format PNG (`iziaphoto-photobooth.png`).
  - Tombol retake untuk mengulang sesi foto baru atau ganti template tanpa kehilangan foto.

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
