<?php

use App\Helpers\DateHelper;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\MeditationController;
use App\Models\Exercise;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;

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
  
  Route::inertia('/meditate','Dashboard/Meditate/Meditate')->name('meditate.show');
  Route::post('/meditate/store',[MeditationController::class, 'storeOrUpdate'])->name('meditate.store');
  // For Exercise Creation
  // Route::post('/meditate/store',[ExerciseController::class,'createBreathingExercise'])->name('meditate.store');

  Route::post('/breathing/goto',[ExerciseController::class, 'gotoExercisePanel'])->name('breathing');

  Route::get('/breathing/panel', function () {
      return inertia('Dashboard/Breathing/Breathing', [
          'exerciseData' => Session::get('exerciseData'),
          'auth' => Auth::user(),
      ]);})->name('breathing.panel');
  Route::post('/breathing/store',[ExerciseController::class, 'storeOrUpdate'])->name('breathing.store');
  Route::inertia('/breathing/list','Dashboard/Breathing/BreathingList',[
    "breathingList" => ExerciseController::getBreathingList(),
  ])->name('breathing.show');


  Route::get('/account', function () {
      return inertia('Dashboard/Account/Account', [
        'auth' => Auth::user(),
      ]);})->name('account.show');
  

});
