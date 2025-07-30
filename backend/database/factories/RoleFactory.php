<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class RoleFactory extends Factory
{
    public function definition(): array
    {
        $roles = [
            'admin',
            'manager',
            'customer_service',
            'warehouse',
            'marketing',
            'sales',
            'support',
            'moderator',
            'editor',
            'viewer'
        ];

        return [
            'name' => fake()->unique()->randomElement($roles),
        ];
    }

    public function admin(): static
    {
        return $this->state(fn(array $attributes) => [
            'name' => 'admin',
        ]);
    }

    public function manager(): static
    {
        return $this->state(fn(array $attributes) => [
            'name' => 'manager',
        ]);
    }
}
