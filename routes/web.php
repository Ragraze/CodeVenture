<?php

use Illuminate\Support\Facades\Route;

Route::view('/latihan-frame', 'playground');
Route::view('/', 'product');
Route::view('/jalur', 'product');
Route::view('/jalur/{slug}', 'product')->where('slug', '[a-z0-9-]+');
Route::view('/belajar/{path}/{lesson}', 'product')->where(['path' => '[a-z0-9-]+', 'lesson' => '[a-z0-9-]+']);
Route::view('/progres', 'product');
Route::view('/catatan', 'product');
Route::view('/pengaturan', 'product');
Route::view('/privasi', 'product');
Route::redirect('/learning_path', '/jalur');
Route::redirect('/Progress', '/progres');
Route::redirect('/login', '/pengaturan');
Route::redirect('/register', '/pengaturan');
Route::get('/health', fn () => response()->json(['status' => 'ok', 'app' => 'codeventure', 'storage' => 'browser']));
