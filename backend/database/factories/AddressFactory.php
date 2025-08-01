<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class AddressFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'line1' => fake()->streetAddress(),
            'line2' => fake()->optional(0.3)->secondaryAddress(),
            'city' => fake()->city(),
            'region' => fake()->state(),
            'postal_code' => fake()->postcode(),
            'country' => fake()->country(),
            'type' => fake()->randomElement(['billing', 'shipping']),
            'is_default' => fake()->boolean(20), // 20% chance of being default
        ];
    }

    public function billing(): static
    {
        return $this->state(fn(array $attributes) => [
            'type' => 'billing',
        ]);
    }

    public function shipping(): static
    {
        return $this->state(fn(array $attributes) => [
            'type' => 'shipping',
        ]);
    }

    public function default(): static
    {
        return $this->state(fn(array $attributes) => [
            'is_default' => true,
        ]);
    }
}
