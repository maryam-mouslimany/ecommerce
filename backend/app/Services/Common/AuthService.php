<?php

namespace App\Services\Common;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthService
{

    public static function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        $token = Auth::guard('api')->attempt($credentials);

        if (!$token) {
            return [
                'success' => false,
                'message' => 'Invalid credentials',
                'status' => 401
            ];
        }

        $user = Auth::guard('api')->user();

        // Determine redirect URL based on user role
        $redirectUrl = $user->role === 'admin' ? '/admin-view-products' : '/';

        return [
            'success' => true,
            'message' => 'Login successful',
            'data' => [
                'user' => $user,
                'token' => $token,
                'redirect_url' => $redirectUrl,
                'role' => $user->role
            ],
            'status' => 200
        ];
    }

    public static function register(Request $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'role' => 'customer'
        ]);

        // Generate JWT token for the newly created user
        $token = Auth::guard('api')->login($user);

        return [
            'success' => true,
            'message' => 'User registered successfully',
            'data' => [
                'user' => $user,
                'token' => $token
            ],
            'status' => 201
        ];
    }

    public static function logout()
    {
        Auth::guard('api')->logout();

        return [
            'success' => true,
            'message' => 'Logged out successfully',
            'status' => 200
        ];
    }
}
