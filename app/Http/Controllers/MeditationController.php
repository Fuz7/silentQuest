<?php

namespace App\Http\Controllers;

use App\Models\Meditation;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MeditationController extends Controller
{
    //
    public function storeOrUpdate(Request $request){
        
        $request->validate([
        'duration' => 'required|integer',
        ]);
        
        $user_id =  Auth::user()->id;
        $meditatedToday =  Meditation::where('user_id',$user_id)
        ->whereDate('created_at',Carbon::today());

        if($meditatedToday->exists()){
          $previousDurationString = $meditatedToday->pluck('duration')[0];
          $currentDurationInteger = $request->input('duration');
          $totalTime = Carbon::createFromFormat('H:i:s', $previousDurationString)->addSeconds($currentDurationInteger);
          $formattedTime = $totalTime->format('H:i:s');
          $meditatedToday->update(['duration' =>$formattedTime]);
        }else{
          $seconds = $request->input('duration');
          $time = Carbon::createFromTimestamp($seconds);
          Meditation::create([
              'user_id' =>$user_id,
              'duration' => $time,
          ]);
      }

        return;

    }
}
