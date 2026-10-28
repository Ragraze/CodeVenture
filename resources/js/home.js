import { paths } from "./courses.js";
import { escapeHTML as e } from "./common.js";

export function renderHome({ page, store, nextLesson, summary }) {
    const next = nextLesson();
    const completed = Object.keys(store.data.completed).length;
    const total = paths.reduce((sum, path) => sum + path.lessons.length, 0);
    const pathCards = paths
        .map((path, index) => {
            const count = path.lessons.filter(
                (lesson) => store.data.completed[`${path.id}/${lesson.id}`],
            ).length;
            return `<article class="landing-path">
            <div class="path-cover" data-subject="${path.symbol}"><span class="path-order">Jalur ${String(index + 1).padStart(2, "0")}</span><strong>${path.symbol}</strong><span>${path.category} · ${path.level}</span></div>
            <div class="path-copy"><div class="meta"><span>${path.lessons.length} pelajaran</span><span>± ${path.lessons.reduce((sum, lesson) => sum + lesson.minutes, 0)} menit baca</span></div>
                <h3><a href="/jalur/${path.id}">${path.title}</a></h3><p>${path.summary}</p>
                <div class="path-outcome"><span>Yang kamu bangun</span><p>${path.outcome}</p></div>
                <div class="path-card-actions"><a class="button primary" href="/jalur/${path.id}">Lihat jalur ${path.symbol}</a><span class="small muted">${count ? `${count} dari ${path.lessons.length} selesai` : "Bisa dipelajari tanpa akun"}</span></div>
            </div></article>`;
        })
        .join("");

    page(
        "Petualangan belajarmu",
        `
        <section class="landing-intro" aria-labelledby="landing-title">
            <div class="landing-intro-copy">
                ${store.data.name ? `<p class="personal-greeting">Selamat datang lagi, ${e(store.data.name)}.</p>` : ""}
                <h1 id="landing-title"><span class="hero-title-line">Dari nol,</span><span class="hero-title-line hero-title-accent">sampai bisa.</span></h1>
                <p>Pelajari HTML, CSS, JavaScript, dan Laravel dari dasar. Ikuti materi, coba latihan, dan lihat progres belajarmu.</p>
                <div class="actions"><a class="button primary" href="${store.data.lastLesson ? `/belajar/${next.key}` : "/jalur"}">${store.data.lastLesson ? "Lanjutkan petualangan" : "Pilih jalur belajarmu"}<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></a></div>
            </div>
        </section>
        <section class="landing-paths" aria-labelledby="paths-heading">
            <header class="landing-section-heading"><h2 id="paths-heading">Pilih jalur belajarmu.</h2></header>
            <div class="landing-path-grid">${pathCards}</div>
        </section>
        ${store.data.started.length ? `<section class="landing-workspace"><header class="landing-section-heading"><h2>Progres belajar</h2></header>${summary()}</section>` : `<section class="first-step"><div><h2>Langkah pertamamu<br>dimulai di sini.</h2><p>Mulai dari cara web bekerja, lalu pelajari satu konsep setiap kali. Progresmu mengikuti pelajaran yang sudah kamu selesaikan.</p><a class="button primary" href="/belajar/${paths[0].id}/${paths[0].lessons[0].id}">Buka pelajaran pertama</a></div><section class="first-step-map" aria-label="Progres belajarmu"><h3>Progres belajarmu</h3><div class="big-count">${completed}<small> / ${total} pelajaran</small></div><progress value="${completed}" max="${total}" aria-label="Progres belajar"></progress><p class="small muted">Selesaikan kuis dan tandai pelajaran selesai untuk mencatat progres.</p><a href="/progres">Lihat progres</a></section></section>`}
    `,
        "landing",
    );

}
