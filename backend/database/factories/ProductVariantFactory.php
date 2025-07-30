<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductVariantFactory extends Factory
{
    public function definition(): array
    {
        $sizes = [30, 50, 75, 100, 125, 150, 200];
        $size = fake()->randomElement($sizes);

        // Price based on size (larger = more expensive)
        $basePrice = match ($size) {
            30 => fake()->numberBetween(25, 45),
            50 => fake()->numberBetween(45, 75),
            75 => fake()->numberBetween(65, 95),
            100 => fake()->numberBetween(85, 125),
            125 => fake()->numberBetween(105, 145),
            150 => fake()->numberBetween(125, 165),
            200 => fake()->numberBetween(165, 225),
            default => fake()->numberBetween(50, 100)
        };

        return [
            'product_id' => Product::factory(),
            'size_ml' => $size,
            'price' => $basePrice,
            'stock' => fake()->numberBetween(0, 50),
        ];
    }

    public function inStock(): static
    {
        return $this->state(fn(array $attributes) => [
            'stock' => fake()->numberBetween(1, 50),
        ]);
    }

    public function outOfStock(): static
    {
        return $this->state(fn(array $attributes) => [
            'stock' => 0,
        ]);
    }
}
