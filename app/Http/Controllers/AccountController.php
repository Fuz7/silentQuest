<?php

namespace App\Http\Controllers;

use App\Repository\AccountRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class AccountController extends Controller{

  protected $accountRepository;

  public function __construct() {
    $this->accountRepository = new AccountRepository;
  }

    public function  getLatestDateActivity(){
      
      $user_id = Auth::user()->id;
      $response = $this->accountRepository->getLatestDateActivity($user_id);
      return $response;
    }

    

    public function getDataByDate(Request $request){
      $user_id = Auth::user()->id;
      $response = $this->accountRepository->getDataByDate($request,$user_id);
      return $response;

    }

    public static function getTotalExp($exercises){
      $response = AccountRepository::getTotalExp($exercises);
      return $response;
    }

    public static function getTitle($exp){
      $response = AccountRepository::getTitle($exp); 
      return $response;
    }
    public static function getExpNeeded($exp){
        $response = AccountRepository::getExpNeeded($exp); 
        return($response);
    }

    public static function convertMeditationFormat($meditation){
      $response = AccountRepository::convertMeditationFormat($meditation);
      return($response);

    } 

    public static function getTotalDurationMusicArray($musicList){
      $response = AccountRepository::getTotalDurationMusicArray($musicList);
      return($response); 
    }

    public function getAllUniqueYears(){
      $user_id = Auth::user()->id;
      $response = $this->accountRepository->getAllUniqueYears($user_id);
      return $response;
    }

    public function getMonthsByYear(Request $request){
      $user_id = Auth::user()->id;
      $year = $request->year;
      $response = $this->accountRepository->getMonthsByYear($user_id,$year);
      return $response;
    }

    public function getDaysByMonthAndYear(Request $request){
      $user_id = Auth::user()->id;
      $year = $request->year;
      $month = $request->month;
      $response = $this->accountRepository
      ->getDaysByMonthAndYear($user_id,$year,$month);
      return $response;
    }

    public static function getTotalCountExerciseArray($exerciseList){
      $response = AccountRepository::getTotalCountExerciseArray($exerciseList);
      return $response;
    }


}