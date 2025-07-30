<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductImageFactory extends Factory
{
    public function definition(): array
    {
        return [
            'product_id' => Product::factory(),
            'url' => 'https://picsum.photos/800/600?random=' . fake()->numberBetween(1, 1000),
            'thumbnail' => 'https://picsum.photos/200/150?random=' . fake()->numberBetween(1, 1000),
            'sort_order' => fake()->numberBetween(0, 10),
        ];
    }

    public function main(): static
    {
        return $this->state(fn(array $attributes) => [
            'sort_order' => 0,
        ]);
    }
}
