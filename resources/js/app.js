import { paths, allLessons } from "./courses.js";
import { renderHome } from "./home.js";
import { playgroundMarkup, bindPlayground } from './playground.js';
import { exerciseFor } from './exercises.js';
import {
    escapeHTML as e,
    normalize,
    shortDate,
    isRecord,
    boundedText,
    createStore,
    announce,
    setupChrome,
    themeControl,
    bindTheme,
    bindBackup,
    confirmAction,
    emptyState,
} from "./common.js";

const defaults = {
    name: "",
    completed: {},
    passed: [],
    notes: {},
    started: [],
    lastLesson: null,
    goal: 3,
    reading: "normal",
};
const lessonKeys = new Set(allLessons.map((lesson) => lesson.key));
const validDate = (value) =>
    typeof value === "string" &&
    value.length < 40 &&
    Number.isFinite(Date.parse(value));
function validate(data) {
    if (
        !isRecord(data) ||
        !isRecord(data.completed) ||
        !isRecord(data.notes) ||
        !Array.isArray(data.passed) ||
        !Array.isArray(data.started)
    )
        throw new Error(
            "Struktur cadangan belajar tidak valid. Data saat ini tetap aman.",
        );
    return {
        name: boundedText(data.name, 50),
        completed: Object.fromEntries(
            Object.entries(data.completed).filter(
                ([key, value]) => lessonKeys.has(key) && validDate(value),
            ),
        ),
        passed: [...new Set(data.passed.filter((key) => lessonKeys.has(key)))],
        notes: Object.fromEntries(
            Object.entries(data.notes)
                .filter(
                    ([key, value]) =>
                        lessonKeys.has(key) && typeof value === "string",
                )
                .map(([key, value]) => [key, value.slice(0, 4000)]),
        ),
        started: [
            ...new Set(
                data.started.filter((id) =>
                    paths.some((path) => path.id === id),
                ),
            ),
        ],
        lastLesson: lessonKeys.has(data.lastLesson) ? data.lastLesson : null,
        goal:
            Number.isInteger(data.goal) && data.goal >= 1 && data.goal <= 14
                ? data.goal
                : 3,
        reading: data.reading === "large" ? "large" : "normal",
    };
}
const store = createStore("codeventure", defaults, validate);
const main = document.querySelector("#main");
setupChrome("codeventure", store);
document.body.classList.toggle("text-large", store.data.reading === "large");
const isDone = (key) => Boolean(store.data.completed[key]);
const doneCount = (path) =>
    path.lessons.filter((lesson) => isDone(`${path.id}/${lesson.id}`)).length;
const minutes = (path) =>
    path.lessons.reduce((sum, lesson) => sum + lesson.minutes, 0);
const lessonURL = (key) => `/belajar/${key}`;
const firstPending = (path) =>
    path.lessons.find((lesson) => !isDone(`${path.id}/${lesson.id}`)) ||
    path.lessons[0];
function historyControls() {
    return `<nav class="page-navigation" aria-label="Riwayat halaman"><button type="button" data-history="back" aria-label="Kembali" title="Kembali"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M19 12H5m6-6-6 6 6 6"/></svg></button><button type="button" data-history="forward" aria-label="Maju" title="Maju"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></button></nav>`;
}
function updateHistoryControls() {
    const back = main.querySelector('[data-history="back"]');
    const forward = main.querySelector('[data-history="forward"]');
    const availability = window.navigation
        ? { back: window.navigation.canGoBack, forward: window.navigation.canGoForward }
        : legacyHistoryAvailability();
    if (back) back.disabled = !availability.back;
    if (forward) forward.disabled = !availability.forward;
}
function legacyHistoryAvailability() {
    try {
        const saved = JSON.parse(sessionStorage.getItem('codeventure-history-v1') || 'null');
        const state = isRecord(history.state) ? history.state : {};
        let index = state.codeventureEntry;
        let last = Number.isInteger(saved?.last) ? saved.last : 0;
        if (!Number.isInteger(index) || index < 0) {
            index = Number.isInteger(saved?.index) ? saved.index + 1 : 0;
            last = index;
            history.replaceState({ ...state, codeventureEntry: index }, '');
        }
        last = Math.max(last, index);
        sessionStorage.setItem('codeventure-history-v1', JSON.stringify({ index, last }));
        return { back: index > 0, forward: index < last };
    } catch {
        return { back: false, forward: false };
    }
}
if (!window.navigation) legacyHistoryAvailability();
window.addEventListener('pageshow', updateHistoryControls);
window.navigation?.addEventListener('currententrychange', updateHistoryControls);
const page = (title, body, className = "") => {
    document.title = `${title} · Codeventure`;
    main.innerHTML = `<div class="page-width page ${className}">${body}</div>`;
    main.querySelectorAll('.page-heading > .eyeline').forEach(label => label.remove());
    main.querySelector('.breadcrumb')?.remove();
    if (location.pathname !== '/') {
        main.firstElementChild.insertAdjacentHTML('afterbegin', historyControls());
        main.querySelectorAll('[data-history]').forEach(button => button.addEventListener('click', () => {
            if (button.dataset.history === 'back') history.back();
            else history.forward();
        }));
        updateHistoryControls();
    }
};
const nextLesson = () =>
    allLessons.find(
        (lesson) => lesson.key === store.data.lastLesson && !isDone(lesson.key),
    ) ||
    allLessons.find(
        (lesson) =>
            store.data.started.includes(lesson.pathId) && !isDone(lesson.key),
    ) ||
    allLessons.find((lesson) => !isDone(lesson.key)) ||
    allLessons[0];
function save(message) {
    const result = store.save();
    if (message)
        announce(
            result
                ? message
                : "Perubahan hanya tersimpan sementara. Ekspor cadangan sebelum menutup halaman.",
        );
    return result;
}
function weeklyCount() {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
    return Object.values(store.data.completed).filter(
        (date) => new Date(date) >= start,
    ).length;
}
function weekActivity() {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
    const key = (date) =>
        `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    const counts = new Map();
    Object.values(store.data.completed)
        .map((value) => new Date(value))
        .filter((date) => Number.isFinite(date.getTime()))
        .forEach((date) =>
            counts.set(key(date), (counts.get(key(date)) || 0) + 1),
        );
    return Array.from({ length: 7 }, (_, index) => {
        const date = new Date(start);
        date.setDate(start.getDate() + index);
        return { date, count: counts.get(key(date)) || 0 };
    });
}
function activityPanel() {
    const days = weekActivity();
    const activeDays = days.filter((day) => day.count).length;
    const max = Math.max(1, ...days.map((day) => day.count));
    const today = new Date().toDateString();
    const shortDay = new Intl.DateTimeFormat("id", { weekday: "short" });
    const longDay = new Intl.DateTimeFormat("id", {
        weekday: "long",
        day: "numeric",
        month: "long",
    });
    return `<section class="panel activity-panel"><div class="section-heading"><h2>Ritme tujuh hari</h2><span class="small muted">${activeDays} hari aktif</span></div><ol class="activity-days">${days
        .map((day) => {
            const isToday = day.date.toDateString() === today;
            const level = day.count ? Math.min(5, Math.ceil((day.count / max) * 5)) : 0;
            return `<li class="${day.count ? "has-activity" : ""} ${isToday ? "is-today" : ""}" aria-label="${longDay.format(day.date)}: ${day.count} pelajaran selesai"><span class="activity-bar" data-level="${level}" aria-hidden="true"></span><span class="activity-label" aria-hidden="true">${shortDay.format(day.date)}</span><span class="activity-count" aria-hidden="true">${day.count}</span></li>`;
        })
        .join("")}</ol><p class="small muted">Batang menunjukkan pelajaran yang kamu tandai selesai pada minggu ini.</p></section>`;
}
function track(path, compact = false) {
    const count = doneCount(path);
    const pending = firstPending(path);
    return `<article class="track"><div class="track-mark" aria-hidden="true">${path.symbol}</div><div><div class="meta"><span>${path.category}</span><span>${path.level}</span></div><${compact ? "h3" : "h2"}><a href="/jalur/${path.id}">${path.title}</a></${compact ? "h3" : "h2"}><p>${path.summary}</p><div class="meta"><span>${path.lessons.length} pelajaran</span><span>± ${minutes(path)} menit baca</span></div><div class="track-bottom"><a class="button ${count === path.lessons.length ? "" : "primary"}" href="${lessonURL(`${path.id}/${pending.id}`)}">${count === path.lessons.length ? "Ulangi materi" : store.data.started.includes(path.id) ? "Lanjutkan belajar" : "Mulai jalur ini"}</a><a href="/jalur/${path.id}">Lihat materi</a></div><div class="progress-label"><span>${count} dari ${path.lessons.length} selesai</span><span>${Math.round((count / path.lessons.length) * 100)}%</span></div><progress value="${count}" max="${path.lessons.length}" aria-label="Progres ${path.title}"></progress></div></article>`;
}
function summary() {
    const total = Object.keys(store.data.completed).length;
    const week = weeklyCount();
    return `<aside class="stack"><section class="panel"><h2>Jejak belajarmu</h2><div class="big-count">${total}<small> / ${allLessons.length} pelajaran</small></div><p class="muted">${total ? "Sedikit demi sedikit, pengetahuanmu bertambah." : "Belum mulai? Satu pelajaran singkat sudah cukup untuk hari ini."}</p><progress value="${total}" max="${allLessons.length}" aria-label="Total progres belajar"></progress><p class="small muted">${paths.length} jalur tersedia. Semua bisa dipelajari tanpa akun.</p><a href="/progres">Lihat progres lengkap</a></section><section class="panel"><h2>Target minggu ini</h2><p class="big-count">${week}<small> / ${store.data.goal} pelajaran</small></p><p class="muted small">Minggu dimulai hari Senin. Tentukan ritme yang bisa kamu jaga.</p><a href="/pengaturan">Atur target belajar</a></section></aside>`;
}
function home() {
    renderHome({ page, store, nextLesson, summary });
}
function catalog() {
    const query = new URLSearchParams(location.search);
    page(
        "Jalur belajar",
        `<header class="page-heading"><h1>Mulai dari yang ingin kamu bangun.</h1><p>Pilih satu jalur, ikuti urutannya, atau buka materi yang kamu perlukan. Waktu yang ditampilkan adalah perkiraan membaca, belum termasuk latihan.</p></header><form id="filters" class="filters" role="search"><div><label for="search">Cari materi</label><input id="search" type="search" name="q" placeholder="HTML, formulir, validasi…" value="${e(query.get("q") || "")}"></div><div><label for="category">Bidang</label><select id="category" name="category"><option value="">Semua bidang</option><option>Frontend</option><option>Backend</option></select></div><div><label for="level">Tingkat</label><select id="level" name="level"><option value="">Semua tingkat</option><option>Pemula</option><option>Menengah</option></select></div></form><div id="active-filters" class="active-filters" aria-label="Filter aktif"></div><div id="results"></div>`,
    );
    document.querySelector("#category").value = query.get("category") || "";
    document.querySelector("#level").value = query.get("level") || "";
    const form = document.querySelector("#filters");
    const update = () => {
        const q = normalize(form.elements.q.value);
        const found = paths.filter(
            (path) =>
                (!form.elements.category.value ||
                    path.category === form.elements.category.value) &&
                (!form.elements.level.value ||
                    path.level === form.elements.level.value) &&
                normalize(
                    `${path.title} ${path.summary} ${path.lessons.map((lesson) => lesson.title).join(" ")}`,
                ).includes(q),
        );
        document.querySelector("#results").innerHTML =
            `<p class="filter-count" role="status">${found.length} jalur ditemukan</p><div class="track-list">${found.length ? found.map((path) => track(path)).join("") : emptyState("Belum ada materi yang cocok", "Coba kata yang lebih singkat atau ubah pilihan bidang dan tingkat.", '<a class="button" href="/jalur">Hapus pencarian</a>')}</div>`;
        const params = new URLSearchParams(new FormData(form));
        for (const [key, value] of [...params]) if (!value) params.delete(key);
        const labels = {
            q: "Pencarian",
            category: "Bidang",
            level: "Tingkat",
        };
        const active = [...params];
        document.querySelector("#active-filters").innerHTML = active.length
            ? `<span class="filter-caption">Filter aktif</span>${active
                  .map(
                      ([key, value]) =>
                          `<button type="button" class="filter-chip" data-clear-filter="${key}" aria-label="Hapus filter ${labels[key]}: ${e(value)}">${labels[key]}: ${e(value)} <span aria-hidden="true">×</span></button>`,
                  )
                  .join("")}<button type="button" class="filter-clear" data-clear-all>Hapus semua</button>`
            : "";
        history.replaceState(
            history.state,
            "",
            `/jalur${params.size ? `?${params}` : ""}`,
        );
    };
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        update();
    });
    form.addEventListener("input", update);
    document
        .querySelector("#active-filters")
        .addEventListener("click", (event) => {
            const chip = event.target.closest(
                "[data-clear-filter], [data-clear-all]",
            );
            if (!chip) return;
            if (chip.hasAttribute("data-clear-all")) {
                form.elements.q.value = "";
                form.elements.category.value = "";
                form.elements.level.value = "";
            } else {
                form.elements[chip.dataset.clearFilter].value = "";
            }
            update();
            form.elements.q.focus();
        });
    document.addEventListener("keydown", (event) => {
        if (event.key !== "/" || event.ctrlKey || event.metaKey || event.altKey)
            return;
        if (
            ["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName) ||
            event.target.isContentEditable
        )
            return;
        event.preventDefault();
        form.elements.q.focus();
    });
    update();
}
function curriculum(path) {
    return `<ol class="curriculum">${path.lessons
        .map((lesson, index) => {
            const done = isDone(`${path.id}/${lesson.id}`);
            return `<li><a href="${lessonURL(`${path.id}/${lesson.id}`)}"><span class="chapter-number ${done ? "complete" : ""}" aria-label="${done ? "Selesai" : `Bab ${index + 1}`}">${done ? "✓" : index + 1}</span><span><strong>${lesson.title}</strong><small>± ${lesson.minutes} menit baca · latihan & kuis</small></span><span class="chapter-state">${done ? "Selesai" : "Buka"}</span></a></li>`;
        })
        .join("")}</ol>`;
}
function course(id) {
    const path = paths.find((path) => path.id === id);
    if (!path) return notFound();
    page(
        path.title,
        `<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/jalur">Jalur belajar</a><span>/</span><span>${path.title}</span></nav><div class="course-intro"><header><p class="eyeline">${path.category} · ${path.level}</p><h1>${path.title}</h1><p class="muted">${path.summary}</p><div class="meta"><span>${path.lessons.length} pelajaran</span><span>± ${minutes(path)} menit baca</span></div></header><section class="panel"><h2>Yang akan kamu buat</h2><p>${path.outcome}</p><p class="small muted">Latihan dikerjakan di editor milikmu. Materi dan kuis bisa langsung dipakai di sini.</p><a class="button primary" href="${lessonURL(`${path.id}/${firstPending(path).id}`)}">${doneCount(path) ? "Lanjutkan materi" : "Mulai belajar"}</a></section></div><section><div class="section-heading"><h2>Urutan pelajaran</h2><span class="muted small">${doneCount(path)} dari ${path.lessons.length} selesai</span></div>${curriculum(path)}</section>`,
    );
}
function reader(pathId, id) {
    const path = paths.find((path) => path.id === pathId);
    const lesson = path?.lessons.find((lesson) => lesson.id === id);
    if (!lesson) return notFound();
    const key = `${pathId}/${id}`;
    store.data.lastLesson = key;
    if (!store.data.started.includes(pathId)) store.data.started.push(pathId);
    save();
    const index = path.lessons.indexOf(lesson);
    const exercise = exerciseFor(path, lesson);
    page(
        lesson.title,
        `<progress class="reading-meter" id="reading-meter" value="0" max="100" aria-label="Progres membaca"></progress><nav class="breadcrumb" aria-label="Breadcrumb"><a href="/jalur">Jalur belajar</a><span>/</span><a href="/jalur/${path.id}">${path.title}</a></nav><div class="reader"><aside><details ${matchMedia("(min-width: 60rem)").matches ? "open" : ""}><summary>${path.title}</summary><nav aria-label="Daftar pelajaran">${path.lessons.map((item, i) => `<a href="${lessonURL(`${pathId}/${item.id}`)}" ${item.id === id ? 'aria-current="page"' : ""}>${i + 1}. ${item.title}${isDone(`${pathId}/${item.id}`) ? " · Selesai" : ""}</a>`).join("")}</nav></details></aside><article><p class="eyeline">Pelajaran ${index + 1} dari ${path.lessons.length} · ± ${lesson.minutes} menit baca</p><h1>${lesson.title}</h1><p class="lead">${lesson.intro}</p>${lesson.sections.map(([heading, text]) => `<section><h2>${heading}</h2><p>${text}</p></section>`).join("")}<section><h2>Contoh yang bisa dicoba</h2><div class="code-toolbar"><span>Contoh kode</span><button type="button" id="copy-code">Salin kode</button></div><pre tabindex="0" aria-label="Contoh kode"><code>${e(lesson.code)}</code></pre></section><section class="notice"><h2>Giliranmu mencoba</h2><p>${lesson.task}</p><p class="small muted">Kerjakan di editor atau console browser milikmu. Contoh kode di halaman ini tidak dieksekusi.</p></section><form id="quiz" class="quiz"><fieldset><legend>Cek pemahaman</legend><p>${lesson.quiz.question}</p>${lesson.quiz.options.map((option, i) => `<label><input type="radio" name="answer" value="${i}" required><span>${e(option)}</span></label>`).join("")}</fieldset><button type="submit">Periksa jawaban</button><div id="quiz-feedback" role="status" aria-live="polite"></div></form><section class="completion" id="completion"></section><section><h2>Catatan untuk dirimu</h2><form id="note-form"><label for="lesson-note">Apa yang ingin kamu ingat?</label><textarea id="lesson-note" maxlength="4000" placeholder="Tulis pemahaman, pertanyaan, atau hasil latihanmu…">${e(store.data.notes[key] || "")}</textarea><div class="actions"><button type="submit">Simpan catatan</button><span id="note-status" class="small muted" role="status">${store.data.notes[key] ? "Catatan tersimpan di perangkat ini." : "Maksimal 4.000 karakter."}</span></div></form></section><section><h2>Baca sumber aslinya</h2><p><a href="${lesson.source[1]}" target="_blank" rel="noopener noreferrer">${lesson.source[0]} (tab baru)</a></p></section><nav class="lesson-links" aria-label="Pindah pelajaran">${index > 0 ? `<a class="lesson-link" href="${lessonURL(`${pathId}/${path.lessons[index - 1].id}`)}"><span class="lesson-direction">← Pelajaran sebelumnya</span><span class="lesson-title">${path.lessons[index - 1].title}</span></a>` : `<a class="lesson-link" href="/jalur/${pathId}"><span class="lesson-direction">← Kembali ke jalur</span><span class="lesson-title">${path.title}</span></a>`}${index < path.lessons.length - 1 ? `<a class="lesson-link next" href="${lessonURL(`${pathId}/${path.lessons[index + 1].id}`)}"><span class="lesson-direction">Pelajaran berikutnya →</span><span class="lesson-title">${path.lessons[index + 1].title}</span></a>` : '<a class="lesson-link next" href="/progres"><span class="lesson-direction">Semua pelajaran dibaca</span><span class="lesson-title">Lihat progres belajarmu →</span></a>'}</nav></article></div>`,
    );
    if (exercise) {
        const section = document.createElement('div');
        section.innerHTML = playgroundMarkup('lesson-playground', exercise);
        document.querySelector('#quiz').before(section.firstElementChild);
        document.querySelector('.reader .notice p.small').textContent = exercise.mode === 'web'
            ? 'Coba tantangan pada editor di bawah. Preview hanya memuat HTML dan CSS; formulir tidak mengirim data.'
            : 'Coba logika JavaScript pada console di bawah. Contoh yang memerlukan DOM atau localStorage dikerjakan di file lokal.';
        bindPlayground('lesson-playground', exercise);
    }
    const meter = document.querySelector("#reading-meter");
    const article = document.querySelector(".reader article");
    if (meter && article) {
        const updateMeter = () => {
            const start = article.offsetTop - 120;
            const span = Math.max(article.offsetHeight - innerHeight + 240, 1);
            const read = Math.min(Math.max(scrollY - start, 0), span);
            meter.value = Math.round((read / span) * 100);
        };
        addEventListener("scroll", updateMeter, { passive: true });
        addEventListener("resize", updateMeter);
        updateMeter();
    }
    const updateCompletion = () => {
        document.querySelector("#completion").innerHTML = isDone(key)
            ? `<div class="notice success">Pelajaran selesai pada ${shortDate(store.data.completed[key])}. Kamu bisa membacanya kembali kapan saja.</div>`
            : store.data.passed.includes(key)
              ? '<p class="small muted">Kuis sudah benar. Setelah mencoba latihan, tandai pelajaran ini selesai.</p><button type="button" class="primary" id="complete-lesson">Tandai pelajaran selesai</button>'
              : '<p class="small muted">Jawab kuis dengan benar untuk menandai pelajaran selesai.</p>';
        document
            .querySelector("#complete-lesson")
            ?.addEventListener("click", () => {
                store.data.completed[key] = new Date().toISOString();
                save(
                    "Satu pelajaran selesai. Kerja bagus, lanjutkan sesuai ritmemu.",
                );
                updateCompletion();
            });
    };
    updateCompletion();
    document.querySelector("#quiz").addEventListener("submit", (event) => {
        event.preventDefault();
        const answer = Number(new FormData(event.currentTarget).get("answer"));
        const correct = answer === lesson.quiz.answer;
        if (correct && !store.data.passed.includes(key)) {
            store.data.passed.push(key);
            save();
        }
        document.querySelector("#quiz-feedback").innerHTML =
            `<p class="notice ${correct ? "success" : "error"}">${correct ? "Jawabanmu benar." : "Belum tepat. Baca penjelasannya, lalu coba lagi."} ${lesson.quiz.explanation}</p>`;
        updateCompletion();
    });
    document.querySelector("#copy-code").addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(lesson.code);
            announce("Kode disalin. Tempel di editormu untuk mencoba.");
        } catch {
            announce(
                "Browser membatasi salin otomatis. Pilih teks kode lalu salin secara manual.",
            );
        }
    });
    let noteTimer;
    const saveNote = () => {
        clearTimeout(noteTimer);
        const text = document.querySelector("#lesson-note").value;
        if (text.trim()) store.data.notes[key] = text;
        else delete store.data.notes[key];
        const saved = save();
        document.querySelector("#note-status").textContent = saved
            ? "Catatan tersimpan di perangkat ini."
            : "Catatan sementara. Ekspor cadangan sebelum menutup halaman.";
    };
    document.querySelector("#note-form").addEventListener("submit", (event) => {
        event.preventDefault();
        saveNote();
    });
    document.querySelector("#lesson-note").addEventListener("input", () => {
        document.querySelector("#note-status").textContent = "Menyimpan…";
        clearTimeout(noteTimer);
        noteTimer = setTimeout(saveNote, 500);
    });
    window.addEventListener("pagehide", saveNote, { once: true });
}
function progressPage() {
    const completed = Object.keys(store.data.completed).length;
    page(
        "Progres belajar",
        `<header class="page-heading"><p class="eyeline">Jejak langkahmu</p><h1>Yang sudah kamu pelajari.</h1><p>Progres dihitung dari pelajaran yang kuisnya sudah benar dan kamu tandai selesai. Tersimpan di browser ini.</p></header><div class="course-intro"><section class="panel"><h2>Keseluruhan</h2><p class="big-count">${completed}<small> / ${allLessons.length} pelajaran</small></p><progress value="${completed}" max="${allLessons.length}" aria-label="Progres keseluruhan"></progress><p class="muted">${paths.filter((path) => doneCount(path) === path.lessons.length).length} dari ${paths.length} jalur selesai.</p></section><section class="panel"><h2>Minggu ini</h2><p class="big-count">${weeklyCount()}<small> / ${store.data.goal} target pelajaran</small></p><a href="/pengaturan">Sesuaikan target</a></section></div>${
            completed || store.data.started.length ? activityPanel() : ""
        }${
            completed || store.data.started.length
                ? `<div class="section-heading"><h2>Jalur yang kamu mulai</h2><span class="small muted">${paths.filter((path) => store.data.started.includes(path.id)).length} jalur</span></div><div class="track-list">${paths
                      .filter((path) => store.data.started.includes(path.id))
                      .map((path) => track(path))
                      .join("")}</div>`
                : emptyState(
                      "Halaman pertama masih menunggu",
                      "Pilih satu jalur dan buka pelajaran pertamamu. Progres akan mulai tercatat dari sana.",
                      '<a class="button primary" href="/jalur">Pilih jalur belajar</a>',
                  )
        }`,
    );
}
function notesPage() {
    const notes = allLessons.filter((lesson) =>
        store.data.notes[lesson.key]?.trim(),
    );
    page(
        "Catatan belajar",
        `<header class="page-heading"><p class="eyeline">Buku kerja pribadi</p><h1>Pemahamanmu, dengan bahasamu.</h1><p>Catatan dari setiap pelajaran terkumpul di sini. Ekspor cadangan lewat pengaturan untuk memindahkannya ke perangkat lain.</p></header>${notes.length ? `<label for="note-search">Cari catatan</label><input id="note-search" type="search" placeholder="Judul atau isi catatan…"><p class="filter-count" id="note-count" role="status"></p><div id="note-results" class="notes-list"></div>` : emptyState("Belum ada catatan", "Tulis hal yang ingin kamu ingat pada bagian akhir setiap pelajaran.", '<a class="button primary" href="/jalur">Buka materi belajar</a>')}`,
    );
    if (!notes.length) return;
    const update = () => {
        const q = normalize(document.querySelector("#note-search").value);
        const found = notes.filter((lesson) =>
            normalize(
                `${lesson.title} ${store.data.notes[lesson.key]}`,
            ).includes(q),
        );
        document.querySelector("#note-count").textContent =
            `${found.length} catatan ditemukan`;
        document.querySelector("#note-results").innerHTML = found.length
            ? found
                  .map(
                      (lesson) =>
                          `<article class="note-card"><span class="muted small">${lesson.pathTitle}</span><h2><a href="${lessonURL(lesson.key)}">${lesson.title}</a></h2><p>${e(store.data.notes[lesson.key])}</p><a class="button" href="${lessonURL(lesson.key)}">Edit di pelajaran</a></article>`,
                  )
                  .join("")
            : emptyState(
                  "Catatan tidak ditemukan",
                  "Coba kata lain yang pernah kamu tulis.",
              );
    };
    document.querySelector("#note-search").addEventListener("input", update);
    update();
}
function settings() {
    page(
        "Pengaturan",
        `<header class="page-heading"><h1>Belajar dengan caramu.</h1><p>Atur tampilan dan ritme belajar. Tidak perlu akun; nama panggilan dan progres tetap berada di browser ini.</p></header><div class="settings-grid"><section class="panel"><h2>Ritme belajar</h2><form id="preferences"><div class="field"><label for="name">Nama panggilan (opsional)</label><input id="name" maxlength="50" autocomplete="nickname" value="${e(store.data.name)}"></div><div class="field"><label for="goal">Target pelajaran per minggu</label><input id="goal" type="number" min="1" max="14" step="1" required value="${store.data.goal}"></div><button class="primary" type="submit">Simpan pengaturan</button><p id="preference-status" role="status" class="small muted"></p></form></section><section class="panel"><h2>Kenyamanan membaca</h2><div class="field">${themeControl()}</div><div class="field"><label for="reading-size">Ukuran teks materi</label><select id="reading-size"><option value="normal">Standar</option><option value="large">Lebih besar</option></select></div><p class="small">Tema terang menjadi bawaan. Kamu bisa memilih tema gelap atau mengikuti perangkat; pilihan diterapkan di semua halaman.</p></section><section class="panel wide"><h2>Cadangan milikmu</h2><p>Progres, hasil kuis, catatan, dan pengaturan bisa dipindahkan melalui file JSON. Simpan cadangan sebelum menghapus data browser. Impor mengganti data saat ini.</p><button type="button" data-export>Ekspor cadangan</button><label for="import-data" class="import-label">Impor cadangan Codeventure (.json, maksimal 1 MB)</label><input id="import-data" type="file" accept="application/json,.json"><p id="import-result" role="status" aria-live="polite"></p></section><section class="panel wide"><h2>Mulai ulang</h2><p>Hapus progres, hasil kuis, dan semua catatan dari browser ini. Materi belajar tetap tersedia.</p><button class="danger" type="button" id="reset-data">Hapus data belajar</button></section></div>`,
    );
    bindTheme("codeventure");
    document.querySelector("#reading-size").value = store.data.reading;
    document
        .querySelector("#reading-size")
        .addEventListener("change", (event) => {
            store.data.reading = event.target.value;
            document.body.classList.toggle(
                "text-large",
                store.data.reading === "large",
            );
            save("Ukuran teks diperbarui.");
        });
    document
        .querySelector("#preferences")
        .addEventListener("submit", (event) => {
            event.preventDefault();
            store.data.name = document.querySelector("#name").value.trim();
            store.data.goal = Number(document.querySelector("#goal").value);
            const saved = save();
            document.querySelector("#preference-status").textContent = saved
                ? "Pengaturan tersimpan."
                : "Pengaturan berubah untuk sesi ini. Penyimpanan dibatasi.";
        });
    bindBackup(store, () => {
        document.querySelector("#name").value = store.data.name;
        document.querySelector("#goal").value = store.data.goal;
        document.querySelector("#reading-size").value = store.data.reading;
        document.body.classList.toggle(
            "text-large",
            store.data.reading === "large",
        );
    });
    document
        .querySelector("#reset-data")
        .addEventListener("click", async () => {
            if (
                await confirmAction(
                    "Hapus semua data belajar?",
                    "Progres, hasil kuis, dan catatan akan dihapus dari browser ini. Ekspor cadangan terlebih dahulu jika ingin menyimpannya.",
                )
            ) {
                if (store.reset()) {
                    settings();
                    announce(
                        "Data belajar dihapus. Kamu bisa mulai lagi kapan saja.",
                    );
                }
            }
        });
}
function privacy() {
    page(
        "Data & privasi",
        `<div class="prose"><h1>Ruang belajar yang kamu pegang sendiri.</h1><p>Codeventure ini berjalan tanpa akun dan tanpa database aplikasi di server. Materi dikirim sebagai bagian dari aplikasi; data belajarmu disimpan melalui localStorage di browser.</p><h2>Apa yang tersimpan?</h2><p>Nama panggilan opsional, pelajaran yang dibuka dan diselesaikan, jawaban kuis yang lulus, catatan, target mingguan, serta pilihan tampilan.</p><h2>Di mana data itu berada?</h2><p>Hanya pada browser dan alamat situs yang sedang kamu pakai. Data tidak otomatis muncul di perangkat lain. Mode privat, kebijakan browser, atau penghapusan data situs bisa menghilangkannya.</p><h2>Bagaimana memindahkan atau menghapusnya?</h2><p>Buka pengaturan untuk mengunduh cadangan JSON, mengimpor cadangan, atau menghapus data belajar. File cadangan berisi catatan pribadimu; bagikan hanya jika kamu memang ingin membagikannya.</p><h2>Tentang materi</h2><p>Materi pengantar disusun untuk aplikasi ini dan menautkan dokumentasi resmi pada setiap pelajaran. Estimasi menit adalah perkiraan waktu baca, bukan hasil pengukuran kemampuan. Kuis menunjukkan pemahaman konsep di aplikasi, bukan sertifikasi profesional.</p><h2>Jejak kunjungan</h2><p>Aplikasi tidak memasang analytics, iklan, atau pelacak pihak ketiga. Penyedia hosting dapat menyimpan log HTTP seperti alamat IP dan waktu akses sesuai konfigurasinya. Membuka rujukan eksternal mengikuti kebijakan situs tujuan.</p><a class="button" href="/pengaturan">Kelola data belajar</a></div>`,
    );
}
function notFound() {
    page(
        "Materi tidak ditemukan",
        emptyState(
            "Halaman ini belum ada di peta.",
            "Tautannya mungkin sudah berubah. Pilih materi yang tersedia di katalog.",
            '<a class="button primary" href="/jalur">Kembali ke jalur belajar</a>',
        ),
    );
}
try {
    const segments = location.pathname.split("/").filter(Boolean);
    if (!segments.length) home();
    else if (segments[0] === "jalur" && !segments[1]) catalog();
    else if (segments[0] === "jalur") course(segments[1]);
    else if (segments[0] === "belajar") reader(segments[1], segments[2]);
    else if (segments[0] === "progres") progressPage();
    else if (segments[0] === "catatan") notesPage();
    else if (segments[0] === "pengaturan") settings();
    else if (segments[0] === "privasi") privacy();
    else notFound();
} catch (error) {
    console.error(error);
    page(
        "Tidak bisa membuka halaman",
        emptyState(
            "Ruang belajar belum bisa dibuka.",
            "Muat ulang halaman. Jika masalah berulang, kelola atau pulihkan cadangan melalui pengaturan.",
            '<a class="button" href="/">Muat ulang beranda</a> <a class="button" href="/pengaturan">Pengaturan data</a>',
        ),
    );
}
