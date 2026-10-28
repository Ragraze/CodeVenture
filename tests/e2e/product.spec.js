import { test, expect } from '@playwright/test';
import axe from 'axe-core';
import { paths } from '../../resources/js/courses.js';

test('mobile menu stays closed after history navigation and page restoration', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/jalur');
    const menu = page.getByRole('button', { name: 'Menu', exact: true });
    const nav = page.locator('#main-nav');
    const expectClosed = async () => {
        await expect(menu).toHaveAttribute('aria-expanded', 'false');
        await expect(nav).toBeHidden();
    };
    await expectClosed();
    await expect(menu.locator('svg')).toBeVisible();
    await expect(menu).toHaveText('');
    await menu.click();
    await expect(nav).toBeVisible();
    // Cancel navigation to inspect the source page before the browser caches it.
    await nav.evaluate(node => node.addEventListener('click', event => event.preventDefault(), { once: true }));
    await nav.getByRole('link', { name: 'Progres', exact: true }).click();
    await expectClosed();
    await menu.click();
    await nav.getByRole('link', { name: 'Progres', exact: true }).click();
    await expect(page).toHaveURL(/\/progres$/);
    await expectClosed();
    await page.getByRole('button', { name: 'Kembali', exact: true }).click();
    await expect(page).toHaveURL(/\/jalur$/);
    await expectClosed();
    await page.getByRole('button', { name: 'Maju', exact: true }).click();
    await expect(page).toHaveURL(/\/progres$/);
    await expectClosed();
    await page.goBack();
    await expect(page).toHaveURL(/\/jalur$/);
    await expectClosed();
    await menu.click();
    await page.evaluate(() => window.dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true })));
    await expectClosed();
    await menu.click();
    await page.keyboard.press('Escape');
    await expectClosed();
    await expect(menu).toBeFocused();
    await page.screenshot({ path: test.info().outputPath('mobile-menu.png') });
    await page.setViewportSize({ width: 1280, height: 800 });
    await expect(menu).toBeHidden();
    await expect(nav).toBeVisible();
});

test('navbar theme icons persist and synchronize light dark and system choices', async ({ page }) => {
    await page.goto('/');
    const group = page.getByRole('group', { name: 'Tema halaman', exact: true });
    await group.getByRole('button', { name: 'Tema gelap', exact: true }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await expect(group.getByRole('button', { name: 'Tema gelap', exact: true })).toHaveAttribute('aria-pressed', 'true');
    await page.goto('/pengaturan');
    await expect(page.getByLabel('Tampilan', { exact: true })).toHaveValue('dark');
    await page.getByLabel('Tampilan', { exact: true }).selectOption('light');
    await expect(group.getByRole('button', { name: 'Tema terang', exact: true })).toHaveAttribute('aria-pressed', 'true');
    await group.getByRole('button', { name: 'Ikuti perangkat', exact: true }).click();
    await page.emulateMedia({ colorScheme: 'dark' });
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await page.reload();
    await expect(group.getByRole('button', { name: 'Ikuti perangkat', exact: true })).toHaveAttribute('aria-pressed', 'true');
    await page.emulateMedia({ colorScheme: 'light' });
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('legacy browser history disables unavailable directions and preserves filters', async ({ page }) => {
    await page.addInitScript(() => Object.defineProperty(window, 'navigation', { value: undefined, configurable: true }));
    await page.goto('/jalur');
    const controls = page.getByRole('navigation', { name: 'Riwayat halaman', exact: true });
    await expect(controls.getByRole('button', { name: 'Kembali', exact: true })).toBeDisabled();
    await expect(controls.getByRole('button', { name: 'Maju', exact: true })).toBeDisabled();
    await page.locator('#main-nav').getByRole('link', { name: 'Progres', exact: true }).click();
    await controls.getByRole('button', { name: 'Kembali', exact: true }).click();
    await expect(page).toHaveURL(/\/jalur$/);
    await expect(controls.getByRole('button', { name: 'Kembali', exact: true })).toBeDisabled();
    await page.getByLabel('Cari materi').fill('HTML');
    await controls.getByRole('button', { name: 'Maju', exact: true }).click();
    await expect(page).toHaveURL(/\/progres$/);
    await expect(controls.getByRole('button', { name: 'Maju', exact: true })).toBeDisabled();
});

test('circular history controls navigate back and forward', async ({ page }) => {
    await page.goto('/jalur');
    await page.goto('/belajar/html-dasar/struktur-semantik');
    const controls = page.getByRole('navigation', { name: 'Riwayat halaman', exact: true });
    await expect(controls.getByRole('button')).toHaveCount(2);
    await expect(controls.getByRole('button', { name: 'Kembali', exact: true })).toHaveCSS('border-top-style', 'solid');
    await expect(page.locator('.breadcrumb')).toHaveCount(0);
    await controls.getByRole('button', { name: 'Kembali', exact: true }).click();
    await expect(page).toHaveURL(/\/jalur$/);
    await controls.getByRole('button', { name: 'Maju', exact: true }).click();
    await expect(page).toHaveURL(/\/belajar\/html-dasar\/struktur-semantik$/);
    await expect(controls.getByRole('button', { name: 'Maju', exact: true })).toBeDisabled();
});

test('sticky navigation keeps its solid background and divider at every scroll position', async ({ page }) => {
    await page.goto('/');
    const header = page.locator('.site-header');
    await expect(header).toHaveCSS('background-color', 'rgb(238, 241, 245)');
    await expect(header).toHaveCSS('border-bottom-color', 'rgb(227, 230, 234)');
    await page.evaluate(() => window.scrollTo(0, 600));
    await expect(header).toHaveCSS('background-color', 'rgb(238, 241, 245)');
    await expect(header).toHaveCSS('border-bottom-color', 'rgb(227, 230, 234)');
    expect((await header.boundingBox()).y).toBe(0);
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(header).toHaveCSS('background-color', 'rgb(238, 241, 245)');
    await expect(header).toHaveCSS('border-bottom-color', 'rgb(227, 230, 234)');
});

test('search, quiz completion, notes and progress survive a reload', async ({ page }) => {
    await page.goto('/jalur');
    await page.getByLabel('Cari materi').fill('validasi');
    await expect(page.locator('.track')).toHaveCount(1);
    await page.getByRole('link', { name: 'Fondasi backend Laravel' }).click();
    await expect(page.getByRole('heading', { name: 'Fondasi backend Laravel', exact: true })).toBeVisible();
    await page.goto('/belajar/html-dasar/struktur-semantik');
    await expect(page.getByRole('button', { name: 'Tandai pelajaran selesai' })).toHaveCount(0);
    await page.getByLabel('nav', { exact: true }).check();
    await page.getByRole('button', { name: 'Periksa jawaban' }).click();
    await expect(page.locator('#quiz-feedback')).toContainText('Belum tepat');
    await page.getByLabel('main', { exact: true }).check();
    await page.getByRole('button', { name: 'Periksa jawaban' }).click();
    await expect(page.locator('#quiz-feedback')).toContainText('Jawabanmu benar');
    await page.getByRole('button', { name: 'Tandai pelajaran selesai' }).click();
    await page.getByLabel('Apa yang ingin kamu ingat?').fill('<img src=x onerror=alert(1)> Main adalah isi utama.');
    await page.getByRole('button', { name: 'Simpan catatan', exact: true }).click();
    await page.reload();
    await expect(page.locator('#completion')).toContainText('Pelajaran selesai');
    await expect(page.getByLabel('Apa yang ingin kamu ingat?')).toHaveValue('<img src=x onerror=alert(1)> Main adalah isi utama.');
    await page.goto('/catatan');
    await expect(page.locator('.note-card')).toContainText('Main adalah isi utama.');
    await expect(page.locator('.note-card img')).toHaveCount(0);
    await page.goto('/progres');
    await expect(page.locator('progress[aria-label="Progres keseluruhan"]')).toHaveAttribute('value', '1');
});

test('backup, invalid import, appearance and reset confirmation', async ({ page }) => {
    await page.goto('/pengaturan');
    await page.getByLabel('Nama panggilan').fill('Rani');
    await page.getByLabel('Target pelajaran per minggu').fill('5');
    await page.getByRole('button', { name: 'Simpan pengaturan' }).click();
    await page.getByLabel('Tampilan', { exact: true }).selectOption('dark');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    const download = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Ekspor cadangan' }).click();
    const backup = await download;
    expect(backup.suggestedFilename()).toMatch(/^codeventure-cadangan-/);
    await page.getByLabel('Impor cadangan Codeventure').setInputFiles({ name: 'invalid.json', mimeType: 'application/json', buffer: Buffer.from('{"app":"flavory","version":1}') });
    await page.getByRole('button', { name: 'Impor cadangan', exact: true }).click();
    await expect(page.locator('#import-result')).toContainText('bukan cadangan');
    await expect(page.getByLabel('Nama panggilan')).toHaveValue('Rani');
    await page.getByRole('button', { name: 'Hapus data belajar' }).click();
    await page.keyboard.press('Escape');
    await expect(page.getByLabel('Nama panggilan')).toHaveValue('Rani');
    await page.getByRole('button', { name: 'Hapus data belajar' }).click();
    await page.locator('[data-dialog="confirm"]').click();
    await expect(page.getByLabel('Nama panggilan')).toHaveValue('');
    const backupPath = await backup.path();
    await page.getByLabel('Impor cadangan Codeventure').setInputFiles(backupPath);
    await page.locator('[data-dialog="confirm"]').click();
    await expect(page.getByLabel('Nama panggilan')).toHaveValue('Rani');
    await page.reload();
    await expect(page.getByLabel('Target pelajaran per minggu')).toHaveValue('5');
});

test('corrupt browser data is recoverable and is not silently replaced', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('codeventure-data-v1', '{broken'));
    await page.goto('/');
    await expect(page.locator('#storage-warning')).toBeVisible();
    expect(await page.evaluate(() => localStorage.getItem('codeventure-data-v1'))).toBe('{broken');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('all pages reflow and pass automated accessibility checks in both themes', async ({ page }) => {
    test.setTimeout(180000);
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const urls = ['/', '/jalur', '/jalur/html-dasar', '/belajar/html-dasar/struktur-semantik', '/progres', '/catatan', '/pengaturan', '/privasi'];
    for (const width of [360, 768, 1440]) {
        await page.setViewportSize({ width, height: 1000 });
        for (const theme of ['light', 'dark']) {
            await page.goto('/pengaturan');
            await page.getByLabel('Tampilan', { exact: true }).selectOption(theme);
            for (const url of urls) {
                await page.goto(url);
                await expect(page.locator('h1')).toBeVisible();
                expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `${width} ${theme} ${url}`).toBeTruthy();
                await page.evaluate(axe.source);
                const result = await page.evaluate(async () => window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } }));
                expect(result.violations.map(item => ({ id: item.id, nodes: item.nodes.map(node => node.target) })), `${width} ${theme} ${url}`).toEqual([]);
            }
        }
    }
    expect(errors).toEqual([]);
});

test('all lesson readers and quizzes work', async ({ page }) => {
    test.setTimeout(120000);
    for (const path of paths) {
        for (const lesson of path.lessons) {
            await page.goto(`/belajar/${path.id}/${lesson.id}`);
            await expect(page.getByRole('heading', { level: 1 })).toHaveText(lesson.title);
            await page.locator(`input[name="answer"][value="${lesson.quiz.answer}"]`).check();
            await page.getByRole('button', { name: 'Periksa jawaban' }).click();
            await page.getByRole('button', { name: 'Tandai pelajaran selesai' }).click();
            await expect(page.locator('#completion')).toContainText('Pelajaran selesai');
        }
    }
    await page.goto('/progres');
    await expect(page.locator('progress[aria-label="Progres keseluruhan"]')).toHaveAttribute('value', String(paths.reduce((total, path) => total + path.lessons.length, 0)));
});

test('catalog filters, text size and system appearance settings stay functional', async ({ page }) => {
    await page.goto('/jalur');
    await page.getByLabel('Bidang', { exact: true }).selectOption('Backend');
    await expect(page.locator('.track')).toHaveCount(1);
    await page.getByLabel('Tingkat', { exact: true }).selectOption('Pemula');
    await expect(page.getByRole('heading', { name: 'Belum ada materi yang cocok' })).toBeVisible();
    await page.getByRole('link', { name: 'Hapus pencarian' }).click();
    await expect(page.locator('.track')).toHaveCount(4);
    await page.goto('/pengaturan');
    await page.getByLabel('Ukuran teks materi').selectOption('large');
    await page.getByLabel('Tampilan', { exact: true }).selectOption('system');
    await page.emulateMedia({ colorScheme: 'dark' });
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await page.emulateMedia({ colorScheme: 'light' });
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await page.goto('/belajar/css-responsif/box-model');
    await expect(page.locator('body')).toHaveClass(/text-large/);
});

test('home keeps one hero column and directs learning to the path cards', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#main-nav a').first()).toHaveText('Beranda');
    await expect(page.locator('#main-nav a').nth(1)).toHaveText('Jalur belajar');
    await expect(page.locator('#main-nav a').first()).toHaveAttribute('href', '/');
    await expect(page.locator('.breadcrumb')).toHaveCount(0);
    await expect(page.locator('.playground, #home-quiz, .subject-rail, .path-preview')).toHaveCount(0);
    await expect(page.locator('.github-float')).toHaveCSS('background-color', 'rgb(17, 17, 17)');
    await expect(page.locator('#landing-title')).toHaveText('Dari nol,sampai bisa.');
    await expect(page.getByRole('link', { name: 'Buka pelajaran pertama', exact: true })).toHaveAttribute('href', '/belajar/html-dasar/mengenal-web');
    await expect(page.locator('.first-step-map ol')).toHaveCount(0);
    await expect(page.locator('.first-step-map progress')).toHaveAttribute('max', '60');
    await expect(page.locator('.brand-mark')).toHaveAttribute('src', '/assets/Resources/codeventure-mark.svg');
    expect(await page.evaluate(() => localStorage.getItem('codeventure-data-v1'))).toBeNull();
    await page.getByRole('link', { name: 'Lihat jalur CSS', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Tata ruang dengan CSS', exact: true })).toBeVisible();
    await page.goto('/belajar/html-dasar/struktur-semantik');
    await page.goto('/');
    await expect(page.getByRole('link', { name: 'Buka pelajaran berikutnya', exact: true })).toHaveCount(0);
    await expect(page.locator('.landing-workspace > header h2')).toHaveText('Progres belajar');
});

test('page heading labels are removed from catalog, progress and notes', async ({ page }) => {
    for (const url of ['/jalur', '/progres', '/catatan']) {
        await page.goto(url);
        await expect(page.locator('.page-heading .eyeline')).toHaveCount(0);
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    }
});

test('catalog filter chips, slash shortcut and reading meter support real navigation', async ({ page }) => {
    await page.goto('/jalur?category=Frontend');
    await expect(page.locator('.search-hint')).toHaveCount(0);
    await expect(page.locator('.filter-chip')).toHaveCount(1);
    await expect(page.locator('#results .track')).toHaveCount(3);
    await page.keyboard.press('/');
    await expect(page.locator('#search')).toBeFocused();
    await page.locator('[data-clear-filter="category"]').click();
    await expect(page.locator('.filter-chip')).toHaveCount(0);
    await expect(page.locator('#results .track')).toHaveCount(4);

    await page.goto('/belajar/css-responsif/box-model');
    const cssLessons = paths.find(path => path.id === 'css-responsif').lessons;
    const following = cssLessons[cssLessons.findIndex(lesson => lesson.id === 'box-model') + 1];
    await expect(page.locator('.lesson-link')).toHaveCount(2);
    await expect(page.locator('.lesson-link.next')).toContainText(following.title);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await expect.poll(() => page.locator('#reading-meter').evaluate((meter) => Number(meter.value))).toBeGreaterThan(0);
    await page.locator('.lesson-link.next').click();
    await expect(page).toHaveURL(new RegExp(`/belajar/css-responsif/${following.id}$`));
});

test('seven-day activity reflects completed lessons in the current week', async ({ page }) => {
    await page.addInitScript(() => {
        const today = new Date().toISOString();
        localStorage.setItem('codeventure-data-v1', JSON.stringify({
            version: 1,
            data: {
                name: '', completed: { 'html-dasar/struktur-semantik': today, 'html-dasar/tautan-dan-gambar': today },
                passed: [], notes: {}, started: ['html-dasar'], lastLesson: 'html-dasar/struktur-semantik', goal: 3, reading: 'normal',
            },
        }));
    });
    await page.goto('/progres');
    await expect(page.getByRole('heading', { name: 'Ritme tujuh hari' })).toBeVisible();
    await expect(page.locator('.activity-days li')).toHaveCount(7);
    await expect(page.locator('.activity-days li.is-today')).toContainText('2');
    await expect(page.locator('.activity-days li.is-today')).toHaveAttribute('aria-label', /2 pelajaran selesai/);
    await expect(page.getByRole('heading', { name: 'Jalur yang kamu mulai' })).toBeVisible();
});
