<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::inertia('/','Home/Home');

// Route::get('/login',function(){
//     return inertia('Auth/Login');
// })->name('login.show');

Route::inertia('/login','Auth/Login')->name('login.show');
Route::inertia('/register','Auth/Register')->name('register.show');

Route::post('/register/create',[AuthController::class, 'register'])->name('auth.register');
Route::post('/login',[AuthController::class, 'login'])->name('auth.login');

Route::inertia('/dashboard','Dashboard/Dashboard')->name('dashboard.show');
