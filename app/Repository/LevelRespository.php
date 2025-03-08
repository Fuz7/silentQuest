<?php

namespace App\Repository;

use App\Http\Controllers\LevelController;
use App\Models\Exercise;
use App\Models\Level;
use App\Models\UserExercise;
use Carbon\Carbon;

class LevelRespository
{


    public static function getTotalExp(int $user_id)
    {
        
        $exercises = UserExercise::where('user_id', $user_id)
            ->get();
        $totalExp = 0;
        foreach ($exercises as $exercise) {
            $count = $exercise['count'];
            $exerciseExp = Exercise::where('id', $exercise['exercise_id'])
                ->first()['exp'];
            $expWithCount = $count * $exerciseExp;
            $totalExp += $expWithCount;
        }

        return $totalExp;
    }


    public static function getTotalExpToday(int $user_id)
    {

        $exercises = UserExercise::where('user_id', $user_id)
            ->whereDate('created_at', Carbon::today())
            ->get();
        $totalExp = 0;
        foreach ($exercises as $exercise) {
            $count = $exercise['count'];
            $exerciseExp = Exercise::where('id', $exercise['exercise_id'])
                ->first()['exp'];
            $expWithCount = $count * $exerciseExp;
            $totalExp += $expWithCount;
        }
        return $totalExp;
    }

    public static function getUserTitle()
    {
        $title = Level::where('exp', '<=', LevelController::getTotalExp())
            ->orderBy('exp', 'desc')
            ->first()['title'];
        return ($title);
    }

    public static function getExpNeeded()
    {
        $nextLevelExp = Level::where('exp', '>', LevelController::getTotalExp())
            ->orderBy('exp', 'asc')
            ->first()['exp'];
        $expNeeded = $nextLevelExp - LevelController::getTotalExp();
        return ($expNeeded);
    }
}
