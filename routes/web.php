<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'public/register')->name('home');
Route::inertia('/daftar', 'public/register')->name('register.form');
Route::inertia('/cek-status', 'public/check-status')->name('check-status');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
