<?php

namespace App\Http\Controllers;

use App\Models\Meditation;
use App\Repository\MeditationRepository;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MeditationController extends Controller
{

  protected $meditationRepository;

  public function __construct() {
    $this->meditationRepository = new MeditationRepository;
  }

    //
    public function storeOrUpdate(Request $request){
        
        $request->validate([
        'duration' => 'required|integer',
        ]);
        
        $user_id =  Auth::user()->id;
        $this->meditationRepository->storeOrUpdate($request['duration'],$user_id);


    }

    public static function getTotalMeditationTime(){
        $user_id = Auth::user()->id;
        $response = MeditationRepository::getTotalMeditationTime($user_id);
        return($response);
    }
    public static function getTotalMeditationTimeToday(){
      $user_id = Auth::user()->id;
      $response = MeditationRepository::getTotalMeditationTimeToday($user_id);
 
      return($response);
    }

}
