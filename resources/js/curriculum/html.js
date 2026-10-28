export const htmlOrder = [
    "mengenal-web",
    "alat-dan-dokumen",
    "struktur-semantik",
    "elemen-dan-atribut",
    "makna-teks",
    "daftar-dan-navigasi",
    "tautan-dan-gambar",
    "alamat-dan-jalur",
    "gambar-dan-media",
    "tabel-data",
    "formulir-aksesibel",
    "pilihan-formulir",
    "validasi-formulir",
    "proyek-panduan",
    "proyek-profil"
];

export const htmlLessons = [
    {
        "id": "mengenal-web",
        "title": "Kenali web sebelum menulis kode",
        "minutes": 14,
        "intro": "Mulai tanpa pengalaman pemrograman. Kamu akan membedakan halaman, browser, dan server, lalu mengubah tulisan pertamamu di sebuah dokumen HTML.",
        "sections": [
            [
                "Apa yang terjadi saat membuka halaman?",
                "Browser adalah aplikasi yang membaca dokumen web dan menampilkannya. Saat membuka alamat di internet, browser meminta sumber daya kepada server. Server mengirimkan berkas seperti HTML, CSS, dan gambar. Membuka berkas lokal juga dapat menampilkan HTML, tetapi tidak membutuhkan server internet. Alamat berkas lokal biasanya dimulai dengan file:, sedangkan situs umumnya memakai https:. Keduanya tetap memerlukan browser untuk membaca dokumen."
            ],
            [
                "Tiga pekerjaan yang berbeda",
                "HTML menyatakan isi dan maknanya: judul, paragraf, daftar, serta formulir. CSS mengatur tampilan seperti warna dan jarak. JavaScript dapat mengubah keadaan atau menanggapi tindakan pengunjung. Halaman sederhana sudah berguna hanya dengan HTML. Kamu tidak perlu menambahkan ketiganya sekaligus. Pada contoh, h1 menandai judul utama dan p menandai paragraf; bentuk hurufnya mengikuti aturan bawaan browser."
            ],
            [
                "Lakukan perubahan kecil dan amati",
                "Jalankan contoh, baca hasilnya, lalu ubah hanya tulisan di antara pembuka dan penutup paragraf. Jalankan lagi untuk membandingkan. Editor menyimpan teks sumber; panel hasil menampilkan tafsir browser atas teks tersebut. Mengubah sumber di latihan ini tidak mengubah situs lain. Jika hasil belum berubah, pastikan perubahan sudah dijalankan dan periksa apakah kamu mengedit contoh yang sedang ditampilkan."
            ]
        ],
        "code": "<!doctype html>\n<html lang=\"id\">\n<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>Kenali web sebelum menulis kode</title>\n</head>\n<body>\n<main>\n  <h1>Catatan belajar web</h1>\n  <p>Hari ini saya mengenal HTML.</p>\n</main>\n</body>\n</html>",
        "task": "Tambahkan paragraf kedua yang menjelaskan perbedaan HTML dan CSS dengan kalimatmu sendiri. Jalankan hasil dan pastikan kedua paragraf terbaca.",
        "quiz": {
            "question": "Apa pekerjaan utama HTML?",
            "options": [
                "Mengatur koneksi Wi-Fi",
                "Menyatakan isi dan struktur halaman",
                "Menggantikan aplikasi browser"
            ],
            "answer": 1,
            "explanation": "HTML memberi struktur dan makna pada konten yang dibaca browser."
        },
        "source": [
            "Kenali web sebelum menulis kode · MDN",
            "https://developer.mozilla.org/en-US/Learn_web_development/Getting_started/Web_standards/How_the_web_works"
        ],
        "exercise": {
            "checks": [
                {
                    "kind": "selector",
                    "selector": "main > h1",
                    "label": "Judul utama tersedia"
                },
                {
                    "kind": "count",
                    "selector": "main > p",
                    "min": 2,
                    "label": "Dua paragraf penjelasan"
                }
            ],
            "hint": "Tambahkan pasangan pembuka dan penutup p setelah paragraf pertama."
        }
    },
    {
        "id": "alat-dan-dokumen",
        "title": "Siapkan berkas dan dokumen pertama",
        "minutes": 14,
        "intro": "Pelajari hubungan editor, berkas, dan browser. Kerangka dokumen membantu tulisan Indonesia, judul tab, dan tampilan pada ponsel dibaca dengan benar.",
        "sections": [
            [
                "Simpan sebagai teks HTML",
                "Di komputer sendiri, buat folder belajar-web dan berkas index.html menggunakan editor teks. Ekstensi .html memberi petunjuk jenis berkas; jangan sampai tersimpan sebagai index.html.txt. Buka berkas melalui browser. Sesudah mengedit dan menyimpan, muat ulang halaman. Di latihan daring, tombol jalankan mengambil peran menyegarkan hasil. Kebiasaan menyimpan sebelum memeriksa akan mencegah kebingungan antara kode lama dan kode terbaru."
            ],
            [
                "Kenali bagian yang tidak terlihat",
                "Doctype di awal meminta mode standar. Elemen html membungkus dokumen dan lang menyatakan bahasa. Head menampung informasi tentang dokumen, sedangkan body memuat isi halaman. Title menamai tab browser; h1 adalah judul yang dibaca di halaman. Meta charset utf-8 membantu karakter seperti tanda kutip dan huruf beraksen terbaca. Meta viewport membantu browser ponsel memakai lebar perangkat sebagai acuan tampilan."
            ],
            [
                "Periksa dokumen, bukan hanya hasil",
                "Browser sering memperbaiki markup yang tidak lengkap sehingga tampilan terlihat baik meskipun sumbernya salah. Baca pasangan tag dari luar ke dalam dan gunakan indentasi untuk menunjukkan hubungan. Jangan menaruh paragraf di head. Panel latihan menampilkan isi dalam lingkungan terpisah sehingga judul tab aplikasi tidak berubah mengikuti title contoh. Untuk mengamati title dan bahasa dokumen secara utuh, simpan contoh sebagai berkas lokal dan buka langsung."
            ]
        ],
        "code": "<!doctype html>\n<html lang=\"id\">\n<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>Siapkan berkas dan dokumen pertama</title>\n</head>\n<body>\n<main>\n  <h1>Halaman pertama</h1>\n</main>\n</body>\n</html>",
        "task": "Tambahkan paragraf di dalam main tentang lokasi berkas HTML milikmu. Di komputer, simpan contoh sebagai index.html dan bandingkan judul tab dengan h1.",
        "quiz": {
            "question": "Bagian mana menyimpan judul tab?",
            "options": [
                "title di dalam head",
                "p di dalam body",
                "Nama folder saja"
            ],
            "answer": 0,
            "explanation": "Title adalah metadata dokumen; h1 merupakan konten halaman."
        },
        "source": [
            "Siapkan berkas dan dokumen pertama · MDN",
            "https://developer.mozilla.org/en-US/Learn_web_development/Core/Structuring_content/Webpage_metadata"
        ],
        "exercise": {
            "checks": [
                {
                    "kind": "selector",
                    "selector": "main > h1",
                    "label": "Judul halaman tersedia"
                },
                {
                    "kind": "selector",
                    "selector": "main > p",
                    "label": "Paragraf lokasi berkas tersedia"
                }
            ],
            "hint": "Tulis p setelah h1, tetap di dalam main. Metadata diperiksa manual melalui berkas lokal."
        }
    },
    {
        "id": "elemen-dan-atribut",
        "title": "Baca elemen, atribut, dan susunannya",
        "minutes": 14,
        "intro": "HTML memakai elemen yang dapat bersarang. Kamu akan membaca atribut, memberi penanda bagian, dan menulis karakter yang biasanya dianggap markup.",
        "sections": [
            [
                "Baca dari pembuka ke penutup",
                "Pada &lt;p&gt;Halo&lt;/p&gt;, pembuka p memulai paragraf dan penutupnya mengakhirinya. Isi dapat berupa teks atau elemen lain yang diizinkan. Tutup elemen paling dalam terlebih dahulu: jika strong dibuka di dalam p, tutup strong sebelum p. Indentasi tidak mengubah makna tetapi membantu menemukan pasangan yang keliru. Elemen kosong seperti br dan input tidak membungkus isi dan tidak memakai tag penutup."
            ],
            [
                "Tambahkan informasi lewat atribut",
                "Atribut berada pada tag pembuka. Id memberi penanda unik pada satu dokumen; class mengelompokkan elemen dan boleh dipakai berulang. Tulis nilai di dalam tanda kutip agar spasi dan karakter lain tidak memecahnya. Atribut bukan tulisan yang langsung muncul di halaman. Pada contoh, id catatan dapat menjadi tujuan tautan, sedangkan class pengingat bisa dipakai sebagai sasaran CSS pada pelajaran berikutnya."
            ],
            [
                "Tampilkan karakter khusus dengan aman",
                "Browser menganggap tanda lebih kecil sebagai awal tag. Untuk menulis contoh markup sebagai teks, gunakan &amp;lt; untuk tanda lebih kecil dan &amp;gt; untuk tanda lebih besar. Gunakan &amp;amp; jika perlu menuliskan ampersand sebagai referensi karakter. Coba ubah tulisan dalam code, lalu amati bahwa pengunjung melihat tanda kurung sudut, bukan elemen baru. Hindari menyalin id yang sama ke beberapa bagian karena tujuan tautan menjadi ambigu."
            ]
        ],
        "code": "<!doctype html>\n<html lang=\"id\">\n<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>Baca elemen, atribut, dan susunannya</title>\n</head>\n<body>\n<main>\n  <h1>Membaca HTML</h1>\n  <p id=\"catatan\" class=\"pengingat\">Pembuka paragraf ditulis <code>&lt;p&gt;</code>.</p>\n</main>\n</body>\n</html>",
        "task": "Tambahkan paragraf dengan id latihan dan class pengingat. Di dalamnya, tampilkan tulisan &lt;h2&gt; sebagai teks menggunakan referensi karakter dan elemen code.",
        "quiz": {
            "question": "Apa perbedaan id dan class?",
            "options": [
                "Id wajib berisi angka",
                "Class hanya boleh sekali per halaman",
                "Id unik pada dokumen; class boleh dipakai berulang"
            ],
            "answer": 2,
            "explanation": "Id menjadi identitas satu elemen, sedangkan class menandai kelompok."
        },
        "source": [
            "Baca elemen, atribut, dan susunannya · MDN",
            "https://developer.mozilla.org/en-US/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax"
        ],
        "exercise": {
            "checks": [
                {
                    "kind": "selector",
                    "selector": "p#latihan.pengingat",
                    "label": "Paragraf beridentitas latihan"
                },
                {
                    "kind": "selector",
                    "selector": "p#latihan code",
                    "label": "Contoh markup ditulis sebagai kode"
                }
            ],
            "hint": "Gunakan id=\"latihan\" class=\"pengingat\" pada p; isi code dengan &lt;h2&gt;."
        }
    },
    {
        "id": "makna-teks",
        "title": "Beri makna pada teks dan kutipan",
        "minutes": 14,
        "intro": "Tulisan bukan sekadar baris yang tebal atau miring. Pilih elemen yang menjelaskan penekanan, kepentingan, kutipan, dan potongan kode.",
        "sections": [
            [
                "Pisahkan paragraf dan penekanan",
                "Paragraf mengelompokkan satu gagasan. Buat paragraf baru saat topik bergeser, bukan dengan menumpuk br untuk membuat jarak. Em menandai tekanan ujaran yang mengubah cara kalimat dibaca. Strong menandai kepentingan atau keseriusan, misalnya peringatan menyimpan pekerjaan. Keduanya sering tampak miring atau tebal secara bawaan, tetapi pilih berdasarkan maknanya. Ukuran, ketebalan, serta jarak visual nantinya dapat kamu atur dengan CSS."
            ],
            [
                "Tunjukkan kutipan secara jujur",
                "Blockquote dipakai untuk kutipan panjang yang berdiri sebagai blok. Q cocok untuk kutipan pendek dalam kalimat. Cantumkan sumber yang dapat dikenali dalam tulisan terpisah jika tersedia; atribut cite saja tidak otomatis menampilkan nama sumber. Untuk latihan ini, kutipan berasal dari catatan rekaan yang jelas diberi nama. Jangan membuat testimoni atau menganggap setiap kalimat indah membutuhkan blockquote."
            ],
            [
                "Bedakan kode dan tampilan",
                "Code menandai potongan kode. Pre mempertahankan spasi serta pergantian baris, berguna jika contoh membutuhkan indentasi. Keduanya dapat digabungkan. Saat menulis markup di dalam code, tetap gunakan referensi karakter agar browser tidak menjalankannya sebagai HTML. Coba hapus strong dari contoh dan amati bahwa isi masih terbaca; makna penekanan berkurang meskipun kalimatnya sama. Uji dengan membaca kalimat lantang untuk menentukan kata yang benar-benar perlu ditekankan."
            ]
        ],
        "code": "<!doctype html>\n<html lang=\"id\">\n<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>Beri makna pada teks dan kutipan</title>\n</head>\n<body>\n<main>\n  <h1>Kebiasaan belajar</h1>\n  <p>Simpan berkas sebelum memuat ulang.</p>\n  <blockquote><p>Belajar lewat percobaan kecil.</p></blockquote>\n  <p>Catatan latihan rekaan.</p>\n</main>\n</body>\n</html>",
        "task": "Tambahkan strong pada kata Simpan, tulis satu kalimat dengan em, lalu tambahkan contoh kode HTML yang ditampilkan sebagai teks.",
        "quiz": {
            "question": "Kapan strong tepat digunakan?",
            "options": [
                "Untuk informasi yang penting atau serius",
                "Untuk seluruh paragraf agar lebih besar",
                "Untuk membuat baris kosong"
            ],
            "answer": 0,
            "explanation": "Strong menyatakan kepentingan; pengaturan tampilan merupakan tugas CSS."
        },
        "source": [
            "Beri makna pada teks dan kutipan · MDN",
            "https://developer.mozilla.org/en-US/Learn_web_development/Core/Structuring_content/Emphasis_and_importance"
        ],
        "exercise": {
            "checks": [
                {
                    "kind": "selector",
                    "selector": "p strong",
                    "label": "Ada informasi penting"
                },
                {
                    "kind": "selector",
                    "selector": "p em",
                    "label": "Ada penekanan ujaran"
                },
                {
                    "kind": "selector",
                    "selector": "code",
                    "label": "Ada potongan kode"
                }
            ],
            "hint": "Letakkan strong di sekitar kata Simpan dan tambahkan p baru berisi em."
        }
    },
    {
        "id": "alamat-dan-jalur",
        "title": "Pahami alamat dan jalur berkas",
        "minutes": 14,
        "intro": "Tautan yang tampak benar bisa gagal setelah berkas dipindahkan. Pelajari jalur relatif, alamat lengkap, dan fragmen agar tujuan navigasi dapat diprediksi.",
        "sections": [
            [
                "Mulai dari posisi dokumen",
                "Jalur relatif dihitung dari alamat dokumen saat ini. Dari folder yang sama, tentang.html menunjuk berkas tentang.html. Gambar di subfolder dapat dirujuk sebagai gambar/pot.jpg. Dua titik diikuti garis miring naik satu tingkat folder. Buat diagram folder sederhana sebelum menebak jalur. Perhatikan huruf besar dan kecil: server tertentu membedakannya walaupun komputer lokalmu mungkin tidak. Spasi pada nama berkas juga mudah menimbulkan kebingungan; gunakan nama singkat dengan tanda hubung."
            ],
            [
                "Bedakan akar situs dan alamat lengkap",
                "Jalur yang dimulai garis miring seperti /panduan dihitung dari akar situs. Itu berbeda dari panduan.html yang mengikuti lokasi halaman. Alamat lengkap seperti https://developer.mozilla.org/ menyertakan skema dan domain. Gunakan alamat lengkap untuk situs lain. Jangan memakai lokasi pribadi seperti C: di tautan yang akan dipublikasikan karena pengunjung tidak memiliki berkas tersebut. Situs perlu menyediakan sumber daya melalui alamat yang dapat diakses pengunjung."
            ],
            [
                "Uji tujuan yang tersedia di latihan",
                "Fragmen seperti #jadwal merujuk id jadwal pada dokumen yang sama. Penulisan id dan href harus cocok. Contoh menggunakan fragmen karena panel latihan tidak menyediakan kumpulan halaman lokal. Tautan antarberkas perlu dicoba pada foldermu sendiri. Klik setiap tautan dan periksa tujuan akhirnya; teks berwarna saja tidak membuktikan alamat benar. Hindari href kosong sebagai pengganti tujuan karena dapat memuat ulang halaman saat ini."
            ]
        ],
        "code": "<!doctype html>\n<html lang=\"id\">\n<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>Pahami alamat dan jalur berkas</title>\n</head>\n<body>\n<main>\n  <h1>Panduan kebun</h1>\n  <p><a href=\"#alat\">Ke daftar alat</a></p>\n  <section id=\"alat\"><h2>Alat</h2><p>Siapkan pot dan sekop.</p></section>\n</main>\n</body>\n</html>",
        "task": "Tambahkan tautan #jadwal dan section dengan id jadwal berisi h2 serta paragraf. Coba kedua tautan; di berkas lokal, latih jalur menuju halaman kedua.",
        "quiz": {
            "question": "Dari mana jalur relatif biasa dihitung?",
            "options": [
                "Selalu dari situs mesin pencari",
                "Dari lokasi dokumen saat ini",
                "Dari folder unduhan pengunjung"
            ],
            "answer": 1,
            "explanation": "Tanpa base khusus, URL relatif diselesaikan terhadap URL dokumen."
        },
        "source": [
            "Pahami alamat dan jalur berkas · MDN",
            "https://developer.mozilla.org/en-US/Learn_web_development/Core/Structuring_content/Creating_links"
        ],
        "exercise": {
            "checks": [
                {
                    "kind": "selector",
                    "selector": "a[href=\"#jadwal\"]",
                    "label": "Tautan menuju jadwal"
                },
                {
                    "kind": "selector",
                    "selector": "section#jadwal h2",
                    "label": "Bagian tujuan memiliki judul"
                },
                {
                    "kind": "selector",
                    "selector": "section#jadwal p",
                    "label": "Bagian tujuan memiliki isi"
                }
            ],
            "hint": "Pasangkan href=\"#jadwal\" dengan id=\"jadwal\"; jangan sertakan # dalam nilai id."
        }
    },
    {
        "id": "gambar-dan-media",
        "title": "Kelompokkan ilustrasi dan pahami media",
        "minutes": 14,
        "intro": "Keterangan gambar, video, dan audio memerlukan konteks yang dapat dibaca. Latihan ini memakai tempat ilustrasi agar kamu bisa belajar struktur tanpa bergantung pada unduhan.",
        "sections": [
            [
                "Pisahkan keterangan dan alternatif",
                "Figure mengelompokkan isi mandiri seperti ilustrasi, diagram, atau cuplikan kode. Figcaption memberi keterangan yang terlihat bagi semua pembaca. Jika figure berisi gambar, alt menjelaskan informasi gambar sesuai konteks, sedangkan caption dapat menjelaskan asal atau tujuan ilustrasi. Jangan mengulang kalimat panjang yang sama pada keduanya tanpa alasan. Figure tidak wajib untuk semua gambar; ikon dekoratif kecil biasanya tidak memerlukan kelompok keterangan tersendiri."
            ],
            [
                "Sediakan kendali dan padanan teks",
                "Pada proyek lokal, audio dan video dengan controls memberi kendali pemutaran bawaan. Hindari memulai suara otomatis karena mengganggu pembaca. Video bersuara membutuhkan takarir yang sesuai; transkrip membantu orang yang tidak dapat mendengar maupun yang ingin membaca cepat. Elemen track dapat merujuk berkas takarir WebVTT. Kualitas padanan teks perlu kamu periksa terhadap isi sebenarnya; keberadaan elemen saja tidak menjamin informasi sudah setara."
            ],
            [
                "Kenali batas panel latihan",
                "Preview latihan tidak memuat sumber media eksternal dan menghapus atribut src. Karena itu contoh sengaja memakai paragraf sebagai tempat diagram, bukan pemutar yang seolah siap dipakai. Kamu tetap dapat melatih figure, figcaption, dan penjelasan tekstual. Untuk memutar audio atau video, salin kerangka ke proyek lokal dan sediakan berkas sendiri. Uji saat media gagal dimuat: apakah pembaca masih memahami informasi pokok dari teks yang tersedia?"
            ]
        ],
        "code": "<!doctype html>\n<html lang=\"id\">\n<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>Kelompokkan ilustrasi dan pahami media</title>\n</head>\n<body>\n<main>\n  <h1>Catatan pertumbuhan</h1>\n  <figure>\n    <p>Ilustrasi: pot kecil → bibit → tanaman berdaun.</p>\n  </figure>\n</main>\n</body>\n</html>",
        "task": "Tambahkan figcaption di dalam figure, lalu paragraf di luar figure yang menjelaskan tiga tahap pertumbuhan tanpa bergantung pada ilustrasi.",
        "quiz": {
            "question": "Apa fungsi figcaption?",
            "options": [
                "Memaksa video mulai otomatis",
                "Menggantikan seluruh isi halaman",
                "Memberi keterangan terlihat untuk isi figure"
            ],
            "answer": 2,
            "explanation": "Figcaption adalah keterangan untuk kelompok isi dalam figure."
        },
        "source": [
            "Kelompokkan ilustrasi dan pahami media · MDN",
            "https://developer.mozilla.org/en-US/Web/HTML/Reference/Elements/figure"
        ],
        "exercise": {
            "checks": [
                {
                    "kind": "selector",
                    "selector": "figure figcaption",
                    "label": "Ilustrasi memiliki keterangan"
                },
                {
                    "kind": "selector",
                    "selector": "main > p",
                    "label": "Ada penjelasan tekstual di luar ilustrasi"
                }
            ],
            "hint": "Tambahkan figcaption sesudah paragraf ilustrasi, lalu p sesudah penutup figure."
        }
    },
    {
        "id": "tabel-data",
        "title": "Sajikan data dengan tabel",
        "minutes": 14,
        "intro": "Tabel menghubungkan nilai dengan judul baris dan kolom. Buat jadwal yang dapat dipahami tanpa mengandalkan posisi visual atau warna.",
        "sections": [
            [
                "Pilih tabel untuk hubungan data",
                "Tabel cocok jika informasi dibandingkan menurut dua arah, misalnya hari dan kegiatan. Untuk susunan kartu atau kolom tampilan, gunakan CSS, bukan tabel. Setiap tr adalah satu baris, td menyimpan data, dan th menandai sel judul. Mulailah dengan jumlah kolom konsisten. Jangan menambahkan sel kosong hanya untuk menciptakan jarak karena hubungan data menjadi lebih sulit dipahami oleh pembaca maupun teknologi bantu."
            ],
            [
                "Hubungkan judul dengan nilai",
                "Caption menjelaskan topik tabel dan berada di dalam table. Kelompokkan baris judul dalam thead dan data dalam tbody. Pada tabel sederhana, scope=\"col\" menyatakan judul kolom dan scope=\"row\" menyatakan judul baris. Hubungan eksplisit membantu pembaca layar mengaitkan nilai dengan konteksnya. Jangan memakai huruf tebal di td sebagai pengganti th; tampilan tebal tidak menyatakan peran sel sebagai judul."
            ],
            [
                "Uji pembacaan tanpa dekorasi",
                "Contoh memakai dua kolom: hari dan kegiatan. Tambahkan data baru tanpa mengubah struktur judul. Bacalah setiap baris sebagai kalimat: hari apa, kegiatan apa? Jika artinya tidak jelas, perbaiki nama kolom. Tabel besar mungkin memerlukan area gulir pada layar kecil, yang akan dibahas bersama CSS. Hindari penggabungan sel pada latihan pertama agar relasi tetap sederhana. Pemeriksaan otomatis menghitung baris, tetapi kamu tetap perlu memeriksa apakah isi masuk ke kolom yang tepat."
            ]
        ],
        "code": "<!doctype html>\n<html lang=\"id\">\n<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>Sajikan data dengan tabel</title>\n</head>\n<body>\n<main>\n<h1>Jadwal latihan</h1>\n<table>\n  <caption>Rencana belajar minggu pertama</caption>\n  <thead><tr><th scope=\"col\">Hari</th><th scope=\"col\">Kegiatan</th></tr></thead>\n  <tbody><tr><th scope=\"row\">Senin</th><td>Mengenal HTML</td></tr></tbody>\n</table>\n</main>\n</body>\n</html>",
        "task": "Tambahkan baris Selasa dan Rabu pada tbody. Gunakan th dengan scope row untuk hari, lalu td untuk kegiatan.",
        "quiz": {
            "question": "Mengapa memakai th dan scope?",
            "options": [
                "Untuk menjelaskan hubungan judul dengan data",
                "Agar semua tabel otomatis berwarna",
                "Untuk membuat tautan antarhalaman"
            ],
            "answer": 0,
            "explanation": "Judul sel dan scope membantu mengidentifikasi konteks nilai dalam tabel."
        },
        "source": [
            "Sajikan data dengan tabel · MDN",
            "https://developer.mozilla.org/en-US/Web/HTML/Reference/Elements/table"
        ],
        "exercise": {
            "checks": [
                {
                    "kind": "count",
                    "selector": "tbody > tr",
                    "min": 3,
                    "label": "Tiga baris jadwal"
                },
                {
                    "kind": "count",
                    "selector": "tbody th[scope=\"row\"]",
                    "min": 3,
                    "label": "Setiap hari adalah judul baris"
                },
                {
                    "kind": "count",
                    "selector": "tbody td",
                    "min": 3,
                    "label": "Setiap hari mempunyai kegiatan"
                }
            ],
            "hint": "Salin struktur tr yang sudah ada dua kali lalu ganti hari dan kegiatannya."
        }
    },
    {
        "id": "pilihan-formulir",
        "title": "Buat pilihan dan kelompok formulir",
        "minutes": 14,
        "intro": "Jenis kontrol menentukan cara orang memasukkan jawaban. Pelajari pilihan tunggal, pilihan jamak, menu, dan kolom jawaban panjang.",
        "sections": [
            [
                "Bedakan satu dan banyak jawaban",
                "Radio dalam satu kelompok memakai name yang sama dan value yang berbeda. Browser hanya mengizinkan satu radio terpilih dalam kelompok tersebut. Checkbox cocok untuk pilihan independen yang dapat dicentang bersamaan. Id menghubungkan kontrol dengan label dan harus unik; name adalah nama data ketika formulir dikirim. Keduanya memiliki pekerjaan berbeda. Value menyatakan nilai pilihan, bukan tulisan label yang dibaca pengunjung."
            ],
            [
                "Kelompokkan dengan judul yang bermakna",
                "Fieldset mengumpulkan kontrol yang berkaitan dan legend memberi nama kelompok. Gunakan keduanya untuk pertanyaan yang memiliki beberapa radio atau checkbox. Label tetap diperlukan pada setiap pilihan agar teks dapat diklik dan kontrol memiliki nama. Select cocok untuk pilihan dari daftar; setiap option menyimpan salah satu jawaban. Textarea menyediakan jawaban banyak baris dan tidak menggunakan atribut value untuk isi awal; tulisan awal ditempatkan di antara tag pembuka dan penutup."
            ],
            [
                "Coba interaksi yang berbeda",
                "Gunakan Tab untuk berpindah kelompok, tombol panah untuk mengubah radio, dan Spasi untuk checkbox ketika terfokus. Perilaku rinci dapat berbeda menurut browser serta sistem operasi. Jangan mengandalkan warna untuk menunjukkan pilihan. Panel latihan membantu memeriksa struktur; pengiriman nyata memerlukan tujuan dan pemrosesan server yang belum tersedia di sini. Gunakan data rekaan. Sesudah menambah kontrol, klik labelnya dan pastikan yang berubah adalah kontrol yang benar."
            ]
        ],
        "code": "<!doctype html>\n<html lang=\"id\">\n<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>Buat pilihan dan kelompok formulir</title>\n</head>\n<body>\n<main>\n<h1>Pilihan kelas</h1>\n<form>\n  <fieldset><legend>Waktu belajar</legend>\n    <input id=\"pagi\" type=\"radio\" name=\"waktu\" value=\"pagi\"><label for=\"pagi\">Pagi</label>\n  </fieldset>\n  <label for=\"catatan\">Catatan kebutuhan belajar</label>\n  <textarea id=\"catatan\" name=\"catatan\"></textarea>\n  <button type=\"button\">Contoh formulir</button>\n</form>\n</main>\n</body>\n</html>",
        "task": "Tambahkan radio Malam dengan name waktu dan label terhubung. Tambahkan select bernama tingkat dengan dua option berisi Pemula dan Lanjutan, beserta labelnya.",
        "quiz": {
            "question": "Apa yang menyatukan radio menjadi satu kelompok pilihan?",
            "options": [
                "Class yang sama",
                "Teks label yang sama",
                "Name yang sama"
            ],
            "answer": 2,
            "explanation": "Radio dengan name sama dalam kelompok form yang sama berbagi pilihan tunggal."
        },
        "source": [
            "Buat pilihan dan kelompok formulir · MDN",
            "https://developer.mozilla.org/en-US/Learn_web_development/Extensions/Forms/Basic_native_form_controls"
        ],
        "exercise": {
            "checks": [
                {
                    "kind": "count",
                    "selector": "input[type=\"radio\"][name=\"waktu\"]",
                    "min": 2,
                    "label": "Dua pilihan waktu"
                },
                {
                    "kind": "selector",
                    "selector": "label[for=\"malam\"]",
                    "label": "Pilihan malam memiliki label"
                },
                {
                    "kind": "selector",
                    "selector": "label[for=\"tingkat\"]",
                    "label": "Menu tingkat memiliki label"
                },
                {
                    "kind": "count",
                    "selector": "select#tingkat[name=\"tingkat\"] option",
                    "min": 2,
                    "label": "Dua tingkat tersedia"
                }
            ],
            "hint": "Radio baru memakai id malam. Select memakai id tingkat agar cocok dengan for pada label."
        }
    },
    {
        "id": "validasi-formulir",
        "title": "Beri batas masukan dan uji kesalahan",
        "minutes": 14,
        "intro": "Validasi browser memberi umpan balik awal sebelum data diproses. Kamu akan mencoba batas angka dan membedakan kemudahan penggunaan dari pemeriksaan keamanan.",
        "sections": [
            [
                "Tentukan syarat berdasarkan kebutuhan",
                "Required meminta nilai sebelum formulir dikirim. Type email memeriksa bentuk alamat, tetapi tidak membuktikan alamat itu ada atau dimiliki pengisi. Untuk angka, min dan max membatasi rentang, sedangkan step mengatur kelipatan yang diizinkan. Minlength membatasi panjang teks ketika pengguna mengisinya; gunakan required juga jika teks tidak boleh kosong. Pilih batas yang benar-benar dibutuhkan dan jelaskan syarat tersebut sebelum orang memasukkan data."
            ],
            [
                "Coba gagal lebih dahulu",
                "Contoh adalah pendaftaran latihan tanpa tujuan pengiriman nyata. Tambahkan batas jumlah peserta, kemudian coba kirim dengan kolom kosong, angka terlalu kecil, dan angka di luar batas. Browser biasanya memfokuskan kontrol yang bermasalah dan menampilkan pesan bawaan. Bahasa serta rupa pesan berbeda antarbrowser. Jangan hanya mencoba nilai yang benar. Setelah nilai diperbaiki, periksa bahwa hambatan sebelumnya hilang; tujuan validasi adalah membantu orang menyelesaikan masukan."
            ],
            [
                "Pahami apa yang belum dijamin",
                "Aturan HTML berjalan pada perangkat pengguna dan dapat dilewati. Aplikasi sungguhan tetap harus memvalidasi di server, memeriksa izin, dan menyimpan data dengan benar. Formulir yang terlihat selesai bukan bukti bahwa data terkirim atau tersimpan. Panel latihan juga dapat membatasi navigasi saat submit. Gunakan percobaan lokal untuk mempelajari perilaku penuh, dan jangan memasukkan identitas pribadi. Teks petunjuk yang terlihat lebih andal daripada placeholder karena tetap tersedia setelah pengguna mengetik."
            ]
        ],
        "code": "<!doctype html>\n<html lang=\"id\">\n<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>Beri batas masukan dan uji kesalahan</title>\n</head>\n<body>\n<main>\n<h1>Pendaftaran latihan</h1>\n<form>\n  <label for=\"peserta\">Jumlah peserta</label>\n  <p id=\"bantuan\">Isi bilangan bulat antara 1 dan 5.</p>\n  <input id=\"peserta\" name=\"peserta\" type=\"number\" aria-describedby=\"bantuan\">\n  <button type=\"submit\">Periksa isian</button>\n</form>\n</main>\n</body>\n</html>",
        "task": "Pada input peserta, tambahkan required, min 1, max 5, dan step 1. Coba nilai kosong, 0, 6, 1.5, dan 3; catat nilai mana yang diterima.",
        "quiz": {
            "question": "Apakah validasi HTML cukup untuk melindungi data server?",
            "options": [
                "Ya, selalu",
                "Tidak; server tetap harus memvalidasi",
                "Ya, jika tombol diberi warna merah"
            ],
            "answer": 1,
            "explanation": "Pemeriksaan pada browser dapat dilewati sehingga server harus memeriksa masukan lagi."
        },
        "source": [
            "Beri batas masukan dan uji kesalahan · MDN",
            "https://developer.mozilla.org/en-US/Learn_web_development/Extensions/Forms/Form_validation"
        ],
        "exercise": {
            "checks": [
                {
                    "kind": "count",
                    "selector": "input#peserta[required][min=\"1\"][max=\"5\"][step=\"1\"]",
                    "min": 1,
                    "label": "Batas jumlah peserta lengkap"
                },
                {
                    "kind": "selector",
                    "selector": "p#bantuan",
                    "label": "Petunjuk tetap terlihat"
                }
            ],
            "hint": "Tambahkan atribut pada tag input yang sama; angka atribut ditulis dalam tanda kutip."
        }
    },
    {
        "id": "proyek-panduan",
        "title": "Tantangan: panduan belajar yang bisa dibuka tutup",
        "minutes": 20,
        "intro": "Rangkai dokumen panduan dengan navigasi internal, data terstruktur, dan jawaban yang dapat dibuka tanpa JavaScript. Nilai hasil sebagai pembaca baru.",
        "sections": [
            [
                "Ubah kebutuhan menjadi kerangka",
                "Panduan membutuhkan judul yang menyebutkan topik, pengantar singkat, daftar materi, dan pertanyaan umum. Buat isi utama dalam main lalu kelompokkan topik yang memiliki judul dengan section. Mulai dengan tulisan yang menjawab kebutuhan pembaca: apa yang dipelajari dan bagaimana memulai? Kerangka harus tetap berguna tanpa CSS. Jangan menambahkan bagian kosong hanya agar jumlah elemen terlihat lengkap; setiap bagian perlu informasi yang dapat dipakai."
            ],
            [
                "Pakai interaksi bawaan yang sesuai",
                "Details menyediakan wilayah yang dapat dibuka dan ditutup. Summary menjadi label pemicunya dan harus menjelaskan isi yang tersembunyi. Letakkan summary sebagai anak pertama details. Atribut open membuat jawaban terbuka sejak awal, bukan menjalankan suatu fungsi. Gunakan untuk penjelasan tambahan yang pantas disembunyikan; instruksi penting yang wajib dibaca sebaiknya tetap terlihat. Kamu tidak perlu menambahkan tombol di dalam summary untuk mendapatkan perilaku dasar ini."
            ],
            [
                "Lakukan pemeriksaan seperti pengunjung",
                "Tambahkan dua jawaban yang berbeda, kemudian operasikan summary menggunakan keyboard dan mouse. Periksa apakah tautan navigasi mencapai id yang benar dan setiap judul menjelaskan isinya. Perbesar tulisan melalui browser serta baca seluruh dokumen tanpa melihat dekorasi. Tes otomatis hanya memeriksa struktur dasar, bukan kebenaran jawaban atau seluruh aksesibilitas. Sebelum melanjutkan proyek profil, minta dirimu menjelaskan alasan pemilihan setiap elemen. Jika alasannya hanya bentuk visual, periksa kembali makna yang ingin disampaikan."
            ]
        ],
        "code": "<!doctype html>\n<html lang=\"id\">\n<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>Tantangan: panduan belajar yang bisa dibuka tutup</title>\n</head>\n<body>\n<main>\n<h1>Panduan belajar HTML</h1>\n<p>Mulai dengan dokumen kecil, lalu coba setiap perubahan.</p>\n<nav aria-label=\"Isi panduan\"><a href=\"#tanya\">Pertanyaan umum</a></nav>\n<section id=\"tanya\">\n  <h2>Pertanyaan umum</h2>\n  <details><summary>Apakah perlu memasang server?</summary><p>Untuk dokumen HTML sederhana, berkas lokal cukup untuk memulai.</p></details>\n</section>\n</main>\n</body>\n</html>",
        "task": "Tambahkan satu details dengan summary dan jawaban paragraf. Buat section id rencana berjudul Rencana belajar, berisi daftar tiga langkah, lalu tautkan dari nav.",
        "quiz": {
            "question": "Konten apa yang sebaiknya tidak disembunyikan dalam details?",
            "options": [
                "Jawaban tambahan yang opsional",
                "Instruksi penting yang wajib dibaca sebelum mengisi",
                "Penjelasan istilah tambahan"
            ],
            "answer": 1,
            "explanation": "Informasi wajib perlu tersedia jelas tanpa meminta pembaca membuka bagian tambahan."
        },
        "source": [
            "Tantangan: panduan belajar yang bisa dibuka tutup · MDN",
            "https://developer.mozilla.org/en-US/Web/HTML/Reference/Elements/details"
        ],
        "exercise": {
            "checks": [
                {
                    "kind": "count",
                    "selector": "details",
                    "min": 2,
                    "label": "Dua kelompok pertanyaan"
                },
                {
                    "kind": "count",
                    "selector": "details > summary",
                    "min": 2,
                    "label": "Dua pemicu yang bernama"
                },
                {
                    "kind": "count",
                    "selector": "details > p",
                    "min": 2,
                    "label": "Dua jawaban tertulis"
                },
                {
                    "kind": "selector",
                    "selector": "section#rencana h2",
                    "label": "Rencana memiliki judul"
                },
                {
                    "kind": "count",
                    "selector": "section#rencana li",
                    "min": 3,
                    "label": "Tiga langkah belajar"
                },
                {
                    "kind": "selector",
                    "selector": "nav a[href=\"#rencana\"]",
                    "label": "Navigasi menuju rencana"
                }
            ],
            "hint": "Tambahkan details kedua di section tanya; buat section rencana dengan ol dan tiga li."
        }
    }
];
