<?php

namespace App\Listeners;

use App\Events\OrderPlaced;

class UpdateStockListener
{
    /**
     * Handle the event.
     */
    public function handle(OrderPlaced $event): void
    {
        $order = $event->order;

        foreach ($order->items as $item) {
            $variant = $item->productVariant; 
            
            if ($variant) {
                $variant->stock -= $item->quantity;

                if ($variant->stock < 0) {
                    $variant->stock = 0; 
                }

                $variant->save();
            }
        }
    }
}

