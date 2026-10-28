# Kurikulum dari awal

Permintaan: lengkapi konten belajar sebanyak mungkin dari dasar. Target batch ini adalah 60 pelajaran yang substantif: HTML 15, CSS 15, JavaScript 18, Laravel 12. Pertahankan URL/ID 18 pelajaran lama dan schema progres v1. Materi ditulis sendiri dalam bahasa Indonesia, dengan sumber primer MDN dan dokumentasi Laravel 13.

Setiap tambahan memiliki pengantar, setidaknya tiga bagian penjelasan, contoh kode yang utuh, tugas dengan keluaran jelas, satu kuis dengan alasan jawaban, dan rujukan. Semua 48 pelajaran frontend memiliki runner dan petunjuk; latihan DOM/storage tetap menjelaskan batas worker dan memberikan latihan fungsi yang dapat dijalankan. Laravel memiliki langkah praktik lokal dan tidak mengklaim berjalan di browser.

Pembagian file: resources/js/curriculum/html.js (10 tambahan), css.js (10), javascript.js (13), laravel.js (9); curriculum/index.js menggabungkan dan mengurutkan seluruh materi. exerciseFor menerima definisi latihan pada lesson baru, selain definisi lama. Urutan kurikulum eksplisit, bukan sekadar append acak. UI yang disetujui tidak didesain ulang.

- [x] Tes struktur jumlah/unik/kelengkapan, stabilitas ID lama, dan urutan dari pengantar.
- [x] Tulis materi HTML/CSS/JS secara paralel dengan batas file terpisah; tulis Laravel dan integrasi langsung.
- [x] Integrasikan urutan; arahkan tombol mulai ke pengantar; pertahankan semua ID lama.
- [x] Jalankan semua contoh frontend/kuis di browser, periksa sumber dan materi backend, build dan tes regresi.
- [x] Perbarui README dan catatan kualitas dengan jumlah serta batas cakupan yang benar.
