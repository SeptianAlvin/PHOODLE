Modul 01: Halaman Home & Simulasi Paket Langganan (Freemium)

Goal

Menyediakan halaman awal yang menarik bagi segmen pelajar, mahasiswa, dan pekerja muda untuk memulai sesi foto, melihat pratinjau template, serta mensimulasikan model bisnis Subscription Fee bulanan.

UI Layout (currentView === 'home')

Hero Section (Bagian Atas):

Judul utama yang menarik (contoh: "Photobox Estetik Langsung dari Browsermu").

Subjudul singkat: "Tanpa instal aplikasi, bebas retake sepuasnya, dan hias dengan coretan doodle serta stiker."

Dua Tombol Aksi Utama (CTA):

Tombol Utama: "Mulai Foto (Kamera)" -> Mengarahkan ke currentView = 'capture' dengan mode kamera aktif.

Tombol Sekunder: "Upload dari Galeri" -> Mengarahkan ke currentView = 'capture' dengan mode unggah file lokal.

Pilihan Layout Photo Strip:

Kartu pilihan format foto sebelum mulai: 3 Pose Vertical Strip, 4 Pose Vertical Strip, dan 2x2 Grid.

Preview Katalog Template (Gratis vs Pro):

Menampilkan grid 6–8 contoh frame dummy (menggunakan CSS/SVG/Canvas pattern atau gambar lokal).

Sebagian frame memiliki label "GRATIS", dan sebagian lainnya memiliki ikon mahkota "PRO".

Modal Paket Langganan (Simulasi BMC Revenue Streams)

Muncul ketika pengguna mengklik tombol "Lihat Paket Pro" atau mengklik frame terkunci:

Paket Gratis (Rp 0/bulan): Akses kamera & upload tanpa batas, unlimited retake, 3 frame dasar, alat doodling standar, dan stiker dasar.

Paket Pro Bulanan (Rp 29.000/bulan): Akses penuh ke seluruh frame eksklusif & musiman, palet warna kuas lengkap, paket stiker premium, dan ekspor resolusi tinggi tanpa watermark.

Tombol Simulasi: "Aktifkan Simulasi Pro Sekarang" -> Langsung mengubah state userTier menjadi 'pro', menutup modal, dan menampilkan notifikasi toast "Mode Pro Aktif!".

Acceptance Criteria

[ ] Pengguna dapat memilih jenis layout strip dan langsung masuk ke halaman pengambilan foto.

[ ] Modal paket langganan menampilkan perbandingan paket Gratis dan Bulanan dengan jelas, serta bisa mengaktifkan mode Pro dalam satu klik.