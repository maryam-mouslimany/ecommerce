<?php

namespace Tests\Feature;

use App\Models\Product;
use App\Models\Brand;
use App\Models\ProductVariant;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductFilterTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_filter_products_by_gender()
    {
        // Create products with different genders
        Product::factory()->male()->count(3)->create();
        Product::factory()->female()->count(2)->create();
        Product::factory()->unisex()->count(1)->create();

        $response = $this->getJson('/api/v1/products/filter?gender=male');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'data' => [
                'data',
                'current_page',
                'per_page',
                'total'
            ],
            'message'
        ]);
        
        // Should return only male products
        $this->assertEquals(3, $response->json('data.total'));
    }

    public function test_can_filter_products_by_brand()
    {
        // Create brands
        $brand1 = Brand::factory()->create();
        $brand2 = Brand::factory()->create();

        // Create products with different brands
        Product::factory()->count(3)->create(['brand_id' => $brand1->id]);
        Product::factory()->count(2)->create(['brand_id' => $brand2->id]);

        $response = $this->getJson('/api/v1/products/filter?brand_id=' . $brand1->id);

        $response->assertStatus(200);
        $this->assertEquals(3, $response->json('data.total'));
    }


    public function test_can_filter_products_by_multiple_criteria()
    {
        $brand = Brand::factory()->create();

        // Create a male product from specific brand
        $product = Product::factory()->male()->create(['brand_id' => $brand->id]);
        ProductVariant::factory()->create([
            'product_id' => $product->id,
            'price' => 75
        ]);

        // Create other products that don't match all criteria
        $femaleProduct = Product::factory()->female()->create(['brand_id' => $brand->id]);
        ProductVariant::factory()->create([
            'product_id' => $femaleProduct->id,
            'price' => 75
        ]);

        $response = $this->getJson('/api/v1/products/filter?gender=male&brand_id=' . $brand->id);

        $response->assertStatus(200);
        $this->assertEquals(1, $response->json('data.total'));
    }

    public function test_can_get_filter_options()
    {
        // Create some test data
        $brand1 = Brand::factory()->create();
        $brand2 = Brand::factory()->create();
        
        Product::factory()->male()->create(['brand_id' => $brand1->id]);
        Product::factory()->female()->create(['brand_id' => $brand2->id]);
        Product::factory()->unisex()->create(['brand_id' => $brand1->id]);

        $response = $this->getJson('/api/v1/products/filter-options');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'data' => [
                'brands',
                'genders'
            ],
            'message'
        ]);

        // Should have all genders
        $genders = $response->json('data.genders');
        $this->assertContains('male', $genders);
        $this->assertContains('female', $genders);
        $this->assertContains('unisex', $genders);
    }

    public function test_filter_validation_rejects_invalid_gender()
    {
        $response = $this->getJson('/api/v1/products/filter?gender=invalid');

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['gender']);
    }

    public function test_filter_validation_rejects_invalid_brand_id()
    {
        $response = $this->getJson('/api/v1/products/filter?brand_id=999999');

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['brand_id']);
    }


    public function test_filter_supports_pagination()
    {
        // Create 25 products
        Product::factory()->count(25)->create();

        $response = $this->getJson('/api/v1/products/filter?per_page=10');

        $response->assertStatus(200);
        $this->assertEquals(10, $response->json('data.per_page'));
        $this->assertEquals(25, $response->json('data.total'));
        $this->assertEquals(3, $response->json('data.last_page'));
    }

    public function test_filter_returns_empty_result_when_no_matches()
    {
        // Create some products that won't match the filter
        Product::factory()->male()->count(3)->create();

        $response = $this->getJson('/api/v1/products/filter?gender=female');

        $response->assertStatus(200);
        $this->assertEquals(0, $response->json('data.total'));
    }

    public function test_filter_includes_related_data()
    {
        $brand = Brand::factory()->create();
        $product = Product::factory()->create(['brand_id' => $brand->id]);

        $response = $this->getJson('/api/v1/products/filter');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                'data' => [
                    '*' => [
                        'id',
                        'name',
                        'gender',
                        'brand' => [
                            'id',
                            'name'
                        ],
                        'variants',
                        'images'
                    ]
                ]
            ]
        ]);
    }
}
