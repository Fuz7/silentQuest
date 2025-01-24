<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserExercise extends Model
{

    protected $fillable = [
        'user_id',
        'exercise_id',
        'count',
    ];
}
