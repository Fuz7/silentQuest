<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Exercise extends Model
{
    //
    protected $fillable = [
        'name',
        'category',
        'description',
        'pattern',
        'cycle',
        'exp',  
    ];
}
