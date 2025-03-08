<?php

namespace Database\Seeders;

use App\Models\Music;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MusicSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $musicData = [
            ['name' => 'Calm Birdsong in the Morning'],
            ['name' => 'Calm Temple Flute'],
            ['name' => 'Chiming Tibetan Bowls'],
            ['name' => 'Crackling Fireplace'],
            ['name' => 'Flowing Waterfall in a Jungle'],
            ['name' => 'Gentle Ocean Waves'],
            ['name' => 'Harmonic Wind Chimes'],
            ['name' => 'Lapping Riverbank'],
            ['name' => 'Mountain Wind Whispers'],
            ['name' => 'Mystical Cave Drips'],
            ['name' => 'Peaceful Night Crickets'],
            ['name' => 'Rainfall on Leaves'],
            ['name' => 'Soft Chanting (Mongolia)'],
            ['name' => 'Soft Synth Pads'],
            ['name' => 'Soft Thunder and Rain'],
            ['name' => 'Soothing River Stream'],
            ['name' => 'Underwater Bubbles'],
            ['name' => 'Whispering Forest Wind'],
            ['name' => 'You have no enemies.'],
            ['name' => 'Ladyfingers'],
            ['name' => 'Sunday'],
            ['name' => '81Summer'],
        ];
        foreach($musicData as $music){
            Music::updateOrCreate(
                    ['name' => $music['name']], // Search by name (Unique constraint)
                $music // Data to update (same as existing)
            );

        }
    }
}
