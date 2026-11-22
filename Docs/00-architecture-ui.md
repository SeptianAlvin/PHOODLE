Modul 00: Arsitektur Sistem, State Global, \& Desain UI



Goal



Membangun fondasi prototipe aplikasi web photobooth 100% client-side (tanpa backend dan tanpa database) dengan antarmuka modern yang responsif dan intuitif menyerupai Canva.



Tech Stack (Wajib)



Framework: React (Vite) + Tailwind CSS



Canvas Engine: fabric (Fabric.js v5/v6) untuk manipulasi objek interaktif (drag, resize, rotate, freehand drawing).



Icons: lucide-react



Data Storage: Hanya menggunakan React State (useState / useContext) dan file konstanta lokal (src/data/mockData.js). Tidak menggunakan database atau API eksternal.



Navigasi Halaman (Single Page Application State)



Gunakan state currentView untuk perpindahan antarhalaman tanpa reload:



'home' -> Halaman Utama (Landing Page \& Katalog Awal).



'capture' -> Halaman Pengambilan Foto (Live Camera / Upload Lokal).



'editor' -> Ruang Kerja Kanvas ala Canva (Frame, Doodling, Stiker).



Global State (Disimpan di App Level)



userTier: 'free' | 'pro' (Default: 'free'. Digunakan untuk simulasi akses template gratis vs langganan bulanan saat presentasi).



selectedLayout: 'strip-3' | 'strip-4' | 'grid-2x2' (Default: 'strip-3').



capturedPhotos: Array string Base64/Blob URL hasil foto kamera atau upload lokal.



selectedFrameId: String ID dari template bingkai yang sedang aktif.



UI Design System (Canva-Inspired Studio)



Warna Latar: Putih bersih (#FFFFFF) untuk panel navigasi/alat, dan abu-abu lembut (#F3F4F6) untuk area meja kerja kanvas agar bingkai foto terlihat kontras.



Warna Aksen: Indigo/Violet (#6366F1) untuk tombol utama (primary action) dan Amber/Gold (#F59E0B) untuk lencana/ikon fitur PRO.



Top Navbar Global (Selalu Muncul):



Kiri: Logo \& Nama Brand Photobooth.



Kanan: Tombol "Lihat Paket Pro" (membuka modal harga langganan) dan tombol sakelar cepat "Demo Mode: FREE / PRO" agar penguji/dosen bisa langsung mencoba perbedaan akses tanpa proses login.

