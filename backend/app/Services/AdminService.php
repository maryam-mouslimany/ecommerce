<?php

namespace App\Services;

use App\Models\Order; 
use App\Events\OrderPlaced;
use Illuminate\Pagination\LengthAwarePaginator;

class AdminService
{
    public static function getOrder(): ?LengthAwarePaginator
    {
        $orders = Order::paginate(20);
          foreach ($orders as $order) {
            event(new OrderPlaced($order));
        }

        return $orders->isNotEmpty() ? $orders : null;
    }
}