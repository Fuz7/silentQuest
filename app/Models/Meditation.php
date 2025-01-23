<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Meditation extends Model
{
    //

    // Define fillable attributes to allow mass assignment
    protected $fillable = [
        'user_id',   // Assuming each meditation belongs to a user
        'duration',  // Duration of meditation
    ];
}
