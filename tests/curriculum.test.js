import { test } from 'node:test';
import assert from 'node:assert/strict';
import { paths, allLessons } from '../resources/js/courses.js';
import { exerciseFor } from '../resources/js/exercises.js';
import { laravelLessons } from '../resources/js/curriculum/laravel.js';

test('curriculum covers sixty ordered lessons and keeps every existing lesson URL', () => {
    assert.deepEqual(paths.map(path => path.lessons.length), [15, 15, 18, 12]);
    assert.equal(allLessons.length, 60);
    assert.equal(new Set(allLessons.map(lesson => lesson.key)).size, 60);
    const existing = {
        'html-dasar': ['struktur-semantik', 'tautan-dan-gambar', 'formulir-aksesibel', 'daftar-dan-navigasi', 'proyek-profil'],
        'css-responsif': ['box-model', 'grid-dan-flex', 'responsif-dan-fokus', 'variabel-dan-warna', 'proyek-katalog'],
        'javascript-interaktif': ['data-dan-fungsi', 'dom-dan-event', 'penyimpanan-lokal', 'percabangan-dan-loop', 'proyek-ringkasan-tugas'],
        'laravel-fondasi': ['request-dan-route', 'validasi-input', 'keamanan-dasar'],
    };
    for (const [path, ids] of Object.entries(existing)) for (const id of ids) {
        assert.ok(allLessons.some(lesson => lesson.key === `${path}/${id}`), `Missing existing URL ${path}/${id}`);
    }
    assert.equal(paths[0].lessons[0].id, 'mengenal-web');
    assert.equal(paths[2].lessons[0].id, 'menjalankan-javascript');
});

test('every lesson has substantive reading, code, practice, quiz and primary reference', () => {
    for (const lesson of allLessons) {
        assert.match(lesson.id, /^[a-z0-9-]+$/);
        assert.ok(lesson.intro.length >= 70, lesson.key);
        assert.ok(lesson.sections.length >= 2, lesson.key);
        for (const [heading, text] of lesson.sections) {
            assert.ok(heading.length >= 4 && text.length >= 100, `${lesson.key}: ${heading}`);
        }
        assert.ok(lesson.code.length >= 40 && lesson.task.length >= 40, lesson.key);
        assert.equal(lesson.quiz.options.length, 3, lesson.key);
        assert.ok(Number.isInteger(lesson.quiz.answer) && lesson.quiz.answer >= 0 && lesson.quiz.answer < 3, lesson.key);
        assert.ok(lesson.quiz.explanation.length >= 40, lesson.key);
        assert.ok(['developer.mozilla.org', 'laravel.com', 'www.php.net'].includes(new URL(lesson.source[1]).hostname), lesson.key);
    }
});

test('all frontend lessons have runnable practice with checks and hints; PHP stays local', () => {
    let frontend = 0;
    for (const path of paths) for (const lesson of path.lessons) {
        const exercise = exerciseFor(path, lesson);
        if (path.category === 'Backend') { assert.equal(exercise, null); continue; }
        frontend++;
        assert.ok(exercise, `${path.id}/${lesson.id}`);
        assert.ok(exercise.checks.length > 0 && exercise.hint.length >= 30, lesson.id);
        assert.ok(exercise.html || exercise.js, lesson.id);
    }
    assert.equal(frontend, 48);
});

test('PHP examples retain namespace separators and the Blade transition uses a View return type', () => {
    const controller = laravelLessons.find(lesson => lesson.id === 'controller-dan-respons');
    assert.ok(controller.code.includes('namespace App\\Http\\Controllers;'));
    assert.ok(controller.code.includes('use Illuminate\\Http\\JsonResponse;'));
    const blade = laravelLessons.find(lesson => lesson.id === 'blade-dan-data');
    assert.ok(blade.code.includes('index(): \\Illuminate\\View\\View'));
    const relation = laravelLessons.find(lesson => lesson.id === 'relasi-dan-kueri');
    assert.ok(relation.code.includes("->nullable()->constrained()"));
    assert.ok(relation.code.includes("whereNull('user_id')"));
});
