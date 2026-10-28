const selector = (value, label) => ({ kind: 'selector', selector: value, label });
const count = (value, min, label) => ({ kind: 'count', selector: value, min, label });
const css = (value, property, result, label) => ({ kind: 'css', selector: value, property, value: result, label });
const output = (value, label) => ({ kind: 'output', value, label });

const definitions = {
    'struktur-semantik': { checks: [selector('main h1', 'Judul utama ada di dalam main'), selector('main p', 'Paragraf perkenalan ada di dalam main')], hint: 'Bungkus h1 dan p dengan elemen main. Isi keduanya dengan teks.' },
    'tautan-dan-gambar': { checks: [selector('a[href^="#"]', 'Tautan internal memiliki teks tujuan'), count('img[alt]', 1, 'Gambar mempunyai atribut alt')], prompt: 'Buat tautan ke #karya dan elemen gambar dengan alt. Preview tidak memuat gambar eksternal; atribut alt tetap dapat dipelajari.', hint: 'Gunakan a href="#karya" dan img alt="Deskripsi gambar". Tambahkan bagian dengan id karya.' },
    'formulir-aksesibel': { checks: [selector('label[for="email"]', 'Label email memiliki teks'), count('input#email[type="email"][required]', 1, 'Input email memiliki tipe dan atribut required')], hint: 'For pada label harus bernilai email agar terhubung dengan input id="email".' },
    'daftar-dan-navigasi': { checks: [count('nav ul li a[href^="#"]', 3, 'Navigasi berisi tiga tautan internal'), count('#html, #css, #javascript', 3, 'Ketiga bagian tujuan tersedia')], hint: 'Tambahkan satu li berisi tautan JavaScript, kemudian section id="javascript".' },
    'proyek-profil': { checks: [count('main h1', 1, 'Profil memiliki judul utama'), count('main section', 2, 'Ada dua bagian profil'), count('main li', 3, 'Ada tiga keterampilan'), selector('label[for="email"]', 'Email memiliki label'), count('input#email[type="email"]', 1, 'Input email tersedia')], hint: 'Susun bagian keterampilan dan kontak di dalam main. Setiap bagian menggunakan section dan h2.' },
    'box-model': { html: '<article><h1>Kotak belajarku</h1><p>Ubah CSS dan amati ruang di sekitar teks.</p></article>', checks: [css('article', 'box-sizing', 'border-box', 'Article memakai border-box'), { kind: 'responsive-width', selector: 'article', value: 300, label: 'Lebar article 300px atau mengikuti ruang yang lebih sempit' }, css('article', 'padding-top', '20px', 'Padding article 20px')], hint: 'Tambahkan article { width: 300px; max-width: 100%; padding: 20px; box-sizing: border-box; }. Pada preview sempit, max-width menjaga kotak tidak meluber.' },
    'grid-dan-flex': { html: '<div class="catalog"><article>Satu</article><article>Dua</article><article>Tiga</article></div><div class="actions"><button>Belajar</button><button>Istirahat</button></div>', checks: [css('.catalog', 'display', 'grid', 'Katalog menggunakan Grid'), css('.actions', 'display', 'flex', 'Baris tombol memakai Flexbox'), css('.actions', 'flex-wrap', 'wrap', 'Tombol boleh membungkus')], hint: 'Gunakan display: grid pada .catalog, lalu display: flex dan flex-wrap: wrap pada .actions.' },
    'responsif-dan-fokus': { html: '<div class="reader"><button>Coba fokus dengan Tab</button><p>Perkecil browser untuk melihat perubahan layout.</p></div>', checks: [css('button', 'min-height', '44px', 'Tinggi minimum tombol 44px')], hint: '2.75rem setara 44px pada ukuran dasar preview 16px. Uji sendiri fokus dengan Tab; pemeriksaan otomatis ini hanya memeriksa tinggi tombol.' },
    'variabel-dan-warna': { html: '<article class="kartu"><h1>Satu sumber warna</h1><p>Ubah custom properties pada :root.</p></article>', checks: [css('.kartu', 'padding-top', '24px', 'Padding kartu 24px'), css('.kartu', 'color', 'rgb(37, 42, 48)', 'Warna teks sesuai variabel contoh')], hint: 'Tetapkan --jarak-kartu: 24px dan --warna-teks: #252a30 pada :root, lalu gunakan var pada .kartu.' },
    'proyek-katalog': { html: '<div class="katalog"><article><h2>HTML</h2><p>Struktur.</p></article><article><h2>CSS</h2><p>Tampilan.</p></article><article><h2>JavaScript</h2><p>Interaksi.</p></article></div>', checks: [count('.katalog article', 3, 'Katalog berisi tiga kartu'), css('.katalog', 'display', 'grid', 'Katalog menggunakan Grid'), css('.katalog', 'gap', '16px', 'Jarak kartu 16px')], hint: 'Terapkan display: grid dan gap: 16px pada .katalog, bukan pada setiap article.' },
    'data-dan-fungsi': { checks: [output('CSS', 'Hasil mencantumkan pelajaran CSS yang belum selesai')], hint: 'Filter item dengan !lesson.done, map ke title, lalu tampilkan array hasil lewat console.log.' },
    'dom-dan-event': { js: 'const input = "  <strong>Halo</strong>  ";\nfunction bersihkanNama(value) {\n  return String(value || "").trim();\n}\nconsole.log(bersihkanNama(input));', prompt: 'Runner console tidak memiliki DOM. Latih fungsi pengolah input di sini; contoh DOM lengkap di atas dikerjakan di file HTML lokal.', checks: [output('<strong>Halo</strong>', 'Teks tetap utuh setelah spasi luar dihapus')], hint: 'Trim hanya menghapus spasi luar. Saat menghubungkan fungsi ke halaman lokal, gunakan textContent untuk menampilkan hasil.' },
    'penyimpanan-lokal': { js: 'const tugas = [{ title: "Belajar", done: false }];\nconst cadangan = JSON.stringify(tugas);\nconst pulih = JSON.parse(cadangan);\nconsole.log(pulih[0].title);\nconsole.log(Array.isArray(pulih));', prompt: 'Runner tidak mengakses localStorage. Coba serialisasi dan validasi cadangan di sini; uji penyimpanan browser lewat file lokal.', checks: [output('Belajar', 'Judul tugas pulih dari JSON'), output('true', 'Hasil parse diperiksa sebagai array')], hint: 'Gunakan JSON.stringify, JSON.parse, lalu Array.isArray sebelum memakai hasilnya.' },
    'percabangan-dan-loop': { checks: [output('Lulus: 3', 'Ringkasan menunjukkan tiga nilai lulus')], hint: 'Mulai lulus dari 0. Tambahkan 1 hanya ketika angka >= 70.' },
    'proyek-ringkasan-tugas': { checks: [output('2 dari 3 selesai', 'Ringkasan tiga tugas sesuai'), output('0 dari 0 selesai', 'Daftar kosong ditangani')], hint: 'Hitung selesai dengan filter dan total dengan length. Array kosong menghasilkan dua nilai 0.' },
};

export function exerciseFor(path, lesson) {
    const definition = lesson.exercise || definitions[lesson.id];
    if (!definition || path.category !== 'Frontend') return null;
    const javascript = path.id === 'javascript-interaktif';
    const html = path.id === 'html-dasar';
    return {
        mode: javascript ? 'javascript' : 'web',
        html: html ? lesson.code : definition.html || '',
        css: html || javascript ? '' : lesson.code,
        js: javascript ? lesson.code : '',
        prompt: lesson.task,
        ...definition,
    };
}
