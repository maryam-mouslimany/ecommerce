<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\ProductImage;
use App\Models\ProductAccord;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Accord;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        // Create 20 products
        Product::factory(20)->create()->each(function ($product) {
            // Create 2-4 variants per product
            $variants = ProductVariant::factory(rand(2, 4))
                ->for($product)
                ->create();

            // Create 3-6 images per product
            ProductImage::factory(rand(3, 6))
                ->for($product)
                ->create();

            // Create 3-8 accords per product
            $accords = Accord::inRandomOrder()->limit(rand(3, 8))->get();
            foreach ($accords as $index => $accord) {
                ProductAccord::create([
                    'product_id' => $product->id,
                    'accord_id' => $accord->id,
                    'sort_order' => $index,
                ]);
            }
        });
    }
}
