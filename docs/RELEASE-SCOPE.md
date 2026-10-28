# Current Codeventure release scope

This document records the owner's accepted instructions for the working tree being reviewed against commit 79b0c6d. Older design plans describe intermediate versions and are historical when they conflict with this scope.

- Indonesian learning content from the beginning: 60 ordered lessons (HTML 15, CSS 15, JavaScript 18, Laravel 12), original explanations, examples, tasks, quizzes, hints, primary documentation links, and practical projects.
- Existing 18 lesson IDs and localStorage data-v1 remain compatible. New frontend lessons include practice checks; PHP/Laravel practice runs in a separate local project.
- 48 frontend exercises: sandbox HTML/CSS preview and a time-limited JavaScript worker console without DOM, storage, or network. No external execution or AI API.
- One-column hero sized to the viewport; current tagline “Dari nol, sampai bisa.” and matching description. No editor, second column, path tabs, or separate next-lesson CTA on the homepage. Path cards and progress remain.
- The old HTML 1/2/3 preview is replaced by progress. The returning-user section title is “Progres belajar”.
- Flat, shadow-free dot-grid background and matching card tone; neutral links, no permanent decorative underlines, black sticky GitHub link, self-hosted Manrope. SVG code mark is used for navbar and favicon.
- Sticky navbar transparent at the top, solid with a divider after scrolling. Beranda is before Jalur belajar. No redundant Beranda label beneath the homepage navbar.
- Breadcrumbs are replaced by two circular back/forward history buttons on inner pages, with labels and available-history state.
- Kicker labels above headings on catalog, progress, and notes are removed. Redundant prose and the subject rail are removed from home.
- Icon-only light/dark/system controls beside Pengaturan, synchronized with the settings selector and OS changes.
- Circular history buttons have visible borders; the visible slash-search hint is removed while its keyboard shortcut remains.
- Light/dark/system display, keyboard navigation, reduced motion, responsive reflow, quiz completion, notes, weekly goals, JSON backup, storage failure feedback, and stale-tab protection continue to work.
- The active product does not require a database, accounts, or remote progress storage. Legacy backend files are retained but their old account/admin/API routes are not published.
- Validate and review the code, fix material issues, then commit and push the Codeventure repository to its existing GitHub remote. Do not push generated build artifacts, vendor directories, credentials, or temporary browser reports.
