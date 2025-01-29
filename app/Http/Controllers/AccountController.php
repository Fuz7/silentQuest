<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use App\Models\Level;
use App\Models\Meditation;
use App\Models\UserExercise;
use App\Models\UserMusic;
use Carbon\Carbon;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;

use function PHPUnit\Framework\isEmpty;

class AccountController extends Controller{


    public function  getLatestDateActivity(){
      
      $user_id = Auth::user()->id;
      $latestDateArray = collect([]);

      $exercises = UserExercise::Where('user_id',$user_id)
      ->orderBy('created_at','desc');
      
      $meditations = Meditation::Where('user_id',$user_id)
      ->orderBy('created_at','desc');
      
      $musics = UserMusic::Where('user_id',$user_id)
      ->orderBy('created_at','desc');
      
      if($exercises->exists()){
        $latestDateArray->push($exercises->first()->created_at);
      }
      if($meditations->exists()){
        $latestDateArray->push($meditations->first()->created_at);
      }
      if($musics->exists()){
        $latestDateArray->push($musics->first()->created_at);
      }


      $sortedDates = $latestDateArray->sortByDesc(function($date){
        return Carbon::parse($date)->timestamp;
      })->values();
      $latestDate = new DateTime($sortedDates[0]);
      $year = $latestDate->format('Y');
      $month = $latestDate->format('F');
      $day = $latestDate->format('d');
      return (['year'=>$year,
              'month'=>$month,
              'day' =>$day]);
    }

    

    public function getDataByDate(Request $request){
      $user_id = Auth::user()->id;
      ['year'=>$year,'month'=>$month,'day'=>$day] = $request;
      $monthNumber = Carbon::parse("1 $month")->month;
    
      $startOfDay = Carbon::create($year, $monthNumber, $day, 0, 0, 0, 'UTC');
      $endOfDay = Carbon::create($year, $monthNumber, $day, 0, 0, 0, 'UTC')->endOfDay();
     
      $musics = UserMusic::where("user_id",$user_id)
      ->whereBetween('created_at', [$startOfDay, $endOfDay])->get();
      $exercises = UserExercise::where("user_id",$user_id)
      ->whereBetween('created_at',[$startOfDay,$endOfDay])->get();
      $meditation = Meditation::where("user_id",$user_id)
      ->whereBetween('created_at',[$startOfDay,$endOfDay])->first();
      $exercisesTillEndOfDay =  UserExercise::where("user_id",$user_id)
      ->where('created_at',"<",$endOfDay)->get();
     
      $convertedMeditationTime = AccountController::convertMeditationFormat($meditation);
      $musicDuration = AccountController::getTotalDurationMusicArray($musics);
      $exerciseCount = AccountController::getTotalCountExerciseArray($exercises);
      $exp =  AccountController::getTotalExp($exercisesTillEndOfDay);
      $title = AccountController::getTitle($exp);
      $expNeeded = AccountController::getExpNeeded($exp);
      $dataArray = array("meditationTime"=>$convertedMeditationTime,
      "musicTime"=>$musicDuration,
      "exercise"=>["count"=>$exerciseCount],
      "level"=>["exp"=>$exp,
                "title"=>$title,
                "expNeeded"=>$expNeeded]);
      return($dataArray);     

      

    }

    public static function getTotalExp($exercises){
      $totalExp = 0;
        foreach ($exercises as $exercise) {
          $count = $exercise['count'];
          $exerciseExp = Exercise::where('id',$exercise['exercise_id'])
                                  ->first()['exp'];
          $expWithCount = $count * $exerciseExp;
          $totalExp += $expWithCount;
      }
     return($totalExp);
    }

    public static function getTitle($exp){
        $title = Level::where('exp','<=',$exp)
                        ->orderBy('exp','desc')
                        ->first()['title'];  
        return($title);

    }
    public static function getExpNeeded($exp){
        $nextLevelExp = Level::where('exp','>',$exp)
                        ->orderBy('exp','asc')
                        ->first()['exp'];  
        $expNeeded = $nextLevelExp - $exp;
        return($expNeeded);
    }

    public static function convertMeditationFormat($meditation){
      $date = Carbon::now()->startOfDay();
      if($meditation){
        $meditationTime = abs(Carbon::createFromFormat("H:i:s",$meditation['duration'])
                          ->diffInSeconds(Carbon::today()->startOfDay()));
        $date->addSeconds($meditationTime);
      }
      $formattedTime = $date->format('H\h i\m s\s');
      return($formattedTime);

    } 

    public static function getTotalDurationMusicArray($musicList){
      $date = Carbon::now()->startOfDay();
      foreach ($musicList as $music ) {
        # code...
        $musicTime = abs(Carbon::createFromFormat("H:i:s",$music['duration'])
        ->diffInSeconds(Carbon::today()->startOfDay()));
        $date->addSeconds($musicTime);
      }
      $formattedTime = $date->format('H\h i\m s\s');
      return($formattedTime);
    }

    public function getAllUniqueYears(){
    $user_id = Auth::user()->id;

    $musicYears = UserMusic::where('user_id', $user_id)
        ->selectRaw('YEAR(created_at) as year');

    $exerciseYears = UserExercise::where('user_id', $user_id)
        ->selectRaw('YEAR(created_at) as year');

    $meditationYears = Meditation::where('user_id', $user_id)
        ->selectRaw('YEAR(created_at) as year');

    // Combine results with union
    $uniqueYears = $musicYears
        ->union($exerciseYears)
        ->union($meditationYears)
        ->distinct()
        ->orderBy('year', 'desc')
        ->pluck('year');

    return $uniqueYears;
    }

    public function getMonthsByYear(Request $request){
      $user_id = Auth::user()->id;
      $year = $request->year;

      $musicMonths = UserMusic::where('user_id', $user_id)
          ->whereYear('created_at', $year)
          ->selectRaw('MONTH(created_at) as month');

      $exerciseMonths = UserExercise::where('user_id', $user_id)
          ->whereYear('created_at', $year)
          ->selectRaw('MONTH(created_at) as month');

      $meditationMonths = Meditation::where('user_id', $user_id)
          ->whereYear('created_at', $year)
          ->selectRaw('MONTH(created_at) as month');

      // Combine results with union
      $uniqueMonths = $musicMonths
          ->union($exerciseMonths)
          ->union($meditationMonths)
          ->distinct()
          ->orderBy('month', 'asc')
          ->pluck('month');

      return $uniqueMonths;
    }

    public function getDaysByMonthAndYear(Request $request){
      $user_id = Auth::user()->id;
      $year = $request->year;
      $month = $request->month;

      
    $musicDays = UserMusic::where('user_id', $user_id)
        ->whereYear('created_at', $year)
        ->whereMonth('created_at', $month)
        ->selectRaw('DAY(created_at) as day');

    $exerciseDays = UserExercise::where('user_id', $user_id)
        ->whereYear('created_at', $year)
        ->whereMonth('created_at', $month)
        ->selectRaw('DAY(created_at) as day');

    $meditationDays = Meditation::where('user_id', $user_id)
        ->whereYear('created_at', $year)
        ->whereMonth('created_at', $month)
        ->selectRaw('DAY(created_at) as day');

    // Combine results with union
    $uniqueDays = $musicDays
        ->union($exerciseDays)
        ->union($meditationDays)
        ->distinct()
        ->orderBy('day', 'asc')
        ->pluck('day');

    return $uniqueDays;
    }

    public static function getTotalCountExerciseArray($exerciseList){
      $exerciseCount = ['beginner'=>0,
                        'intermediate'=>0,
                        'advance'=>0];
      foreach ($exerciseList as $exercise) {
        # code...
          $count = $exercise['count'];
          $exerciseCategory = Exercise::where('id',$exercise['exercise_id'])
                                      ->first()['category'];
          $exerciseCount[$exerciseCategory] += $count;
      }
      return($exerciseCount);
    }


}