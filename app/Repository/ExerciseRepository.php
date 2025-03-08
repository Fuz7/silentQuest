<?php

namespace App\Repository;

use App\Models\Exercise;
use App\Models\UserExercise;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class ExerciseRepository
{



    public static function getBreathingList()
    {
        $beginner = Exercise::where('category', 'beginner')
            ->orderBy('exp', 'asc')
            ->get();
        $intermediate = Exercise::where('category', 'intermediate')
            ->orderBy('exp', 'asc')
            ->get();
        $advance = Exercise::where('category', 'advance')
            ->orderBy('exp', 'asc')
            ->get();

        $breathingList = [
            'beginner' => $beginner,
            'intermediate' => $intermediate,
            'advance' => $advance,
        ];

        return $breathingList;
    }

    public function placeSesssionExerciseData(int $id)
    {
        $exerciseData = Exercise::where('id', $id)->get();
        Session::put('exerciseData', $exerciseData[0]);
    }

    public function storeOrUpdate(int $user_id, int $exercise_id)
    {
        $exercisedToday =  UserExercise::where('user_id', $user_id)
            ->where('exercise_id', $exercise_id)
            ->whereDate('created_at', Carbon::today());

        if ($exercisedToday->exists()) {
            $previousCount = (int) $exercisedToday->pluck('count')[0];
            $exercisedToday->update(['count' => ($previousCount + 1)]);
        } else {
            UserExercise::create([
                'user_id' => $user_id,
                'exercise_id' => $exercise_id,
                'count' => 1,
            ]);
        }

        return;
    }

    public static function getUserTotalExerciseCount(int $user_id)
    {

        $userExercises = UserExercise::where("user_id", $user_id)
            ->get();
        $exerciseCount = [
            'beginner' => 0,
            'intermediate' => 0,
            'advance' => 0
        ];
        foreach ($userExercises as $userExercise) {
            $count = $userExercise['count'];
            $exerciseCategory = Exercise::where('id', $userExercise['exercise_id'])
                ->first()['category'];
            $exerciseCount[$exerciseCategory] += $count;
        }
        return ($exerciseCount);
    }

    public static function getUserTotalExerciseCountToday(int $user_id)
    {
        $userExercises = UserExercise::where("user_id", $user_id)
            ->whereDate('created_at', Carbon::today())
            ->get();
        $exerciseCount = 0;
        foreach ($userExercises as $userExercise) {
            $count = $userExercise['count'];
            $exerciseCount += $count;
        }
        return ($exerciseCount);
    }
}
