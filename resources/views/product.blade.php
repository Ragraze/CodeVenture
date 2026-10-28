<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Belajar pengembangan web melalui materi singkat, latihan, dan kuis. Simpan progres dan catatan di perangkatmu bersama Codeventure.">
    <meta name="theme-color" content="#eef1f5">
    <title>Codeventure · Ruang belajarmu</title>
    <link rel="icon" href="/assets/Resources/codeventure-mark.svg" type="image/svg+xml">
    <script src="/appearance.js"></script>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>
    <a class="skip-link" href="#main">Lewati ke konten</a>
    <header class="site-header"><div class="header-inner">
        <a class="wordmark" href="/" aria-label="Codeventure, beranda"><img class="brand-mark" src="/assets/Resources/codeventure-mark.svg" width="44" height="44" alt="">Codeventure</a>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="main-nav">Menu</button>
        <nav id="main-nav" aria-label="Navigasi utama"><a href="/">Beranda</a><a href="/jalur">Jalur belajar</a><a href="/progres">Progres</a><a href="/catatan">Catatan</a><a href="/pengaturan">Pengaturan</a>
            <div class="theme-switch" role="group" aria-label="Tema halaman">
                <button type="button" data-theme-choice="light" aria-label="Tema terang" title="Terang" aria-pressed="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg></button>
                <button type="button" data-theme-choice="dark" aria-label="Tema gelap" title="Gelap" aria-pressed="false"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.5 14A9 9 0 0 1 10 3.5 9 9 0 1 0 20.5 14Z"/></svg></button>
                <button type="button" data-theme-choice="system" aria-label="Ikuti perangkat" title="Ikuti perangkat" aria-pressed="false"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4"/></svg></button>
            </div>
        </nav>
    </div></header>
    <main id="main" tabindex="-1"><div class="initial-state" role="status">Menyiapkan ruang belajar…</div></main>
    <noscript><div class="page-width notice">Aktifkan JavaScript untuk membuka materi dan menyimpan progres. Data belajarmu disimpan di browser, tanpa akun.</div></noscript>
    <footer class="site-footer"><div class="page-width"><span>Codeventure</span><a href="/privasi">Data & privasi</a></div></footer>
    <a class="github-float" href="https://github.com/Ragraze/codeventure" target="_blank" rel="noopener noreferrer" aria-label="Lihat kode di GitHub (tab baru)">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.93.1-.73.39-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.56 0-1.23.44-2.23 1.16-3.02-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.1 1.15a10.8 10.8 0 0 1 5.63 0c2.15-1.46 3.09-1.15 3.09-1.15.61 1.55.23 2.7.11 2.98.72.79 1.16 1.79 1.16 3.02 0 4.32-2.63 5.27-5.14 5.55.4.35.76 1.03.76 2.08v3.1c0 .3.2.65.77.54A11.25 11.25 0 0 0 12 .75Z"/></svg>
        <span>GitHub</span>
    </a>
    <div id="announcement" class="toast" role="status" aria-live="polite" aria-atomic="true"></div>
    <div id="storage-warning" class="storage-warning" role="alert" hidden></div>
    <dialog id="confirm-dialog" aria-labelledby="dialog-title"><h2 id="dialog-title"></h2><p id="dialog-message"></p><div class="actions"><button type="button" data-dialog="cancel">Batal</button><button type="button" class="danger" data-dialog="confirm">Hapus</button></div></dialog>
</body>
</html>
