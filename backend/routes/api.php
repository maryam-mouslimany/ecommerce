<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\AdminController;


// API Version 1
Route::group(["prefix" => "admin"], function(){
        Route::get("/getOrder", [AdminController::class, "getOrder"]);
     });
Route::prefix('v1')->group(function () {
    // Guest routes (no authentication required)
    Route::prefix('guest')->group(function () {
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login', [AuthController::class, 'login']);
    });

    // Protected routes (authentication required)
    Route::middleware('auth:sanctum')->prefix('user')->group(function () {
        // Get authenticated user profile
        Route::get('/profile', function (Request $request) {
            return response()->json([
                'success' => true,
                'data' => $request->user(),
                'message' => 'User profile retrieved successfully'
            ]);
        });

        // Logout
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});
