<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use Illuminate\Http\Request;

class ExerciseController extends Controller
{
    //
    public function createBreathingExercise(Request $request){
        Exercise::create([
            'name'=>"Box Breathing (Basic)",
            'category'=>'beginner',
            'pattern'=> '4-4-4-4',
            'cycle' => 4,
            'exp' => 40,
        ]);
        Exercise::create([
            'name'=>"4-4 Breathing",
            'category'=>'beginner',
            'pattern'=> '4-4-4',
            'cycle' => 4,
            'exp' => 45,
        ]);
        Exercise::create([
            'name'=>"Simple Diaphragmatic Breathing",
            'category'=>'beginner',
            'pattern'=> '4-4-6',
            'cycle' => 4,
            'exp' => 60,
        ]);
        Exercise::create([
            'name'=>"Box Breathing (Extended)",
            'category'=>'intermediate',
            'pattern'=> '6-6-6-6',
            'cycle' => 4,
            'exp' => 72,
        ]);
        Exercise::create([
            'name'=>"4-7-8 Breathing",
            'category'=>'intermediate',
            'pattern'=> '4-7-8',
            'cycle' => 4,
            'exp' => 75,
        ]);
        Exercise::create([
            'name'=>"Alternative Nostril Breathing (Simple)",
            'category'=>'intermediate',
            'pattern'=> '4-6-8',
            'cycle' => 4,
            'exp' => 80,
        ]);
        Exercise::create([
            'name'=>"Box Breathing (Advanced)",
            'category'=>'advance',
            'pattern'=> '8-8-8-8',
            'cycle' => 4,
            'exp' => 150,
        ]);
        Exercise::create([
            'name'=>"Extended Alternative Nostril Breathing",
            'category'=>'advance',
            'pattern'=> '6-8-10',
            'cycle' => 4,
            'exp' => 162,
        ]);
        Exercise::create([
            'name'=>"Deep Diaphragmatic Breathing with Extended Hold",
            'category'=>'advance',
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

}
