<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\Brand;
use App\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CheckoutTest extends TestCase
{
    use RefreshDatabase;

    public function test_checkout_process()
    {
        // Create test data
        $user = User::factory()->create();
        $brand = Brand::factory()->create();
        $category = Category::factory()->create();

        $product = Product::factory()->create([
            'brand_id' => $brand->id,
            'category_id' => $category->id,
        ]);

        $variant = ProductVariant::factory()->create([
            'product_id' => $product->id,
            'price' => 100.00,
            'stock' => 10
        ]);

        $checkoutData = [
            'cart_items' => [
                [
                    'product_variant_id' => $variant->id,
                    'quantity' => 2
                ]
            ],
            'shipping_address' => [
                'line1' => '123 Test Street',
                'city' => 'Test City',
                'country' => 'Test Country',
                'postal_code' => '12345'
            ]
        ];

        $response = $this->actingAs($user, 'api')
            ->postJson('/api/v1/user/checkout', $checkoutData);

        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
                'message' => 'Order placed successfully'
            ]);

        // Verify order was created
        $this->assertDatabaseHas('orders', [
            'user_id' => $user->id,
            'total_amount' => 200.00,
            'status' => 'pending'
        ]);

        // Verify stock was updated
        $this->assertDatabaseHas('product_variants', [
            'id' => $variant->id,
            'stock' => 8
        ]);
    }

    public function test_checkout_summary()
    {
        $user = User::factory()->create();
        $brand = Brand::factory()->create();
        $category = Category::factory()->create();

        $product = Product::factory()->create([
            'brand_id' => $brand->id,
            'category_id' => $category->id,
        ]);

        $variant = ProductVariant::factory()->create([
            'product_id' => $product->id,
            'price' => 50.00,
            'stock' => 5
        ]);

        $cartItems = [
            [
                'product_variant_id' => $variant->id,
                'quantity' => 3
            ]
        ];

        $response = $this->actingAs($user, 'api')
            ->getJson('/api/v1/user/checkout/summary?cart_items=' . json_encode($cartItems));

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Checkout summary calculated successfully'
            ]);
    }
}
