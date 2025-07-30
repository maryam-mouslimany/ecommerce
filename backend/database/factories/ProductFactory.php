<?php

namespace Database\Factories;

use App\Models\Brand;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    public function definition(): array
    {
        $perfumeNames = [
            'Noir',
            'Blanc',
            'Rouge',
            'Bleu',
            'Vert',
            'Mystique',
            'Elegance',
            'Passion',
            'Serenity',
            'Harmony',
            'Velvet',
            'Silk',
            'Cashmere',
            'Lace',
            'Satin',
            'Midnight',
            'Dawn',
            'Twilight',
            'Sunset',
            'Aurora',
            'Whisper',
            'Echo',
            'Silence',
            'Melody',
            'Symphony',
            'Enigma',
            'Mystery',
            'Secret',
            'Hidden',
            'Revealed'
        ];

        return [
            'name' => fake()->unique()->randomElement($perfumeNames),
            'brand_id' => Brand::inRandomOrder()->first()?->id ?? Brand::factory(),
            'category_id' => Category::inRandomOrder()->first()?->id ?? Category::factory(),
            'gender' => fake()->randomElement(['male', 'female', 'unisex']),
        ];
    }

    public function male(): static
    {
        return $this->state(fn(array $attributes) => [
            'gender' => 'male',
        ]);
    }

    public function female(): static
    {
        return $this->state(fn(array $attributes) => [
            'gender' => 'female',
        ]);
    }

    public function unisex(): static
    {
        return $this->state(fn(array $attributes) => [
            'gender' => 'unisex',
        ]);
    }
}
