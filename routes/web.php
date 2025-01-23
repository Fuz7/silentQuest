<?php

use App\Helpers\DateHelper;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MeditationController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;


// Route::get('/login',function(){
  //     return inertia('Auth/Login');
  // })->name('login.show');
  
  
  Route::post('/register/create',[AuthController::class, 'register'])->name('auth.register');
  Route::post('/login',[AuthController::class, 'login'])->name('auth.login');
  Route::post('/logout',[AuthController::class, 'logout'])->name('auth.logout');
  
Route::middleware(['guest'])->group(function () {
  Route::inertia('/','Home/Home')->middleware('guest');
  Route::inertia('/login','Auth/Login')->name('login');
  Route::inertia('/register','Auth/Register')->name('register.show');
});

Route::middleware(['auth'])->group(function () {
  Route::get('/dashboard', function () {
      return inertia('Dashboard/Dashboard', [
          'auth' => Auth::user(),
          'date' => [ 'dayAbbreviation' => DateHelper::getCurrentDayAbbrevation(),
                      'monthName' => DateHelper::getCurrMonthName(),
                      'weekdays' => DateHelper::getCurrentWeekdays()],
      ]);
  })->name('home');
 
  Route::inertia('/learn','Dashboard/Learn/Learn')->name('learn.show');
  Route::inertia('/breathing','Dashboard/Breathing/Breathing')->name('breathing.show');
  Route::inertia('/meditate','Dashboard/Meditate/Meditate')->name('meditate.show');
  Route::post('/meditate/store',[MeditationController::class, 'storeOrUpdate'])->name('meditate.store');
    
});
