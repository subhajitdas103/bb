<?php
use App\Http\Controllers\Auth\GoogleAuthController;
// use App\Http\Controllers\Auth\FacebookLoginController;
use Illuminate\Support\Facades\Route;
// Route::post('google-login', [GoogleAuthController::class, 'handleGoogleLogin']);
// Route::post('google-login', [GoogleAuthController::class, 'handleGoogleLogin'])->withoutMiddleware('auth:sanctum');
Route::post('google-login', [GoogleAuthController::class, 'handleGoogleLogin'])
    ->withoutMiddleware('auth:sanctum');

   
    // Route::post('facebook-login', [FacebookLoginController::class, 'redirectToFacebook'])
    // ->withoutMiddleware('auth:sanctum');

    //  Route::post('facebook-callback', [FacebookLoginController::class, 'handleFacebookCallback'])
    // ->withoutMiddleware('auth:sanctum');



  // Make sure to use the correct controller

// Route::post('google-login', [AuthController::class, 'handleGoogleLogin']);
// Route::post('/google-login', [GoogleAuthController::class, 'handleGoogleLogin']);
// Route::get('/Students',[StudentController::class,'fetchStudentData']);

