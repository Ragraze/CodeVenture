# Codeventure

Ruang belajar teknologi berbahasa Indonesia dengan tema putih tanpa bayangan, latar dot grid, warna netral, dan logo kode SVG. Hero satu kolom mengikuti tinggi layar dengan tagline “Dari nol, sampai bisa.” Navbar transparan di posisi teratas, lalu memiliki latar dan garis pemisah saat digulir. Menu Beranda berada sebelum Jalur belajar. Halaman dalam menggunakan dua tombol bundar untuk kembali/maju dalam riwayat browser.

Empat jalur memuat **60 pelajaran**: HTML 15, CSS 15, JavaScript 18, dan Laravel 12. Seluruh **48 pelajaran frontend** memiliki editor, pemeriksaan latihan, dan petunjuk. Urutan dimulai dari cara web bekerja, dilanjutkan dasar HTML, layout CSS, logika JavaScript, serta PHP dan Laravel. Proyek mencakup profil, katalog responsif, ringkasan tugas, dan aplikasi catatan pribadi. Materi ditulis dalam bahasa Indonesia dengan rujukan MDN, PHP Manual, dan Laravel 13; pola belajar bertahap terinspirasi freeCodeCamp. Daftar lengkap ada di [docs/CURRICULUM.md](docs/CURRICULUM.md).

Editor hanya tersedia pada halaman belajar: HTML/CSS dengan preview, serta JavaScript dengan keluaran console. Tombol Jalankan kode atau Ctrl/Cmd+Enter menjalankan kode. HTML/CSS dirender dalam sandbox; JavaScript berjalan di worker dengan batas 1,5 detik, tanpa DOM, jaringan, atau localStorage. Contoh DOM, penyimpanan browser, dan PHP/Laravel tetap dicoba di lingkungan lokal. Kode editor tidak dieksekusi di server dan editan tidak disimpan setelah berpindah halaman. Reset kode meminta konfirmasi. Kelulusan latihan memberi umpan balik; progres tetap dicatat lewat kuis dan penanda selesai.

Tiga tombol ikon di samping Pengaturan memilih tema terang (matahari), gelap (bulan), atau mengikuti perangkat (monitor). Pilihan aktif ditandai dan tersinkron dengan halaman Pengaturan. Tema terang menjadi bawaan; pilihan gelap/sistem yang disimpan tetap dihormati. Tombol GitHub hitam menetap di kanan bawah dan membuka repository sumber. Logo SVG digunakan juga sebagai favicon. Beranda hanya memuat pengantar, kartu jalur, dan progres; editor tersedia pada halaman belajar. Setiap kartu jalur menunjukkan hasil latihan yang akan dibuat. Latar kartu mengikuti tone halaman; underline tautan muncul ketika hover atau fokus.

Aplikasi aktif **tidak memerlukan database, migrasi, akun, atau layanan eksternal**. Progres dan catatan disimpan di localStorage; ekspor/impor JSON tersedia di Pengaturan. Data tidak otomatis tersinkron antarperangkat. Menghapus data situs dapat menghapusnya. Backend lama masih berada di repository sebagai kode historis, tetapi rute akun/API lamanya tidak dipublikasikan.

## Menjalankan lokal

PHP 8.5 direkomendasikan (minimum 8.4.1 untuk seluruh dependensi development), Composer 2, dan Node.js 22.12+ atau 24+.

```sh
composer install
npm ci
cp .env.example .env
php artisan key:generate
npm run build
php artisan serve --port=8000
```

Tidak perlu membuat database. Untuk mengedit frontend sambil melihat perubahan, jalankan `npm run dev` di terminal terpisah. Server Laravel tetap diperlukan untuk halaman.

Jika PHP belum terpasang:

```sh
docker build -f Dockerfile.dev -t codeventure-runtime .
docker run --rm --user "$(id -u):$(id -g)" -v "$PWD:/app" codeventure-runtime composer install
docker run --rm --user "$(id -u):$(id -g)" -v "$PWD:/app" codeventure-runtime php artisan key:generate
docker run --rm --user "$(id -u):$(id -g)" -p 127.0.0.1:8000:8000 -v "$PWD:/app" codeventure-runtime
```

Salin `.env.example` dan jalankan build frontend sebelum memakai container development. Semua perintah dijalankan dari folder project.

## Pengujian

```sh
php artisan test
npm run test:content
composer audit
npm audit
npm run build
npx playwright install chromium
npm run test:e2e
```

Tes browser memerlukan server di `http://localhost:8000`; atur `TEST_BASE_URL` untuk alamat lain. Linux minimal mungkin membutuhkan dependensi sistem Chromium melalui `npx playwright install-deps chromium`. Tes memakai context browser terpisah dan tidak menyentuh progres browser harianmu.

Panduan production ada di [DEPLOYMENT.md](DEPLOYMENT.md), keputusan visual di [DESIGN.md](DESIGN.md), dan hasil pemeriksaan di [QUALITY.md](QUALITY.md).
