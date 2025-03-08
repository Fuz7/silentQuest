<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{

    public function register(Request $request)
    {
        $fields = $request->validate([
            'username' => ['required', 'max:255'],
            'email' => [
                'required',
                'max:255',
                'email',
                'unique:users'
            ],
            'password' => ['required', 'min:8'],
        ]);

        $user = User::create($fields);

        Auth::login($user);

        return redirect()->route('home');
    }

    public function login(Request $request)
    {

        $fields = $request->validate([
            'email' => ['required', 'max:255', 'email'],
            'password' => ['required', 'min:8'],
        ]);

        if (Auth::attempt($fields)) {
            $request->session()->regenerate();
            return redirect()->intended();
        } else {
            return back()->withErrors([
                'failed' => 'The credentials do not match our records',
            ]);
        }
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('login');
    }
}
