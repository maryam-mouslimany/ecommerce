<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Admin\ProductsController;


// Protected route to get authenticated user
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Authentication Routes
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:api');
});

Route::prefix('admin')->group(function () {
    Route::get('/view-products', [ProductsController::class, 'getProducts'])->middleware('auth:api');
    Route::post('/add-update-product/add', [ProductsController::class, 'addOrUpdate'])->middleware('auth:api');
    Route::post('/add-update-product/{id}', [ProductsController::class, 'addOrUpdate'])->middleware('auth:api');;
});
