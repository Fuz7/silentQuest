<?php
namespace App\Helpers;

use Carbon\Carbon;

class DateHelper
{   
    public static function formatDate($date)
    {
        return Carbon::parse($date)->format('Y-m-d');
    }

    public static function getCurrMonthName()
    {
        $month = Carbon::now()->format('F');
        return $month;
    }
    public static function getCurrentDayAbbrevation()
    {
        $monthAbbreviation = Carbon::now()->format('D');
        return $monthAbbreviation;
    }

    public static function getCurrentWeekdays(){


      $today = Carbon::now();

      $daysRange = [];
      for ($i = -3; $i <= 3; $i++) {
          $daysRange[] = $today->copy()->addDays($i)->format('d');
      };

      return $daysRange;

    }
}