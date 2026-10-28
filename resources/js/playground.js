import { escapeHTML as e, confirmAction } from './common.js';

export function playgroundMarkup(id, exercise) {
    return `<section id="${id}" class="playground" aria-label="Editor latihan interaktif">
        <div class="playground-heading"><h2>Praktik langsung</h2><span>Di browsermu</span></div>
        <label for="${id}-mode">Mode latihan</label><select id="${id}-mode" class="playground-mode" disabled><option value="web" ${exercise.mode === 'web' ? 'selected' : ''}>HTML + CSS · Preview</option><option value="javascript" ${exercise.mode === 'javascript' ? 'selected' : ''}>JavaScript · Console</option></select>
        ${exercise.prompt ? `<p class="playground-prompt">${e(exercise.prompt)}</p>` : ''}
        <div class="playground-editors"><div class="playground-web"><label for="${id}-html">HTML</label><textarea id="${id}-html" class="editor-html" spellcheck="false" autocapitalize="off" autocomplete="off">${e(exercise.html || '')}</textarea><label for="${id}-css">CSS</label><textarea id="${id}-css" class="editor-css" spellcheck="false" autocapitalize="off" autocomplete="off">${e(exercise.css || '')}</textarea></div><div class="playground-js" hidden><label for="${id}-js">JavaScript</label><textarea id="${id}-js" class="editor-js" spellcheck="false" autocapitalize="off" autocomplete="off">${e(exercise.js || '')}</textarea><p class="small muted">Gunakan console.log untuk melihat hasil. JavaScript berjalan tanpa DOM, jaringan, atau penyimpanan; maksimal 1,5 detik.</p></div></div>
        <div class="playground-actions"><button type="button" class="primary" data-run>Jalankan kode</button>${exercise.checks?.length ? '<button type="button" data-check>Periksa latihan</button>' : ''}<button type="button" data-reset>Reset kode</button><button type="button" data-stop hidden>Hentikan</button></div>
        <p class="playground-status small muted" role="status" aria-live="polite">Ubah kode, lalu jalankan. Editan hanya bertahan selama halaman ini terbuka.</p>
        <div class="playground-results"><div class="playground-result-heading">Hasil kode <span class="small muted">Terisolasi dari data belajarmu</span></div><iframe src="/latihan-frame" sandbox="allow-scripts" title="Preview hasil kode" referrerpolicy="no-referrer"></iframe><pre class="playground-console" role="region" tabindex="0" aria-label="Keluaran console" hidden></pre></div>
        <ul class="playground-checks" aria-label="Hasil pemeriksaan latihan"></ul>
        ${exercise.hint ? `<details class="playground-hint"><summary>Lihat petunjuk</summary><p>${e(exercise.hint)}</p></details>` : ''}
    </section>`;
}

export function bindPlayground(id, exercise) {
    const root = document.getElementById(id);
    const frame = root.querySelector('iframe');
    const mode = root.querySelector('.playground-mode');
    const html = root.querySelector('.editor-html');
    const css = root.querySelector('.editor-css');
    const js = root.querySelector('.editor-js');
    const status = root.querySelector('.playground-status');
    const output = root.querySelector('.playground-console');
    const checkList = root.querySelector('.playground-checks');
    const stopButton = root.querySelector('[data-stop]');
    let ready = false;
    let runId;
    let pendingCheck = false;
    let pending = false;
    let watchdog;
    let outputLines = 0;
    const setStatus = (message) => { status.textContent = message; };
    const post = (payload) => frame.contentWindow.postMessage({ source: 'codeventure-editor', ...payload }, '*');
    const updateMode = () => {
        const web = mode.value === 'web';
        root.querySelector('.playground-web').hidden = !web;
        root.querySelector('.playground-js').hidden = web;
        frame.hidden = !web;
        output.hidden = web;
    };
    const run = (check = false) => {
        if ([html, css, js].some(input => input.value.length > 20000)) {
            setStatus('Kode terlalu panjang. Maksimal 20.000 karakter per bidang.');
            return;
        }
        if (!ready) { pending = true; pendingCheck = check; setStatus('Menyiapkan ruang latihan…'); return; }
        clearTimeout(watchdog);
        runId = crypto.randomUUID();
        pendingCheck = check;
        output.textContent = '';
        outputLines = 0;
        checkList.replaceChildren();
        stopButton.hidden = mode.value !== 'javascript';
        setStatus('Menjalankan kode…');
        post({ id: runId, mode: mode.value, html: html.value, css: css.value, js: js.value, checks: check ? exercise.checks : [], ink: getComputedStyle(document.documentElement).getPropertyValue('--ink').trim() });
        watchdog = setTimeout(() => {
            setStatus('Runner belum merespons. Muat ulang halaman lalu coba lagi.');
            stopButton.hidden = true;
        }, 5000);
    };
    frame.addEventListener('load', () => {
        ready = true;
        if (pending) { pending = false; run(pendingCheck); }
    });
    window.addEventListener('message', event => {
        const data = event.data;
        if (event.source !== frame.contentWindow || data?.source !== 'codeventure-runner' || data.id !== runId) return;
        if (data.type === 'log' && typeof data.text === 'string' && outputLines++ < 100) {
            output.textContent += data.text.slice(0, 2000) + '\n';
            return;
        }
        clearTimeout(watchdog);
        if (data.type === 'done') {
            const results = Array.isArray(data.results) ? data.results.slice(0, 12) : [];
            if (pendingCheck) {
                checkList.replaceChildren(...results.map(result => {
                    const li = document.createElement('li');
                    li.className = result.passed ? 'check-pass' : 'check-fail';
                    li.textContent = `${result.passed ? 'Lulus' : 'Belum'}: ${String(result.label).slice(0, 200)}`;
                    return li;
                }));
                setStatus(results.length && results.every(result => result.passed) ? 'Semua pemeriksaan lulus. Lanjutkan kuis untuk mencatat progres.' : 'Masih ada yang perlu diperbaiki. Baca hasil dan coba lagi.');
            } else setStatus('Kode selesai dijalankan. Ubah lagi untuk bereksperimen.');
        } else if (['error', 'stopped'].includes(data.type)) {
            setStatus(String(data.text).slice(0, 2000));
        }
        if (['done', 'error', 'stopped'].includes(data.type)) stopButton.hidden = true;
    });
    mode.addEventListener('change', () => { runId = crypto.randomUUID(); post({ id: runId, mode: 'stop' }); clearTimeout(watchdog); stopButton.hidden = true; updateMode(); checkList.replaceChildren(); setStatus('Mode diubah. Tekan Jalankan kode untuk mencoba.'); });
    root.querySelector('[data-run]').addEventListener('click', () => run());
    root.querySelector('[data-check]')?.addEventListener('click', () => run(true));
    stopButton.addEventListener('click', () => { runId = crypto.randomUUID(); post({ id: runId, mode: 'stop' }); clearTimeout(watchdog); stopButton.hidden = true; setStatus('Eksekusi dihentikan. Kamu bisa mengubah dan menjalankan kode lagi.'); });
    root.querySelector('[data-reset]').addEventListener('click', async () => {
        if (!await confirmAction('Reset kode latihan?', 'Editan pada editor ini akan diganti dengan contoh awal.', 'Reset kode')) return;
        html.value = exercise.html || ''; css.value = exercise.css || ''; js.value = exercise.js || '';
        run();
    });
    root.addEventListener('keydown', event => {
        if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') { event.preventDefault(); run(); }
    });
    root.querySelectorAll('textarea').forEach(input => input.addEventListener('input', () => {
        runId = crypto.randomUUID();
        pending = false;
        post({ id: runId, mode: 'stop' });
        clearTimeout(watchdog);
        stopButton.hidden = true;
        checkList.replaceChildren();
        setStatus('Kode diubah. Jalankan ulang untuk memperbarui hasil.');
    }));
    updateMode();
    if (exercise.mode === 'web') run();
}
