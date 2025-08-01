<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\ProductVariant;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderItemFactory extends Factory
{
    public function definition(): array
    {
        $quantity = fake()->numberBetween(1, 3);
        $unitPrice = fake()->randomFloat(2, 25, 200);

        return [
            'order_id' => Order::factory(),
            'product_variant_id' => ProductVariant::inRandomOrder()->first()?->id ?? ProductVariant::factory(),
            'quantity' => $quantity,
            'unit_price' => $unitPrice,
        ];
    }

    public function quantity(int $quantity): static
    {
        return $this->state(fn(array $attributes) => [
            'quantity' => $quantity,
        ]);
    }
}
