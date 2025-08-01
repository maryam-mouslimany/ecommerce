<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class OrdersPerHourFactory extends Factory
{
    public function definition(): array
    {
        $orderCount = fake()->numberBetween(0, 25);
        $averageOrderValue = fake()->randomFloat(2, 75, 200);
        $revenue = $orderCount * $averageOrderValue;

        return [
            'hour_bucket' => fake()->dateTimeBetween('-30 days', 'now'),
            'order_count' => $orderCount,
            'revenue' => $revenue,
        ];
    }

    public function highActivity(): static
    {
        return $this->state(fn(array $attributes) => [
            'order_count' => fake()->numberBetween(15, 25),
            'revenue' => fake()->randomFloat(2, 1500, 3000),
        ]);
    }

    public function lowActivity(): static
    {
        return $this->state(fn(array $attributes) => [
            'order_count' => fake()->numberBetween(0, 5),
            'revenue' => fake()->randomFloat(2, 0, 500),
        ]);
    }
}
