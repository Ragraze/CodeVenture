import { extraLessons } from './extra-lessons.js';
import { completeCurriculum } from './curriculum/index.js';

export const paths = [
    {
        id: "html-dasar",
        title: "Mulai dari HTML",
        category: "Frontend",
        level: "Pemula",
        symbol: "HTML",
        summary:
            "Susun halaman yang punya makna, mudah dibaca, dan bisa dipakai semua orang.",
        outcome:
            "Sebuah halaman profil dengan struktur semantik dan formulir yang berlabel.",
        lessons: [
            {
                id: "struktur-semantik",
                title: "Halaman yang punya struktur",
                minutes: 10,
                intro: "HTML menjelaskan makna konten. Sebelum memikirkan warna dan posisi, tentukan mana judul, navigasi, isi utama, dan informasi tambahan.",
                sections: [
                    [
                        "Mulai dari dokumen",
                        'Deklarasi doctype membuat browser memakai mode standar. Atribut lang="id" membantu pembaca layar memilih bahasa. Head berisi metadata; body berisi konten yang ditampilkan.',
                    ],
                    [
                        "Pilih elemen berdasarkan makna",
                        "Gunakan main untuk isi utama yang unik, nav untuk kelompok tautan navigasi, dan article untuk konten mandiri. Div tetap berguna sebagai pembungkus ketika tidak ada makna khusus.",
                    ],
                    [
                        "Buat hierarki judul",
                        "Mulai dengan h1 yang menjelaskan halaman, lalu h2 untuk bagian-bagiannya. Pilih tingkat judul berdasarkan hubungan konten, bukan ukuran huruf yang diinginkan.",
                    ],
                ],
                code: '<!doctype html>\n<html lang="id">\n  <head><meta charset="utf-8"><title>Profil Rani</title></head>\n  <body>\n    <header><nav aria-label="Utama">...</nav></header>\n    <main>\n      <h1>Profil Rani</h1>\n      <section aria-labelledby="tentang">\n        <h2 id="tentang">Tentang saya</h2>\n        <p>Saya sedang belajar membuat web.</p>\n      </section>\n    </main>\n  </body>\n</html>',
                task: "Buat file profil.html. Tambahkan judul, satu paragraf perkenalan, dan bagian karya dengan heading yang berurutan. Buka file tersebut di browser.",
                quiz: {
                    question:
                        "Elemen mana yang tepat untuk isi utama yang unik pada halaman?",
                    options: ["main", "nav", "span"],
                    answer: 0,
                    explanation:
                        "main menandai isi utama dokumen. nav khusus navigasi, sedangkan span tidak membawa makna struktur.",
                },
                source: [
                    "HTML elements reference · MDN",
                    "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements",
                ],
            },
            {
                id: "tautan-dan-gambar",
                title: "Tautan, gambar, dan teks alternatif",
                minutes: 8,
                intro: "Halaman menjadi berguna ketika pengunjung bisa berpindah tempat dan memahami gambar, termasuk saat gambar tidak terlihat.",
                sections: [
                    [
                        "Tautan harus menjelaskan tujuan",
                        "Gunakan anchor dengan href yang nyata untuk navigasi. Teks seperti “Baca panduan HTML” memberi konteks lebih baik daripada “Klik di sini”. Untuk tindakan pada halaman, gunakan button.",
                    ],
                    [
                        "Tulis alternatif sesuai fungsi",
                        "Alt menjelaskan informasi yang disampaikan gambar. Gambar dekoratif memakai alt kosong agar dilewati pembaca layar. Hindari mengulang keterangan yang sudah sama persis di sebelah gambar.",
                    ],
                    [
                        "Sediakan ukuran gambar",
                        "Width dan height membantu browser menyediakan ruang sebelum gambar selesai dimuat. CSS dapat membuat gambar tetap responsif tanpa mengubah proporsinya.",
                    ],
                ],
                code: '<a href="/karya">Lihat karya saya</a>\n<img src="kebun.jpg"\n     alt="Tanaman cabai di tiga pot dekat jendela"\n     width="800" height="600">\n<button type="button">Simpan catatan</button>',
                task: "Tambahkan satu tautan menuju halaman karya dan satu gambar lokal. Putuskan apakah gambar itu informatif atau dekoratif, lalu tulis alt yang sesuai.",
                quiz: {
                    question:
                        "Apa yang digunakan untuk menyimpan catatan tanpa berpindah halaman?",
                    options: ["Anchor tanpa href", "Button", "Heading"],
                    answer: 1,
                    explanation:
                        "Button menyatakan tindakan. Anchor dengan href digunakan untuk berpindah ke tujuan lain.",
                },
                source: [
                    "Images in HTML · MDN",
                    "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/HTML_images",
                ],
            },
            {
                id: "formulir-aksesibel",
                title: "Formulir yang bisa dipahami",
                minutes: 12,
                intro: "Formulir yang baik menjelaskan data apa yang dibutuhkan dan membantu pengunjung memperbaiki kesalahan.",
                sections: [
                    [
                        "Pasangkan label dan input",
                        "Atribut for pada label harus cocok dengan id input. Placeholder boleh memberi contoh, tetapi tidak menggantikan label karena hilang saat seseorang mulai mengetik.",
                    ],
                    [
                        "Manfaatkan fitur browser",
                        "Pilih type yang sesuai seperti email, gunakan autocomplete, dan jelaskan field wajib. Validasi browser membantu pengalaman pengguna; validasi server tetap diperlukan jika data dikirim ke server.",
                    ],
                    [
                        "Letakkan pesan dekat field",
                        "Pesan kesalahan harus menyebut masalah dan cara memperbaikinya. Hubungkan petunjuk memakai aria-describedby jika diperlukan, dan jangan menandai error dengan warna saja.",
                    ],
                ],
                code: '<form action="/kontak" method="post">\n  <label for="email">Email</label>\n  <input id="email" name="email" type="email"\n         autocomplete="email" required\n         aria-describedby="email-hint">\n  <p id="email-hint">Dipakai untuk membalas pesanmu.</p>\n  <button type="submit">Kirim pesan</button>\n</form>',
                task: "Buat form nama dan email. Coba navigasi memakai Tab dan kirim dengan field kosong. Catat pesan browser yang muncul.",
                quiz: {
                    question: "Mengapa placeholder bukan pengganti label?",
                    options: [
                        "Placeholder selalu terlalu panjang",
                        "Placeholder tidak boleh digunakan",
                        "Placeholder hilang saat mengetik dan tidak selalu menjadi nama aksesibel",
                    ],
                    answer: 2,
                    explanation:
                        "Label tetap terlihat dan memberi nama yang jelas pada kontrol. Placeholder hanya petunjuk tambahan.",
                },
                source: [
                    "Your first form · MDN",
                    "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Your_first_form",
                ],
            },
        ],
    },
    {
        id: "css-responsif",
        title: "Tata ruang dengan CSS",
        category: "Frontend",
        level: "Pemula",
        symbol: "CSS",
        summary:
            "Ubah struktur HTML menjadi halaman yang rapi dari layar ponsel sampai desktop.",
        outcome:
            "Katalog dua kolom yang menyesuaikan ruang, dengan fokus keyboard dan dukungan reduced motion.",
        lessons: [
            {
                id: "box-model",
                title: "Kenali ruang di setiap elemen",
                minutes: 10,
                intro: "Setiap elemen memiliki kotak: konten, padding, border, dan margin. Memahami keempatnya membuat ukuran layout lebih mudah diprediksi.",
                sections: [
                    [
                        "Content dan border box",
                        "Pada content-box, width hanya menghitung konten. Dengan border-box, width juga mencakup padding dan border. Margin selalu berada di luar kotak tersebut.",
                    ],
                    [
                        "Jaga panjang baris",
                        "Gunakan max-width untuk membatasi bacaan, padding untuk ruang di dalam komponen, dan margin atau gap untuk hubungan antarkomponen. Hindari tinggi tetap untuk teks yang bisa bertambah.",
                    ],
                ],
                code: "*, *::before, *::after { box-sizing: border-box; }\narticle {\n  width: 100%;\n  max-width: 65ch;\n  padding: 1.5rem;\n  border: 1px solid #687588;\n  margin-inline: auto;\n}",
                task: "Buat article selebar 300px dengan padding 20px dan border 1px. Bandingkan ukuran luarnya pada content-box dan border-box lewat DevTools.",
                quiz: {
                    question: "Pada border-box, width mencakup apa?",
                    options: [
                        "Konten saja",
                        "Konten, padding, dan border",
                        "Konten dan semua margin",
                    ],
                    answer: 1,
                    explanation:
                        "Border-box menghitung padding dan border ke dalam width. Margin tetap berada di luar.",
                },
                source: [
                    "The box model · MDN",
                    "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Box_model",
                ],
            },
            {
                id: "grid-dan-flex",
                title: "Grid untuk halaman, Flex untuk baris",
                minutes: 12,
                intro: "Grid dan Flexbox menyelesaikan masalah yang berbeda. Pilih berdasarkan hubungan antarisi, bukan karena salah satunya terasa lebih modern.",
                sections: [
                    [
                        "Satu dimensi atau dua",
                        "Flexbox mengatur item dalam satu arah utama, seperti deretan tombol. Grid mengatur hubungan baris dan kolom, seperti katalog. Keduanya bisa dipakai bersama pada tingkat komponen yang berbeda.",
                    ],
                    [
                        "Biarkan konten menentukan jumlah kolom",
                        "Auto-fit dan minmax dapat menambah atau mengurangi kolom berdasarkan ruang. Gunakan min(100%, ...) agar lebar minimum tidak memaksa overflow pada layar yang sangat sempit.",
                    ],
                ],
                code: ".catalog {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));\n  gap: 1.5rem;\n}\n.actions {\n  display: flex;\n  flex-wrap: wrap;\n  gap: .75rem;\n}",
                task: "Buat enam artikel dalam katalog. Perkecil browser perlahan; pastikan jumlah kolom berubah tanpa membuat halaman bergeser ke samping.",
                quiz: {
                    question:
                        "Layout mana yang paling tepat untuk baris tombol yang boleh membungkus?",
                    options: [
                        "Flexbox dengan flex-wrap",
                        "Tinggi tetap 100vh",
                        "Posisi absolute pada semua tombol",
                    ],
                    answer: 0,
                    explanation:
                        "Flexbox mengatur item dalam satu arah. Flex-wrap memberi ruang untuk pindah ke baris berikutnya.",
                },
                source: [
                    "CSS grid layout · MDN",
                    "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout",
                ],
            },
            {
                id: "responsif-dan-fokus",
                title: "Responsif juga berarti bisa diakses",
                minutes: 10,
                intro: "Responsif bukan hanya jumlah kolom. Orang juga memperbesar teks, memakai keyboard, dan memilih mengurangi gerakan.",
                sections: [
                    [
                        "Mulai dari ruang yang sempit",
                        "Tulis layout satu kolom sebagai dasar. Tambahkan media query saat isi memerlukan susunan baru. Pakai rem untuk tipografi agar ukuran mengikuti pengaturan pengguna.",
                    ],
                    [
                        "Jangan hilangkan penanda fokus",
                        "Focus-visible membantu pengguna keyboard melihat kontrol aktif. Berikan outline yang kontras dan jarak dari batas elemen. Untuk animasi nonesensial, hormati prefers-reduced-motion.",
                    ],
                ],
                code: "button { min-height: 2.75rem; }\n:focus-visible {\n  outline: 3px solid #1b5c9b;\n  outline-offset: 3px;\n}\n@media (min-width: 48rem) {\n  .reader { display: grid; grid-template-columns: 15rem 1fr; }\n}\n@media (prefers-reduced-motion: reduce) {\n  * { scroll-behavior: auto; }\n}",
                task: "Navigasikan katalogmu hanya dengan Tab dan Enter. Perbesar teks browser menjadi 200%. Perbaiki bagian yang terpotong atau keluar layar.",
                quiz: {
                    question:
                        "Apa yang harus dilakukan saat menghapus outline bawaan browser?",
                    options: [
                        "Mengganti dengan penanda fokus yang jelas",
                        "Menambahkan hover saja",
                        "Menyembunyikan tombol dari keyboard",
                    ],
                    answer: 0,
                    explanation:
                        "Pengguna keyboard membutuhkan penanda fokus yang terlihat. Hover tidak membantu saat menggunakan keyboard.",
                },
                source: [
                    "Responsive design · MDN",
                    "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design",
                ],
            },
        ],
    },
    {
        id: "javascript-interaktif",
        title: "Hidupkan dengan JavaScript",
        category: "Frontend",
        level: "Menengah",
        symbol: "JS",
        summary:
            "Kelola data, tanggapi interaksi, dan simpan pekerjaan tanpa membuat halaman rapuh.",
        outcome:
            "Daftar tugas dengan validasi, interaksi DOM, dan penyimpanan lokal yang menangani error.",
        lessons: [
            {
                id: "data-dan-fungsi",
                title: "Data kecil, fungsi yang jelas",
                minutes: 12,
                intro: "Pisahkan data dari tampilannya. Fungsi kecil yang menerima input dan menghasilkan output lebih mudah diuji dan digunakan ulang.",
                sections: [
                    [
                        "Pilih bentuk data",
                        "Array cocok untuk daftar yang berurutan, object untuk satu entitas dengan properti. Const mencegah penggantian binding, tetapi isi object atau array tetap dapat diubah.",
                    ],
                    [
                        "Transformasi tanpa efek samping",
                        "Map menghasilkan array dari transformasi tiap item. Filter memilih item yang memenuhi syarat. Fungsi yang tidak mengubah input lebih mudah dipahami saat aplikasi membesar.",
                    ],
                ],
                code: 'const lessons = [\n  { title: "HTML", done: true },\n  { title: "CSS", done: false },\n];\nconst pending = lessons.filter(lesson => !lesson.done);\nconst titles = pending.map(lesson => lesson.title);\nconsole.log(titles); // ["CSS"]',
                task: "Buat array tiga tugas. Gunakan filter untuk tugas yang belum selesai, lalu map untuk mengambil judulnya. Jalankan lewat console browser.",
                quiz: {
                    question: "Apa hasil array.filter()?",
                    options: [
                        "Selalu satu angka",
                        "Array baru berisi item yang memenuhi kondisi",
                        "Array asli yang pasti berubah",
                    ],
                    answer: 1,
                    explanation:
                        "Filter membuat array baru. Callback menentukan item mana yang disertakan.",
                },
                source: [
                    "Array.prototype.filter() · MDN",
                    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter",
                ],
            },
            {
                id: "dom-dan-event",
                title: "Interaksi DOM tanpa kejutan",
                minutes: 12,
                intro: "DOM adalah representasi dokumen di memori. JavaScript dapat membaca input dan mengubah konten saat sebuah event terjadi.",
                sections: [
                    [
                        "Dengarkan event yang tepat",
                        "Gunakan submit untuk formulir agar klik tombol dan tombol Enter sama-sama bekerja. PreventDefault menghentikan pengiriman bawaan saat formulir memang ditangani di browser.",
                    ],
                    [
                        "Perlakukan input sebagai teks",
                        "TextContent menampilkan input sebagai teks, bukan HTML. Jangan memasukkan input pengguna langsung ke innerHTML karena bisa membuat markup atau script berbahaya masuk ke halaman.",
                    ],
                ],
                code: 'const form = document.querySelector("form");\nconst output = document.querySelector("#hasil");\nform.addEventListener("submit", event => {\n  event.preventDefault();\n  const data = new FormData(form);\n  output.textContent = String(data.get("nama") || "").trim();\n});',
                task: "Buat formulir nama dan paragraf hasil. Coba kirim teks yang mengandung <strong>. Pastikan ditampilkan sebagai teks, bukan elemen HTML.",
                quiz: {
                    question:
                        "Cara sederhana menampilkan input pengguna tanpa menafsirkannya sebagai HTML adalah…",
                    options: ["eval()", "document.write()", "textContent"],
                    answer: 2,
                    explanation:
                        "TextContent memperlakukan nilainya sebagai teks. Eval menjalankan kode dan tidak tepat untuk tugas ini.",
                },
                source: [
                    "Document Object Model · MDN",
                    "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model",
                ],
            },
            {
                id: "penyimpanan-lokal",
                title: "Simpan data, tangani kegagalan",
                minutes: 10,
                intro: "LocalStorage menyimpan string pada origin browser yang sama. Data dapat bertahan setelah tab ditutup, tetapi bisa hilang jika pengguna menghapus data situs.",
                sections: [
                    [
                        "Serialisasi dan validasi",
                        "Gunakan JSON.stringify saat menulis object dan JSON.parse saat membacanya. Data yang berhasil diparse belum tentu memiliki bentuk yang benar; periksa tipe dan properti sebelum dipakai.",
                    ],
                    [
                        "Penyimpanan bisa gagal",
                        "Mode privasi, kuota, atau kebijakan browser bisa menghalangi penyimpanan. Bungkus akses dalam try/catch dan beri pesan yang jujur. LocalStorage bukan tempat untuk password, token sensitif, atau cadangan satu-satunya.",
                    ],
                ],
                code: 'function saveTasks(tasks) {\n  try {\n    localStorage.setItem("tasks-v1", JSON.stringify(tasks));\n    return true;\n  } catch {\n    return false;\n  }\n}\nif (!saveTasks([{ title: "Belajar", done: false }])) {\n  console.log("Belum tersimpan. Unduh cadangan dulu.");\n}',
                task: "Simpan daftar tugas ke localStorage. Muat ulang halaman. Tambahkan tombol ekspor JSON dan uji pembacaan data yang formatnya salah.",
                quiz: {
                    question:
                        "Mengapa aplikasi perlu fasilitas ekspor meskipun memakai localStorage?",
                    options: [
                        "Data browser bisa dihapus dan tidak otomatis tersinkron",
                        "JSON selalu rusak setelah sehari",
                        "LocalStorage adalah database bersama",
                    ],
                    answer: 0,
                    explanation:
                        "LocalStorage terikat pada browser dan origin. Ekspor memberi pengguna cadangan yang bisa mereka pindahkan sendiri.",
                },
                source: [
                    "Window.localStorage · MDN",
                    "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage",
                ],
            },
        ],
    },
    {
        id: "laravel-fondasi",
        title: "Fondasi backend Laravel",
        category: "Backend",
        level: "Menengah",
        symbol: "PHP",
        summary:
            "Pahami perjalanan request, validasi input, dan batas kepercayaan di sisi server.",
        outcome:
            "Endpoint kecil yang mengembalikan JSON tervalidasi tanpa membutuhkan database.",
        lessons: [
            {
                id: "request-dan-route",
                title: "Dari request ke response",
                minutes: 10,
                intro: "Browser mengirim request berisi metode, URL, header, dan kadang body. Route menghubungkannya ke kode yang menghasilkan response.",
                sections: [
                    [
                        "Metode punya makna",
                        "GET seharusnya membaca data tanpa mengubah keadaan. POST digunakan untuk pengiriman yang mengubah keadaan. Menghapus akun melalui GET berbahaya karena tautan dapat dipanggil tanpa niat pengguna.",
                    ],
                    [
                        "Kembalikan response yang jelas",
                        "Laravel dapat mengubah array menjadi JSON. Pilih status HTTP yang sesuai: 200 untuk berhasil, 404 untuk tidak ditemukan, dan 422 untuk kegagalan validasi.",
                    ],
                ],
                code: 'use Illuminate\\Support\\Facades\\Route;\n\nRoute::get("/health", function () {\n    return response()->json(["status" => "ok"]);\n});\n\nRoute::get("/panduan/{slug}", function (string $slug) {\n    return response()->json(["slug" => $slug]);\n})->where("slug", "[a-z0-9-]+");',
                task: "Buat route /health yang mengembalikan JSON. Buka dengan browser, lalu periksa status dan header respons di panel Network.",
                quiz: {
                    question:
                        "Metode apa yang tepat untuk endpoint pemeriksaan status yang tidak mengubah data?",
                    options: ["DELETE", "GET", "POST yang menghapus sesi"],
                    answer: 1,
                    explanation:
                        "GET dipakai untuk membaca. Pemeriksaan status tidak seharusnya menyebabkan perubahan keadaan.",
                },
                source: [
                    "Routing · Laravel 13",
                    "https://laravel.com/docs/13.x/routing",
                ],
            },
            {
                id: "validasi-input",
                title: "Validasi di batas aplikasi",
                minutes: 12,
                intro: "Input dari browser selalu perlu diperiksa di server. Validasi di browser membantu pengguna, tetapi bisa dilewati.",
                sections: [
                    [
                        "Gunakan data yang tervalidasi",
                        "Tentukan field yang diterima, tipe, dan batas ukurannya. Setelah validasi, gunakan hasilnya, bukan seluruh request. Ini mengurangi risiko menerima properti yang tidak dirancang.",
                    ],
                    [
                        "Bedakan format dan izin",
                        "Validasi memeriksa bentuk data. Otorisasi memeriksa apakah pengguna berhak melakukan tindakan. Keduanya diperlukan jika ada sumber daya milik pengguna.",
                    ],
                ],
                code: 'use Illuminate\\Http\\Request;\n\nRoute::post("/pratinjau", function (Request $request) {\n    $data = $request->validate([\n        "judul" => ["required", "string", "max:120"],\n        "menit" => ["required", "integer", "min:1", "max:180"],\n    ]);\n    return response()->json($data);\n});',
                task: "Kirim request dengan menit bernilai -1 dan judul kosong. Pastikan response menjelaskan kedua field yang perlu diperbaiki, bukan menampilkan stack trace.",
                quiz: {
                    question:
                        "Apakah input yang lolos validasi otomatis boleh mengubah data pengguna lain?",
                    options: [
                        "Ya, karena formatnya benar",
                        "Ya, jika dikirim melalui POST",
                        "Tidak, otorisasi harus diperiksa terpisah",
                    ],
                    answer: 2,
                    explanation:
                        "Bentuk input yang valid tidak membuktikan hak akses. Otorisasi menentukan siapa yang boleh melakukan tindakan.",
                },
                source: [
                    "Validation · Laravel 13",
                    "https://laravel.com/docs/13.x/validation",
                ],
            },
            {
                id: "keamanan-dasar",
                title: "Siapkan batas yang aman",
                minutes: 12,
                intro: "Keamanan dibangun dari beberapa lapisan: pengelolaan rahasia, perlindungan request, output yang aman, dan dependensi yang dirawat.",
                sections: [
                    [
                        "Rahasia bukan bagian repository",
                        "Simpan konfigurasi sensitif di environment. Jangan commit .env, tampilkan stack trace pada pengunjung production, atau menyimpan password sebagai teks biasa. Gunakan hashing password yang sesuai jika membangun akun.",
                    ],
                    [
                        "Audit dan batasi permukaan",
                        "Hapus endpoint yang tidak digunakan. Gunakan proteksi CSRF untuk perubahan melalui sesi browser, otorisasi untuk data milik pengguna, dan rate limit jika membuka endpoint publik yang mahal. Audit dependensi melengkapi review kode, bukan menggantikannya.",
                    ],
                ],
                code: "# Pemeriksaan sebelum rilis Laravel\ncomposer validate --strict\ncomposer audit\nphp artisan test\nnpm audit\nnpm run build\n\n# Konfigurasi environment production\nAPP_ENV=production\nAPP_DEBUG=false",
                task: "Periksa repository contohmu: pastikan .env diabaikan Git, GET tidak mengubah data, dan formulir perubahan punya proteksi CSRF. Jalankan audit dependensi.",
                quiz: {
                    question: "Apa fungsi audit dependensi?",
                    options: [
                        "Mendeteksi advisory yang dikenal pada paket yang terpasang",
                        "Membuktikan semua kode aplikasi aman",
                        "Menggantikan otorisasi",
                    ],
                    answer: 0,
                    explanation:
                        "Audit mencari kerentanan paket yang diketahui. Logika aplikasi dan izin akses tetap perlu diuji serta ditinjau.",
                },
                source: [
                    "Deployment · Laravel 13",
                    "https://laravel.com/docs/13.x/deployment",
                ],
            },
        ],
    },
];

for (const path of paths) {
    path.lessons.push(...(extraLessons[path.id] || []));
    completeCurriculum(path);
}

export const allLessons = paths.flatMap((path) =>
    path.lessons.map((lesson) => ({
        ...lesson,
        pathId: path.id,
        pathTitle: path.title,
        key: `${path.id}/${lesson.id}`,
    })),
);
