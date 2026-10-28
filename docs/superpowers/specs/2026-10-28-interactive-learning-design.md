# Belajar interaktif

Rancangan disetujui pengguna: perluas hero dengan editor, tambah materi Indonesia dan tantangan bertahap, jalankan HTML/CSS/JavaScript, pertahankan tema putih dan progres lama. PHP/Laravel tetap berupa materi bacaan.

Hero memuat editor dan hasil, pratinjau jalur dipindah ke bagian katalog. Materi frontend mendapat editor dan pemeriksaan tantangan. Tambahkan enam pelajaran (dua per jalur frontend) beserta contoh, latihan, kuis, petunjuk, dan sumber MDN. Pola belajar terinspirasi freeCodeCamp, teks disusun sendiri.

HTML/CSS dirender di iframe dengan origin sandbox dan CSP terpisah; JavaScript berjalan di worker dalam sandbox dengan timeout, hasil console, dan pesan error. Runner JS tidak menyediakan DOM. Kode tidak dikirim untuk dieksekusi oleh PHP. Draft editor bersifat sesi; progres dan catatan tetap menggunakan format lama. Reset selalu meminta konfirmasi.
