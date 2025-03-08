<?php

namespace App\Repository;

use App\Models\Music;
use App\Models\UserMusic;
use Carbon\Carbon;

class MusicRepository
{

    public function getMostPlayedMusic(int $user_id)
    {
        $userMostMusicPlayed = UserMusic::where("user_id", $user_id)
            ->orderBy('duration', 'desc')
            ->first();
        if ($userMostMusicPlayed !== null) {
            $mostPlayedMusicId = $userMostMusicPlayed['music_id'];
            $mostPlayedMusic = Music::where("id", $mostPlayedMusicId)
                ->first();
            $mostPlayedMusic['image'] = "storage/images/{$mostPlayedMusic['name']}.jpg";
            $mostPlayedMusic['audio'] = "storage/music/{$mostPlayedMusic['name']}.mp3";

            return (['mostPlayed' => $mostPlayedMusic]);
        } else {
            $randomMusic = Music::inRandomOrder()->first();
            $randomMusic['image'] = "storage/images/{$randomMusic['name']}.jpg";
            $randomMusic['audio'] = "storage/music/{$randomMusic['name']}.mp3";
            return (['mostPlayed' => $randomMusic]);
        }
    }

    public function getRandomMusic($idArray)
    {
        $randomMusic = Music::whereNotIn('id', $idArray)
            ->inRandomOrder()
            ->first();

        if (!$randomMusic) {
            return (false);
        }
        $randomMusic['image'] = "storage/images/{$randomMusic['name']}.jpg";
        $randomMusic['audio'] = "storage/music/{$randomMusic['name']}.mp3";
        return (['randomMusic' => $randomMusic]);
    }


    public function getFiveRandomMusic()
    {
        $fiveMusic = Music::inRandomOrder()
            ->limit(5)
            ->get();
        foreach ($fiveMusic as $music) {
            $music['image'] = "storage/images/{$music['name']}.jpg";
            $music['audio'] = "storage/music/{$music['name']}.mp3";
        }
        return ($fiveMusic);
    }

    public static function getAllRandomizedMusic()
    {
        $randomMusics = Music::inRandomOrder()
            ->get();
        foreach ($randomMusics as $music) {
            $music['image'] = "storage/images/{$music['name']}.jpg";
            $music['audio'] = "storage/music/{$music['name']}.mp3";
        }
        return ($randomMusics);
    }

    public function storeUserMusicDuration(int $user_id, int $musicId, $duration)
    {


        $playedMusicToday = UserMusic::where('user_id', $user_id)
            ->where('music_id', $musicId)
            ->whereDate('created_at', Carbon::today());

        if ($playedMusicToday->exists()) {
            $previousDurationString = $playedMusicToday->pluck('duration')[0];
            $totalTime = Carbon::createFromFormat('H:i:s', $previousDurationString)->addSeconds($duration);
            $formattedTime = $totalTime->format('H:i:s');
            $playedMusicToday->update(['duration' => $formattedTime]);
        } else {
            $time = Carbon::createFromTimestamp($duration);
            UserMusic::create([
                'user_id' => $user_id,
                'music_id' => $musicId,
                'duration' => $time,
            ]);
        }

        return true;
    }

    public static function getTotalMusicTime(int $user_id)
    {
        $musics = UserMusic::where('user_id', $user_id)
            ->get();
        $date = Carbon::now()->startOfDay();  // Outputs: 2024-01-24 00:00:00
        foreach ($musics as $music) {
            # code...
            $meditationTime = abs(Carbon::createFromFormat('H:i:s', $music['duration'])
                ->diffInSeconds(Carbon::today()->startOfDay()));
            $date->addSeconds($meditationTime);
        }


        $formattedTime = $date->format('H\h i\m s\s');
        return ($formattedTime);
    }

    public static function getTotalMusicTimeToday($user_id)
    {
        $musics = UserMusic::where('user_id', $user_id)
            ->whereDate('created_at', Carbon::today())
            ->get();
        $date = Carbon::now()->startOfDay();  // Outputs: 2024-01-24 00:00:00
        foreach ($musics as $music) {
            # code...
            $musicTime = abs(Carbon::createFromFormat('H:i:s', $music['duration'])
                ->diffInSeconds(Carbon::today()->startOfDay()));
            $date->addSeconds($musicTime);
        }


        $formattedTime = $date->format('H:i:s');
        return ($formattedTime);
    }
}
