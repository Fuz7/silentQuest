<?php

namespace Database\Seeders;

use App\Models\Level;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        $levels = [
            ['title' => 'Calm Newbie', 'exp' => 0],
            ['title' => 'Relaxation Explorer', 'exp' => 200],
            ['title' => 'Breath Balancer', 'exp' => 600],
            ['title' => 'Mindful Seeker', 'exp' => 1200],
            ['title' => 'Peace Practitioner', 'exp' => 2000],
            ['title' => 'Harmony Keeper', 'exp' => 3000],
            ['title' => 'Tranquility Guardian', 'exp' => 4500],
            ['title' => 'Serenity Sage', 'exp' => 6000],
            ['title' => 'Zen Master', 'exp' => 8000],
        ];

        // Insert all records into the database at once
        foreach ($levels as $level) {
        Level::updateOrCreate(['title' => $level['title']], ['exp' => $level['exp']]);
    }

    }
}
