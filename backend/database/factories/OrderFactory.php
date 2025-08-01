<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Address;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'shipping_address_id' => Address::factory()->shipping(),
            'billing_address_id' => Address::factory()->billing(),
            'total_amount' => fake()->randomFloat(2, 50, 500),
            'status' => fake()->randomElement(['pending', 'paid', 'packed', 'shipped']),
        ];
    }

    public function pending(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => 'pending',
        ]);
    }

    public function paid(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => 'paid',
        ]);
    }

    public function packed(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => 'packed',
        ]);
    }

    public function shipped(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => 'shipped',
        ]);
    }
}
