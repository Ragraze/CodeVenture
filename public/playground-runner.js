const preview = document.querySelector('#preview');
const sheet = document.createElement('style');
document.head.append(sheet);
let worker;
let timer;
let activeRun;
const reply = (id, payload) => parent.postMessage({ source: 'codeventure-runner', id, ...payload }, '*');

function stop() {
    clearTimeout(timer);
    worker?.terminate();
    worker = null;
}

function checkResults(checks, output) {
    return checks.slice(0, 12).map(check => {
        let passed = false;
        try {
            const element = check.selector ? preview.querySelector(check.selector) : null;
            if (check.kind === 'selector') passed = Boolean(element?.textContent.trim());
            if (check.kind === 'count') passed = preview.querySelectorAll(check.selector).length >= check.min;
            if (check.kind === 'css') passed = Boolean(element && getComputedStyle(element).getPropertyValue(check.property).trim() === check.value);
            if (check.kind === 'responsive-width') passed = Boolean(element && Math.abs(element.getBoundingClientRect().width - Math.min(check.value, preview.clientWidth)) < 1);
            if (check.kind === 'output') passed = output.includes(check.value);
        } catch { /* An invalid selector is a failed check, not a stopped lesson. */ }
        return { label: check.label, passed };
    });
}

window.addEventListener('message', event => {
    if (event.source !== parent || event.data?.source !== 'codeventure-editor') return;
    const { id, mode, html = '', css = '', js = '', checks = [], ink = '#233044' } = event.data;
    if (typeof id !== 'string' || !['web', 'javascript', 'stop'].includes(mode)) return;
    stop();
    activeRun = id;
    if (mode === 'stop') return;
    if (![html, css, js].every(value => typeof value === 'string' && value.length <= 20000) || !Array.isArray(checks)) return;
    if (mode === 'web') {
        const parsed = new DOMParser().parseFromString(html, 'text/html');
        parsed.querySelectorAll('script,iframe,object,embed,link,meta,base,style,svg,math').forEach(node => node.remove());
        parsed.querySelectorAll('*').forEach(node => {
            for (const attr of [...node.attributes]) {
                if (/^on/i.test(attr.name) || ['src', 'srcset', 'srcdoc', 'action', 'formaction', 'target', 'autofocus', 'style'].includes(attr.name) || (attr.name === 'href' && !attr.value.startsWith('#'))) node.removeAttribute(attr.name);
            }
        });
        preview.replaceChildren(...parsed.body.childNodes);
        const textColor = typeof ink === 'string' && /^#[a-f0-9]{3,8}$/i.test(ink) ? ink : '#233044';
        sheet.textContent = `html{font:16px/1.6 system-ui;color:${textColor};background:transparent}body{margin:20px;overflow-wrap:anywhere}*{box-sizing:border-box}img{max-width:100%}button,input,textarea,select{font:inherit}pre{white-space:pre-wrap}` + css;
        reply(id, { type: 'done', results: checkResults(checks, '') });
        return;
    }
    preview.textContent = 'Hasil JavaScript ditampilkan pada console di editor.';
    const source = `
        const format = value => { try { return typeof value === 'string' ? value : JSON.stringify(value) ?? String(value); } catch { return String(value); } };
        let lines = 0;
        const send = (...args) => { if (lines++ < 100) postMessage({type:'log', text: args.map(format).join(' ').slice(0, 2000)}); };
        console.log = console.info = console.warn = console.error = send;
        self.addEventListener('unhandledrejection', event => { event.preventDefault(); postMessage({type:'error', text:String(event.reason).slice(0,2000)}); });
        self.onmessage = async event => {
            try {
                const AsyncFunction = Object.getPrototypeOf(async function() {}).constructor;
                await new AsyncFunction(event.data)();
                postMessage({type:'done'});
            } catch(error) { postMessage({type:'error', text:(error.name + ': ' + error.message).slice(0,2000)}); }
        };
    `;
    const url = URL.createObjectURL(new Blob([source], { type: 'text/javascript' }));
    worker = new Worker(url);
    URL.revokeObjectURL(url);
    let output = '';
    let finished = false;
    let messages = 0;
    worker.onmessage = ({ data }) => {
        if (activeRun !== id) return;
        if (!data || typeof data !== 'object' || ++messages > 200) return;
        if (data.type === 'log' && typeof data.text === 'string') {
            output = (output + data.text + '\n').slice(0, 20000);
            reply(id, { type: 'log', text: data.text.slice(0, 2000) });
        }
        if (data.type === 'done') { finished = true; reply(id, { type: 'done', results: checkResults(checks, output) }); }
        if (data.type === 'error') { finished = true; reply(id, { type: 'error', text: String(data.text).slice(0, 2000) }); }
    };
    worker.onerror = event => {
        event.preventDefault();
        reply(id, { type: 'error', text: 'JavaScript tidak bisa dijalankan: ' + event.message });
        stop();
    };
    timer = setTimeout(() => {
        stop();
        if (!finished) reply(id, { type: 'stopped', text: 'Batas waktu 1,5 detik tercapai. Periksa loop atau proses yang belum selesai.' });
    }, 1500);
    worker.postMessage(js);
});
document.addEventListener('submit', event => event.preventDefault());
