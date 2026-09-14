<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'public/register')->name('home');
Route::inertia('/daftar', 'public/register')->name('register.form');
Route::inertia('/cek-status', 'public/check-status')->name('check-status');

Route::middleware('guest')->group(function () {
    Route::get('login', [AuthController::class, 'create'])->name('login');
    Route::post('login', [AuthController::class, 'store'])->name('login.store');
});

Route::middleware(['auth'])->group(function () {
    Route::post('logout', [AuthController::class, 'destroy'])->name('logout');

    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});
