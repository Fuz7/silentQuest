<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
 
    public function register(Request $request){
        $request->validate([
            'username'=>['required','max:255'],
            'email'=>['required','max:255','email'],
            'password'=>['required','min:8'],
        ]);
       dd($request);
    }
    
    public function login(Request $request){
        $request->validate([
            'email'=>['required','max:255','email'],
            'password'=>['required','min:8'],
        ]);
    }

}
