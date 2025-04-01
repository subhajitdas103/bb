<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Auth\GoogleAuthController;
use App\Http\Controllers\Auth\AuthController;

use Illuminate\Support\Facades\Route;
// Route::post('google-login', [GoogleAuthController::class, 'handleGoogleLogin']);
// Route::post('google-login', [GoogleAuthController::class, 'handleGoogleLogin'])->withoutMiddleware('auth:sanctum');
Route::post('google-login', [GoogleAuthController::class, 'handleGoogleLogin'])
    ->withoutMiddleware('auth:sanctum');

Route::post('/signup', [AuthController::class, 'userSignup']);

Route::post('/login', [AuthController::class, 'userLogin']);