<?php

namespace App\Http\Controllers;

use App\Models\Meditation;
use App\Models\Music;
use App\Models\UserMusic;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MusicController extends Controller
{
    //
    public static function createMusicData(){
        Music::create([
            'name'=>'Bamboo Chimes in The Breeze',
        ]);
        Music::create([
        'name'=>'Calm Birdsong in the Morning',
        ]);

        Music::create([
            'name'=>'Calm Temple Flute',
        ]);

        Music::create([
            'name'=>'Chiming Tibetan Bowls',
        ]);

        Music::create([
            'name'=>'Crackling Fireplace',
        ]);

        Music::create([
            'name'=>'Flowing Waterfall in a Jungle',
        ]);

        Music::create([
            'name'=>'Gentle Ocean Waves',
        ]);

        Music::create([
            'name'=>'Harmonic Wind Chimes',
        ]);

        Music::create([
            'name'=>'Lapping Riverbank',
        ]);

        Music::create([
            'name'=>'Mountain Wind Whispers',
        ]);

        Music::create([
            'name'=>'Mystical Cave Drips',
        ]);

        Music::create([
            'name'=>'Peaceful Night Crickets',
        ]);

        Music::create([
            'name'=>'Rainfall on Leaves',
        ]);

        Music::create([
            'name'=>'Soft Chanting (Mongolia)',
        ]);

        Music::create([
            'name'=>'Soft Synth Pads',
        ]);

        Music::create([
            'name'=>'Soft Thunder and Rain',
        ]);

        Music::create([
            'name'=>'Soothing River Stream',
        ]);

        Music::create([
            'name'=>'Subtle Desert Wind',
        ]);

        Music::create([
            'name'=>'Underwater Bubbles',
        ]);

        Music::create([
            'name'=>'Whispering Forest Wind',
        ]);

        Music::create([
            'name'=>'You have no enemies.',
        ]);

        Music::create([
            'name'=>'Ladyfingers',
        ]);
        
        Music::create([
            'name'=>'Sunday',
        ]);

        Music::create([
            'name'=>'81Summer',
        ]);
    }

    public function getMostPlayedMusic(Request $request){
        $user_id = Auth::user()->id;
        
        $userMostMusicPlayed = UserMusic::where("user_id",$user_id)
                                      ->orderBy('duration','desc')
                                      ->first();
        if($userMostMusicPlayed !==null){
            $mostPlayedMusicId = $userMostMusicPlayed['music_id'];
            $mostPlayedMusic = Music::where("id",$mostPlayedMusicId)
                                      ->first();
            $mostPlayedMusic['image'] = "storage/images/{$mostPlayedMusic['name']}.jpg";
            $mostPlayedMusic['audio'] = "storage/music/{$mostPlayedMusic['name']}.mp3";
 
            return(json_encode(['mostPlayed'=>$mostPlayedMusic]));
        }else{
            $randomMusic = Music::inRandomOrder()->first();
            $randomMusic['image'] = "storage/images/{$randomMusic['name']}.jpg";
            $randomMusic['audio'] = "storage/music/{$randomMusic['name']}.mp3";
            return(json_encode(['mostPlayed'=>$randomMusic]));
        }
    }

    public function getRandomMusic(Request $request){
        $idArray = $request->idArray;
        $randomMusic = Music::whereNotIn('id',$idArray)
                              ->inRandomOrder()
                              ->first();

        if(!$randomMusic){
            return(false);
        }
        $randomMusic['image'] = "storage/images/{$randomMusic['name']}.jpg";
        $randomMusic['audio'] = "storage/music/{$randomMusic['name']}.mp3";
        return(['randomMusic'=>$randomMusic]);
    }

    public function getFiveRandomMusic(Request $request){
        
        $fiveMusic = Music::inRandomOrder()
                            ->limit(5)
                            ->get();
        foreach($fiveMusic as $music){
        $music['image'] = "storage/images/{$music['name']}.jpg";
        $music['audio'] = "storage/music/{$music['name']}.mp3";
            
        }
        return($fiveMusic);
    }    

    public static function getAllRandomizedMusic(){
        $randomMusics = Music::inRandomOrder()
                               ->get();
        foreach($randomMusics as $music){
            $music['image'] = "storage/images/{$music['name']}.jpg";
            $music['audio'] = "storage/music/{$music['name']}.mp3";
        }
        return($randomMusics);
    }

    public function storeUserMusicDuration(Request $request){
   
        $user_id = Auth::user()->id;    
        $duration = $request['duration'];
        $musicId = $request['musicId'];
        $playedMusicToday = UserMusic::where('user_id',$user_id)
                                       ->where('music_id',$musicId)
                                       ->whereDate('created_at',Carbon::today());

        if($playedMusicToday->exists()){
          $previousDurationString = $playedMusicToday->pluck('duration')[0];
          $totalTime = Carbon::createFromFormat('H:i:s', $previousDurationString)->addSeconds($duration);
          $formattedTime = $totalTime->format('H:i:s');
          $playedMusicToday->update(['duration'=>$formattedTime]);  
        }else{
            $time = Carbon::createFromTimestamp($duration);
            UserMusic::create([
                'user_id'=>$user_id,
                'music_id'=>$musicId,
                'duration'=>$time,
            ]);
        }

        return true;
    }

    public static function getTotalMusicTime(){
        $user = Auth::user();
        $musics = UserMusic::where('user_id',$user['id'])
                                 ->get();
        $date = Carbon::now()->startOfDay();  // Outputs: 2024-01-24 00:00:00
        foreach ($musics as $music) {
            # code...
          $meditationTime = abs(Carbon::createFromFormat('H:i:s',$music['duration'])
                                    ->diffInSeconds(Carbon::today()->startOfDay()));
          $date->addSeconds($meditationTime);   
        }

        
        $formattedTime = $date->format('H\h i\m s\s');
        return($formattedTime);

    }
    

    public static function getTotalMusicTimeToday(){
        $user = Auth::user();
        $musics = UserMusic::where('user_id',$user['id'])
                             ->whereDate('created_at',Carbon::today())
                                 ->get();
        $date = Carbon::now()->startOfDay();  // Outputs: 2024-01-24 00:00:00
        foreach ($musics as $music) {
            # code...
          $musicTime = abs(Carbon::createFromFormat('H:i:s',$music['duration'])
                                    ->diffInSeconds(Carbon::today()->startOfDay()));
          $date->addSeconds($musicTime);   
        }


        $formattedTime = $date->format('H:i:s');
        return($formattedTime);

    }
}


