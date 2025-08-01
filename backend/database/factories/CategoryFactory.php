<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CategoryFactory extends Factory
{
    public function definition(): array
    {
        $categories = [
            'Floral',
            'Oriental',
            'Woody',
            'Fresh',
            'Citrus',
            'Aromatic',
            'Chypre',
            'Fougère',
            'Gourmand',
            'Aquatic',
            'Spicy',
            'Powdery',
            'Musk',
            'Leather',
            'Tobacco'
        ];

        return [
            'name' => fake()->unique()->randomElement($categories),
        ];
    }
}
