<?php

namespace App\Http\Controllers;

use App\Repository\LevelRespository;
use Illuminate\Support\Facades\Auth;

class LevelController extends Controller
{
    public static function createLevels(){
        LevelRespository::createLevels();
    }

    public static function getTotalExp(){
        $user_id = Auth::user()->id;

        $response = LevelRespository::getTotalExp($user_id);
        
        return $response;
    }

    public static function getTotalExpToday(){
        $user_id = Auth::user()->id;

        $response = LevelRespository::getTotalExpToday($user_id);

         return $response;

    }

    public static function getUserTitle(){
        $response = LevelRespository::getUserTitle();
        return($response);
    }

    public static function getExpNeeded(){
        $response = LevelRespository::getExpNeeded(); 
        return($response);
    }

}
