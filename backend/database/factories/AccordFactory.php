<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class AccordFactory extends Factory
{
    public function definition(): array
    {
        $accords = ['Rose', 'Jasmine', 'Lavender', 'Vanilla', 'Sandalwood', 'Bergamot', 'Lemon', 'Orange', 'Grapefruit', 'Lime', 'Patchouli', 'Vetiver', 'Cedar', 'Oakmoss', 'Amber', 'Musk', 'Leather', 'Tobacco', 'Coffee', 'Chocolate', 'Cinnamon', 'Cardamom', 'Pepper', 'Ginger', 'Clove', 'Mint', 'Eucalyptus', 'Pine', 'Sea Salt', 'Rain'];

        return [
            'name' => fake()->unique()->randomElement($accords),
        ];
    }
}
