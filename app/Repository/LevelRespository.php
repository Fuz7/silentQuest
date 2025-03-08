<?php

namespace App\Repository;

use App\Http\Controllers\LevelController;
use App\Models\Exercise;
use App\Models\Level;
use App\Models\UserExercise;
use Carbon\Carbon;

class LevelRespository
{

    public static function createLevels()
    {
        Level::create([
            'title' => 'Calm Newbie',
            'exp' => '0'
        ]);
        Level::create([
            'title' => 'Relaxation Explorer',
            'exp' => '200'
        ]);
        Level::create([
            'title' => 'Breath Balancer',
            'exp' => '600'
        ]);
        Level::create([
            'title' => 'Mindful Seeker',
            'exp' => '1200'
        ]);
        Level::create([
            'title' => 'Peace Practitioner',
            'exp' => '2000'
        ]);
        Level::create([
            'title' => 'Harmony Keeper',
            'exp' => '3000'
        ]);
        Level::create([
            'title' => 'Tranquility Guardian',
            'exp' => '4500'
        ]);
        Level::create([
            'title' => 'Serenity Sage',
            'exp' => '6000'
        ]);
        Level::create([
            'title' => 'Zen Master',
            'exp' => '8000'
        ]);
    }


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
