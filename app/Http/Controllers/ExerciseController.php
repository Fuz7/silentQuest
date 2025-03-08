<?php

namespace App\Http\Controllers;

use App\Repository\ExerciseRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ExerciseController extends Controller
{
    protected $exerciseRepository;

    public function __construct()
    {
        $this->exerciseRepository = new ExerciseRepository;
    }

    //
    public function createBreathingExercise(Request $request)
    {
        $this->exerciseRepository->createBreathingExercise();
    }

    public static function getBreathingList()
    {
        $response = ExerciseRepository::getBreathingList();
        return $response;
    }


    public function gotoExercisePanel(Request $request)
    {

        $fields = $request->validate([
            'id' => 'required|integer',
        ]);
        $this->exerciseRepository->placeSesssionExerciseData($fields['id']);
        return redirect(route('breathing.panel'));
    }

    public function storeOrUpdate(Request $request)
    {
        $request->validate([
            'exercise_id' => 'required|integer',
        ]);

        $user_id =  Auth::user()->id;
        $this->exerciseRepository->storeOrUpdate($user_id, $request['exercise_id']);
    }


    public static function getUserTotalExerciseCount()
    {
        $user_id = Auth::user()->id;
        $response = ExerciseRepository::getUserTotalExerciseCount($user_id);
        return ($response);
    }

    public static function getUserTotalExerciseCountToday()
    {
        $user_id = Auth::user()->id;
        $response = ExerciseRepository::getUserTotalExerciseCountToday($user_id);
        return ($response);
    }
}
