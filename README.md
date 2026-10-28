# Codeventure

Codeventure is an Indonesian-language web development learning app built with Laravel and vanilla JavaScript. It offers 60 ordered lessons, quizzes, personal notes, progress tracking, and 48 interactive frontend exercises.

The active app does **not require a database, user accounts, migrations, an external API, or an AI service**. Laravel serves the application shell and static assets; learning data stays in the user's browser.

## Features

- Four learning paths covering HTML, CSS, JavaScript, and PHP/Laravel, starting with the fundamentals.
- Original Indonesian explanations, code examples, practice tasks, quizzes, hints, and links to primary documentation.
- A searchable lesson catalog with path filters and stable lesson URLs.
- An editor on frontend lesson pages, with HTML/CSS previews and a JavaScript console.
- Lesson completion, reading progress, weekly learning goals, recent activity, and per-lesson notes.
- JSON export and import for moving learning data between browsers or making backups.
- Light, dark, and system themes through the sun, moon, and monitor icons beside Settings. Theme choices persist in the browser.
- A responsive, shadow-free interface with a dot-grid background, locally hosted Manrope, a sticky navigation bar, and a GitHub shortcut.
- Keyboard navigation, visible focus states, reduced-motion support, and a larger reading-text option.

The README is in English; the application interface and learning material are in Indonesian.

## Curriculum

| Path | Lessons | Topics |
| --- | ---: | --- |
| HTML | 15 | How the web works, document structure, semantic elements, text, lists, links, images, paths, media, tables, forms, accessibility, and a profile project. |
| CSS | 15 | Selectors, the cascade, units, the box model, typography, positioning, Flexbox, Grid, responsive layout, custom properties, interaction states, and a catalog project. |
| JavaScript | 18 | Values, variables, operators, conditions, loops, functions, arrays, objects, strings, modules, errors, asynchronous code, DOM events, browser storage, and a task project. |
| PHP and Laravel | 12 | PHP foundations, Laravel setup, routing, requests, controllers, Blade, validation, models, migrations, relationships, testing, and a notes project. |

Lessons reference MDN Web Docs, the PHP Manual, and Laravel documentation. The material is written for this project; it is not a copy of freeCodeCamp's curriculum.

All 48 frontend lessons include runnable practice. PHP/Laravel examples require a separate local practice project. Lessons involving the DOM or browser storage explain those APIs, while their embedded exercises stay within the console runner's limits.

## How practice works

The editor is available on lesson pages. Use **Jalankan kode** (Run code), **Periksa latihan** (Check exercise), or `Ctrl+Enter` / `Cmd+Enter` to run a snippet. Exercise checks provide feedback; quiz results and the lesson-completion control record learning progress.

| Mode | Execution environment | Limits |
| --- | --- | --- |
| HTML/CSS | A sandboxed iframe with a live preview | Script-bearing markup and external resource attributes are removed. Network access is restricted by the frame's CSP. |
| JavaScript | A worker inside the isolated frame | Console output only; no DOM, localStorage, or network access. Workers stop after 1.5 seconds. |
| PHP/Laravel | A separate local project | The learning app does not execute PHP snippets or arbitrary server-side code. |

Each editor field accepts up to 20,000 characters. Resetting a snippet asks for confirmation. Editor drafts are temporary and are discarded when the page is left; they are not included in learning-data backups.

## Data and privacy

Progress, notes, preferences, and learning goals are stored in `localStorage`. There is no remote learning-data API or automatic synchronization between devices. Laravel still uses filesystem-backed session and cache storage for its web infrastructure; neither requires a database.

- Learning data uses the `codeventure-data-v1` key; the theme uses `codeventure-theme`.
- Browser storage belongs to an origin: scheme, hostname, and port. Changing any of them can make existing data unavailable at the new address.
- Clearing site data, using a temporary browser profile, or leaving private browsing can remove progress.
- Export a JSON backup from **Pengaturan** (Settings) before changing browsers, domains, or devices. Import it through the same page.
- Imports are limited to 1 MB and validated against the app's data format. The app reports blocked storage, corrupt data, and conflicting changes from another tab.
- Existing lesson IDs and version-1 backups remain supported. Adding lessons changes completion percentages without removing earlier completions or notes.

Legacy account controllers, models, and migrations remain in the source tree. Their old account, admin, and data API routes are not published by the active application.

## Requirements

| Tool | Requirement |
| --- | --- |
| PHP | 8.4.1 or newer; PHP 8.5 is used by the Docker images. |
| Composer | Composer 2. |
| Node.js | Node.js 22.12+ or 24+; Node.js 24 is used for the production asset build. |
| npm | A version compatible with the chosen Node.js release. |
| Docker | Optional; needed only for the container workflows. |

Install the PHP extensions required by Composer and run `composer check-platform-reqs` to verify your environment. The provided Dockerfiles install the additional extensions they need.

The committed lock files currently pin Laravel **13.39.0**, PHPUnit **13.4.5**, Vite **8.3.5**, and Playwright **1.64.1**. Use `composer install` and `npm ci` to reproduce those versions. `composer update` and `npm update` resolve new versions and should be deliberate dependency changes.

## Local setup

Run these commands from the repository root:

```sh
git clone https://github.com/Ragraze/codeventure.git
cd codeventure
composer install
npm ci
cp .env.example .env
php artisan key:generate
npm run build
php artisan serve --host=127.0.0.1 --port=8000
```

Open <http://127.0.0.1:8000>. No database creation, migration, seeding, or queue worker is needed. The example environment uses file-backed sessions and cache and keeps debug output disabled.

For frontend development, leave the Laravel server running and start Vite in a second terminal:

```sh
npm run dev
```

Vite handles asset updates; it does not replace the Laravel server. For a production-style local check, stop Vite, remove a stale `public/hot` file if one remains, and run `npm run build` again.

### Development with Docker

This workflow supplies PHP and Composer through Docker. Node.js and npm are still required on the host for frontend tooling. The bind-mount and user-ID commands below assume a Linux-style shell.

```sh
cp .env.example .env
npm ci
npm run build
docker build -f Dockerfile.dev -t codeventure-runtime .
docker run --rm --user "$(id -u):$(id -g)" \
  -v "$PWD:/app" codeventure-runtime composer install
docker run --rm --user "$(id -u):$(id -g)" \
  -v "$PWD:/app" codeventure-runtime php artisan key:generate
docker run --rm --name codeventure-dev --user "$(id -u):$(id -g)" \
  -p 127.0.0.1:8000:8000 -v "$PWD:/app" codeventure-runtime
```

Open <http://127.0.0.1:8000>. The source is bind-mounted, so changes remain on the host. The development image uses `artisan serve`; it is separate from the production image.

## Commands and tests

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Build production assets in `public/build`. |
| `npm run test:content` | Check curriculum counts, lesson completeness, stable IDs, exercise coverage, and PHP example integrity. |
| `php artisan test` | Run backend route and security-policy tests. |
| `npm run test:e2e` | Run Playwright browser tests against a running application. |
| `composer validate --strict` | Validate Composer metadata and lock-file consistency. |
| `composer audit` | Check PHP dependencies against reported security advisories. |
| `npm audit` | Check JavaScript dependencies against reported security advisories. |
| `composer outdated --direct` | Check direct PHP dependencies for newer releases. |
| `npm outdated` | Check direct JavaScript dependencies for newer releases. |

Install the test browser once:

```sh
npx playwright install chromium
```

Minimal Linux environments may also need `npx playwright install-deps chromium` to install Chromium's system libraries.

Start the app on port 8000 before running browser tests. To use another address:

```sh
TEST_BASE_URL=http://127.0.0.1:8010 npm run test:e2e
```

Playwright uses isolated browser contexts, so its fixture data does not modify a normal browsing profile. Its coverage includes lesson readers and quizzes, all frontend exercise starters, preview and console execution, timeout handling, sandbox restrictions, theme persistence, history navigation, backups, responsive layout, automated accessibility checks, and storage failure/conflict behavior.

## Production deployment

The production Dockerfile builds assets from `package-lock.json`, installs PHP runtime dependencies from `composer.lock` without development packages, and serves the app with FrankenPHP/Caddy as `www-data` on port 8080. It excludes `.env`, host dependencies, test artifacts, and database files from the build context.

```sh
docker build -t codeventure-production .
```

Create an environment file **outside the repository**, such as `/srv/codeventure/production.env`:

```dotenv
APP_NAME=Codeventure
APP_ENV=production
APP_DEBUG=false
APP_URL=https://learn.example.com
APP_KEY=base64:REPLACE_WITH_A_GENERATED_KEY
LOG_CHANNEL=stderr
SESSION_DRIVER=file
SESSION_COOKIE=codeventure_session
SESSION_SECURE_COOKIE=true
CACHE_DRIVER=file
QUEUE_CONNECTION=sync
```

Generate an application key on an administrative machine with PHP, place the result in the environment file, and keep the key stable across updates:

```sh
php -r 'echo "base64:".base64_encode(random_bytes(32)).PHP_EOL;'
```

Restrict access to that file, then start the container:

```sh
docker run -d --name codeventure --restart unless-stopped \
  --env-file /srv/codeventure/production.env \
  --cap-drop ALL --security-opt no-new-privileges \
  -p 127.0.0.1:8080:8080 codeventure-production
```

Replace the example domain with your domain and put the container behind an HTTPS reverse proxy. The container's port 8080 serves internal HTTP; configure public TLS and HSTS at the proxy. `SESSION_SECURE_COOKIE=true` assumes public HTTPS access.

The process health endpoint is:

```sh
curl --fail http://127.0.0.1:8080/health
```

It returns `{"status":"ok","app":"codeventure","storage":"browser"}`. This checks application availability, not a database connection or the contents of users' browser storage.

### Security configuration

The document root is `public/`. The app uses restrictive security headers, and the production PHP configuration disables displayed errors. The main application does not allow inline scripts or `eval`.

`/latihan-frame` has a separate CSP for browser exercises: `sandbox allow-scripts` without `allow-same-origin`, blocked network connections, blob workers, and `unsafe-eval` only inside the isolated runner. Preserve this route-specific policy at the reverse proxy. Replacing it with a blanket `frame-ancestors 'none'` policy or `X-Frame-Options: DENY` breaks the editor. `/playground-runner.js` must remain available as a local asset.

Serve the app from a stable HTTPS origin so learning data stays accessible. Run the browser tests against the production image before publishing an update, preserve the previous image for rollback, and remember that server backups do not replace users' exported JSON backups.

## Project structure

```text
app/Http/Middleware/ProductSecurity.php  Application and runner security headers
routes/web.php                          Active page routes and health endpoint
resources/views/product.blade.php       Application shell and navigation
resources/views/playground.blade.php    Isolated exercise document
resources/js/app.js                     Pages, quizzes, notes, and progress
resources/js/common.js                  Storage, backup, themes, and shared controls
resources/js/home.js                    Homepage
resources/js/courses.js                 Base path data and curriculum integration
resources/js/extra-lessons.js           Additional original lessons
resources/js/curriculum/                Ordered HTML, CSS, JavaScript, Laravel content
resources/js/exercises.js               Exercise definitions
resources/js/playground.js              Editor controls and runner messaging
resources/css/                          Styles, themes, layout, and editor UI
public/playground-runner.js              HTML/CSS preview and JavaScript worker
public/appearance.js                     Theme selection before app rendering
public/fonts/                           Self-hosted Manrope and its OFL license
public/assets/Resources/                 Brand assets
tests/                                 PHP, curriculum, and browser tests
Dockerfile                              Production image
Dockerfile.dev                          Development PHP/Composer image
deploy/                                 Caddy and PHP production configuration
```

## Troubleshooting

- **Vite manifest is missing:** run `npm ci` and `npm run build` from the project root.
- **The page tries to load an unavailable Vite server:** stop Vite, remove a stale `public/hot` file, and rebuild the assets.
- **The app reports a missing application key:** copy `.env.example` to `.env` and run `php artisan key:generate`.
- **PHP dependencies reject the installed PHP version:** use PHP 8.4.1+ with the required extensions, or use the provided development image. Check `composer check-platform-reqs`.
- **Laravel cannot write session, cache, or view files:** give the runtime user write access to `storage/` and `bootstrap/cache/`; do not make the entire project world-writable.
- **The editor never produces a result:** inspect the browser console and the response headers for `/latihan-frame`. Check that the proxy preserves its dedicated CSP and that the local runner script loads.
- **Progress seems missing after changing the URL:** browser storage is origin-specific. Return to the original address, export the data, and import it at the new address.
- **Saving is blocked:** read the in-app storage warning, export the current session if possible, and check the browser's site-storage settings.
- **Browser tests cannot launch Chromium:** install the Playwright browser and, where needed, its system dependencies.

## Contributing

Keep changes focused and preserve existing lesson IDs and the version-1 learning-data format. When adding a lesson, update its explicit curriculum order, include substantive explanations, a code example, practice, a quiz with an explanation, and primary documentation references. Add a runnable exercise for frontend material within the runner's constraints.

Run the relevant content, PHP, build, and browser checks before submitting changes. Keep credentials, generated assets, dependencies, and temporary test output out of Git. Third-party packages retain their own licenses; the locally hosted Manrope font includes its OFL license in `public/fonts/Manrope-OFL.txt`.

## License

Codeventure is licensed under the [MIT License](LICENSE). Third-party dependencies and assets retain their respective licenses. Manrope is distributed under the SIL Open Font License included in `public/fonts/Manrope-OFL.txt`.
