import { test, expect } from '@playwright/test';
import { paths } from '../../resources/js/courses.js';
import { exerciseFor } from '../../resources/js/exercises.js';
import { extraLessons } from '../../resources/js/extra-lessons.js';
import axe from 'axe-core';

test('deployment preserves the isolated runner policy', async ({ request }) => {
    const frame = await request.get('/latihan-frame');
    expect(frame.headers()['content-security-policy']).toContain('sandbox allow-scripts');
    expect(frame.headers()['content-security-policy']).toContain("frame-ancestors 'self'");
    expect(frame.headers()['content-security-policy']).toContain("connect-src 'none'");
    expect(frame.headers()['x-frame-options']).not.toBe('DENY');
    const home = await request.get('/');
    expect(home.headers()['x-frame-options']).toBe('DENY');
    expect(home.headers()['content-security-policy']).toContain("frame-ancestors 'none'");
});

test('mobile GitHub link gives the focused editor room', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto('/belajar/html-dasar/struktur-semantik');
    const link = page.locator('.github-float');
    await expect(link).toBeVisible();
    expect((await link.boundingBox()).width).toBeLessThanOrEqual(48);
    await page.locator('#lesson-playground').getByLabel('HTML').focus();
    await expect(link).toBeHidden();
    await page.locator('#lesson-playground').getByLabel('HTML').blur();
    await expect(link).toBeVisible();
});

test('new lessons and the clean home reflow and remain accessible in both themes', async ({ page }) => {
    test.setTimeout(90000);
    await page.setViewportSize({ width: 360, height: 800 });
    const urls = Object.entries(extraLessons).flatMap(([path, lessons]) => lessons.map(lesson => `/belajar/${path}/${lesson.id}`));
    for (const theme of ['light', 'dark']) {
        for (const url of ['/', ...urls]) {
            await page.goto(url);
            await page.evaluate(value => { localStorage.setItem('codeventure-theme', value); document.documentElement.dataset.theme = value; }, theme);
            if (url === '/') {
                expect(await page.locator('#landing-title').evaluate(element => {
                    const range = document.createRange();
                    range.selectNodeContents(element.firstChild);
                    return range.getClientRects().length;
                })).toBe(1);
                await expect(page.locator('.playground')).toHaveCount(0);
            }
            await page.evaluate(axe.source);
            const violations = await page.evaluate(async () => (await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } })).violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })));
            expect(violations, `${theme} ${url}`).toEqual([]);
            expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
        }
    }
});

test('responsive box exercise passes at phone width', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto('/belajar/css-responsif/box-model');
    const lab = page.locator('#lesson-playground');
    await lab.getByLabel('CSS', { exact: true }).fill('article { width: 300px; max-width: 100%; padding: 20px; box-sizing: border-box; }');
    await lab.getByRole('button', { name: 'Periksa latihan', exact: true }).click();
    await expect(lab.locator('.playground-status')).toContainText('Semua');
});

test('editing code invalidates a pending check', async ({ page }) => {
    await page.goto('/belajar/javascript-interaktif/data-dan-fungsi');
    const lab = page.locator('#lesson-playground');
    await lab.getByLabel('JavaScript', { exact: true }).fill('await new Promise(resolve => setTimeout(resolve, 500)); console.log("CSS");');
    await lab.getByRole('button', { name: 'Periksa latihan', exact: true }).click();
    await lab.getByLabel('JavaScript', { exact: true }).fill('throw new Error("Broken");');
    await page.waitForTimeout(800);
    await expect(lab.locator('.playground-status')).toContainText('Kode diubah');
    await expect(lab.locator('.playground-checks li')).toHaveCount(0);
});

test('all frontend exercise starters execute and lesson quizzes are present', async ({ page }) => {
    test.setTimeout(120000);
    let count = 0;
    for (const path of paths) for (const lesson of path.lessons) {
        if (!exerciseFor(path, lesson)) continue;
        count++;
        await page.goto(`/belajar/${path.id}/${lesson.id}`);
        const lab = page.locator('#lesson-playground');
        await lab.getByRole('button', { name: 'Periksa latihan', exact: true }).click();
        await expect(lab.locator('.playground-checks li')).not.toHaveCount(0);
        if (path.id === 'javascript-interaktif') await expect(lab.locator('.check-fail')).toHaveCount(0);
        await expect(page.locator('#quiz')).toContainText(lesson.quiz.question);
    }
    expect(count).toBe(48);
});

test('lesson runs editable HTML and CSS without marking it complete', async ({ page }) => {
    await page.goto('/belajar/html-dasar/struktur-semantik');
    const before = await page.evaluate(() => localStorage.getItem('codeventure-data-v1'));
    const lab = page.locator('#lesson-playground');
    await lab.getByLabel('HTML').fill('<h1>Halo dari editorku</h1>');
    await lab.getByLabel('CSS', { exact: true }).fill('h1 { color: rgb(22, 90, 70); }');
    await lab.getByRole('button', { name: 'Jalankan kode', exact: true }).click();
    const heading = lab.frameLocator('iframe').locator('#preview h1');
    await expect(heading).toHaveText('Halo dari editorku');
    await expect(heading).toHaveCSS('color', 'rgb(22, 90, 70)');
    expect(await page.evaluate(() => localStorage.getItem('codeventure-data-v1'))).toBe(before);
});

test('JavaScript reports output, syntax errors and stops an infinite loop', async ({ page }) => {
    await page.goto('/belajar/javascript-interaktif/data-dan-fungsi');
    const lab = page.locator('#lesson-playground');
    await lab.getByLabel('JavaScript', { exact: true }).fill('console.log(6 * 7)');
    await lab.getByRole('button', { name: 'Jalankan kode', exact: true }).click();
    await expect(lab.locator('.playground-console')).toContainText('42');
    await lab.getByLabel('JavaScript', { exact: true }).fill('const = ;');
    await lab.getByRole('button', { name: 'Jalankan kode', exact: true }).click();
    await expect(lab.locator('.playground-status')).toContainText('SyntaxError');
    await lab.getByLabel('JavaScript', { exact: true }).fill('while (true) {}');
    await lab.getByRole('button', { name: 'Jalankan kode', exact: true }).click();
    await expect(lab.locator('.playground-status')).toContainText('waktu');
    await lab.getByLabel('JavaScript', { exact: true }).fill('console.log("Pulih")');
    await lab.getByRole('button', { name: 'Jalankan kode', exact: true }).click();
    await expect(lab.locator('.playground-console')).toContainText('Pulih');
});

test('lesson checks real output and reset requires confirmation', async ({ page }) => {
    await page.goto('/belajar/html-dasar/struktur-semantik');
    const lab = page.locator('#lesson-playground');
    await lab.getByLabel('HTML').fill('<div>Belum lengkap</div>');
    await lab.getByRole('button', { name: 'Periksa latihan', exact: true }).click();
    await expect(lab.locator('.playground-checks')).toContainText('Belum');
    await lab.getByLabel('HTML').fill('<main><h1>Profil saya</h1><p>Saya belajar.</p></main>');
    await lab.getByRole('button', { name: 'Periksa latihan', exact: true }).click();
    await expect(lab.locator('.playground-status')).toContainText('Semua');
    await lab.getByRole('button', { name: 'Reset kode', exact: true }).click();
    await page.getByRole('button', { name: 'Batal', exact: true }).click();
    await expect(lab.getByLabel('HTML')).toHaveValue('<main><h1>Profil saya</h1><p>Saya belajar.</p></main>');
    await lab.getByRole('button', { name: 'Reset kode', exact: true }).click();
    await page.getByRole('dialog').getByRole('button', { name: 'Reset kode', exact: true }).click();
    await expect(lab.getByLabel('HTML')).toHaveValue(/Profil Rani/);
});

test('sandbox blocks script markup, parent access, storage and network', async ({ page }) => {
    await page.goto('/belajar/html-dasar/struktur-semantik');
    let lab = page.locator('#lesson-playground');
    await expect(lab.locator('iframe')).toHaveAttribute('sandbox', 'allow-scripts');
    await lab.getByLabel('HTML').fill('<img src="https://example.com/leak" onerror="parent.document.body.innerHTML=\'broken\'"><script>parent.document.body.innerHTML="broken"</script><h1>Tetap aman</h1>');
    let external = 0;
    await page.route('https://example.com/**', async route => { external++; await route.abort(); });
    await lab.getByRole('button', { name: 'Jalankan kode', exact: true }).click();
    await expect(lab.frameLocator('iframe').locator('#preview h1')).toHaveText('Tetap aman');
    await expect(page.locator('.reader article h1')).toBeVisible();
    await page.goto('/belajar/javascript-interaktif/data-dan-fungsi');
    lab = page.locator('#lesson-playground');
    await lab.getByLabel('JavaScript', { exact: true }).fill('console.log(typeof document, typeof localStorage); fetch("https://example.com/leak").catch(() => console.log("network blocked"));');
    await lab.getByRole('button', { name: 'Jalankan kode', exact: true }).click();
    await expect(lab.locator('.playground-console')).toContainText('undefined undefined');
    await expect(lab.locator('.playground-console')).toContainText('network blocked');
    expect(external).toBe(0);
});
