<?php

namespace Tests\Feature;

use Tests\TestCase;

class FrameworkUpgradeTest extends TestCase
{
    public function test_product_pages_work_without_a_database_connection(): void
    {
        config(['database.default' => 'unavailable']);
        foreach (['/', '/jalur', '/jalur/html-dasar', '/belajar/html-dasar/struktur-semantik', '/progres', '/catatan', '/pengaturan', '/privasi'] as $path) {
            $this->get($path)->assertOk()->assertSee('Codeventure')->assertSee('id="main"', false);
        }
    }

    public function test_health_and_browser_security_headers_are_available(): void
    {
        $this->getJson('/health')->assertOk()->assertJson(['status' => 'ok', 'storage' => 'browser']);
        $this->get('/')->assertHeader('X-Content-Type-Options', 'nosniff')
            ->assertHeader('X-Frame-Options', 'DENY')
            ->assertHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
        $this->assertStringContainsString("object-src 'none'", $this->get('/')->headers->get('Content-Security-Policy'));
    }

    public function test_old_account_routes_do_not_expose_an_account_service(): void
    {
        $this->get('/login')->assertRedirect('/pengaturan');
        $this->get('/register')->assertRedirect('/pengaturan');
        $this->get('/api/user')->assertNotFound();
        $this->get('/halaman-tidak-ada')->assertNotFound();
    }

    public function test_playground_has_a_separate_restricted_policy(): void
    {
        $frame = $this->get('/latihan-frame')->assertOk()->assertHeader('Cache-Control', 'no-store, private');
        $this->assertStringContainsString('sandbox allow-scripts', $frame->headers->get('Content-Security-Policy'));
        $this->assertStringContainsString("connect-src 'none'", $frame->headers->get('Content-Security-Policy'));
        $this->assertStringNotContainsString('allow-same-origin', $frame->headers->get('Content-Security-Policy'));
        $main = $this->get('/')->headers->get('Content-Security-Policy');
        $this->assertStringNotContainsString('unsafe-eval', $main);
        $this->assertStringNotContainsString('unsafe-inline', $main);
    }
}
