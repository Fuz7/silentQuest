<?php

use App\Helpers\DateHelper;
use App\Http\Controllers\AccountController;
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

require 'auth.php';

Route::middleware(['auth'])->group(function () {
  

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

  Route::prefix('music')->group(function(){
    Route::get('/',function(){
      $music = [asset('storage/music/Soft Thunder and Rain.mp3'),
              asset('storage/music/Calm Temple Flute.mp3')];
    })  ;

    Route::get('/',function(){
        return inertia("Dashboard/Music/Music",[
          'randomMusics'=> MusicController::getAllRandomizedMusic(),
        ]);
    })->name('music.show');
    Route::get('/mostPlayed',[MusicController::class,'getMostPlayedMusic'],);
    Route::get('/randomMusic/fetch', [MusicController::class, 'getRandomMusic']);
    Route::get('/randomMusic/fetchFive', [MusicController::class, 'getFiveRandomMusic']);
  });
  Route::post('/userMusic/store',[MusicController::class, 'storeUserMusicDuration']);


  Route::prefix('meditate')->group(function(){
  Route::inertia('/','Dashboard/Meditate/Meditate')->name('meditate.show');
  Route::post('/store',[MeditationController::class, 'storeOrUpdate'])->name('meditate.store');
  // For Exercise Creation
  // Route::post('/meditate/store',[ExerciseController::class,'createBreathingExercise'])->name('meditate.store');
  });

  Route::prefix('breathing')->group(function(){

    Route::post('/goto',[ExerciseController::class, 'gotoExercisePanel'])->name('breathing');
    Route::get('/panel', function () {
        return inertia('Dashboard/Breathing/Breathing', [
            'exerciseData' => Session::get('exerciseData'),
            'auth' => Auth::user(),
        ]);})->name('breathing.panel');
    Route::post('/store',[ExerciseController::class, 'storeOrUpdate'])->name('breathing.store');
    Route::get('/list',function(){
      return inertia('Dashboard/Breathing/BreathingList',[
    "breathingList" => ExerciseController::getBreathingList(),
    "exp" => LevelController::getTotalExp(),
      ]);}
    )->name('breathing.show');
  });
    
  
  Route::prefix('account')->group(function(){
    Route::get('/', function () {
      return inertia('Dashboard/Account/Account', [
        'lifetimeAuth' => Auth::user(),
        'lifetimeMeditationTime' => MeditationController::getTotalMeditationTime(),
        'lifetimeExercise' => ['count' => ExerciseController::getUserTotalExerciseCount(),],
        'lifetimeLevel' => ['title'=>LevelController::getUserTitle(),
                    'exp' =>LevelController::getTotalExp(),
                    'expNeeded'=>LevelController::getExpNeeded()],
        'lifetimeMusicTime' => MusicController::getTotalMusicTime(),  
        ]);})->name('account.show');
    
    Route::get('/latestDate',[AccountController::class, 'getLatestDateActivity']);
    Route::get('/getDataByDate',[AccountController::class, 'getDataByDate']);
    Route::get('/getAvailableYears',[AccountController::class, 'getAllUniqueYears']);
    Route::get('/getMonthsByYear',[AccountController::class,'getMonthsByYear']);
    Route::get('/getDaysByMonthAndYear',
    [AccountController::class,'getDaysByMonthAndYear']);
  
  });

});
