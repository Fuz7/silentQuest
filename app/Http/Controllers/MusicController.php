<?php

namespace App\Http\Controllers;

use App\Models\Music;
use Illuminate\Http\Request;

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

    public static function getMostPlayedMusic(){
        
    }

}


