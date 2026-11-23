<div align="center">

# 📸 PHOODLE

**Snap, Doodle, and Frame Your Moments Directly in Your Browser**

[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5+-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3+-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Fabric.js](https://img.shields.io/badge/Fabric.js-Canvas_Engine-FF6B6B?style=for-the-badge)](http://fabricjs.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://phoodle-website.vercel.app)

[🚀 Live Demo](https://phoodle-website.vercel.app) · [🐛 Laporkan Bug](https://github.com/SeptianAlvin/PHOODLE/issues) · [✨ Ajukan Fitur](https://github.com/SeptianAlvin/PHOODLE/issues)

</div>

---

## 📖 Tentang Proyek

**PHOODLE** *(Photo + Doodle)* adalah aplikasi web *photobooth* interaktif berbasis browser yang menggabungkan pengalaman foto *photo-strip* kekinian dengan studio coretan (*doodle*) dan stiker kreatif.

Dirancang dengan arsitektur **100% client-side**, seluruh pemrosesan kamera, penyusunan *frame*, hingga penggabungan lapisan gambar (*multi-layer compositing*) berjalan langsung di perangkat pengguna tanpa memerlukan login maupun unggah data foto ke server eksternal.

---

## ✨ Fitur Utama

- **🎞️ Pilihan Format Tata Letak (Multi-Pose Layouts)**
  Mendukung format *photo-strip* populer yang siap cetak maupun dibagikan ke media sosial: **3 Pose Strip**, **4 Pose Strip**, dan **2x2 Grid**.

- **📷 Kamera Pintar & Unggah Galeri**
  - Pengambilan foto langsung melalui kamera depan maupun belakang dengan fitur *auto-mirror*.
  - Pilihan timer fleksibel (**Tanpa Timer**, **3 detik**, **5 detik**, **10 detik**) serta mode **Auto Seri** untuk sesi foto beruntun otomatis.
  - Opsi mengunggah foto langsung dari galeri perangkat.

- **🎨 Studio Editor Interaktif (Powered by Fabric.js)**
  - **Bingkai Tematik:** Koleksi bingkai estetis dengan *transparent masking* presisi.
  - **Alat Coretan (*Doodle Brush & Eraser*):** Gambar bebas di atas bingkai maupun foto dengan berbagai pilihan warna serta penghapus presisi.
  - **Stiker Kustom:** Tambahkan, geser, putar, dan ubah ukuran stiker secara interaktif.

- **🔒 Privasi Terjamin (100% Client-Side)**
  Tidak memerlukan akun, autentikasi, ataupun database. Seluruh proses *rendering* kanvas dilakukan secara lokal di browser pengguna.

- **📱 Mobile-First & Responsif**
  Antarmuka dioptimalkan untuk kenyamanan layar sentuh *smartphone* maupun browser desktop.

---

## 💎 Model Bisnis Freemium (Free vs Pro)

PHOODLE menerapkan skema monetisasi **Freemium** untuk memberikan pengalaman inti secara gratis sekaligus menawarkan kustomisasi eksklusif bagi pengguna Pro:

| Fitur | 🆓 Paket Free | 👑 Paket Pro |
| :--- | :---: | :---: |
| **Format Layout (3 Pose, 4 Pose, 2x2 Grid)** | ✅ | ✅ |
| **Kamera Auto-Seri & Unggah Galeri** | ✅ | ✅ |
| **Alat Coretan (Doodle) & Penghapus** | ✅ | ✅ |
| **Koleksi Bingkai & Stiker Dasar** | ✅ | ✅ |
| **Bingkai & Stiker Eksklusif Pro** | 🔒 Terkunci | ✅ Terbuka Semua |
| **Kualitas Ekspor Resolusi Tinggi** | Standar | ✅ High-Resolution |
| **Teks Footer Kustom pada Strip** | ❌ | ✅ Bebas Atur Teks |
| **Watermark Hasil Unduhan** | `Made with PHOODLE • Free` | ✨ Tanpa Watermark |

---

## 🛠️ Teknologi yang Digunakan

- **Frontend Framework:** React.js + Vite
- **Styling:** Tailwind CSS
- **Canvas & Graphic Manipulation:** Fabric.js & HTML5 Canvas API
- **Icons:** Lucide React
- **Deployment & CI/CD:** GitHub & Vercel

---

## 📂 Struktur Proyek

```text
PHOODLE/
├── public/                 # Aset statis, logo, template frame, dan stiker
├── src/
│   ├── components/         # Komponen UI (Navbar, LayoutSelector, dll.)
│   ├── pages/
│   │   ├── Home.jsx        # Halaman beranda & pemilihan format layout
│   │   ├── Capture.jsx     # Halaman kamera live, timer, & unggah galeri
│   │   └── Editor.jsx      # Studio kanvas Fabric.js (frame, doodle, stiker, ekspor)
│   ├── App.jsx             # Konfigurasi alur halaman & state utama
│   ├── index.css           # Konfigurasi Tailwind CSS & style global
│   └── main.jsx            # Entry point aplikasi React
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
