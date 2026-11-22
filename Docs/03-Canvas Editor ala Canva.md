Modul 03: Ruang Kerja Kanvas Interaktif (Gaya Canva)

Goal

Menyediakan antarmuka pengeditan foto berbasis Fabric.js dengan pengalaman pengguna layaknya Canva untuk memilih frame, mencoret bebas (doodling), dan menempelkan stiker.

UI Layout (currentView === 'editor')

Top Action Bar:

Kiri: Tombol "<- Foto Ulang" (kembali ke 'capture').

Tengah: Tombol Undo, Hapus Objek Terpilih, dan Reset Hiasan.

Kanan: Tombol utama "Selesai & Unduh".

Left Tool Sidebar (Desktop) / Bottom Drawer (Mobile):

3 Tab Navigasi dengan Ikon:

Tab Frame: Daftar pilihan desain bingkai (Gratis & Pro). Jika userTier === 'free' dan pengguna memilih bingkai Pro, munculkan banner pratinjau terkunci dengan tombol "Buka dengan Pro".

Tab Doodle (Kuas): Tombol aktif/nonaktif mode menggambar bebas, 10 pilihan warna (pastel & cerah), serta slider ukuran ketebalan kuas (2px – 20px).

Tab Stiker: Koleksi 15–20 stiker SVG/Emoji estetik (bintang, hati, pita, kacamata, teks lucu seperti "Surabaya Vibes", "Bestie").

Center Canvas Workspace:

Menampilkan kanvas Fabric.js di tengah layar dengan zoom otomatis yang pas dengan ukuran layar perangkat.

Susunan Layer (Z-Index Hierarchy di Fabric.js)

Layer 1 (Paling Bawah - Foto): Foto-foto dari capturedPhotos yang diposisikan otomatis ke dalam koordinat lubang/slot frame (selectable: false agar tidak merusak tata letak strip).

Layer 2 (Tengah - Bingkai): Lapisan desain frame (warna solid, gradien, motif estetik, serta watermark kecil jika userTier === 'free'). Lapisan ini wajib dikunci (selectable: false, evented: false).

Layer 3 (Paling Atas - Dekorasi): Coretan kuas (freehand path) dan objek stiker. Objek di layer ini dapat diklik, digeser (drag), diperbesar/diperkecil (resize), dan diputar (rotate) menggunakan bounding box khas Canva.

Acceptance Criteria

[ ] Coretan kuas (doodling) dan stiker selalu berada di atas lapisan foto dan bingkai.

[ ] Stiker dapat diputar, diubah ukurannya, dan dihapus melalui tombol Delete/Backspace atau tombol hapus di bilah atas.

[ ] Pergantian mode Free ke Pro di navbar langsung membuka kunci semua template bingkai tanpa me-reset hasil foto.