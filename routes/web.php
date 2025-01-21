<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/','Home/Home');

// Route::get('/login',function(){
//     return inertia('Auth/Login');
// })->name('login.show');

Route::inertia('/login','Auth/Login')->name('login.show');
Route::inertia('/register','Auth/Register')->name('register.show');