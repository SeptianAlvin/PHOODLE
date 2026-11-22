Modul 02: Pengambilan Foto (Live Camera) & Upload Galeri

Goal

Memungkinkan pengguna mengambil rangkaian foto berurutan menggunakan kamera perangkat dengan hitung mundur (timer) dan unlimited retake, atau mengunggah foto yang sudah ada dari galeri.

UI Layout (currentView === 'capture')

Area Kiri / Utama (Viewport):

Jika mode kamera: Menampilkan pratinjau <video> secara real-time (default mirror/flip horizontal agar natural seperti cermin).

Overlay hitung mundur besar di tengah layar (3... 2... 1...) saat sesi foto berjalan, disertai efek kilatan putih singkat (screen flash) saat foto diambil.

Jika mode upload: Area drag-and-drop / tombol pilih file gambar dari perangkat sesuai jumlah slot layout yang dipilih.

Area Kanan / Bawah (Panel Slot Hasil Jepretan):

Menampilkan slot-slot foto kosong sesuai selectedLayout (misal: 3 atau 4 kotak).

Setiap slot yang sudah terisi menampilkan gambar pratinjau beserta tombol ikon "Retake Slot Ini" (mengulang foto hanya pada slot tersebut).

Bilah Kontrol Bawah:

Dropdown pilihan timer: 3 Detik, 5 Detik, atau Tanpa Timer.

Tombol Toggle Mirror Kamera.

Tombol Utama: "Ambil Foto" / "Retake Semua".

Tombol Lanjut (aktif jika semua slot terisi): "Lanjut Edit ke Kanvas ->" (mengubah currentView = 'editor').

Core Logic (Client-Side)

Gunakan navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false }).

Sediakan pesan ramah dan tombol alih otomatis ke mode Upload Galeri apabila perangkat tidak memiliki kamera atau izin kamera ditolak browser.

Pastikan stream kamera dimatikan (track.stop()) saat pengguna berpindah ke halaman 'editor' agar hemat memori dan baterai.

Acceptance Criteria

[ ] Kamera menyala otomatis saat mode kamera dibuka dan berhenti saat pindah ke editor.

[ ] Pengguna dapat mengulang foto (unlimited retake) baik per slot maupun keseluruhan sesi sebelum masuk ke editor.

[ ] Pengguna tanpa kamera tetap bisa melanjutkan alur menggunakan fitur upload foto lokal.