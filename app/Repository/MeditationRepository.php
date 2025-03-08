<?php

namespace App\Repository;

use App\Models\Meditation;
use Carbon\Carbon;

class MeditationRepository
{


  public function storeOrUpdate(int $duration, int $user_id)
  {
    $meditatedToday =  Meditation::where('user_id', $user_id)
      ->whereDate('created_at', Carbon::today());

    if ($meditatedToday->exists()) {
      $previousDurationString = $meditatedToday->pluck('duration')[0];
      $currentDurationInteger = $duration;
      $totalTime = Carbon::createFromFormat('H:i:s', $previousDurationString)->addSeconds($currentDurationInteger);
      $formattedTime = $totalTime->format('H:i:s');
      $meditatedToday->update(['duration' => $formattedTime]);
    } else {
      $seconds = $duration;
      $time = Carbon::createFromTimestamp($seconds);
      Meditation::create([
        'user_id' => $user_id,
        'duration' => $time,
      ]);
    }
    return;
  }

  public static function getTotalMeditationTime(int $user_id)
  {
    $meditations = Meditation::where('user_id', $user_id)
      ->get();
    $date = Carbon::now()->startOfDay();  // Outputs: 2024-01-24 00:00:00

    foreach ($meditations as $meditation) {
      # code...
      $meditationTime = abs(Carbon::createFromFormat('H:i:s', $meditation['duration'])
        ->diffInSeconds(Carbon::today()->startOfDay()));
      $date->addSeconds($meditationTime);
    }
    $formattedTime = $date->format('H\h i\m s\s');
    return ($formattedTime);
  }

  public static function getTotalMeditationTimeToday(int $user_id)
  {
    $meditation = Meditation::where('user_id', $user_id)
      ->whereDate('created_at', Carbon::today())
      ->first();
    $meditationTime = $meditation['duration'] ?? "00:00:00";
    $dateFormat = Carbon::createFromFormat('H:i:s', $meditationTime);
    $parts = explode(':', $dateFormat);
    $hour = (int)substr($parts[0], -2);
    $formattedTime = '';
    if ($hour > 0) {
      $formattedTime = $dateFormat->format('G:i:s');
    } else {
      $formattedTime = $dateFormat->format('i:s');
    }

    return ($formattedTime);
  }
}
