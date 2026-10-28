export const extraLessons = {
    'html-dasar': [
        {
            id: 'daftar-dan-navigasi', title: 'Susun daftar dan navigasi', minutes: 10,
            intro: 'Daftar membantu pembaca memahami kelompok informasi. Kita akan mengubah kumpulan tautan menjadi navigasi yang memiliki struktur.',
            sections: [
                ['Kelompokkan isi yang berkaitan', 'Gunakan ul untuk daftar tanpa urutan dan ol ketika urutannya penting, misalnya langkah instalasi. Setiap item memakai li. Jangan membuat daftar hanya dengan menambahkan tanda strip pada paragraf.'],
                ['Beri nama pada navigasi', 'Nav menandai wilayah navigasi. Jika ada lebih dari satu nav, beri aria-label yang berbeda seperti Utama dan Daftar materi. Nama tersebut membantu pengguna pembaca layar memilih wilayah yang diperlukan.'],
                ['Sediakan tujuan yang benar', 'Href harus menuju halaman atau id yang ada. Tautan menuju #tentang berpindah ke elemen dengan id tentang. Pakai teks tujuan yang jelas dan pertahankan penanda fokus bawaan saat mencoba dengan keyboard.'],
            ],
            code: '<nav aria-label="Daftar materi">\n  <ul>\n    <li><a href="#html">Belajar HTML</a></li>\n    <li><a href="#css">Belajar CSS</a></li>\n  </ul>\n</nav>\n<section id="html"><h2>HTML</h2><p>Struktur halaman.</p></section>\n<section id="css"><h2>CSS</h2><p>Tampilan halaman.</p></section>',
            task: 'Buat navigasi berisi tiga tautan di dalam ul. Hubungkan masing-masing tautan ke bagian HTML, CSS, dan JavaScript pada halaman yang sama.',
            quiz: { question: 'Kapan ol lebih tepat daripada ul?', options: ['Saat urutan langkah memengaruhi makna', 'Saat ingin huruf lebih besar', 'Saat semua item adalah tautan'], answer: 0, explanation: 'Ol menyatakan urutan yang bermakna. Ukuran huruf diatur lewat CSS.' },
            source: ['Lists · MDN', 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Lists'],
        },
        {
            id: 'proyek-profil', title: 'Proyek: halaman profil pertamamu', minutes: 18,
            intro: 'Gabungkan struktur semantik, daftar, dan formulir menjadi profil sederhana. Fokus pada makna konten sebelum menambahkan dekorasi.',
            sections: [
                ['Pecah kebutuhan menjadi bagian', 'Profil ini memuat satu judul utama, paragraf perkenalan, daftar keterampilan, dan formulir kontak. Tulis kerangka di dalam main lalu beri heading untuk setiap section. Jangan memakai heading hanya untuk membesarkan teks.'],
                ['Rancang formulir yang terbaca', 'Setiap input membutuhkan label yang terhubung lewat for dan id. Type email memberi validasi format bawaan. Pada latihan ini formulir tidak mengirim data; cobalah field kosong dan navigasi Tab untuk memeriksa pengalaman penggunanya.'],
                ['Periksa hasil seperti pengunjung', 'Baca halaman dari atas ke bawah. Apakah judul menjelaskan pemilik profil? Apakah daftar berisi keterampilan nyata yang ingin kamu pelajari? Apakah label formulir tetap terlihat setelah mengetik? Pemeriksaan otomatis membantu struktur, sedangkan kejelasan tulisan perlu kamu nilai sendiri.'],
            ],
            code: '<main>\n  <h1>Profil pelajar web</h1>\n  <p>Saya belajar membuat halaman yang mudah digunakan.</p>\n  <section><h2>Keterampilan</h2>\n    <ul><li>HTML</li><li>CSS</li><li>JavaScript</li></ul>\n  </section>\n  <section><h2>Hubungi saya</h2>\n    <form><label for="email">Email</label>\n      <input id="email" type="email" required>\n      <button type="submit">Coba validasi</button>\n    </form>\n  </section>\n</main>',
            task: 'Ganti profil dengan ceritamu. Pertahankan satu h1, minimal dua section, tiga keterampilan, dan input email yang berlabel.',
            quiz: { question: 'Setelah struktur otomatis lulus, apa yang tetap perlu diperiksa sendiri?', options: ['Hanya warna tombol', 'Kejelasan isi dan pengalaman keyboard', 'Tidak ada lagi yang perlu diperiksa'], answer: 1, explanation: 'Tes struktur tidak menilai seluruh kualitas tulisan maupun pengalaman penggunaan.' },
            source: ['Structuring content · MDN', 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content'],
        },
    ],
    'css-responsif': [
        {
            id: 'variabel-dan-warna', title: 'Warna konsisten dengan variabel CSS', minutes: 12,
            intro: 'Custom properties menyimpan nilai yang bisa digunakan kembali. Mulai dari warna dan jarak agar komponen terasa konsisten saat diubah.',
            sections: [
                ['Definisikan berdasarkan peran', 'Beri nama seperti --warna-teks dan --jarak-kartu agar tujuannya terbaca. Deklarasi pada :root dapat dipakai seluruh dokumen. Nilai yang didefinisikan pada elemen anak berlaku di lingkup elemen tersebut dan turunannya.'],
                ['Gunakan var dan nilai cadangan', 'Panggil nilai dengan var(--warna-teks). Nilai kedua seperti var(--jarak, 16px) menjadi cadangan jika custom property belum tersedia. Custom properties mengikuti cascade sehingga elemen tertentu dapat mengganti nilai untuk turunannya.'],
                ['Uji pasangan warna', 'Warna harus tetap terbaca pada latarnya. Mulailah dengan teks gelap dan latar terang, gunakan satu aksen untuk tindakan, lalu periksa kontras. Mengubah variabel akan memperbarui semua properti yang merujuk padanya, tanpa menyalin nilai ke banyak selector.'],
            ],
            code: ':root {\n  --warna-teks: #252a30;\n  --warna-latar: #f5f6f7;\n  --jarak-kartu: 24px;\n}\n.kartu {\n  color: var(--warna-teks);\n  background: var(--warna-latar);\n  padding: var(--jarak-kartu);\n}',
            task: 'Atur padding .kartu menjadi 24px melalui custom property. Tambahkan warna teks dan latar dari variabel, lalu ubah nilainya untuk melihat pengaruh cascade.',
            quiz: { question: 'Apa fungsi argumen kedua pada var(--jarak, 16px)?', options: ['Nilai cadangan jika variabel tidak tersedia', 'Menambahkan 16px ke variabel', 'Mengubah variabel menjadi angka'], answer: 0, explanation: 'Argumen kedua menyediakan fallback, bukan operasi penjumlahan.' },
            source: ['Using CSS custom properties · MDN', 'https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties'],
        },
        {
            id: 'proyek-katalog', title: 'Proyek: katalog yang menyesuaikan layar', minutes: 18,
            intro: 'Bangun katalog tiga kartu yang terbaca pada ponsel dan desktop. Gunakan isi untuk menentukan kebutuhan layout, bukan ukuran satu perangkat saja.',
            sections: [
                ['Buat struktur yang sederhana', 'Satu container katalog mengelompokkan article. Setiap article memiliki judul dan penjelasan. Pastikan urutan HTML sudah masuk akal sebelum memakai Grid, sebab urutan baca dan keyboard tetap mengikuti dokumen.'],
                ['Biarkan Grid membagi ruang', 'Gunakan repeat, auto-fit, dan minmax untuk menambah kolom ketika ruang mencukupi. Minimum min(100%, 220px) menjaga kartu tidak memaksa halaman meluber pada container sempit. Gap memberi jarak antaritem tanpa margin khusus pada kartu terakhir.'],
                ['Periksa pada ruang yang berbeda', 'Perbesar dan perkecil preview melalui lebar jendela browser. Coba judul panjang dan paragraf lebih banyak. Jangan memberi tinggi tetap pada kartu; isi harus bisa bertambah tanpa terpotong. Tes otomatis memeriksa Grid dan jumlah kartu, bukan semua ukuran perangkat.'],
            ],
            code: '.katalog {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));\n  gap: 16px;\n}\narticle { padding: 16px; border: 1px solid #858e99; border-radius: 12px; }\nh2 { margin-top: 0; font-size: 1.2rem; }',
            task: 'Buat tiga article di dalam .katalog. Gunakan display grid dan gap 16px. Pastikan teks tetap terbaca saat browser dipersempit.',
            quiz: { question: 'Mengapa menghindari tinggi tetap pada kartu berisi teks?', options: ['Karena Grid tidak mendukung height', 'Agar teks yang bertambah tidak terpotong', 'Agar setiap kartu selalu satu baris'], answer: 1, explanation: 'Tinggi yang mengikuti isi lebih tahan terhadap teks panjang dan pembesaran huruf.' },
            source: ['Grid layout · MDN', 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout'],
        },
    ],
    'javascript-interaktif': [
        {
            id: 'percabangan-dan-loop', title: 'Keputusan dan pengulangan', minutes: 12,
            intro: 'Program bisa memilih langkah berdasarkan kondisi dan mengulangi pekerjaan pada daftar data. Latihan ini membuat ringkasan nilai tanpa menyentuh tampilan.',
            sections: [
                ['Nyatakan kondisi dengan jelas', 'If menjalankan blok ketika kondisinya truthy. Perbandingan seperti nilai >= 70 menghasilkan boolean. Gunakan === saat ingin membandingkan tanpa konversi tipe implisit, dan beri nama variabel yang menjelaskan syaratnya.'],
                ['Ulangi pada daftar yang terbatas', 'For...of membaca setiap nilai pada iterable seperti array. Tidak perlu menghitung indeks jika yang dibutuhkan hanya nilainya. Untuk while, pastikan kondisi bisa berubah; loop tanpa akhir akan menghabiskan sumber daya. Runner menghentikan kode yang melewati 1,5 detik.'],
                ['Pisahkan hitungan dan keluaran', 'Hitung hasil pada variabel, lalu tampilkan lewat console.log. Coba daftar kosong, seluruh nilai lulus, dan seluruh nilai belum lulus. Kode yang benar pada satu contoh belum tentu benar pada semua masukan.'],
            ],
            code: 'const nilai = [85, 60, 90, 72];\nlet lulus = 0;\nfor (const angka of nilai) {\n  if (angka >= 70) lulus += 1;\n}\nconsole.log(`Lulus: ${lulus}`);',
            task: 'Hitung jumlah nilai minimal 70 pada [85, 60, 90, 72] lalu tampilkan Lulus: 3. Coba daftar kosong untuk menguji nilai awal penghitung.',
            quiz: { question: 'Apa yang harus dijamin pada loop while?', options: ['Kondisi harus selalu true', 'Kondisi bisa berubah sehingga loop dapat berhenti', 'Harus memakai localStorage'], answer: 1, explanation: 'Loop membutuhkan kondisi berhenti agar tidak berjalan tanpa akhir.' },
            source: ['Loops and iteration · MDN', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration'],
        },
        {
            id: 'proyek-ringkasan-tugas', title: 'Proyek: ringkasan tugas dari data', minutes: 18,
            intro: 'Gabungkan array, fungsi, filter, dan format keluaran untuk membuat ringkasan tugas. Logika ini dapat digunakan lagi saat membangun antarmuka sendiri.',
            sections: [
                ['Tentukan kontrak data', 'Setiap tugas memiliki title berupa string dan done berupa boolean. Fungsi ringkasan menerima array tersebut dan mengembalikan teks. Menyepakati bentuk masukan membantu mencegah asumsi berbeda antarbagian kode.'],
                ['Turunkan hasil dari sumber yang sama', 'Ambil jumlah seluruh tugas dari length, lalu gunakan filter untuk menghitung tugas selesai. Jumlah tersisa adalah selisih keduanya. Jangan menyimpan tiga penghitung terpisah yang harus selalu diperbarui bersama.'],
                ['Uji keadaan kosong', 'Array kosong seharusnya menghasilkan 0 dari 0 tanpa error. Pertahankan array asli agar fungsi dapat digunakan ulang. Setelah ringkasan bekerja di console, kamu bisa menghubungkannya ke DOM di editor lokal sesuai materi DOM sebelumnya.'],
            ],
            code: 'function ringkasan(tugas) {\n  const selesai = tugas.filter(item => item.done).length;\n  return `${selesai} dari ${tugas.length} selesai`;\n}\nconst tugas = [\n  { title: "Baca HTML", done: true },\n  { title: "Coba CSS", done: false },\n  { title: "Latihan JS", done: true }\n];\nconsole.log(ringkasan(tugas));\nconsole.log(ringkasan([]));',
            task: 'Buat fungsi ringkasan. Tampilkan 2 dari 3 selesai untuk contoh tiga tugas dan 0 dari 0 selesai untuk array kosong. Jangan ubah array masukan.',
            quiz: { question: 'Mengapa jumlah tersisa sebaiknya dihitung dari total dikurangi selesai?', options: ['Agar tidak perlu array', 'Agar tidak menyimpan data turunan yang mudah tidak sinkron', 'Agar fungsi selalu mengubah input'], answer: 1, explanation: 'Data turunan dapat dihitung dari sumber utama sehingga tidak perlu disinkronkan secara manual.' },
            source: ['Functions · MDN', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions'],
        },
    ],
};
