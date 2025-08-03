<?php

namespace App\Services;

use App\Models\Order; 
use App\Events\OrderPlaced;
use Illuminate\Pagination\LengthAwarePaginator;

class AdminService
{
   public static function getOrder(?string $status = null): ?LengthAwarePaginator
    {


        // Filter by order status if provided
        if (isset($status)) {
            Order::where('status', $status);
        }

        $orders = Order::paginate(20);

        return $orders->isNotEmpty() ? $orders : null;
}
}