<?php

namespace App\Http\Controllers;

use App\Repository\MusicRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use function Illuminate\Log\log;

class MusicController extends Controller
{
    //

    protected $musicRepository;

    public function __construct()
    {
        $this->musicRepository = new MusicRepository;
    }


    public function getMostPlayedMusic(Request $request)
    {
        $user_id = Auth::user()->id;
        $response = $this->musicRepository->getMostPlayedMusic($user_id);
        return $response;
    }

    public function getRandomMusic(Request $request)
    {
        $idArray = $request->idArray;
        $response = $this->musicRepository->getRandomMusic($idArray);
        return $response;
    }

    public function getFiveRandomMusic(Request $request)
    {

        $response = $this->musicRepository->getFiveRandomMusic();
        return $response;
    }

    public static function getAllRandomizedMusic()
    {
        $response = MusicRepository::getAllRandomizedMusic();
        return ($response);
    }

    public function storeUserMusicDuration(Request $request)
    {

        $user_id = Auth::user()->id;
        $musicId = $request['musicId'];
        $duration = $request['duration'];

        $response = $this->musicRepository
            ->storeUserMusicDuration($user_id, $musicId, $duration);
        return $response;
    }

    public static function getTotalMusicTime()
    {
        $user_id = Auth::user()->id;

        $response = MusicRepository::getTotalMusicTime($user_id);
        return $response;
    }


    public static function getTotalMusicTimeToday()
    {
        $user_id = Auth::user()->id;
        $response = MusicRepository::getTotalMusicTimeToday($user_id);
        return $response;
    }
}
