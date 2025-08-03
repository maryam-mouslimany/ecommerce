<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\ProductFilterController;

use App\Http\Controllers\Admin\ProductsController;


// API Version 1
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
    // Product routes
    Route::get('/products', [ProductFilterController::class, 'filter']);
    Route::get('/products/filter-options', [ProductFilterController::class, 'getFilterOptions']);
    Route::get('/products/{id}', [ProductFilterController::class, 'show']);
});

Route::prefix('admin')->group(function () {
    Route::get('/view-products', [ProductsController::class, 'getProducts']);
    Route::post('/add-update-products/{id?}', [ProductsController::class, 'addOrUpdate']);
    Route::get('/view-product/{id}', [ProductsController::class, 'getProduct']);
});
