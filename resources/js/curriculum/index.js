import { htmlLessons, htmlOrder } from './html.js';
import { cssLessons, cssOrder } from './css.js';
import { javascriptLessons, javascriptOrder } from './javascript.js';
import { laravelLessons, laravelOrder } from './laravel.js';

const curricula = {
    'html-dasar': { lessons: htmlLessons, order: htmlOrder },
    'css-responsif': { lessons: cssLessons, order: cssOrder },
    'javascript-interaktif': { lessons: javascriptLessons, order: javascriptOrder },
    'laravel-fondasi': { lessons: laravelLessons, order: laravelOrder },
};

export function completeCurriculum(path) {
    const curriculum = curricula[path.id];
    if (!curriculum) return;
    const lessons = new Map([...path.lessons, ...curriculum.lessons].map(lesson => [lesson.id, lesson]));
    if (lessons.size !== curriculum.order.length || curriculum.order.some(id => !lessons.has(id))) {
        throw new Error(`Urutan kurikulum ${path.id} tidak lengkap.`);
    }
    path.lessons = curriculum.order.map(id => lessons.get(id));
}
