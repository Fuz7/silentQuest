<?php

use App\Helpers\DateHelper;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\LevelController;
use App\Http\Controllers\MeditationController;
use App\Http\Controllers\MusicController;
use App\Models\Exercise;
use App\Models\Music;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;

// Route::get('/login',function(){
  //     return inertia('Auth/Login');
  // })->name('login.show');
  
  
  Route::post('/register/create',[AuthController::class, 'register'])->name('auth.register');
  Route::post('/login',[AuthController::class, 'login'])->name('auth.login');
  Route::post('/logout',[AuthController::class, 'logout'])->name('auth.logout');
  
Route::middleware(['guest'])->group(function () {
  Route::inertia('/','Landing/Landing')->middleware('guest');
  Route::inertia('/login','Auth/Login')->name('login');
  Route::inertia('/register','Auth/Register')->name('register.show');
});

Route::middleware(['auth'])->group(function () {
  
  Route::get('/music',function(){
    $music = [asset('storage/music/Soft Thunder and Rain.mp3'),
            asset('storage/music/Calm Temple Flute.mp3')];
    return  json_encode(['da'=>$music]);
  })  ;

  Route::get('/music/mostPlayed',[MusicController::class,'getMostPlayedMusic'],);
  Route::get('/music/randomMusic/fetch', [MusicController::class, 'getRandomMusic']);
  Route::get('/music/randomMusic/fetchFive', [MusicController::class, 'getFiveRandomMusic']);

  Route::get('/dashboard', function () {
      return inertia('Dashboard/Dashboard', [
          'auth' => Auth::user(),
          'date' => [ 'dayAbbreviation' => DateHelper::getCurrentDayAbbrevation(),
                      'monthName' => DateHelper::getCurrMonthName(),
                      'weekdays' => DateHelper::getCurrentWeekdays()],
          'level'=>['title'=>LevelController::getUserTitle(),
                    'exp'=>LevelController::getTotalExpToday()],
          'exerciseCount' => ExerciseController::getUserTotalExerciseCountToday(),
          'meditationTime' => MeditationController::getTotalMeditationTimeToday(),
          'music' => MusicController::getTotalMusicTimeToday(),
        ]);
  })->name('home');
 
  Route::inertia('/learn','Dashboard/Learn/Learn')->name('learn.show');
  Route::get('/music',function(){
      return inertia("Dashboard/Music/Music",[
        'randomMusics'=> MusicController::getAllRandomizedMusic(),
      ]);
  })->name('music.show');
  
  Route::inertia('/meditate','Dashboard/Meditate/Meditate')->name('meditate.show');
  Route::post('/meditate/store',[MeditationController::class, 'storeOrUpdate'])->name('meditate.store');
  // For Exercise Creation
  // Route::post('/meditate/store',[ExerciseController::class,'createBreathingExercise'])->name('meditate.store');

  Route::post('/breathing/goto',[ExerciseController::class, 'gotoExercisePanel'])->name('breathing');
  Route::post('/userMusic/store',[MusicController::class, 'storeUserMusicDuration']);

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
      'meditationTime' => MeditationController::getTotalMeditationTime(),
      'exercise' => ['count' => ExerciseController::getUserTotalExerciseCount(),],
      'level' => ['title'=>LevelController::getUserTitle(),
                  'exp' =>LevelController::getTotalExp(),
                  'expNeeded'=>LevelController::getExpNeeded()],
      'music' => MusicController::getTotalMusicTime(),
      ]);})->name('account.show');
  

});
