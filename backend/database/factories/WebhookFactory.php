<?php

namespace Database\Factories;

use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

class WebhookFactory extends Factory
{
    public function definition(): array
    {
        return [
            'order_id' => Order::factory(),
            'payload' => json_encode([
                'order_id' => fake()->numberBetween(1, 1000),
                'status' => fake()->randomElement(['pending', 'paid', 'packed', 'shipped']),
                'total_amount' => fake()->randomFloat(2, 50, 500),
                'timestamp' => now()->toISOString(),
            ]),
            'status' => fake()->randomElement(['pending', 'processed', 'failed']),
            'retry_count' => fake()->numberBetween(0, 3),
            'processed_at' => fake()->optional(0.7)->dateTimeBetween('-1 day', 'now'),
        ];
    }

    public function pending(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => 'pending',
            'processed_at' => null,
        ]);
    }

    public function processed(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => 'processed',
            'processed_at' => now(),
        ]);
    }

    public function failed(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => 'failed',
            'processed_at' => null,
        ]);
    }
}
