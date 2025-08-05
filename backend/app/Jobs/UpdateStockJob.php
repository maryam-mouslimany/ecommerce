<?php

namespace App\Jobs;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class UpdateStockJob implements ShouldQueue
{
    use InteractsWithQueue, Queueable, SerializesModels;

    protected Order $order;

    public function __construct(Order $order)
    {
        $this->order = $order;
    }

    public function handle(): void
    {
        foreach ($this->order->items as $item) {
            $variant = $item->productVariant;  // Make sure this relation exists
            if ($variant) {
                $variant->decrement('stock', $item->quantity);
            }
        }
    }
}
