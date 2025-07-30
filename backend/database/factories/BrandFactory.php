<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class BrandFactory extends Factory
{
    public function definition(): array
    {
        $brands = ['Chanel', 'Dior', 'Guerlain', 'Hermès', 'Tom Ford', 'Jo Malone', 'Byredo', 'Le Labo', 'Maison Margiela', 'Creed', 'Penhaligon\'s', 'Diptyque', 'Atelier Cologne', 'Acqua di Parma', 'Bvlgari', 'Cartier', 'Van Cleef & Arpels', 'Boucheron'];

        return [
            'name' => fake()->unique()->randomElement($brands),
        ];
    }
}
