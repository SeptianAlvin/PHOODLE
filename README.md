📸 PHOODLESnap, Doodle, and Frame Your Moments Directly in Your BrowserPHOODLE (Photo + Doodle) adalah aplikasi web photobooth interaktif berbasis browser yang menggabungkan pengalaman foto photo-strip kekinian dengan studio coretan (doodle) dan stiker kreatif. Dirancang dengan arsitektur 100% client-side, seluruh pemrosesan foto berjalan langsung di perangkat pengguna tanpa mengunggah data pribadi ke server mana pun.Coba Live Demo · Laporkan Bug · Ajukan Fitur✨ Fitur Utama🎞️ Pilihan Format Tata Letak (Multi-Pose Layouts)
Mendukung berbagai format populer siap cetak maupun dibagikan ke media sosial: 3 Pose Strip, 4 Pose Strip, dan 2x2 Grid.📷 Kamera Pintar & Unggah GaleriPengambilan foto langsung menggunakan kamera depan/belakang (mirror toggle otomatis).Pilihan timer fleksibel (Tanpa Timer, 3 detik, 5 detik, 10 detik) serta mode Auto Seri untuk sesi foto beruntun tanpa jeda manual.Opsi unggah foto langsung dari galeri perangkat.🎨 Studio Editor Interaktif (Powered by Fabric.js)Bingkai Tematik: Koleksi bingkai estetis dengan transparent masking presisi.Alat Coretan (Doodle Brush & Eraser): Gambar bebas di atas bingkai maupun foto dengan berbagai pilihan warna serta penghapus presisi.Stiker Kustom: Tambahkan, geser, putar, dan ubah ukuran stiker secara interaktif.🔒 Privasi Terjamin (100% Client-Side)
Tidak memerlukan akun, login, maupun database eksternal. Seluruh rendering kanvas dan penggabungan lapisan (multi-layer compositing) diproses secara lokal di browser pengguna.📱 Mobile-First & Responsif
Antarmuka dioptimalkan untuk kenyamanan layar sentuh smartphone maupun browser desktop.💎 Model Bisnis Freemium (Free vs Pro)PHOODLE menerapkan skema monetisasi Freemium yang dirancang untuk memberikan pengalaman inti secara gratis sekaligus menawarkan kustomisasi eksklusif bagi pengguna Pro:Fitur🆓 Paket Free👑 Paket ProFormat Layout (3 Pose, 4 Pose, 2x2 Grid)✅✅Kamera Auto-Seri & Unggah Galeri✅✅Alat Gambar (Doodle Brush) & Penghapus✅✅Koleksi Bingkai & Stiker Dasar✅✅Bingkai & Paket Stiker Eksklusif🔒 Terkunci✅ Terbuka SemuaTeks Footer Kustom pada Hasil Foto❌✅Hapus Watermark (Made with PHOODLE)❌✅ Satu KlikResolusi Ekspor Tinggi (HD Export)Standar✅ Tinggi🛠️ Teknologi yang DigunakanFrontend Framework: React + ViteStyling: Tailwind CSSCanvas & Graphic Manipulation: Fabric.js & HTML5 Canvas APICamera Stream: WebRTC / navigator.mediaDevices.getUserMediaIcons: Lucide ReactDeployment & CI/CD: Vercel📂 Struktur ProyekPHOODLE/
├── public/                 # Aset statis, logo, dan template bingkai
├── src/
│   ├── components/         # Komponen UI reusable (Navbar, LayoutSelector, dll.)
│   ├── pages/
│   │   ├── Home.jsx        # Halaman utama & pemilihan format photo-strip
│   │   ├── Capture.jsx     # Halaman kamera, timer auto-seri, & upload galeri
│   │   └── Editor.jsx      # Studio kanvas Fabric.js, stiker, doodle, & ekspor
│   ├── App.jsx             # Manajemen state & alur navigasi antar tahap
│   ├── index.css           # Konfigurasi Tailwind & utilitas mobile viewport
│   └── main.jsx            # Entry point aplikasi React
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
🚀 Cara Menjalankan Secara LokalClone repositori inigit clone https://github.com/SeptianAlvin/PHOODLE.git
cd PHOODLE
Instal seluruh dependensinpm install
Jalankan server pengembangan (development)npm run dev
Buka http://localhost:5173 melalui browser kamu. (Catatan: Akses kamera membutuhkan localhost atau koneksi HTTPS).Build untuk produksinpm run build
👤 PengembangDikembangkan oleh Septian Alvin (@SeptianAlvin) sebagai bagian dari proyek mata kuliah inovasi produk digital Technopreneur.
