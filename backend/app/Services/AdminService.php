<?php

namespace App\Services;

use App\Models\Order; 
use Illuminate\Pagination\LengthAwarePaginator;

class AdminService
{
    public static function getOrder(): ?LengthAwarePaginator
    {
        $orders = Order::paginate(20);

        return $orders->isNotEmpty() ? $orders : null;
    }
}