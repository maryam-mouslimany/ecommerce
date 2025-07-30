<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class AuditLogFactory extends Factory
{
    public function definition(): array
    {
        $actions = ['create', 'update', 'delete', 'view', 'export'];
        $subjectTypes = ['User', 'Product', 'Order', 'Brand', 'Category'];

        return [
            'admin_id' => User::factory()->admin(),
            'subject_user_id' => fake()->optional(0.7)->randomElement([User::factory()]),
            'action' => fake()->randomElement($actions),
            'subject_id' => fake()->numberBetween(1, 1000),
            'subject_type' => fake()->randomElement($subjectTypes),
            'changes' => fake()->optional(0.6)->randomElement([
                json_encode([
                    'field' => fake()->randomElement(['name', 'email', 'status', 'price']),
                    'old_value' => fake()->word(),
                    'new_value' => fake()->word(),
                ]),
                null
            ]),
            'ip_address' => fake()->ipv4(),
            'created_at' => fake()->dateTimeBetween('-30 days', 'now'),
        ];
    }

    public function createAction(): static
    {
        return $this->state(fn(array $attributes) => [
            'action' => 'create',
        ]);
    }

    public function update(): static
    {
        return $this->state(fn(array $attributes) => [
            'action' => 'update',
        ]);
    }

    public function delete(): static
    {
        return $this->state(fn(array $attributes) => [
            'action' => 'delete',
        ]);
    }
}
