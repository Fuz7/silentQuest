<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;


Route::middleware(['guest'])->group(function () {
  Route::inertia('/','Landing/Landing');
  Route::prefix('login')->group(function(){
    Route::inertia('/','Auth/Login')->name('login');
    Route::post('/',[AuthController::class, 'login'])->name('auth.login');
  });
  
  Route::prefix('register')->group(function(){
  
    Route::inertia('/','Auth/Register')->name('register.show');
    Route::post('/create',[AuthController::class, 'register'])->name('auth.register');
  });
});

Route::post('/logout',[AuthController::class, 'logout'])->middleware('auth')->name('auth.logout');