# Deployment

Edisi aktif adalah aplikasi pribadi di browser. Server mengirim halaman dan aset; tidak menerima atau menyimpan progres/catatan. Gunakan origin HTTPS yang stabil karena localStorage terikat pada scheme, hostname, dan port. Pindah domain memerlukan ekspor/impor oleh pengguna.

## Container production

`Dockerfile` membangun frontend memakai lock file, memasang Composer tanpa dependensi development, dan menjalankan FrankenPHP/Caddy sebagai `www-data` pada port 8080. Container tidak memakai `artisan serve`, tidak menyertakan `.env`, database, atau kredensial dari mesin build.

```sh
docker build -t codeventure-production .
```

Siapkan file environment di luar repository, misalnya `production.env`:

```dotenv
APP_NAME=Codeventure
APP_ENV=production
APP_DEBUG=false
APP_URL=https://belajar.example.com
APP_KEY=base64:ISI_DENGAN_KEY_HASIL_GENERATE
LOG_CHANNEL=stderr
SESSION_DRIVER=file
SESSION_COOKIE=codeventure_session
SESSION_SECURE_COOKIE=true
CACHE_DRIVER=file
QUEUE_CONNECTION=sync
```

Buat key dengan PHP di mesin administrasi, simpan hasilnya dalam file environment yang hanya bisa dibaca operator, dan pertahankan key saat container diperbarui:

```sh
php -r 'echo "base64:".base64_encode(random_bytes(32)).PHP_EOL;'
docker run -d --name codeventure --restart unless-stopped \
  --env-file /path/di-luar-repo/production.env \
  -p 127.0.0.1:8080:8080 codeventure-production
```

Contoh domain di atas adalah placeholder konfigurasi, bukan alamat produk yang sudah diterbitkan. Letakkan container di belakang reverse proxy HTTPS. Port 8080 adalah HTTP internal; TLS dan HSTS pada koneksi publik perlu disediakan proxy. `/health` memberi status proses, bukan pemeriksaan database. Tidak perlu migrasi atau worker queue.

`Caddyfile` membatasi document root ke `/app/public`, mengompresi respons, dan memberi cache immutable pada aset build yang memiliki hash. PHP menyembunyikan detail error dan versi server. CSP membatasi script/style/koneksi ke origin sendiri; izin kamera, mikrofon, dan lokasi dimatikan. Uji ulang bila menambahkan domain CDN atau integrasi baru.

## Pembaruan dan pemulihan

### Runner latihan frontend

`/latihan-frame` adalah dokumen sandbox khusus untuk editor. Responsnya memakai `sandbox allow-scripts` tanpa `allow-same-origin`, menolak koneksi jaringan, dan membatasi sumber gambar ke data. Worker JavaScript dibuat dari blob di dalam frame, berjalan maksimal 1,5 detik, dan memakai kebijakan `unsafe-eval` hanya pada frame ini agar kode latihan bisa dieksekusi. Halaman aplikasi utama tetap menolak inline script dan eval. Reverse proxy harus mempertahankan CSP khusus route tersebut, bukan menggantinya dengan kebijakan umum. `/playground-runner.js` harus tersedia sebagai aset lokal.

Runner hanya untuk HTML/CSS dan JavaScript console, tanpa DOM JavaScript, localStorage, atau PHP. Draft editor tidak disimpan; progres tetap di browser dengan format data v1. Semua ID pelajaran lama tetap tersedia; perluasan kurikulum menjadi 60 pelajaran menambah penyebut persentase tanpa menghapus penyelesaian atau catatan lama. Contoh backend menggunakan proyek latihan terpisah dan tidak dijalankan oleh server produk.

1. Jalankan tes, audit, dan build dari lock file sebelum membuat image baru.
2. Uji image pada port internal terpisah, termasuk `/health` dan halaman utama.
3. Ganti container setelah sehat; pertahankan image sebelumnya untuk rollback.
4. Data belajar berada di browser pengguna. Backup server tidak menggantikan ekspor JSON pengguna.

Aplikasi ini bukan layanan akun bersama, bukan LMS dengan sertifikasi, dan tidak memiliki sinkronisasi cloud. Jika kelak dibutuhkan akun/kolaborasi, desain penyimpanan, otorisasi, dan kebijakan retensi perlu dikerjakan sebagai fitur baru.

Aset visual diwarisi dari repository pemilik. Provenance/lisensi komersial aset lama belum diverifikasi; periksa sebelum distribusi komersial. Audit dependensi yang bersih tidak membuktikan bahwa semua risiko aplikasi tidak ada.

Dokumentasi runtime: https://frankenphp.dev/docs/docker/ dan https://laravel.com/docs/13.x/deployment.
