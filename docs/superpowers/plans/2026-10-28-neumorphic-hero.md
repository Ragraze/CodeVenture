# Neumorphic Codeventure

Arahan pengguna: neumorphism putih, latar dot grid, hero yang mewah dan spektakuler sebagai tampilan pertama. Ini memperjelas permintaan desain sebelumnya; implementasi diteruskan langsung.

Konsep: urutan belajar Codeventure menjadi meja kerja kode yang memiliki kedalaman fisik. Motif dot grid adalah kanvas kerja yang diminta pengguna, bukan latar acak. Aset nyata: logo globe, editor HTML/CSS/JS, 18 pelajaran, tiga proyek, dan progres lokal.

Argumen halaman: hero membuktikan belajar lewat praktik dengan editor nyata; penjelajah jalur membuktikan urutan materi; katalog memperlihatkan hasil karya; kuis memberi sampel pemahaman; penutup mengarahkan ke langkah pertama.

Taste draw memilih borrowed-category: perangkat kerja presisi. Blueprint fotografi dan font signage tidak digunakan karena aset utamanya adalah produk interaktif dan arah pengguna adalah permukaan lembut. Display Manrope self-hosted dipilih untuk bentuk geometris bulat yang menyatu dengan panel; teks panjang memakai font sistem yang telah ada. Bayangan dan dot grid adalah pengecualian yang diminta eksplisit terhadap house style skill. Tema gelap, fokus keyboard, reduced motion, dan target sentuh tetap didukung.

- [x] Bentuk ulang hero dengan headline dua baris, CTA, urutan belajar ringkas, dan console yang lebih kompak.
- [x] Tambahkan token neumorphism terang/gelap, dot canvas, raised panels dan inset fields. Tidak ada dependency runtime/API.
- [x] Build dan tes browser; lihat 360/768/1440px, kontras, keyboard, dan error editor.
- [x] Review desain dari screenshot, perbaiki temuan, dan catat token di DESIGN.md serta .impeccable/design.json.

Hasil: build lulus; 6 tes PHP (49 assertions) dan 22 tes browser lulus. Review awal meminta perbaikan GitHub di ponsel dan verifikasi screenshot frame. Ikon 44px menyisakan ruang dan disembunyikan saat editor difokuskan (tes regresi red/green). Preview mobile dikonfirmasi hidup lalu dicapture setelah iframe dan compositor siap. Verdict pass `ship` menutup dua temuan tersebut. Dokumentasi token diselesaikan terpisah tanpa mengubah source setelah capture terakhir.
