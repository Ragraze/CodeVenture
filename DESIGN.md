---
name: Codeventure
description: White neumorphic learning surfaces with a dot grid and an interactive hero.
colors:
  bg: "#eef1f5"
  surface: "#eef1f5"
  soft: "#e6ebf1"
  ink: "#233044"
  muted: "#536176"
  line: "#e3e6ea"
  control: "#788598"
  accent: "#233044"
  accent-ink: "#ffffff"
  link: "#233044"
  focus: "#12598f"
  error: "#a12828"
  success: "#22643d"
  neo-light: "#ffffff"
  neo-shade: "#cbd2dd"
  dot: "#b9c4d3"
  dark-bg: "#101820"
  dark-surface: "#1b2630"
  dark-soft: "#24333e"
  dark-ink: "#f8f9fa"
  dark-muted: "#b8c3cc"
  dark-line: "#52667a"
  dark-control: "#8b9eae"
  dark-accent: "#e0e7ef"
  dark-accent-ink: "#14233c"
  dark-link: "#e0e7ef"
  dark-focus: "#f2c94c"
  dark-error: "#ffb5ae"
  dark-success: "#a8d9b5"
  dark-neo-light: "#293847"
  dark-neo-shade: "#0c131a"
  dark-dot: "#364858"
typography:
  display:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 5.25vw, 4.7rem)"
    fontWeight: 750
    lineHeight: 1.11
    letterSpacing: "-0.04em"
  body:
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "1rem"
    lineHeight: 1.6
  caption:
    fontSize: "0.8125rem"
rounded:
  control: "10px"
  hero-action: "12px"
  panel: "16px"
  hero-mobile: "18px"
  inset-section: "20px"
  hero: "24px"
spacing:
  control-gap: "0.5rem"
  editor-padding: "0.85rem"
  mobile-hero-padding: "1rem"
  hero-padding: "1.4rem"
  section-gap: "3rem"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.hero-action}"
    height: "52px"
    padding: "0.65rem 1.15rem"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
  panel:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.panel}"
---

# Design System: Codeventure

## Overview

Latest owner refinement: no shadows, neutral links and actions, and no persistent link underlines. The hero is one centered column sized to the viewport with “Dari nol, sampai bisa.” and a concise description. Its second column, preview list, and next-lesson CTA have been removed. Progress replaces the old HTML 1/2/3 list; the returning-user section is titled “Progres belajar”. Practice and quizzes live only on learning pages. Navigation starts with Beranda, then Jalur belajar. The sticky header is transparent at the top and solid after scroll. Two 44px circular history buttons replace breadcrumbs on inner pages. A new original SVG code mark replaces the globe in the navbar and favicon. GitHub uses #111111 with white text. Cards match the background tone; the sandbox canvas is transparent by default. Heading kickers on catalog, progress, and notes are removed. Arrival motion preserves full opacity. These latest owner choices supersede the historical descriptions below.

**Creative North Star: "White neumorphic learning desk"**

The owner's latest direction is white neumorphism, a dot grid, and a luxurious hero. Soft raised surfaces and recessed editing areas frame a working learning tool; oversized Manrope headings give the opening its emphasis. This section supersedes the historical notes below wherever they conflict.

This is a source-derived record of the implemented system on 28 October 2026, not a browser verification or a review verdict. The authoritative sources are resources/css/neumorphic.css, resources/css/app.css, resources/css/home.css, resources/js/home.js, resources/js/playground.js, and resources/js/common.js.

**Key Characteristics:**
- White and cool gray surfaces without shadows.
- A regular dot grid and blue action accents.
- A live code editor below the centered opening message on every screen.

## Colors

Primary actions use accent and accent-ink; inline emphasis and links use link. Background and surface share the same light value so shadows describe depth; soft separates hover and supporting regions. Ink and muted carry the reading hierarchy. Control, focus, error, and success retain distinct functional roles.

The dark-prefixed frontmatter records the actual dark-theme overrides, selected through the root data-theme attribute. Depth highlights and grid dots change with the theme. Light is the default; stored dark or system preferences remain supported.

**The Theme Pair Rule.** Apply surface, text, dot, and shadow colors from the same active theme.

## Typography

Manrope is used for headings and the wordmark; body text and controls retain the system font stack. Code uses the existing ui-monospace/SFMono-Regular/Consolas stack. The self-hosted variable font supports weights 200–800 with font-display swap. Font provenance: google/fonts, main/ofl/manrope; local files public/fonts/manrope-variable.ttf and public/fonts/Manrope-OFL.txt retain the SIL Open Font License. No external font API is required.

Hero headings use the display token, balanced wrapping, and two deliberate lines with the second line in link color. Supporting hero copy uses 1.05rem, line-height 1.8, and a 43ch maximum. Below 62rem the title becomes clamp(2.1rem, 7.6vw, 4.2rem); below 38rem it becomes clamp(2rem, 9.1vw, 3.1rem), with 1rem supporting copy at 1.75 line-height. Landing captions and editor text use the caption token.

## Layout

Landing content and header use min(1280px, calc(100% - 40px)); general content uses a 1180px cap. The body grid is radial-gradient(circle, var(--dot) 0.7px, transparent 0.8px), tiled at 24px by 24px. The hero background is transparent so this grid remains visible.

The hero uses one centered column with a 2rem gap and a maximum editor width of 900px. Desktop block padding is 2.25rem/3rem. The optional learning-loop list is hidden. HTML and CSS fields inside the editor become two columns at 38rem. The path explorer starts 3rem below the hero, reducing to 2rem below 38rem.

The sticky header reserves a transparent 1px bottom border and reveals its line color only after scrollY exceeds 8px. Focus targets reserve a 7rem scroll offset; the hero editor uses 6.5rem. On narrow screens, the GitHub control is 44px square, icon-only, with safe-area-aware positioning and a 14px radius. It is hidden while a playground contains focus; storage recovery warnings also hide it.

## Elevation & Depth

All shadow tokens resolve to none. Panels use line-color borders; editor fields use control-color borders. Actions and navigation communicate state through color and focus outlines.

**The Tactile Hierarchy Rule.** Raise containers and resting secondary actions; recess editing fields, selected tabs, and pressed secondary actions.

Higher contrast or forced colors replaces the specified raised panels, editor textareas, and buttons with 1px control borders and removes their shadows. Print removes the body grid and selected panel shadows.

## Shapes

Panels use the panel radius; the hero editor uses the hero radius, reducing to hero-mobile on narrow screens. Recessed sections use inset-section. Editor controls and navigation use control; hero actions and preview frames use hero-action. Keep radius tied to the component rather than applying one universal curve.

## Components

Primary hero actions are at least 52px high. General buttons retain a 44px minimum target and inputs a 46px minimum height. Visible focus uses a 3px focus outline with a 4px offset. Secondary actions use small raised shadows, soft hover backgrounds, and inset active shadows. Navigation hover and current-page states use recessed shadows; the current page also retains its textual indication.

The hero editor contains editable HTML/CSS and JavaScript modes, explicit run/reset controls, an isolated preview iframe, and a console. Source code binds execution and Ctrl/Cmd+Enter, confirms reset, and reports status beside the editor. The preview is a white output canvas even in dark mode. Use the local runner and existing event flow; this interaction requires no external API. This documents source behavior and does not certify runtime results.

Buttons transition background over 180ms ease-out. The header border uses 160ms ease-out. Only under prefers-reduced-motion: no-preference, headline lines enter over 650ms (second line delayed 80ms) and the hero editor over 750ms, using cubic-bezier(0.16, 1, 0.3, 1) and a 12px vertical offset at full opacity. Reduced motion disables animations, transitions, and smooth scrolling.

## Do's and Don'ts

### Do:
- Do preserve theme-aware text, focus indicators, and native editing controls.
- Do keep the dot grid behind transparent hero space and the editor visibly functional.
- Do preserve reduced-motion, high-contrast, safe-area, and mobile focus behavior.

### Don't:
- Don't restore the historical yellow/red palette or photo hero as the current direction.
- Don't use shadows as the only focus or high-contrast boundary.
- Don't introduce an external font or execution API for this system.

---

# Historical design notes

The following notes are preserved as history. The current system above takes precedence.

# Codeventure

## Hero dan materi interaktif

Hero menggabungkan pengantar dan urutan Pahami/Praktikkan/Bangun di kiri dengan editor yang bisa dicoba di kanan. Pratinjau jalur dipindah ke bagian berikutnya agar hero berfokus pada tindakan belajar nyata. Konten bertambah menjadi 18 pelajaran dan tiga proyek; 15 pelajaran frontend menyediakan tantangan, hasil pemeriksaan, dan petunjuk. Tema putih, tipografi, navbar sticky, target sentuh, dan spacing rapat tetap digunakan. Editor monospace digunakan untuk kode nyata, tanpa animasi dekoratif atau aset tambahan.

Preview HTML/CSS tetap berlatar putih sebagai kanvas hasil kode pengguna, termasuk saat aplikasi bertema gelap. JavaScript menggunakan console terpisah tanpa DOM atau storage. Area hasil diberi judul, status memakai live region, reset meminta konfirmasi, dan Ctrl/Cmd+Enter menjalankan kode. Tidak ada editor pihak ketiga atau dependensi baru. Draft bersifat sementara dan diberi keterangan di editor.

## Tema putih lembut, 28 Oktober 2026

Penyempurnaan kepadatan: jeda antarbagian 28–48px, padding konten 20–36px, dan kartu 20px. Ukuran dasar 16px, judul hero 34–54px, judul bagian 26–34px dengan bobot 650 dan balanced wrapping; paragraf mempertahankan line-height 1.6–1.65. Navbar sticky memakai garis transparan dengan ukuran tetap, lalu memperlihatkan garis setelah scroll melebihi 8px agar tidak terjadi pergeseran layout. Offset fokus dan sidebar pembaca memperhitungkan navbar.

Arahan terbaru pemilik mengganti dominasi kuning/merah dengan putih lembut. ENERGY 1 / RHYTHM 2 / MOTION 1. Latar putih, panel #f5f6f7, garis #e3e6ea, teks arang, dan aksen biru redup mendukung membaca lama. Hero memakai bidang netral agar tidak mendominasi materi. Logo dan struktur belajar dipertahankan. Keputusan palet lama di bawah menjadi catatan historis.

Tema terang menjadi bawaan baru; pilihan gelap/sistem yang tersimpan tetap berlaku. Tombol GitHub berlabel dan ikon merek menuju remote repository, tetap di kanan bawah dengan safe-area dan target sentuh 48px. Footer menyediakan ruang akhir; toast berada di atas tombol, dan peringatan storage menyembunyikan tombol agar pemulihan data diprioritaskan. Bayangan lembut hanya memberi kedalaman pada tautan mengambang. Tidak ada dependensi baru.

Design Read: landing page petualangan belajar kode untuk pemula Indonesia, dilanjutkan ruang baca terstruktur. ENERGY 2 / RHYTHM 2 / MOTION 1. Pemilik meminta tema/palet dicek ulang di GitHub, logo cukup di-clip, dan home dibuat lebih lengkap sambil mempertahankan konsep awal.

## Acuan GitHub yang diperiksa ulang

Branch `main`, commit `79b0c6dbe0bb7214b6325e1a43fd170f17f2572c`, diperiksa melalui GitHub API. Sumber:

- [Home asli](https://github.com/Ragraze/codeventure/blob/main/resources/views/index.blade.php): foto banner kode, tagline “Adventure in Every Line of Code”, bagian Learning Path kuning, tombol Pelajari merah.
- [Layout asli](https://github.com/Ragraze/codeventure/blob/main/resources/views/layouts/main.blade.php): navigasi `bg-warning`, logo globe, serta aset Bootstrap 5.3.2.
- [Bootstrap asli](https://github.com/Ragraze/codeventure/blob/main/public/assets/bootstrap-5.3.2-dist/css/bootstrap.css): `--bs-warning: #ffc107`, `--bs-danger: #dc3545`.

## Keputusan visual dan fungsional

- Kuning #ffc107 dan merah #dc3545 menggantikan pendekatan palet sebelumnya yang terlalu redup. Kuning menjadi navigasi, jalur utama, serta callout belajar; merah adalah tindakan mengikuti pola repo asli.
- Teks #212529 pada kuning berkontras 9.46:1; putih pada merah berkontras 4.53:1. Teks sekunder #495057 pada #f8f9fa berkontras 7.76:1. Pemakaian warna mempertahankan keterbacaan, termasuk pilihan gelap.
- Logo PNG asli tetap utuh. Wrapper overflow-hidden dan clip-path lingkaran menghilangkan sudut putih; logo tidak digambar ulang.
- Foto kode asli menjadi latar pembuka dengan scrim navy untuk menjaga kontras. Tagline asli kembali hadir sebagai pengantar merek, tanpa metrik/testimoni buatan.
- Panel tujuan belajar benar-benar bisa berpindah antara HTML, CSS, JS, PHP. Nomor bab menunjukkan urutan materi nyata, dan status selesai memakai progres pengguna.
- Kartu jalur menampilkan hasil karya yang akan dibuat, jumlah pelajaran, dan estimasi membaca. Ukuran konsisten membantu membandingkan empat jalur yang tersedia.
- Cuplikan HTML dan kuis di home berfungsi sebagai sampel materi, bukan terminal palsu atau simulasi produk. Jawaban contoh tidak menambah progres belajar.
- Bagian terakhir memakai urutan pelajaran nyata untuk pengguna baru; pengguna yang sudah mulai mendapat ringkasan dan tautan melanjutkan belajar.
- System-ui dipakai untuk baca/kontrol. Monospace terbatas pada kode yang dapat dipelajari. Akronim HTML/CSS/JS/PHP merupakan nama bidang, bukan dekorasi terminal.
- Spasi memakai ukuran relatif untuk membedakan pengantar, katalog, contoh, dan tindakan berikutnya. Tombol minimal 44px; kartu dan input mempunyai radius berbeda. Bayangan hanya pada dialog.
- Tidak ada animasi masuk, glow, glass, atau parallax. Transisi singkat memberi feedback hover/status; reduced-motion dihormati.

Regular: [nav kuning + logo clip] [foto kode + pengantar | peta bab interaktif] [tautan bidang] [kartu jalur 2 kolom] [contoh kode | kuis] [langkah pertama / progres] [data pribadi]. Compact: susunan satu kolom, pratinjau jalur bertab dua kolom kontrol, semua materi dan tindakan tetap tersedia.

Apple HIG dipakai sebagai prinsip web: branding.md › Best practices menempatkan warna merek untuk tindakan/isi dan mempertahankan kontrol yang familier; color.md untuk kontras antar tema; feedback.md untuk status dekat tindakan. Referensi aksesibilitas, layout, typography, buttons, entering-data, searching, dan cross-platform yang sudah dibaca tetap digunakan.

## Pembaruan UX 28 Oktober 2026

- Katalog menambahkan ringkasan filter aktif dalam bentuk chip yang bisa dilepas satu per satu, tombol hapus semua, dan pintasan `/` untuk memfokuskan pencarian. URL tetap menjadi sumber kebenaran filter sehingga muat ulang dan tombol kembali bekerja seperti sebelumnya.
- Halaman baca menambahkan meter progres baca tipis di atas viewport serta navigasi pelajaran sebelumnya/berikutnya yang menyertakan judul materi. Meter memakai elemen `progress` native karena CSP menolak atribut style inline; nilainya diperbarui dari posisi gulir.
- Halaman progres menampilkan ritme tujuh hari dari tanggal pelajaran selesai, dengan penanda hari ini dan hitungan per hari. Panel hanya muncul setelah pengguna mulai belajar, sehingga keadaan kosong tetap menjelaskan langkah pertama.
- Tidak ada perubahan palet, logo, foto, atau struktur navigasi. Semua tambahan memakai token, radius, dan pola tombol yang sudah ada.

Current navbar theme controls: three icon-only 44px buttons beside Pengaturan (sun, moon, monitor), with accessible labels and aria-pressed state. Selection persists and stays synchronized with the settings selector; system mode responds to OS changes.
