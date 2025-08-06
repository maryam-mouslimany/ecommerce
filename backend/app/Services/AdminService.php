<?php

namespace App\Services;

use App\Models\Order; 
use App\Events\OrderPlaced;
use Illuminate\Pagination\LengthAwarePaginator;
use App\Models\Product;
use Illuminate\Http\Request;

class AdminService
{
   public static function getOrder(?string $status = null): ?LengthAwarePaginator
    {
        $query = Order::withTrashed();

        // Filter by order status if provided
        if (isset($status)) {
            $query->where('status', $status);
        }

        $orders = $query->paginate(20);

        return $orders->isNotEmpty() ? $orders : null;
}
public static function postProduct( Request $request){
       $product = Product::create([
                'name' => $request->name,
                'brand_id' => $request->brand_id,
                'category_id' => $request->category_id,
                'gender' => $request->gender,
                
            ]);
        return $product;
}
}