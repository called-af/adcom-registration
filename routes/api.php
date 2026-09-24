<?php

use App\Http\Controllers\Api\RegistrationController;
use Illuminate\Support\Facades\Route;

Route::post('/daftar', [RegistrationController::class, 'store']);
Route::get('/cek-status', [RegistrationController::class, 'checkStatus']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/registrations', [RegistrationController::class, 'index']);
});
