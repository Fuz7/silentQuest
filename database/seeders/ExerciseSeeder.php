<?php

namespace Database\Seeders;

use App\Models\Exercise;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExerciseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
         $exercises = [
            [
                'name' => "Box Breathing (Basic)",
                'category' => 'beginner',
                'description' => 'Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds, hold for 4 seconds.',
                'pattern' => '4-4-4-4',
                'cycle' => 4,
                'exp' => 40,
            ],
            [
                'name' => "4-4 Breathing",
                'category' => 'beginner',
                'description' => 'Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds.',
                'pattern' => '4-4-4',
                'cycle' => 4,
                'exp' => 45,
            ],
            [
                'name' => "Simple Diaphragmatic Breathing",
                'category' => 'beginner',
                'description' => 'Inhale deeply for 4 seconds, hold for 4 seconds, exhale slowly for 6 seconds.',
                'pattern' => '4-4-6',
                'cycle' => 4,
                'exp' => 60,
            ],
            [
                'name' => "Box Breathing (Extended)",
                'category' => 'intermediate',
                'description' => 'Inhale for 6 seconds, hold for 6 seconds, exhale for 6 seconds, hold for 6 seconds.',
                'pattern' => '6-6-6-6',
                'cycle' => 4,
                'exp' => 72,
            ],
            [
                'name' => "4-7-8 Breathing",
                'category' => 'intermediate',
                'description' => 'Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds.',
                'pattern' => '4-7-8',
                'cycle' => 4,
                'exp' => 75,
            ],
            [
                'name' => "Alternative Nostril Breathing (Simple)",
                'category' => 'intermediate',
                'description' => 'Inhale through one nostril for 4 seconds, hold for 6 seconds, exhale through the opposite nostril for 8 seconds.',
                'pattern' => '4-6-8',
                'cycle' => 4,
                'exp' => 80,
            ],
            [
                'name' => "Box Breathing (Advanced)",
                'category' => 'advance',
                'description' => 'Inhale for 8 seconds, hold for 8 seconds, exhale for 8 seconds, hold for 8 seconds.',
                'pattern' => '8-8-8-8',
                'cycle' => 4,
                'exp' => 150,
            ],
            [
                'name' => "Extended Alternative Nostril Breathing",
                'category' => 'advance',
                'description' => 'Inhale through one nostril for 6 seconds, hold for 8 seconds, exhale through the other nostril for 10 seconds.',
                'pattern' => '6-8-10',
                'cycle' => 4,
                'exp' => 162,
            ],
            [
                'name' => "Deep Diaphragmatic Breathing with Extended Hold",
                'category' => 'advance',
                'description' => 'Inhale for 6 seconds, hold for 10 seconds, exhale for 6 seconds.',
                'pattern' => '6-10-6',
                'cycle' => 4,
                'exp' => 175,
            ],
        ];

        foreach ($exercises as $exercise) {
            Exercise::updateOrCreate(['name' => $exercise['name']], $exercise);
        }
    }
}
