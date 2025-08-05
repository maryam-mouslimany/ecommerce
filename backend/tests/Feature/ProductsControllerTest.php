<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Product;
use App\Models\ProductVariant;


class ProductsControllerTest extends TestCase
{
    use RefreshDatabase;

   public function test_it_returns_products_list_with_variants_and_accords()
{
    // Create 3 products, each with 2 variants
    $products = Product::factory()
        ->has(ProductVariant::factory()->count(2), 'variants')
        ->count(3)
        ->create();

    // Create some accords and attach randomly
    $accords = \App\Models\Accord::factory()->count(5)->create();
    $products->each(function ($product) use ($accords) {
        $product->accords()->attach($accords->random(2)); // attach 2 random accords
    });

    $response = $this->getJson('api/admin/view-products');

    $response->assertStatus(200)
             ->assertJsonStructure([
                 'success',
                 'message',
                 'data' => [
                     'data' => [
                         '*' => [
                             'id',
                             'name',
                             'variants',
                             'accords',
                         ]
                     ]
                 ]
             ]);
}
}
