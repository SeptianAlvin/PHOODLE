Modul 04: Pratinjau Akhir, Export, & Unduh Gambar

Goal

Menggabungkan seluruh elemen pada kanvas menjadi satu file gambar resolusi tinggi yang siap diunduh langsung ke perangkat pengguna.

UI Layout (Export Modal)

Muncul saat pengguna menekan tombol "Selesai & Unduh" di halaman Editor:

Sisi Kiri / Atas: Menampilkan pratinjau gambar final hasil penggabungan seluruh layer kanvas.

Sisi Kanan / Bawah:

Pilihan format file: PNG (Kualitas Tinggi) atau JPG.

Tombol Utama: "Download ke Perangkat" (langsung memicu unduhan browser dengan nama file otomatis seperti photobooth-strip-2026.png).

Tombol Sekunder: "Kembali Edit" (menutup modal untuk memperbaiki hiasan).

Tombol Tersier: "Buat Sesi Foto Baru" (mengosongkan state foto dan kembali ke halaman 'home').

Core Logic

Sebelum melakukan ekspor, pastikan tidak ada bounding box seleksi stiker yang masih aktif (canvas.discardActiveObject(); canvas.renderAll();).

Gunakan metode canvas.toDataURL({ format: 'png', multiplier: 2 }) agar hasil gambar yang diunduh tajam dan tidak pecah saat diunggah ke Instagram Story atau TikTok.

Acceptance Criteria

[ ] Gambar yang diunduh memuat foto, bingkai, coretan doodle, dan stiker secara utuh tanpa kotak kontrol seleksi.

[ ] Unduhan berjalan instan di sisi browser tanpa mengirim data ke server mana pun.