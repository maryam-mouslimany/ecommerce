<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Address;
use App\Models\User;
use App\Models\ProductVariant;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        // Create addresses for users
        User::all()->each(function ($user) {
            // Create 1-3 addresses per user
            Address::factory(rand(1, 3))
                ->for($user)
                ->create();
        });

        // Create 100 orders
        Order::factory(100)->create()->each(function ($order) {
            // Create 1-4 items per order
            $items = OrderItem::factory(rand(1, 4))
                ->for($order)
                ->create();

            // Update order total based on items
            $total = $items->sum(function ($item) {
                return $item->quantity * $item->unit_price;
            });

            $order->update(['total_amount' => $total]);
        });
    }
}
