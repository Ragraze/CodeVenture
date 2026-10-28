export const javascriptLessons = [
    {
        "id": "menjalankan-javascript",
        "title": "Jalankan program pertamamu",
        "minutes": 15,
        "intro": "Mulai dari satu perintah dan amati hasilnya. JavaScript menjalankan instruksi; console membantu kita melihat apa yang sedang dikerjakan.",
        "sections": [
            [
                "Kode dan hasil adalah dua hal berbeda",
                "Ketik console.log(\"Halo, Rani!\") lalu jalankan. Teks di antara tanda kutip adalah data yang ingin ditampilkan; console.log adalah pemanggilan fungsi yang menulis ke keluaran. Tanda kurung mengelompokkan argumen, yaitu nilai yang dikirim ke fungsi. Hasil tidak muncul hanya karena kamu menulis teks di editor: program harus dijalankan. Ubah nama pada teks, jalankan kembali, lalu pastikan hasil yang baru cocok dengan perubahanmu."
            ],
            [
                "Baca urutan dari atas",
                "Dua perintah biasa dikerjakan berurutan dari atas ke bawah. Titik koma membantu memperjelas akhir pernyataan. Komentar satu baris diawali // dan tidak dijalankan. Gunakan komentar untuk mencatat alasan percobaan, bukan menyembunyikan kesalahan. Coba tukar posisi kedua console.log dan prediksi keluaran sebelum menekan Jalankan. Kebiasaan memprediksi lalu membandingkan hasil akan membantu saat program mulai mempunyai kondisi dan fungsi."
            ],
            [
                "Kenali tempat menjalankan kode",
                "Latihan ini berjalan pada worker terisolasi, dengan console untuk melihat keluaran. DOM, localStorage, impor modul, dan jaringan tidak tersedia di sini. Pada komputer sendiri kamu bisa mencoba ekspresi di Console DevTools browser; program web biasanya dihubungkan lewat elemen &lt;script&gt;. Kesalahan tanda kutip atau kurung membuat kode gagal dibaca. Jika itu terjadi, periksa baris yang ditunjuk dan baris sebelumnya. Jalankan ulang sesudah memperbaiki satu masalah agar perubahan penyebabnya jelas."
            ]
        ],
        "code": "console.log(\"Halo, Rani!\");\nconsole.log(\"Saya mulai belajar JavaScript.\");",
        "task": "Tampilkan Halo, Rani! lalu Saya mulai belajar JavaScript. pada dua baris. Tukar urutannya dan amati perubahan, kemudian kembalikan.",
        "quiz": {
            "question": "Apa fungsi console.log pada latihan ini?",
            "options": [
                "Menampilkan nilai ke keluaran",
                "Menyimpan file otomatis",
                "Membuat elemen HTML"
            ],
            "answer": 0,
            "explanation": "console.log membantu mengamati nilai ketika program berjalan."
        },
        "source": [
            "Jalankan program pertamamu · MDN",
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Introduction"
        ],
        "exercise": {
            "checks": [
                {
                    "kind": "output",
                    "value": "Halo, Rani!",
                    "label": "Sapaan ditampilkan"
                },
                {
                    "kind": "output",
                    "value": "Saya mulai belajar JavaScript.",
                    "label": "Pesan belajar ditampilkan"
                }
            ],
            "hint": "Gunakan dua pemanggilan console.log dengan teks di dalam tanda kutip."
        }
    },
    {
        "id": "variabel-dan-scope",
        "title": "Beri nama data dengan variabel",
        "minutes": 15,
        "intro": "Variabel menghubungkan nama dengan nilai. Nama yang jelas membuat perhitungan mudah diikuti dan perubahan mudah ditemukan.",
        "sections": [
            [
                "Pilih const sebagai awal",
                "Gunakan const saat nama tidak perlu diberi nilai baru. Deklarasi const jumlah = 3 memperkenalkan nama jumlah dan mengisinya dengan angka. Tanda sama dengan di sini berarti penugasan, bukan perbandingan matematika. Nama peka huruf besar: jumlah berbeda dari Jumlah. Pilih nama seperti hargaBuku, bukan x, ketika makna datanya sudah diketahui. Satuan juga berguna dalam nama, misalnya durasiMenit, agar pembaca tidak menebak apakah nilai tersebut detik atau jam."
            ],
            [
                "Gunakan let untuk perubahan",
                "Let diperlukan jika nilai yang terikat pada nama akan diganti, misalnya penghitung percobaan. Setelah let dibaca = 1, pernyataan dibaca += 1 menambah nilai sebelumnya. Jangan tulis ulang let pada lingkup yang sama untuk memperbarui variabel. Const mencegah penugasan ulang nama, tetapi kelak kamu akan melihat bahwa isi array atau object yang diikat dengan const masih bisa berubah. Bedakan ikatan nama dengan data yang dirujuknya."
            ],
            [
                "Batasi lingkup kerja",
                "Kurung kurawal membuat blok. Variabel let dan const yang dideklarasikan di dalam blok tidak tersedia dari luar blok itu. Ini membantu memisahkan nilai sementara dari nilai yang diperlukan seluruh perhitungan. Untuk percobaan, buat blok kecil yang menghitung bonus, lalu tampilkan hasilnya di dalam blok. Memindahkan pemanggilan itu keluar akan menghasilkan ReferenceError. Kembalikan kode yang berhasil sebelum melanjutkan. Periksa juga bahwa perubahan nilai penghitung tidak mengubah konstanta target belajar."
            ]
        ],
        "code": "const target = 3;\nlet selesai = 1;\nselesai += 1;\nconsole.log(`Selesai: ${selesai} dari ${target}`);",
        "task": "Buat target bernilai 3 dan penghitung selesai bernilai 1. Tambahkan satu pada penghitung, lalu tampilkan Selesai: 2 dari 3.",
        "quiz": {
            "question": "Kapan memakai let?",
            "options": [
                "Ketika nama akan diberi nilai baru",
                "Untuk semua teks saja",
                "Agar data otomatis tersimpan"
            ],
            "answer": 0,
            "explanation": "let mengizinkan penugasan ulang pada nama tersebut."
        },
        "source": [
            "Beri nama data dengan variabel · MDN",
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types"
        ],
        "exercise": {
            "checks": [
                {
                    "kind": "output",
                    "value": "Selesai: 2 dari 3",
                    "label": "Penghitung diperbarui"
                }
            ],
            "hint": "Deklarasikan selesai sekali dengan let, lalu gunakan += 1."
        }
    },
    {
        "id": "tipe-dan-konversi",
        "title": "Kenali tipe sebelum menghitung",
        "minutes": 15,
        "intro": "Teks \"12\" dan angka 12 terlihat mirip tetapi berperilaku berbeda. Periksa tipe dan lakukan konversi dengan sengaja.",
        "sections": [
            [
                "Bedakan data dasar",
                "String menyimpan teks, number menyimpan angka, dan boolean menyimpan true atau false. Undefined sering berarti nilai belum diberikan, sedangkan null biasa dipilih untuk menyatakan ketiadaan secara sengaja. Operator typeof membantu memeriksa tipe, misalnya typeof \"12\" menghasilkan string. Hati-hati: typeof null menghasilkan object karena perilaku historis JavaScript; itu bukan berarti null dapat dipakai seperti object biasa. Periksa null secara langsung bila perlu."
            ],
            [
                "Konversi pada batas masukan",
                "Nilai formulir biasanya berupa teks. Number(\"12\") menghasilkan angka 12, sedangkan Number(\"dua\") menghasilkan NaN. Gunakan Number.isFinite untuk memastikan hasil benar-benar angka berhingga sebelum menghitung. NaN tetap bertipe number; memeriksa typeof saja belum cukup. Teks kosong dan teks berisi spasi berubah menjadi nol saat dikonversi dengan Number, sehingga pemeriksaan kosong harus dilakukan lebih dulu apabila masukan kosong tidak diizinkan."
            ],
            [
                "Tentukan aturan, bukan menebak",
                "Pada contoh, trim membuang spasi di kedua ujung sebelum pemeriksaan. Kita menerima angka berhingga yang minimal satu. Konversi tipe tidak otomatis memenuhi aturan aplikasi: pecahan seperti 2.5 masih angka valid, tetapi jumlah tiket biasanya perlu bilangan bulat. Tambahkan Number.isInteger jika aturanmu demikian. Uji teks angka, teks kosong, dan kata biasa secara terpisah. Pemeriksaan keluaran latihan hanya menunjukkan perilaku contoh itu, jadi tambahkan percobaan sendiri untuk nilai negatif dan nol."
            ]
        ],
        "code": "function bacaJumlah(teks) {\n  if (teks.trim() === \"\") return \"Jumlah wajib diisi\";\n  const angka = Number(teks);\n  return Number.isFinite(angka) && angka >= 1 ? angka : \"Jumlah tidak valid\";\n}\nconsole.log(bacaJumlah(\"12\"));\nconsole.log(bacaJumlah(\"dua\"));\nconsole.log(bacaJumlah(\" \"));",
        "task": "Konversikan \"12\" menjadi angka; tolak \"dua\" dan teks kosong dengan pesan pada contoh. Coba \"0\", \"-1\", dan \"2.5\" lalu tentukan aturan bilangan bulat.",
        "quiz": {
            "question": "Apakah typeof NaN cukup untuk mendeteksi angka valid?",
            "options": [
                "Ya, karena hasilnya string",
                "Tidak, gunakan pemeriksaan seperti Number.isFinite",
                "Ya, karena NaN adalah nol"
            ],
            "answer": 1,
            "explanation": "NaN bertipe number, tetapi Number.isFinite(NaN) menghasilkan false."
        },
        "source": [
            "Kenali tipe sebelum menghitung · MDN",
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite"
        ],
        "exercise": {
            "checks": [
                {
                    "kind": "output",
                    "value": "12",
                    "label": "Teks angka diterima"
                },
                {
                    "kind": "output",
                    "value": "Jumlah tidak valid",
                    "label": "Kata biasa ditolak"
                },
                {
                    "kind": "output",
                    "value": "Jumlah wajib diisi",
                    "label": "Teks kosong dibedakan"
                }
            ],
            "hint": "Periksa trim() sebelum Number(), kemudian periksa Number.isFinite."
        }
    },
    {
        "id": "operator-dan-angka",
        "title": "Hitung biaya dengan operator",
        "minutes": 15,
        "intro": "Gunakan operator untuk mengubah data menjadi perhitungan yang bisa dijelaskan. Buat satuan dan urutan operasinya terlihat.",
        "sections": [
            [
                "Susun ekspresi sederhana",
                "Operator +, -, *, dan / masing-masing menjumlahkan, mengurangi, mengalikan, dan membagi angka. Ekspresi menghasilkan nilai yang bisa disimpan ke variabel. Contoh hargaSatuan * jumlah menghitung subtotal tanpa menulis ulang harga beberapa kali. Tanda % menghasilkan sisa pembagian, berguna untuk memeriksa bilangan genap, bukan menghitung persentase secara langsung. Untuk diskon sepuluh persen, kalikan subtotal dengan 10 / 100."
            ],
            [
                "Tunjukkan prioritas dengan kurung",
                "Perkalian dikerjakan sebelum penjumlahan. Jadi 2 + 3 * 4 menghasilkan 14, sedangkan (2 + 3) * 4 menghasilkan 20. Gunakan kurung jika pembaca harus memahami kelompok perhitungan tertentu, terutama saat menggabungkan diskon dan biaya tambahan. Pecah ekspresi panjang menjadi subtotal, diskon, dan total. Variabel antara memberi tempat untuk memeriksa apakah hasil mulai meleset sebelum sampai ke keluaran akhir."
            ],
            [
                "Pilih representasi uang dengan sadar",
                "Untuk latihan ini semua uang berupa rupiah utuh dan hasil diskonnya juga bulat. Angka JavaScript memakai representasi biner sehingga beberapa pecahan desimal tidak persis, misalnya 0.1 + 0.2. Menampilkan dua desimal tidak memperbaiki ketelitian perhitungan internal. Pada aplikasi uang nyata, tentukan satuan terkecil, aturan pembulatan, batas angka aman, dan kebutuhan pustaka desimal bersama aturan bisnis. Uji total tanpa diskon, jumlah nol, dan perubahan harga. Jangan menganggap satu hasil benar membuktikan seluruh perhitungan."
            ]
        ],
        "code": "const hargaSatuan = 15000;\nconst jumlah = 2;\nconst subtotal = hargaSatuan * jumlah;\nconst diskon = subtotal * (10 / 100);\nconst total = subtotal - diskon;\nconsole.log(`Total: ${total}`);\nconsole.log(`Sisa: ${7 % 2}`);",
        "task": "Hitung dua barang seharga 15000 dengan diskon 10 persen. Tampilkan Total: 27000 dan sisa pembagian 7 oleh 2.",
        "quiz": {
            "question": "Berapa hasil (2 + 3) * 4?",
            "options": [
                "14",
                "20",
                "24"
            ],
            "answer": 1,
            "explanation": "Kurung mengelompokkan penjumlahan sehingga 5 dikalikan 4."
        },
        "source": [
            "Hitung biaya dengan operator · MDN",
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators"
        ],
        "exercise": {
            "checks": [
                {
                    "kind": "output",
                    "value": "Total: 27000",
                    "label": "Total sesudah diskon dihitung"
                },
                {
                    "kind": "output",
                    "value": "Sisa: 1",
                    "label": "Operator sisa dicoba"
                }
            ],
            "hint": "Hitung subtotal terlebih dahulu, lalu kurangi subtotal * 0.1."
        }
    },
    {
        "id": "string-dan-template",
        "title": "Rapikan dan susun teks",
        "minutes": 15,
        "intro": "String bukan sekadar hiasan keluaran. Normalisasi teks membantu pencarian, penyajian nama, dan pemeriksaan input.",
        "sections": [
            [
                "Amati teks sebelum mengolahnya",
                "String dibungkus tanda kutip tunggal, ganda, atau backtick. Pilih pembatas yang memudahkanmu menulis isi tanpa kesalahan. String memiliki length dan metode seperti trim serta toLowerCase. Trim hanya membuang spasi di ujung, bukan semua spasi di tengah nama. Metode ini menghasilkan string baru: string asal tetap sama. Simpan hasilnya agar langkah normalisasi terlihat, misalnya const nama = masukan.trim()."
            ],
            [
                "Gabungkan nilai dengan template",
                "Backtick memungkinkan template literal dengan bagian ${...} untuk menyisipkan nilai ekspresi. Ini memudahkan membuat pesan yang menggabungkan nama dan angka tanpa banyak tanda tambah. Kamu tetap perlu mengendalikan data yang dimasukkan: nama kosong setelah trim biasanya perlu ditangani sebelum menyapa pengguna. Jangan menambah spasi di dalam ekspresi hanya untuk membuat hasil rapi; tulis spasi pada bagian teks template yang memang akan terlihat."
            ],
            [
                "Sesuaikan pemeriksaan dengan tujuan",
                "Includes memeriksa apakah suatu bagian teks terdapat pada string dan peka huruf besar. Untuk pencarian sederhana, ubah teks dan kata pencarian ke huruf kecil terlebih dahulu. Cara ini cukup untuk contoh kata biasa, tetapi aturan bahasa, aksen, dan pengurutan nama dapat membutuhkan pengolahan yang lebih khusus. Panjang string JavaScript menghitung unit kode UTF-16, sehingga emoji tertentu bukan satu pada length. Uji nama dengan dua kata, spasi ujung, dan masukan kosong. Saat nanti menampilkan teks ke halaman, gunakan textContent agar tanda markup tetap menjadi teks."
            ]
        ],
        "code": "const masukan = \"  Rani Putri  \";\nconst nama = masukan.trim();\nconsole.log(`Halo, ${nama}!`);\nconsole.log(`Ditemukan: ${nama.toLowerCase().includes(\"rani\")}`);\nconsole.log(`Asli: \"${masukan}\"`);",
        "task": "Rapikan nama lalu tampilkan Halo, Rani Putri! dan Ditemukan: true. Pastikan spasi tengah nama dan string masukan asal tetap ada.",
        "quiz": {
            "question": "Apa hasil trim()?",
            "options": [
                "String baru tanpa spasi di kedua ujung",
                "String tanpa semua spasi",
                "Array kata"
            ],
            "answer": 0,
            "explanation": "trim menghasilkan string baru dan menjaga spasi di tengah."
        },
        "source": [
            "Rapikan dan susun teks · MDN",
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_strings"
        ],
        "exercise": {
            "checks": [
                {
                    "kind": "output",
                    "value": "Halo, Rani Putri!",
                    "label": "Spasi ujung dibuang"
                },
                {
                    "kind": "output",
                    "value": "Ditemukan: true",
                    "label": "Pencarian mengabaikan perbedaan huruf"
                }
            ],
            "hint": "Simpan masukan.trim(), lalu panggil toLowerCase().includes(\"rani\")."
        }
    },
    {
        "id": "boolean-dan-perbandingan",
        "title": "Nyatakan syarat dengan boolean",
        "minutes": 15,
        "intro": "Sebelum bercabang, buat syarat yang bisa diperiksa. Boolean menyatakan dua kemungkinan: true dan false.",
        "sections": [
            [
                "Bandingkan tanpa konversi tersembunyi",
                "Operator === membandingkan nilai tanpa menyamakan tipe terlebih dahulu. Angka 70 tidak sama secara ketat dengan teks \"70\". Operator !== menyatakan ketidaksamaan ketat, sementara >= dan <= mencakup batas nilai. Pada pemeriksaan kelulusan minimal 70, nilai tepat 70 harus diterima. Tulis syarat dalam variabel bernama seperti nilaiCukup agar maksud pemeriksaan terlihat tanpa harus membaca ulang semua angka."
            ],
            [
                "Gabungkan syarat sesuai aturan",
                "Gunakan && ketika kedua syarat harus terpenuhi dan || ketika salah satu sudah cukup. Operator ! membalik nilai boolean. Pada contoh, peserta boleh melanjutkan jika nilai minimal 70 sekaligus sudah mengirim latihan. Gunakan kurung untuk memperjelas jika aturan menggabungkan && dan ||. Uji satu syarat benar dan satu salah, bukan hanya keduanya benar. Percobaan itu sering mengungkap operator yang tertukar."
            ],
            [
                "Jangan samakan keberadaan dengan kebenaran",
                "Dalam kondisi, nilai seperti 0, string kosong, null, undefined, dan NaN dianggap falsy. String \"false\" justru truthy karena tidak kosong. Karena itu jangan memakai Boolean pada teks formulir untuk menafsirkan pilihan ya atau tidak tanpa aturan eksplisit. Operator logika juga bisa mengembalikan operand, bukan selalu boolean; pada latihan ini kedua operand memang boolean hasil perbandingan. Coba ubah nilai menjadi 69, 70, dan 71, lalu ubah status pengiriman. Catat hasil yang diharapkan sebelum menjalankan setiap kasus."
            ]
        ],
        "code": "const nilai = 70;\nconst sudahMengirim = true;\nconst bolehLanjut = nilai >= 70 && sudahMengirim;\nconsole.log(`Boleh lanjut: ${bolehLanjut}`);\nconsole.log(`Tipe sama: ${70 === \"70\"}`);",
        "task": "Tampilkan Boleh lanjut: true untuk nilai 70 dan sudahMengirim true. Tampilkan Tipe sama: false saat membandingkan angka 70 dengan teks \"70\".",
        "quiz": {
            "question": "Syarat mana mencakup nilai tepat 70?",
            "options": [
                "nilai > 70",
                "nilai >= 70",
                "nilai === \"70\" untuk angka"
            ],
            "answer": 1,
            "explanation": "Operator >= memasukkan nilai yang sama dengan batas."
        },
        "source": [
            "Nyatakan syarat dengan boolean · MDN",
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality"
        ],
        "exercise": {
            "checks": [
                {
                    "kind": "output",
                    "value": "Boleh lanjut: true",
                    "label": "Batas kelulusan diterima"
                },
                {
                    "kind": "output",
                    "value": "Tipe sama: false",
                    "label": "Perbandingan ketat membedakan tipe"
                }
            ],
            "hint": "Gunakan >= untuk batas dan && untuk dua syarat wajib."
        }
    },
    {
        "id": "fungsi-dan-parameter",
        "title": "Pisahkan pekerjaan dengan fungsi",
        "minutes": 15,
        "intro": "Fungsi memberi nama pada satu pekerjaan. Masukan diterima melalui parameter dan hasil diberikan melalui return.",
        "sections": [
            [
                "Tulis kontrak yang kecil",
                "Mulai dari pertanyaan sederhana: fungsi ini menerima apa dan mengembalikan apa? Contoh hitungTotal menerima harga dan jumlah berupa angka, lalu mengembalikan hasil perkaliannya. Parameter adalah nama pada definisi; argumen adalah nilai saat pemanggilan. Urutannya penting karena hitungTotal(15000, 2) mengikat harga ke 15000 dan jumlah ke 2. Beri nama yang menjelaskan pekerjaan sehingga pemanggilan dapat dibaca sebagai bagian dari cerita program."
            ],
            [
                "Bedakan return dan console",
                "Return mengirim nilai kembali ke pemanggil dan menghentikan fungsi pada titik tersebut. Console.log hanya menampilkan sesuatu untuk pengamatan. Jika fungsi sekadar mencetak tanpa return, nilai pemanggilannya biasanya undefined. Pisahkan perhitungan dari pencetakan supaya hasil fungsi dapat dipakai untuk diskon, laporan, atau pengujian. Hindari membaca variabel luar jika informasi itu bisa dikirim sebagai parameter; ketergantungan yang terlihat membuat percobaan lebih mudah diulang."
            ],
            [
                "Pahami nilai bawaan dan batas",
                "Parameter jumlah = 1 menyediakan nilai bawaan ketika argumen tidak diberikan atau undefined. Nilai nol tidak memicu nilai bawaan, sehingga pembelian nol tetap menghasilkan nol pada fungsi ini. Nilai null juga tidak memicu bawaan. Fungsi sederhana belum memvalidasi input; kamu bertanggung jawab mengirim angka yang sesuai kontraknya. Uji satu barang, dua barang, dan nol barang. Jangan mengubah fungsi hanya agar satu keluaran lolos; periksa bahwa pola perhitungannya tetap benar pada semua contoh manual."
            ]
        ],
        "code": "function hitungTotal(harga, jumlah = 1) {\n  return harga * jumlah;\n}\nconsole.log(`Dua: ${hitungTotal(15000, 2)}`);\nconsole.log(`Satu: ${hitungTotal(15000)}`);\nconsole.log(`Nol: ${hitungTotal(15000, 0)}`);",
        "task": "Buat hitungTotal dengan parameter jumlah bawaan 1. Periksa keluaran untuk dua, satu, dan nol barang.",
        "quiz": {
            "question": "Apa yang membuat hasil fungsi dapat dipakai lagi oleh pemanggil?",
            "options": [
                "console.log saja",
                "return",
                "Nama fungsi yang panjang"
            ],
            "answer": 1,
            "explanation": "return memberikan nilai hasil kepada kode pemanggil."
        },
        "source": [
            "Pisahkan pekerjaan dengan fungsi · MDN",
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions"
        ],
        "exercise": {
            "checks": [
                {
                    "kind": "output",
                    "value": "Dua: 30000",
                    "label": "Dua barang dihitung"
                },
                {
                    "kind": "output",
                    "value": "Satu: 15000",
                    "label": "Nilai bawaan digunakan"
                },
                {
                    "kind": "output",
                    "value": "Nol: 0",
                    "label": "Nol tidak diganti nilai bawaan"
                }
            ],
            "hint": "Kembalikan harga * jumlah; letakkan console.log di luar fungsi."
        }
    },
    {
        "id": "array-dan-transformasi",
        "title": "Kelola daftar dengan array",
        "minutes": 15,
        "intro": "Array menyimpan urutan data. Baca elemennya, ubah daftar menjadi daftar baru, dan periksa hasil tanpa merusak data sumber.",
        "sections": [
            [
                "Mulai dari posisi nol",
                "Elemen pertama array berada pada indeks 0. Untuk daftar tiga item, indeks terakhir adalah 2, sementara length adalah 3. Mengakses indeks yang tidak ada biasanya menghasilkan undefined. Gunakan length untuk mengetahui jumlah elemen, bukan mengasumsikan daftar selalu berisi tiga item. Array kosong tetap valid dan length-nya nol. Saat daftar berisi nilai angka, pastikan kamu membedakan posisi elemen dengan nilainya."
            ],
            [
                "Pilih map untuk mengubah setiap item",
                "Map memanggil callback untuk setiap elemen yang ada dan mengumpulkan nilai return ke array baru. Pada contoh, setiap durasi dalam menit dikalikan dua. Callback harus mengembalikan nilai; arrow function singkat dapat mengembalikan ekspresi secara langsung. Jika memakai kurung kurawal pada body callback, tulis return secara eksplisit. Jangan memakai map hanya untuk mencetak, sebab tujuan utamanya menghasilkan daftar hasil. Untuk penelusuran biasa kamu bisa memakai for...of."
            ],
            [
                "Jaga sumber dan coba batas",
                "Map membuat array baru, tetapi bukan salinan mendalam dari object yang mungkin berada di dalamnya. Contoh angka ini aman karena callback hanya menghitung nilai baru. Metode seperti push dan sort mengubah array yang menerima pemanggilan, sehingga pilih dengan sadar sesuai kebutuhan. Join membuat teks dari elemen dengan pemisah pilihanmu. Uji array kosong dan daftar satu item agar tidak bergantung pada indeks tertentu. Bandingkan keluaran array asal dan hasil: hanya daftar hasil yang seharusnya berisi durasi dua kali lipat."
            ]
        ],
        "code": "const durasi = [10, 20, 30];\nconst duaKali = durasi.map(menit => menit * 2);\nconsole.log(`Hasil: ${duaKali.join(\", \")}`);\nconsole.log(`Asli: ${durasi.join(\", \")}`);\nconsole.log(`Kosong: ${[].map(angka => angka * 2).length}`);",
        "task": "Gunakan map untuk menggandakan [10, 20, 30]. Tampilkan hasil, array asal, dan length hasil map pada array kosong.",
        "quiz": {
            "question": "Apa yang dikumpulkan oleh map?",
            "options": [
                "Nilai return dari callback",
                "Hanya item yang bernilai true",
                "Indeks terakhir saja"
            ],
            "answer": 0,
            "explanation": "map membentuk array hasil dari nilai yang dikembalikan callback."
        },
        "source": [
            "Kelola daftar dengan array · MDN",
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections"
        ],
        "exercise": {
            "checks": [
                {
                    "kind": "output",
                    "value": "Hasil: 20, 40, 60",
                    "label": "Semua durasi digandakan"
                },
                {
                    "kind": "output",
                    "value": "Asli: 10, 20, 30",
                    "label": "Sumber tetap sama"
                },
                {
                    "kind": "output",
                    "value": "Kosong: 0",
                    "label": "Daftar kosong ditangani"
                }
            ],
            "hint": "Gunakan map(menit => menit * 2), lalu join(\", \") saat menampilkan."
        }
    },
    {
        "id": "object-dan-salinan",
        "title": "Kelompokkan data dengan object",
        "minutes": 15,
        "intro": "Object menggabungkan properti bernama yang menjelaskan satu hal, seperti profil peserta atau satu tugas.",
        "sections": [
            [
                "Beri nama pada setiap bagian",
                "Array cocok untuk urutan, sedangkan object cocok untuk kumpulan informasi dengan peran berbeda. Profil dapat memiliki nama, level, dan aktif. Baca properti tetap melalui profil.nama. Notasi kurung siku berguna ketika nama properti berasal dari variabel, misalnya profil[kunci]. Properti yang tidak ditemukan menghasilkan undefined; jangan menganggap semua data dari luar pasti memiliki bentuk yang sama dengan contoh buatan sendiri."
            ],
            [
                "Pahami berbagi referensi",
                "Menulis const salinan = profil tidak membuat object baru. Kedua nama merujuk object yang sama, sehingga perubahan salinan.level juga terlihat lewat profil.level. Const hanya melarang penugasan ulang nama, bukan membekukan properti object. Untuk perubahan sederhana, buat object baru dengan spread, lalu tulis properti yang ingin diganti setelah spread. Urutan itu penting: properti yang ditulis belakangan menggantikan nilai sebelumnya dengan nama yang sama."
            ],
            [
                "Kenali batas salinan dangkal",
                "Spread menyalin properti milik sendiri yang enumerable pada tingkat teratas. Object bersarang masih berbagi referensi jika tidak disalin lagi. Pada latihan ini semua properti profil adalah nilai primitif agar efek pembaruan mudah diamati. Jika kemudian menambah alamat berupa object, salin alamat juga saat perlu mengubahnya tanpa menyentuh sumber. Uji nama dan level pada kedua object untuk memastikan hanya properti yang dimaksud berubah. Pola data sumber dan data hasil yang terpisah memudahkan membandingkan keadaan sebelum serta sesudah tindakan."
            ]
        ],
        "code": "const profil = { nama: \"Rani\", level: 1, aktif: true };\nconst diperbarui = { ...profil, level: 2 };\nconsole.log(`Asli: ${profil.nama}, level ${profil.level}`);\nconsole.log(`Baru: ${diperbarui.nama}, level ${diperbarui.level}`);\nconsole.log(`Object berbeda: ${profil !== diperbarui}`);",
        "task": "Buat profil baru dengan level 2 memakai spread. Pertahankan nama Rani dan level 1 pada profil asal.",
        "quiz": {
            "question": "Apakah spread selalu menyalin seluruh object bersarang?",
            "options": [
                "Ya, semua tingkat disalin",
                "Tidak, spread membuat salinan dangkal",
                "Spread hanya bekerja pada string"
            ],
            "answer": 1,
            "explanation": "Nilai object bersarang tetap berupa referensi yang sama kecuali disalin lagi."
        },
        "source": [
            "Kelompokkan data dengan object · MDN",
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects"
        ],
        "exercise": {
            "checks": [
                {
                    "kind": "output",
                    "value": "Asli: Rani, level 1",
                    "label": "Level sumber dipertahankan"
                },
                {
                    "kind": "output",
                    "value": "Baru: Rani, level 2",
                    "label": "Level hasil diperbarui"
                },
                {
                    "kind": "output",
                    "value": "Object berbeda: true",
                    "label": "Hasil memiliki referensi baru"
                }
            ],
            "hint": "Tulis { ...profil, level: 2 }, bukan const diperbarui = profil."
        }
    },
    {
        "id": "error-dan-debugging",
        "title": "Baca error dan periksa asumsi",
        "minutes": 15,
        "intro": "Kesalahan program memberi petunjuk. Pelajari cara membaca pesan, mempersempit penyebab, dan menangani kegagalan yang memang diperkirakan.",
        "sections": [
            [
                "Bedakan macam kegagalan",
                "SyntaxError menunjukkan kode tidak dapat dibaca, misalnya tanda kurung belum ditutup. ReferenceError sering muncul saat nama belum tersedia pada lingkup tersebut. TypeError dapat muncul ketika operasi tidak cocok dengan nilai yang diterima, misalnya memanggil metode pada undefined. Hasil hitungan yang salah tanpa error adalah kesalahan logika. Baca pesan dan nomor baris, periksa nilai yang terlibat, lalu buat contoh terkecil yang masih memperlihatkan masalah."
            ],
            [
                "Nyatakan masukan yang ditolak",
                "Fungsi bagi pada contoh menolak pembagi nol dengan throw new Error. Ini aturan fungsi kita: pembagian number JavaScript oleh nol sendiri dapat menghasilkan Infinity, bukan otomatis melempar error. Melempar Error membantu pemanggil mengetahui bahwa perhitungan tidak sesuai kontrak. Gunakan pesan yang menyebut penyebab dan perbaikannya. Pemeriksaan ini belum mencakup semua kemungkinan tipe; batas contoh adalah dua angka berhingga. Tambahkan validasi lain bila kontrak diperluas."
            ],
            [
                "Tangkap di tempat yang bisa merespons",
                "Try menjalankan pekerjaan yang mungkin gagal dan catch menerima error yang dilempar. Di contoh, pemanggil menampilkan pesan lalu program melanjutkan ke baris berikutnya. Jangan memakai catch kosong karena informasi kegagalan akan hilang. Jangan pula membungkus semua kode untuk menyembunyikan bug yang harus diperbaiki. Coba pembagian normal dan pembagi nol, kemudian lihat bahwa pesan terakhir tetap muncul. Keluaran latihan membantu memeriksa jalur contoh, tetapi membaca stack dan menguji masukan lain tetap bagian penting proses debugging."
            ]
        ],
        "code": "function bagi(a, b) {\n  if (b === 0) throw new Error(\"Pembagi tidak boleh nol\");\n  return a / b;\n}\nconsole.log(`Normal: ${bagi(12, 3)}`);\ntry {\n  console.log(bagi(12, 0));\n} catch (error) {\n  console.log(`Gagal: ${error.message}`);\n}\nconsole.log(\"Program berlanjut\");",
        "task": "Tampilkan hasil 12 / 3. Tolak pembagi nol dengan Error, tangkap pesannya, dan pastikan Program berlanjut tetap dicetak.",
        "quiz": {
            "question": "Mengapa contoh memeriksa pembagi nol sendiri?",
            "options": [
                "JavaScript selalu berhenti otomatis pada pembagian nol",
                "Itu aturan kontrak fungsi untuk menolak hasil yang tidak diinginkan",
                "Agar catch selalu diabaikan"
            ],
            "answer": 1,
            "explanation": "Pembagian number oleh nol dapat menghasilkan Infinity; fungsi memilih menolaknya."
        },
        "source": [
            "Baca error dan periksa asumsi · MDN",
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw"
        ],
        "exercise": {
            "checks": [
                {
                    "kind": "output",
                    "value": "Normal: 4",
                    "label": "Jalur berhasil bekerja"
                },
                {
                    "kind": "output",
                    "value": "Gagal: Pembagi tidak boleh nol",
                    "label": "Kegagalan ditangkap"
                },
                {
                    "kind": "output",
                    "value": "Program berlanjut",
                    "label": "Eksekusi dapat berlanjut"
                }
            ],
            "hint": "Letakkan pemanggilan yang berisiko di dalam try, lalu baca error.message di catch."
        }
    },
    {
        "id": "json-dan-validasi",
        "title": "Tukar data melalui JSON",
        "minutes": 15,
        "intro": "JSON adalah format teks untuk pertukaran data. Mengubah teks menjadi nilai JavaScript belum membuktikan datanya cocok untuk aplikasi.",
        "sections": [
            [
                "Pisahkan teks dan object",
                "JSON.stringify mengubah nilai yang didukung menjadi teks JSON, sedangkan JSON.parse membaca teks JSON menjadi nilai JavaScript. Format JSON mewajibkan tanda kutip ganda untuk nama properti dan string. Komentar, fungsi, dan koma akhir bukan bagian dari sintaks JSON. Object literal JavaScript bukan otomatis teks JSON walaupun tampilannya mirip. Pada contoh, teks cadangan disimpan dalam string sebelum dibaca kembali."
            ],
            [
                "Periksa bentuk setelah parsing",
                "JSON.parse dapat berhasil pada teks \"null\", angka, atau array, bukan hanya object profil. Karena itu periksa bahwa nilai bukan null, bertipe object, bukan array, serta mempunyai nama berupa string dan level berupa bilangan bulat positif. Pemeriksaan sintaks dan pemeriksaan aturan domain adalah dua langkah berbeda. Batasi field yang dikembalikan supaya properti tambahan dari input tidak ikut dipakai tanpa sengaja. Jangan menjalankan data dengan eval untuk membacanya."
            ],
            [
                "Rancang jalur pemulihan",
                "Parsing teks yang rusak melempar SyntaxError; validasi bentuk bisa melempar Error yang kita buat sendiri. Pemanggil dapat menangkap keduanya dan memberi pesan yang sesuai. JSON juga bukan cara universal menyalin semua nilai: fungsi, undefined, tanggal, dan tipe khusus mempunyai perilaku serialisasi yang perlu dipahami terlebih dahulu. Latihan hanya memakai string dan angka sederhana. Coba teks yang rusak, object tanpa nama, array, dan null. Pastikan setiap penolakan tidak dianggap sebagai data kosong yang valid secara diam-diam."
            ]
        ],
        "code": "function bacaProfil(teks) {\n  const data = JSON.parse(teks);\n  if (data === null || typeof data !== \"object\" || Array.isArray(data) ||\n      typeof data.nama !== \"string\" || !Number.isInteger(data.level) || data.level < 1) {\n    throw new Error(\"Bentuk profil tidak valid\");\n  }\n  return { nama: data.nama, level: data.level };\n}\nconst profil = bacaProfil('{\"nama\":\"Rani\",\"level\":1}');\nconsole.log(JSON.stringify(profil));\ntry { bacaProfil(\"null\"); } catch (error) { console.log(error.message); }",
        "task": "Baca profil JSON yang valid dan serialisasikan kembali. Tolak teks \"null\" dengan pesan Bentuk profil tidak valid; coba juga JSON rusak secara manual.",
        "quiz": {
            "question": "Apa yang dijamin JSON.parse berhasil?",
            "options": [
                "Data pasti memenuhi aturan aplikasi",
                "Teks memenuhi sintaks JSON",
                "Data pasti sebuah object profil"
            ],
            "answer": 1,
            "explanation": "Parsing memeriksa sintaks; bentuk dan aturan aplikasi perlu divalidasi sesudahnya."
        },
        "source": [
            "Tukar data melalui JSON · MDN",
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON"
        ],
        "exercise": {
            "checks": [
                {
                    "kind": "output",
                    "value": "{\"nama\":\"Rani\",\"level\":1}",
                    "label": "Profil diserialisasi"
                },
                {
                    "kind": "output",
                    "value": "Bentuk profil tidak valid",
                    "label": "Nilai null ditolak"
                }
            ],
            "hint": "Periksa null sebelum mengakses properti; gunakan Array.isArray untuk menolak array."
        }
    },
    {
        "id": "promise-dan-async",
        "title": "Tunggu hasil dengan async dan await",
        "minutes": 15,
        "intro": "Pekerjaan asinkron memberi hasil kemudian. Promise menyatakan keberhasilan atau kegagalan; await memudahkan menulis langkah yang bergantung pada hasil itu.",
        "sections": [
            [
                "Kenali hasil yang belum tersedia",
                "Promise dapat berada dalam keadaan pending, lalu fulfilled dengan nilai atau rejected dengan alasan kegagalan. Fungsi async selalu mengembalikan promise, bahkan jika return-nya berisi teks biasa. Memanggil fungsi tersebut tanpa await memberi promise, bukan langsung nilai teksnya. Pada contoh, operasi disimulasikan tanpa jaringan agar dapat diulang dengan hasil yang sama di runner. Simulasi ini mengajarkan alur menunggu, bukan perilaku lengkap permintaan HTTP."
            ],
            [
                "Tunggu pada tempat yang tepat",
                "Await menunda kelanjutan fungsi async sampai promise selesai; ia tidak membekukan seluruh lingkungan JavaScript. Pernyataan setelah await di fungsi itu baru berjalan sesudah nilai tersedia. Coba tampilkan pesan sebelum dan sesudah await untuk melihat urutan. Pekerjaan berat berupa loop panjang tetap bisa memblokir eksekusi meskipun diletakkan dalam fungsi async. Gunakan timeout pendek hanya jika perlu simulasi; latihan tidak memerlukan jeda nyata untuk memahami kontraknya."
            ],
            [
                "Tangani penolakan secara sengaja",
                "Gunakan try/catch di sekitar await yang bisa gagal. Pada contoh, flag gagal menyebabkan Error dilempar dari fungsi async, sehingga promise ditolak dan catch menerima error. Tanpa penanganan, penolakan dapat muncul sebagai unhandled rejection. Await juga penting saat menyelesaikan fungsi latihan agar keluaran ditulis sebelum program dianggap selesai. Uji jalur berhasil dan gagal, lalu pastikan pesan akhir tetap muncul. Nanti ketika memakai fetch di lingkungan lokal, periksa status HTTP dan bentuk respons secara terpisah; keberhasilan promise saja tidak membuktikan data respons sesuai kebutuhan."
            ]
        ],
        "code": "async function ambilPesan(gagal = false) {\n  if (gagal) throw new Error(\"Pesan belum tersedia\");\n  return \"Belajar selesai\";\n}\nconsole.log(await ambilPesan());\ntry {\n  await ambilPesan(true);\n} catch (error) {\n  console.log(`Gagal: ${error.message}`);\n}\nconsole.log(\"Alur selesai\");",
        "task": "Await hasil ambilPesan untuk jalur berhasil dan gagal. Tangkap penolakannya, lalu cetak Alur selesai. Semua kode tetap tanpa jaringan.",
        "quiz": {
            "question": "Apa yang dikembalikan fungsi async?",
            "options": [
                "Selalu promise",
                "Selalu string",
                "Elemen DOM"
            ],
            "answer": 0,
            "explanation": "Nilai return fungsi async menjadi nilai pemenuhan promise."
        },
        "source": [
            "Tunggu hasil dengan async dan await · MDN",
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises"
        ],
        "exercise": {
            "checks": [
                {
                    "kind": "output",
                    "value": "Belajar selesai",
                    "label": "Promise berhasil ditunggu"
                },
                {
                    "kind": "output",
                    "value": "Gagal: Pesan belum tersedia",
                    "label": "Penolakan ditangani"
                },
                {
                    "kind": "output",
                    "value": "Alur selesai",
                    "label": "Alur akhir dijalankan"
                }
            ],
            "hint": "Gunakan await di dalam try untuk pemanggilan dengan argumen true."
        }
    },
    {
        "id": "pengujian-fungsi",
        "title": "Uji perilaku dan kasus batas",
        "minutes": 15,
        "intro": "Pengujian membandingkan hasil nyata dengan hasil yang diharapkan. Mulai dengan beberapa contoh yang mewakili aturan, termasuk nilai tepat di batas.",
        "sections": [
            [
                "Tentukan harapan sebelum menjalankan",
                "Fungsi statusNilai menerima angka berhingga dalam rentang 0 sampai 100. Angka minimal 70 menghasilkan lulus dan sisanya belum lulus. Masukan di luar kontrak ditolak. Tulis harapan untuk 69, 70, dan 71 sebelum membaca implementasi terlalu jauh; ini menjaga pengujian berangkat dari aturan, bukan sekadar meniru baris kode. Tambahkan nilai ujung 0 dan 100 supaya batas domain ikut diperiksa."
            ],
            [
                "Buat kegagalan terlihat",
                "Fungsi cek sederhana membandingkan aktual dan harapan memakai !==. Jika berbeda, ia melempar Error dengan label kasus, sehingga pemeriksaan berhenti dan menunjukkan masalah. Jika semua pemeriksaan selesai, barulah pesan berhasil dicetak. Perbandingan ketat cocok untuk hasil string di sini. Object dan array membutuhkan pemeriksaan isi yang sesuai, karena dua object dengan isi sama belum tentu mempunyai referensi yang sama. Jangan menggeneralisasi helper kecil ini menjadi pustaka pengujian lengkap."
            ],
            [
                "Uji juga penolakan dan keterbatasan",
                "Contoh menangkap error saat input negatif lalu memastikan penolakan benar-benar terjadi. Coba ubah >= menjadi > untuk melihat pengujian nilai 70 gagal; kembalikan sebelum melanjutkan. Tambahkan tes input teks \"70\", NaN, dan nilai 101 sesuai kontrak. Kumpulan kasus memberi bukti untuk perilaku yang diperiksa, bukan jaminan bahwa seluruh program bebas bug. Pemeriksa latihan berbasis substring keluaran bahkan lebih terbatas: mencetak pesan yang diharapkan saja dapat lolos. Karena itu jalankan pemeriksaan nyata dan baca alasan setiap kasus, bukan menghafal keluaran akhirnya."
            ]
        ],
        "code": "function statusNilai(nilai) {\n  if (!Number.isFinite(nilai) || nilai < 0 || nilai > 100) throw new Error(\"Nilai tidak valid\");\n  return nilai >= 70 ? \"lulus\" : \"belum lulus\";\n}\nfunction cek(label, aktual, harapan) {\n  if (aktual !== harapan) throw new Error(`Gagal: ${label}`);\n}\ncek(\"di bawah batas\", statusNilai(69), \"belum lulus\");\ncek(\"tepat batas\", statusNilai(70), \"lulus\");\ncek(\"di atas batas\", statusNilai(71), \"lulus\");\ncek(\"minimum\", statusNilai(0), \"belum lulus\");\ncek(\"maksimum\", statusNilai(100), \"lulus\");\nlet ditolak = false;\ntry { statusNilai(-1); } catch { ditolak = true; }\ncek(\"negatif ditolak\", ditolak, true);\nconsole.log(\"6 pemeriksaan berhasil\");",
        "task": "Jalankan enam pemeriksaan. Ubah operator batas untuk membuktikan tes mendeteksi kesalahan, lalu pulihkan. Tambahkan tiga kasus input invalid sendiri.",
        "quiz": {
            "question": "Mengapa menguji nilai tepat 70?",
            "options": [
                "Karena semua angka lain tidak perlu diuji",
                "Untuk mendeteksi kesalahan memasukkan atau mengecualikan batas",
                "Agar fungsi pasti bebas bug"
            ],
            "answer": 1,
            "explanation": "Kasus batas membedakan >= dari >; tes lain tetap diperlukan."
        },
        "source": [
            "Uji perilaku dan kasus batas · MDN",
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling"
        ],
        "exercise": {
            "checks": [
                {
                    "kind": "output",
                    "value": "6 pemeriksaan berhasil",
                    "label": "Enam pemeriksaan mencapai akhir tanpa error"
                }
            ],
            "hint": "Bandingkan hasil dengan harapan dan lempar Error jika berbeda; cetak pesan hanya setelah semua cek."
        }
    }
];

export const javascriptOrder = [
    "menjalankan-javascript",
    "variabel-dan-scope",
    "tipe-dan-konversi",
    "operator-dan-angka",
    "string-dan-template",
    "boolean-dan-perbandingan",
    "percabangan-dan-loop",
    "fungsi-dan-parameter",
    "array-dan-transformasi",
    "object-dan-salinan",
    "data-dan-fungsi",
    "error-dan-debugging",
    "json-dan-validasi",
    "promise-dan-async",
    "pengujian-fungsi",
    "dom-dan-event",
    "penyimpanan-lokal",
    "proyek-ringkasan-tugas"
];
