# Interactive Learning Implementation Plan

> Implementasi langsung menggunakan executing-plans, sesuai permintaan pengguna untuk membuat fitur yang telah disetujui.

**Goal:** Hero yang dapat dicoba, 18 pelajaran, dan latihan frontend dengan hasil nyata.

**Architecture:** Modul playground bersama digunakan hero dan pembaca. Frame sandbox menjalankan renderer dan worker console; CSP aplikasi utama tetap ketat.

**Tech Stack:** Laravel, Blade, vanilla JavaScript, Vite, Playwright.

**Spec:** ../specs/2026-10-28-interactive-learning-design.md

## Constraints
- Tanpa dependensi baru; tema putih, sticky navbar, data v1, dan rute lama tetap berlaku.
- JS worker tanpa DOM; timeout 1500ms; frame tanpa akses storage/parent DOM atau koneksi eksternal.

## Review focus
- Kode infinite loop harus berhenti dan dapat dijalankan lagi.
- HTML berbahaya tidak mengakses parent/storage atau jaringan.
- Reset tidak menghilangkan edit tanpa konfirmasi.
- Data progres lama tetap valid setelah penambahan pelajaran.
- Editor dan preview bisa digunakan pada mobile/keyboard dan kedua tema.

## Tasks
- [x] Tambahkan tes browser untuk hero runner, HTML/CSS checks, JS error/timeout, reset, dan isolasi; jalankan dan lihat gagal.
- [x] Buat playground.js, playground.css, sandbox view, sandbox runner dan route dengan CSP khusus. Uji hasil, reset, isolasi, timeout.
- [x] Tambahkan enam pelajaran dan definisi tantangan frontend; integrasikan editor pembaca serta hero dan pratinjau jalur.
- [x] Jalankan build, tes PHP dan seluruh tes browser termasuk aksesibilitas; periksa screenshot desktop/mobile; perbarui dokumentasi.

## Hasil

Build lulus; 6 tes PHP (49 assertions) dan 21 tes Playwright lulus pada server development port 8010. Review independen menemukan dua P2: lebar latihan pada mobile dan hasil run usang setelah edit. Keduanya direproduksi dengan tes gagal, diperbaiki, dan tes lulus. Pemeriksaan aksesibilitas tambahan menangkap label console tanpa role; diperbaiki menjadi region dan dicakup tes kedua tema. Screenshot menunjukkan judul hero terbelah di mobile; ukuran judul mobile disesuaikan dan dicek lewat Range.getClientRects.

Ruling: JavaScript runner menggunakan worker tanpa DOM agar loop dapat dihentikan tanpa memblokir UI. Materi DOM/storage mempertahankan contoh lengkap untuk editor lokal dan menyediakan latihan fungsi/serialisasi pada console. Tidak ada perubahan schema progres atau dependensi baru.
