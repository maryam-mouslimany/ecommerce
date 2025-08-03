<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProductFilterController;
use App\Models\User;
use App\Models\Order;
use App\Events\OrderPlaced;


Route::get('/test-invoice', function () {
    // Create a fake user with Mailtrap email
    $user = User::find(399);

    // Create a fake order linked to that user
    $order = Order::factory()->create([
        'user_id' => $user->id,
        'total_amount' => 199.99
    ]);

    // Fire the event
    event(new OrderPlaced($order));

    return 'Invoice event dispatched!';
});
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
    // Product routes
    Route::get('/products', [ProductFilterController::class, 'filter']);
    Route::get('/products/filter-options', [ProductFilterController::class, 'getFilterOptions']);
    Route::get('/products/{id}', [ProductFilterController::class, 'show']);
});
