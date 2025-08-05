<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProductFilterController;
use App\Http\Controllers\Admin\ProductsController;
use App\Http\Controllers\Checkout\CheckoutController;

use App\Models\User;
use App\Models\Order;
use App\Events\OrderPlaced;

use App\Http\Controllers\BrandController;
use App\Http\Controllers\AccordController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\GenderController;

Route::get('/test-invoice', function () {
    $user = User::find(399);

    $order = Order::factory()->create([
        'user_id' => $user->id,
        'total_amount' => 199.99
    ]);

    event(new OrderPlaced($order));

    return 'Invoice event dispatched!';
});

Route::prefix('v1')->group(function () {
    // Guest routes (no authentication required)
    Route::prefix('guest')->group(function () {
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login', [AuthController::class, 'login']);
    });

    // Protected routes JWT
    Route::middleware('auth:api')->prefix('user')->group(function () {
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

        // Checkout routes
        Route::post('/checkout', [CheckoutController::class, 'processCheckout']);
        Route::get('/checkout/summary', [CheckoutController::class, 'getCheckoutSummary']);
    });

    // Product routes
    Route::get('/products/filter-options', [ProductFilterController::class, 'getFilterOptions']);
    Route::get('/products/filter', [ProductFilterController::class, 'filter']);
    Route::get('/products', [ProductFilterController::class, 'filter']);
    Route::get('/products/{id}', [ProductFilterController::class, 'show']);
});

Route::prefix('admin')->group(function () {
    Route::get('/view-products', [ProductsController::class, 'getProducts']);
    Route::get("/getOrder/{status?}", [AdminController::class, "getOrder"]);
    Route::post("/postProduct", [AdminController::class, "postProduct"]);
    Route::post('/add-update-products/{id?}', [ProductsController::class, 'addOrUpdate']);
    Route::get('/view-product/{id}', [ProductsController::class, 'getProduct']);
});

Route::get('/brands', [BrandController::class, 'getBrands']);
Route::get('/categories', [CategoryController::class, 'getCategories']);
Route::get('/accords', [AccordController::class, 'getAccords']);
