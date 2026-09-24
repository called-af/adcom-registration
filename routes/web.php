<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PublicRegistrationController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/daftar')->name('home');

Route::get('/daftar', [PublicRegistrationController::class, 'create'])->name('register.form');
Route::post('/daftar', [PublicRegistrationController::class, 'store'])->name('register.store');
Route::get('/cek-status', [PublicRegistrationController::class, 'checkStatus'])->name('check-status');

Route::middleware('guest')->group(function () {
    Route::get('login', [AuthController::class, 'create'])->name('login');
    Route::post('login', [AuthController::class, 'store'])->name('login.store');
});

Route::middleware(['auth'])->group(function () {
    Route::post('logout', [AuthController::class, 'destroy'])->name('logout');

    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::patch('dashboard/registrations/{registration}/status', [DashboardController::class, 'updateStatus'])->name('dashboard.registrations.update-status');
});

require __DIR__.'/settings.php';
