export const laravelLessons = [
    {
        id: 'php-dasar', title: 'PHP sebelum memakai framework', minutes: 16,
        intro: 'Laravel ditulis dengan PHP. Sebelum mengenal framework, jalankan satu file kecil untuk memahami variabel, array, fungsi, dan perbedaan kode server dengan JavaScript di browser.',
        sections: [
            ['Server mengolah, browser menerima', 'File PHP diproses oleh runtime PHP. Browser menerima hasilnya, misalnya HTML atau JSON, bukan kode sumber PHP. Karena itu menempelkan PHP ke editor JavaScript Codeventure tidak akan menjalankannya. Buat folder latihan terpisah dan file dasar.php, lalu jalankan php dasar.php dari terminal. Pastikan terminal berada di folder file tersebut; kesalahan lokasi sering terlihat seperti file tidak ditemukan.'],
            ['Kenali bentuk data', 'Variabel PHP diawali tanda dolar. String menyimpan teks, boolean menyimpan benar atau salah, dan array dapat berupa daftar maupun pasangan kunci-nilai. Contoh ini menggunakan array asosiatif untuk satu catatan. Akses kunci yang belum ada dengan nilai cadangan melalui operator ??, bukan menganggap setiap masukan selalu lengkap. Jangan menaruh password atau kredensial sungguhan di file latihan.'],
            ['Fungsi memiliki masukan dan keluaran', 'Parameter bertipe dan tipe hasil membantu menyatakan kontrak fungsi. Deklarasi strict_types mengubah penanganan beberapa konversi tipe pada panggilan dari file ini; deklarasi tersebut bukan pengganti validasi masukan HTTP. Gunakan return untuk mengembalikan data, lalu echo untuk menampilkannya. Pemisahan tersebut memudahkan fungsi diuji tanpa harus membaca tampilan terminal.'],
            ['Coba batas masukan', 'Jalankan contoh, kemudian ubah nama menjadi string kosong dan tambahkan spasi di sekelilingnya. Hasil kosong tetap harus dijelaskan dengan nilai cadangan. Coba panggil fungsi dengan array dan baca TypeError yang muncul. Catat beda antara error tipe pemrograman dan data pengguna yang perlu ditolak lewat validasi; keduanya memerlukan penanganan di tempat berbeda.'],
        ],
        code: String.raw`<?php
declare(strict_types=1);

function salam(string $nama): string
{
    $bersih = trim($nama);
    return 'Halo, '.($bersih !== '' ? $bersih : 'pelajar').'!';
}

$profil = ['nama' => ' Rani ', 'aktif' => true];
echo salam($profil['nama'] ?? '').PHP_EOL;
echo salam('').PHP_EOL;
`,
        task: 'Simpan contoh sebagai dasar.php di folder latihan terpisah. Jalankan php dasar.php dan periksa keluaran Halo, Rani! serta Halo, pelajar!. Ubah fungsi menjadi penerima dua nama, lalu uji nama kosong dan tipe yang salah.',
        quiz: { question: 'Di mana kode PHP dieksekusi ketika situs mengirim halaman HTML?', options: ['Pada runtime server sebelum respons dikirim', 'Selalu di console JavaScript browser', 'Di dalam file CSS'], answer: 0, explanation: 'Server memproses PHP dan mengirim hasilnya. Browser tidak menjalankan sumber PHP yang ditempel pada halaman.' },
        source: ['PHP tags · PHP Manual', 'https://www.php.net/manual/en/language.basic-syntax.phpmode.php'],
    },
    {
        id: 'menyiapkan-laravel', title: 'Siapkan proyek Laravel terpisah', minutes: 18,
        intro: 'Bangun lingkungan latihan yang bisa kamu ubah sendiri. Proyek Laravel pada jalur ini dibuat terpisah dari Codeventure agar eksperimen database dan konfigurasi tidak mengganggu ruang belajarmu.',
        sections: [
            ['Periksa alat sebelum memasang paket', 'Siapkan PHP, Composer, Node.js, dan npm. Gunakan PHP 8.5 untuk mengikuti contoh jalur ini, lalu periksa hasil php --version dan composer --version. Pastikan ekstensi PDO SQLite tersedia jika memilih database SQLite. Baca persyaratan versi pada dokumentasi Laravel yang ditautkan sebelum memasang; versi alat lokal dan paket harus cocok, bukan sekadar mempunyai nama yang sama.'],
            ['Buat ruang eksperimen sendiri', 'Jalankan perintah dari direktori induk tempat kamu menyimpan proyek, bukan dari dalam folder Codeventure. Composer membuat folder catatan-belajar dan mengambil dependensinya. Pemasangan memerlukan koneksi internet. Buka README proyek baru dan periksa apakah .env serta APP_KEY sudah dibuat oleh skrip pemasangan sebelum menambahkan konfigurasi lain. Jangan menyalin kunci aplikasi milik proyek berbeda.'],
            ['Kenali peta folder', 'Routes/web.php berisi rute web; app/Http/Controllers mengolah permintaan; resources/views menyimpan template Blade; database/migrations menjelaskan perubahan struktur tabel. Public adalah document root yang boleh disajikan server. Vendor dan node_modules berisi dependensi yang dipasang dari lock file. Mulailah menelusuri satu permintaan dari rute ke respons daripada mencoba menghafal seluruh folder sekaligus.'],
            ['Jalankan dan amati', 'Build frontend terlebih dahulu agar template yang memanggil Vite menemukan asetnya, lalu jalankan server development di port 8002. Gunakan alamat localhost yang dilaporkan terminal. Jika port dipakai, pilih nomor lain; jangan menghentikan proses yang tidak kamu kenal. Buka halaman awal dan amati tab Network. Server development ini untuk latihan lokal, bukan cara menerbitkan aplikasi production.'],
        ],
        code: `php --version
composer --version
node --version

composer create-project laravel/laravel catatan-belajar "^13.0"
cd catatan-belajar
npm install
npm run build
php artisan --version
php artisan serve --port=8002`,
        task: 'Buat proyek catatan-belajar di luar folder Codeventure. Buka localhost:8002, temukan routes/web.php dan resources/views/welcome.blade.php, lalu ubah satu kalimat pada view. Catat versi PHP, Laravel, dan alasan folder public menjadi document root.',
        quiz: { question: 'Mengapa proyek latihan dibuat di folder terpisah?', options: ['Agar migrasi dan perubahan konfigurasi tidak mengganggu aplikasi lain', 'Karena Laravel hanya bisa memiliki satu file', 'Agar validasi tidak diperlukan'], answer: 0, explanation: 'Pemisahan proyek membatasi dampak eksperimen dan memudahkan kamu mengenali konfigurasi milik setiap aplikasi.' },
        source: ['Installation · Laravel 13', 'https://laravel.com/docs/13.x/installation'],
    },
    {
        id: 'controller-dan-respons', title: 'Pindahkan alur ke controller', minutes: 15,
        intro: 'Closure pada rute cocok untuk respons kecil. Controller memberi tempat yang jelas ketika satu fitur memiliki beberapa tindakan dan mulai membutuhkan validasi, pengambilan data, atau pengujian.',
        sections: [
            ['Pisahkan pemetaan URL dan pekerjaan fitur', 'Rute menentukan URL serta metode HTTP yang menuju tindakan tertentu. Controller menangani pekerjaan yang diminta dan mengembalikan respons. Contoh ini membaca kata pencarian dari query string dan menyaring koleksi kecil dalam memori, tanpa database. Tujuannya memahami alur, bukan membuat penyimpanan permanen. Keluaran akan kembali ke data awal ketika daftar di kode diubah atau server memuat ulang.'],
            ['Gunakan request secara terarah', 'Laravel dapat memasukkan Request ke parameter method controller. Ambil hanya field yang diperlukan dan normalisasikan teksnya sebelum dibandingkan. Jangan menganggap nilai query selalu berupa string; pengguna dapat mengirim bentuk array. Contoh memakai validate untuk menolak bentuk yang tidak sesuai dan membatasi panjang pencarian sebelum fungsi penyaringan membacanya.'],
            ['Kembalikan tipe respons yang sesuai', 'Respons JSON berguna untuk data terstruktur, sedangkan view dipakai untuk HTML yang akan dibaca orang. Gunakan response()->json agar format serta headernya sesuai. JSON bukan mekanisme otorisasi: jika data bersifat pribadi, periksa akses sebelum mengembalikannya. Hindari memasukkan seluruh object pengguna ke respons hanya karena object tersebut tersedia pada controller.'],
            ['Hubungkan dan uji rute', 'Buat controller melalui Artisan lalu isi file sesuai contoh. Pada routes/web.php, impor NoteController dan daftarkan GET /catatan ke method index. Buka /catatan dan /catatan?q=html untuk membandingkan keluaran. Uji pula q yang sangat panjang serta q berbentuk array. Periksa status HTTP dan isi respons, bukan hanya apakah browser menampilkan sesuatu.'],
        ],
        code: String.raw`<?php
// app/Http/Controllers/NoteController.php
namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $data = $request->validate(['q' => ['nullable', 'string', 'max:80']]);
        $q = mb_strtolower(trim($data['q'] ?? ''));
        $notes = collect(['Belajar HTML', 'Latihan CSS']);
        $found = $notes->filter(fn (string $title) =>
            str_contains(mb_strtolower($title), $q))->values();
        return response()->json(['notes' => $found]);
    }
}

// Tambahkan di routes/web.php, dalam file terpisah:
// use App\Http\Controllers\NoteController;
// Route::get('/catatan', [NoteController::class, 'index']);`,
        task: 'Jalankan php artisan make:controller NoteController di proyek latihan. Isi controller dan rute terpisah sesuai contoh. Bandingkan /catatan?q=html, pencarian kosong, dan q berbentuk array. Catat respons yang diterima ketika validasi gagal.',
        quiz: { question: 'Apa tanggung jawab rute ketika fitur memakai controller?', options: ['Menghubungkan metode HTTP dan URL ke tindakan controller', 'Menjamin semua data selalu aman ditampilkan', 'Menyimpan seluruh template di dalam URL'], answer: 0, explanation: 'Rute memetakan permintaan ke tindakan. Validasi, otorisasi, pengambilan data, dan respons tetap memiliki tanggung jawab masing-masing.' },
        source: ['Controllers · Laravel 13', 'https://laravel.com/docs/13.x/controllers'],
    },
    {
        id: 'blade-dan-data', title: 'Tampilkan data dengan Blade', minutes: 16,
        intro: 'Blade menghubungkan data dari server dengan markup halaman. Pelajari keluaran yang di-escape, pengulangan daftar, keadaan kosong, dan cara menjaga template tetap mudah dibaca.',
        sections: [
            ['Kirim data dengan nama yang jelas', 'Controller dapat mengembalikan view dengan nama template dan array data. Nama catatan.index merujuk resources/views/catatan/index.blade.php. Ganti tipe hasil method index dari JsonResponse pada pelajaran sebelumnya menjadi Illuminate\\View\\View, atau impor View dan gunakan tipe View. Variabel template diberikan oleh controller; hindari mengambil database langsung dari template. Mulai dengan array sederhana sebelum menyiapkan model.'],
            ['Bedakan teks dan markup tepercaya', 'Penulisan dengan dua kurung kurawal meng-escape data sebelum masuk ke HTML. Jika judul berisi tag strong, pengunjung melihat teks tag tersebut alih-alih elemen yang aktif. Jangan memakai keluaran mentah untuk input pengguna. Escaping HTML juga bukan pengganti pemeriksaan URL: jika data mengisi href, kamu masih harus memastikan tujuan atau protokolnya diperbolehkan.'],
            ['Rancang keadaan daftar kosong', 'Forelse menyediakan pengulangan sekaligus cabang ketika tidak ada item. Keadaan kosong sebaiknya menjelaskan apa yang belum tersedia dan tindakan selanjutnya. Jangan memunculkan judul contoh seolah-olah itu data pribadi pengguna. Struktur list tetap berguna pada template karena membantu pembaca layar memahami hubungan antarcatatan dan jumlah itemnya.'],
            ['Uji isi yang tidak ideal', 'Coba judul panjang, array kosong, dan teks yang terlihat seperti HTML. Periksa halaman serta sumber HTML yang diterima. Jika variabel tidak tersedia, perbaiki kontrak data pada controller alih-alih menutupi seluruh masalah dengan operator cadangan di setiap baris template. Satu view yang jelas lebih mudah diperiksa daripada template yang diam-diam menebak asal semua datanya.'],
        ],
        code: String.raw`{{-- resources/views/catatan/index.blade.php --}}
<!doctype html>
<html lang="id">
<head><meta charset="utf-8"><title>Catatan belajar</title></head>
<body>
<main>
  <h1>Catatan belajar</h1>
  <ul>
    @forelse ($notes as $note)
      <li>{{ $note['title'] }}</li>
    @empty
      <li>Belum ada catatan.</li>
    @endforelse
  </ul>
</main>
</body>
</html>

{{-- Ganti method index di controller terpisah:
public function index(): \Illuminate\View\View
{
    return view('catatan.index', ['notes' => [
        ['title' => 'Belajar HTML'],
        ['title' => '<strong>Tetap teks</strong>'],
    ]]);
}
--}}`,
        task: 'Buat view catatan/index.blade.php dan kembalikan dari controller menggunakan data contoh. Pastikan teks tag strong tidak menjadi markup aktif. Ganti notes dengan array kosong dan verifikasi pesan kosong tetap berada di dalam daftar.',
        quiz: { question: 'Apa yang dilakukan keluaran Blade dengan dua kurung kurawal?', options: ['Menjalankan seluruh input sebagai PHP', 'Meng-escape nilai untuk keluaran HTML', 'Menyimpan data ke database'], answer: 1, explanation: 'Blade meng-escape keluaran tersebut sehingga teks yang menyerupai markup tidak otomatis menjadi elemen HTML aktif.' },
        source: ['Blade templates · Laravel 13', 'https://laravel.com/docs/13.x/blade'],
    },
    {
        id: 'database-dan-migrasi', title: 'Bentuk tabel melalui migrasi', minutes: 18,
        intro: 'Database menyimpan catatan setelah permintaan selesai. Migrasi mencatat perubahan strukturnya sehingga lingkungan latihan dapat dibangun kembali dengan langkah yang jelas dan dapat diperiksa.',
        sections: [
            ['Pisahkan struktur dan isi', 'Tabel menjelaskan kolom dan batas tipe data, sementara baris adalah isinya. Catatan awal membutuhkan id, title, body, serta waktu pembuatan dan perubahan. Mulailah dengan kebutuhan nyata; jangan membuat puluhan kolom untuk fitur yang belum ada. Migrasi bukan ekspor data pribadi dan tidak otomatis menjadi cadangan isi tabel. Backup dan pemulihan data merupakan pekerjaan tersendiri.'],
            ['Pilih koneksi latihan', 'Gunakan SQLite untuk latihan lokal jika ingin menghindari pengaturan layanan database terpisah. Pastikan file database dan ekstensi PDO SQLite tersedia serta konfigurasi .env proyek latihan menunjuk ke koneksi yang benar. Jangan mengganti konfigurasi Codeventure: aplikasi yang sedang kamu pakai tetap menyimpan progres di browser. Perubahan skema ini hanya untuk proyek catatan-belajar yang kamu buat sendiri.'],
            ['Tulis perubahan yang dapat ditinjau', 'Perintah make:migration menghasilkan file bertanggal dengan method up dan down. Up membuat perubahan, down menjelaskan pembalikannya. String title dibatasi 160 karakter dan body memakai text. Validasi HTTP tetap diperlukan karena aturan database tidak menjelaskan seluruh kebutuhan bisnis. Setelah file dibuat, baca rencana perubahan sebelum menjalankan migrate pada database yang berisi informasi penting.'],
            ['Periksa hasil tanpa menghapus data', 'Jalankan migrate:status untuk melihat migrasi yang telah diterapkan. Coba membuat catatan pada pelajaran berikutnya lalu jalankan migrate lagi; migrasi yang sama tidak seharusnya membuat tabel kedua. Perintah migrate:fresh menghapus tabel dan tidak diperlukan untuk mengikuti jalur ini. Jika perubahan baru dibutuhkan, buat migrasi berikutnya agar riwayat tetap dapat diikuti.'],
        ],
        code: String.raw`<?php
// Isi file hasil: php artisan make:migration create_notes_table
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('notes', function (Blueprint $table) {
            $table->id();
            $table->string('title', 160);
            $table->text('body');
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('notes');
    }
};
// Terminal proyek latihan: php artisan migrate
// Lalu: php artisan migrate:status`,
        task: 'Buat migrasi notes pada proyek latihan dan isi kolom sesuai contoh. Jalankan migrate lalu migrate:status. Jelaskan beda tabel dan baris serta mengapa migrasi tidak menggantikan backup. Jangan menjalankan migrate:fresh pada database yang ingin dipertahankan.',
        quiz: { question: 'Apa tujuan utama file migrasi?', options: ['Mencatat perubahan struktur database', 'Menjadi satu-satunya cadangan seluruh data pengguna', 'Menggantikan semua validasi request'], answer: 0, explanation: 'Migrasi menyimpan riwayat struktur. Isi data dan aturan masukan tetap membutuhkan penanganan serta cadangan yang sesuai.' },
        source: ['Database migrations · Laravel 13', 'https://laravel.com/docs/13.x/migrations'],
    },
    {
        id: 'eloquent-dasar', title: 'Baca dan simpan catatan dengan Eloquent', minutes: 18,
        intro: 'Eloquent menghubungkan model PHP dengan tabel database. Mulailah dari satu model Note, atribut yang diperbolehkan, penyaringan data, dan pengambilan daftar dengan batas yang jelas.',
        sections: [
            ['Model mewakili satu jenis data', 'Buat model Note melalui Artisan setelah migrasi notes tersedia. Konvensi Eloquent menghubungkan Note dengan tabel notes dan menyediakan timestamps secara bawaan. Model bukan sekadar kumpulan HTML; tugasnya berhubungan dengan data dan relasi. Controller memilih data yang diperlukan lalu mengirimkannya ke view, sehingga penyajian tetap terpisah dari cara penyimpanan.'],
            ['Batasi mass assignment', 'Laravel 13 mendokumentasikan atribut Fillable untuk menentukan kolom yang boleh diisi secara massal. Contoh hanya mengizinkan title dan body. Daftar tersebut bukan izin akses pengguna dan bukan pengganti validasi. Tetap bentuk array masukan dari hasil validasi; jangan mengirim request all langsung ke create hanya karena model sudah mempunyai daftar atribut yang diperbolehkan.'],
            ['Ambil data dengan urutan dan batas', 'Where menambahkan kondisi sebelum kueri dijalankan, sedangkan get mengambil hasilnya. Gunakan orderByDesc agar urutan daftar dapat diprediksi. Untuk antarmuka daftar yang bertambah, paginate membatasi hasil per halaman. Mengambil seluruh tabel untuk menampilkan sepuluh catatan akan menjadi semakin mahal saat jumlah data tumbuh. Pilih hanya kolom yang dibutuhkan oleh tampilan atau respons.'],
            ['Coba lewat Tinker lalu controller', 'Gunakan Tinker pada database latihan untuk membuat dua catatan dan membacanya kembali. Keluar dari Tinker lalu buka lagi untuk memastikan data tetap ada. Setelah itu pindahkan kueri daftar ke controller. Bedakan error koneksi, tabel belum dibuat, dan atribut yang tidak diperbolehkan; membaca pesan error dengan teliti lebih berguna daripada mengganti banyak konfigurasi sekaligus.'],
        ],
        code: String.raw`<?php
// app/Models/Note.php, dibuat dengan php artisan make:model Note
namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['title', 'body'])]
class Note extends Model
{
}

// Dalam php artisan tinker, jalankan terpisah:
// App\Models\Note::create(['title' => 'HTML', 'body' => 'Belajar struktur']);
// App\Models\Note::query()->orderByDesc('id')->get(['id', 'title']);
// Di method controller untuk daftar besar:
// return view('catatan.index', ['notes' => Note::query()->orderByDesc('id')->paginate(10)]);`,
        task: 'Buat model Note dan dua catatan pada database latihan. Baca hanya id dan title secara berurutan. Coba kirim atribut tambahan yang tidak ada dalam Fillable dan amati hasilnya. Perbarui controller untuk memakai paginate(10), kemudian tambahkan links() pada view.',
        quiz: { question: 'Apakah Fillable memastikan pengguna berhak mengubah sebuah catatan?', options: ['Ya, seluruh otorisasi otomatis selesai', 'Tidak, Fillable mengatur mass assignment, bukan hak akses', 'Hanya jika judulnya pendek'], answer: 1, explanation: 'Fillable membatasi atribut yang dapat diisi secara massal. Hak akses tetap harus diperiksa lewat policy atau mekanisme otorisasi lain.' },
        source: ['Eloquent: getting started · Laravel 13', 'https://laravel.com/docs/13.x/eloquent'],
    },
    {
        id: 'relasi-dan-kueri', title: 'Hubungkan pengguna dan catatan', minutes: 18,
        intro: 'Satu pengguna dapat memiliki banyak catatan. Hubungan itu membutuhkan kolom foreign key dan relasi model, lalu kueri yang dibatasi agar setiap pengguna hanya melihat catatannya sendiri.',
        sections: [
            ['Simpan hubungan lewat foreign key', 'Tambahkan user_id melalui migrasi baru sebagai kolom nullable agar dua catatan yang dibuat pada pelajaran sebelumnya tetap tersimpan. Setelah akun latihan tersedia, isi pemilik untuk baris lama melalui Tinker, lalu periksa tidak ada pemilik kosong. Foreign key menjaga hubungan referensial, tetapi tidak otomatis menyaring daftar berdasarkan pengguna yang login. Untuk data nyata, jangan menetapkan pemilik massal tanpa memverifikasi kepemilikan setiap baris.'],
            ['Nyatakan relasi pada kedua model', 'User memiliki method notes yang mengembalikan hasMany, sedangkan Note mempunyai method user yang mengembalikan belongsTo. Relasi membantu mengambil atau membuat data melalui konteks pemilik. Membuat catatan lewat user notes create akan mengisi foreign key dari relasi, sehingga kamu tidak perlu menerima user_id mentah dari input formulir yang dapat dimanipulasi.'],
            ['Batasi daftar sebelum mengambil hasil', 'Untuk daftar pribadi, ambil notes dari request user yang sudah melewati middleware auth. Jangan mengambil seluruh notes lalu menyaringnya hanya di template, karena data sudah telanjur dimuat dan mudah salah dikirim ke respons lain. Saat halaman memang memerlukan data pemilik beberapa catatan, eager loading dengan with dapat mengurangi pola satu kueri tambahan untuk setiap baris.'],
            ['Uji dengan dua pengguna', 'Buat dua akun latihan dan satu catatan untuk masing-masing. Pastikan daftar pribadi tidak menampilkan catatan akun lain. Mengubah id pada URL juga harus diuji pada pelajaran policy berikutnya: daftar yang sudah tersaring tidak menjamin endpoint detail dan update ikut terlindungi. Catat hubungan antara autentikasi, cakupan kueri, dan otorisasi per objek.'],
        ],
        code: String.raw`// Migrasi baru, di dalam up():
Schema::table('notes', function (Blueprint $table) {
    $table->foreignId('user_id')->nullable()->constrained()->restrictOnDelete();
});

// Tambahkan pada app/Models/User.php:
public function notes(): \Illuminate\Database\Eloquent\Relations\HasMany
{
    return $this->hasMany(\App\Models\Note::class);
}

// Tambahkan pada app/Models/Note.php:
public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
{
    return $this->belongsTo(\App\Models\User::class);
}

// Controller yang sudah dilindungi middleware auth:
// $notes = $request->user()->notes()->orderByDesc('id')->paginate(10);

// Sesudah akun latihan tersedia, dalam php artisan tinker:
// $owner = App\Models\User::firstOrFail();
// $owner->notes()->saveMany(App\Models\Note::whereNull('user_id')->get());
// App\Models\Note::whereNull('user_id')->count(); // harus 0 pada data latihan
// Perintah backfill ini hanya untuk contoh pribadi pada database latihan.`,
        task: 'Tambahkan foreign key nullable tanpa menghapus catatan lama, lalu method relasi pada model. Setelah menyiapkan akun lewat pelajaran autentikasi, jalankan backfill Tinker hanya untuk data contoh milikmu dan pastikan jumlah notes tanpa pemilik menjadi nol. Uji daftar dua akun; data yang masih tanpa pemilik tidak boleh ditampilkan sebagai catatan pribadi.',
        quiz: { question: 'Mengapa user_id sebaiknya diambil dari pengguna terautentikasi saat membuat catatan pribadi?', options: ['Agar pemilik tidak ditentukan bebas melalui input formulir', 'Agar foreign key tidak perlu dibuat', 'Agar semua catatan menjadi publik'], answer: 0, explanation: 'Pemilik berasal dari konteks autentikasi yang telah diverifikasi, bukan field yang dapat diganti oleh pengirim request.' },
        source: ['Eloquent relationships · Laravel 13', 'https://laravel.com/docs/13.x/eloquent-relationships'],
    },
    {
        id: 'auth-dan-policy', title: 'Bedakan login dan izin mengubah data', minutes: 18,
        intro: 'Login mengenali pengguna, sedangkan policy menjawab apakah pengguna tersebut boleh melakukan tindakan terhadap data tertentu. Keduanya diperlukan untuk aplikasi catatan pribadi.',
        sections: [
            ['Gunakan fondasi autentikasi resmi', 'Untuk proyek latihan yang membutuhkan login, pilih starter kit Laravel yang menyediakan alur autentikasi sesuai kebutuhanmu. Ikuti dokumentasi instalasinya di proyek terpisah; jangan membuat penyimpanan password atau sesi sendiri sebagai jalan pintas. Middleware auth membatasi rute ke pengguna yang terautentikasi. Setelah identitas diketahui, akses ke setiap catatan tetap harus diperiksa berdasarkan pemiliknya.'],
            ['Beri nama aturan lewat policy', 'Buat NotePolicy dengan Artisan agar aturan untuk model Note mempunyai tempat yang jelas. Method update menerima User dan Note lalu membandingkan id pengguna dengan user_id catatan. Karena konvensi penamaan digunakan, Laravel dapat menemukan policy pada lokasi yang sesuai. Jika kamu menyimpang dari konvensi, daftarkan pemetaannya sesuai dokumentasi agar policy yang benar benar-benar dipanggil.'],
            ['Periksa sebelum mengubah', 'Pada controller, panggil Gate authorize sebelum update atau delete. Menyembunyikan tombol di Blade membantu antarmuka, tetapi tidak menghalangi seseorang mengirim request langsung. Route model binding yang menemukan sebuah catatan juga tidak berarti pengunjung berhak mengeditnya. Gunakan data hasil validasi dan batasi field yang boleh diubah; user_id tidak termasuk field edit judul atau isi.'],
            ['Amati penolakan yang benar', 'Uji akun pemilik, akun lain, dan pengguna yang belum login. Pengguna lain harus ditolak sebelum perubahan tersimpan, dan rute web yang memerlukan login mengarahkan pengunjung sesuai mekanisme autentikasi aplikasi. Jangan membedakan pengamanan berdasarkan tombol yang dipakai. Tuliskan tes untuk endpoint yang sama dengan identitas berbeda agar aturan tidak hanya hidup sebagai asumsi antarmuka.'],
        ],
        code: String.raw`<?php
// app/Policies/NotePolicy.php
namespace App\Policies;

use App\Models\Note;
use App\Models\User;

class NotePolicy
{
    public function update(User $user, Note $note): bool
    {
        return $user->id === $note->user_id;
    }
}

// Di controller, sebelum perubahan:
// Gate::authorize('update', $note);
// $data = $request->validate([
//     'title' => ['required', 'string', 'max:160'],
//     'body' => ['required', 'string', 'max:4000'],
// ]);
// $note->update($data);
// Impor Illuminate\Support\Facades\Gate pada file controller.`,
        task: 'Siapkan autentikasi dari starter kit resmi pada proyek latihan, lalu buat NotePolicy dan panggil Gate::authorize sebelum update. Uji permintaan pemilik serta akun lain terhadap id yang sama. Pastikan penolakan tidak mengubah title atau body.',
        quiz: { question: 'Jika tombol Edit disembunyikan untuk akun lain, apakah endpoint update sudah terlindungi?', options: ['Sudah, karena tidak ada tombol', 'Belum, controller tetap harus memeriksa otorisasi', 'Sudah jika URL sulit ditebak'], answer: 1, explanation: 'Request dapat dibuat tanpa tombol di halaman. Pemeriksaan server diperlukan pada setiap tindakan yang dilindungi.' },
        source: ['Authorization · Laravel 13', 'https://laravel.com/docs/13.x/authorization'],
    },
    {
        id: 'proyek-catatan-dan-tes', title: 'Proyek: catatan pribadi yang diuji', minutes: 25,
        intro: 'Satukan route, controller, Blade, validasi, model, relasi, dan policy menjadi aplikasi catatan pribadi. Gunakan tes untuk memeriksa perilaku yang penting sebelum menambahkan fitur baru.',
        sections: [
            ['Tentukan hasil yang dapat diamati', 'Proyek selesai ketika pengguna dapat melihat catatannya, membuat catatan valid, dan memperbarui catatan miliknya. Masukan kosong harus ditolak dan pengguna lain tidak dapat mengubah objek tersebut. Tetapkan kriteria ini sebelum menambah pencarian atau dekorasi. Daftar diambil melalui relasi pengguna dan form memakai token CSRF. Buat route bernama untuk store dan update agar tes tidak bergantung pada URL yang tersebar.'],
            ['Pisahkan database pengujian', 'Feature test melewati lapisan HTTP aplikasi sehingga cocok memeriksa validasi dan izin endpoint. Gunakan database khusus pengujian; contoh memakai RefreshDatabase dan tidak boleh diarahkan ke database yang ingin dipertahankan. Konfigurasikan koneksi test pada phpunit.xml atau environment test. Baca konfigurasi tersebut sebelum menjalankan tes, bukan setelah menemukan tabel latihan berubah.'],
            ['Mulai dari kasus yang berisiko', 'Buat tes pengguna lain mengedit catatan milik orang lain, lalu pastikan status ditolak dan isi tabel tidak berubah. Tambahkan kasus pemilik berhasil mengedit, field kosong gagal, dan daftar hanya menampilkan catatan pengguna yang login. Factories menyediakan data pengujian yang mudah dibaca, sedangkan assertDatabaseHas memeriksa dampak penyimpanan. Lolos satu tes tidak membuktikan seluruh endpoint aman.'],
            ['Selesaikan lingkaran pengembangan', 'Jalankan tes, baca kegagalan, perbaiki lapisan yang bertanggung jawab, lalu jalankan lagi. Setelah semua kasus sesuai, coba alur pengguna secara manual dengan keyboard dan dua akun. Dokumentasikan cara instalasi serta konfigurasi test agar proyek dapat dijalankan ulang. Proyek ini adalah praktik lokal; penerbitan publik memerlukan pemeriksaan konfigurasi production yang dibahas pada pelajaran keamanan terakhir.'],
        ],
        code: String.raw`<?php
// tests/Feature/NoteAccessTest.php
namespace Tests\Feature;

use App\Models\Note;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class NoteAccessTest extends TestCase
{
    use RefreshDatabase;

    public function test_other_user_cannot_edit_note(): void
    {
        $owner = User::factory()->create();
        $other = User::factory()->create();
        $note = $owner->notes()->create(['title' => 'Asli', 'body' => 'Isi']);

        $this->actingAs($other)->patch(route('notes.update', $note), [
            'title' => 'Berubah', 'body' => 'Isi lain',
        ])->assertForbidden();

        $this->assertDatabaseHas('notes', ['id' => $note->id, 'title' => 'Asli']);
    }
}
// Siapkan route notes.update, controller, policy, relasi dan database test.
// Jalankan dari proyek latihan: php artisan test --filter=NoteAccessTest`,
        task: 'Selesaikan aplikasi catatan menggunakan materi sebelumnya. Siapkan database khusus test, tambahkan tes akun lain sesuai contoh, kemudian tes pemilik berhasil, masukan kosong, serta daftar pribadi. Simpan README berisi langkah instalasi dan cara menjalankan test tanpa menyentuh database utama.',
        quiz: { question: 'Mengapa assertForbidden sebaiknya disertai pemeriksaan isi database?', options: ['Untuk membuktikan request yang ditolak tidak tetap mengubah data', 'Agar route tidak perlu controller', 'Karena semua respons 403 pasti menghapus tabel'], answer: 0, explanation: 'Status respons dan dampak penyimpanan adalah dua hal yang berbeda. Tes sebaiknya memastikan data tetap utuh setelah penolakan.' },
        source: ['HTTP tests · Laravel 13', 'https://laravel.com/docs/13.x/http-tests'],
    },
];

export const laravelOrder = [
    'php-dasar', 'menyiapkan-laravel', 'request-dan-route', 'controller-dan-respons',
    'blade-dan-data', 'validasi-input', 'database-dan-migrasi', 'eloquent-dasar',
    'relasi-dan-kueri', 'auth-dan-policy', 'proyek-catatan-dan-tes', 'keamanan-dasar',
];
