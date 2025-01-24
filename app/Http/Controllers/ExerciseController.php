<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use App\Models\Meditation;
use App\Models\UserExercise;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class ExerciseController extends Controller
{
    //
    public function createBreathingExercise(Request $request){
        Exercise::create([
            'name'=>"Box Breathing (Basic)",
            'category'=>'beginner',
            'description' => 'Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds, hold for 4 seconds.',
            'pattern'=> '4-4-4-4',
            'cycle' => 4,
            'exp' => 40,
        ]);
        Exercise::create([
            'name'=>"4-4 Breathing",
            'category'=>'beginner',
            'description' => 'Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds.',
            'pattern'=> '4-4-4',
            'cycle' => 4,
            'exp' => 45,
        ]);
        Exercise::create([
            'name'=>"Simple Diaphragmatic Breathing",
            'category'=>'beginner',
            'description' => 'Inhale deeply for 4 seconds, hold for 4 seconds, exhale slowly for 6 seconds.',
            'pattern'=> '4-4-6',
            'cycle' => 4,
            'exp' => 60,
        ]);
        Exercise::create([
            'name'=>"Box Breathing (Extended)",
            'category'=>'intermediate',
            'description' => 'Inhale for 6 seconds, hold for 6 seconds, exhale for 6 seconds, hold for 6 seconds.',
            'pattern'=> '6-6-6-6',
            'cycle' => 4,
            'exp' => 72,
        ]);
        Exercise::create([
            'name'=>"4-7-8 Breathing",
            'category'=>'intermediate',
            'description' => 'Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds.',
            'pattern'=> '4-7-8',
            'cycle' => 4,
            'exp' => 75,
        ]);
        Exercise::create([
            'name'=>"Alternative Nostril Breathing (Simple)",
            'category'=>'intermediate',
            'description' => 'Inhale through one nostril for 4 seconds, hold for 6 seconds, exhale through the opposite nostril for 8 seconds.',
            'pattern'=> '4-6-8',
            'cycle' => 4,
            'exp' => 80,
        ]);
        Exercise::create([
            'name'=>"Box Breathing (Advanced)",
            'category'=>'advance',
            'description' => 'Inhale for 8 seconds, hold for 8 seconds, exhale for 8 seconds, hold for 8 seconds.',
            'pattern'=> '8-8-8-8',
            'cycle' => 4,
            'exp' => 150,
        ]);
        Exercise::create([
            'name'=>"Extended Alternative Nostril Breathing",
            'category'=>'advance',
            'description' => 'Inhale through one nostril for 6 seconds, hold for 8 seconds, exhale through the other nostril for 10 seconds. ',
            'pattern'=> '6-8-10',
            'cycle' => 4,
            'exp' => 162,
        ]);
        Exercise::create([
            'name'=>"Deep Diaphragmatic Breathing with Extended Hold",
            'category'=>'advance',
            'description' => 'Inhale for 6 seconds, hold for 10 seconds, exhale for 6 seconds.',
            'pattern'=> '6-10-6',
            'cycle' => 4,
            'exp' => 175,
        ]);
    }

    public static function getBreathingList(){
        $beginner = Exercise::where('category','beginner')
                            ->orderBy('exp','asc')
                            ->get();
        $intermediate = Exercise::where('category','intermediate')
                            ->orderBy('exp','asc')
                            ->get();
        $advance = Exercise::where('category','advance')
                            ->orderBy('exp','asc')
                            ->get();
        
        $breathingList = ['beginner'=>$beginner,
                          'intermediate'=>$intermediate,
                          'advance' => $advance,];

        return $breathingList;
    }


    public function gotoExercisePanel(Request $request){

        $fields = $request->validate([
        'id' => 'required|integer',
        ]);
        $exerciseData = Exercise::where('id',$fields['id'])->get();
        Session::put('exerciseData',$exerciseData[0]);
        return redirect(route('breathing.panel')); 
    }

    public function storeOrUpdate(Request $request){
        $request->validate([
        'exercise_id' => 'required|integer',
        ]);

        $user_id =  Auth::user()->id;
        $exercise_id = $request['exercise_id'] ;
        $exercisedToday =  UserExercise::where('user_id',$user_id)
        ->where('exercise_id',$exercise_id)
        ->whereDate('created_at',Carbon::today());

        if($exercisedToday->exists()){
            $previousCount = (int) $exercisedToday->pluck('count')[0];
            $exercisedToday->update(['count'=>($previousCount + 1)]);
        }else{
            UserExercise::create([
                'user_id' => $user_id,
                'exercise_id' => $exercise_id,
                'count' => 1,
            ]);
        }

        return;
    }


}
