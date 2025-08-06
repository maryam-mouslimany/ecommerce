<?php

namespace App\Services;

use App\Models\Order; 
use App\Events\OrderPlaced;
use Illuminate\Pagination\LengthAwarePaginator;

class AdminService
{
   public static function getOrder(?string $status = null): ?LengthAwarePaginator
    {
        // Start with base query including relationships
        $query = Order::with([
            'user:id,name,email', 
            'shippingAddress:id,line1,line2,city,region,postal_code,country',
            'billingAddress:id,line1,line2,city,region,postal_code,country',
            'items'
        ])->withTrashed(); // Include soft deleted orders for admin view

        // Filter by order status if provided
        if (isset($status) && $status !== 'All' && !empty($status)) {
            $query->where('status', strtolower($status));
        }

        // Order by most recent first
        $query->orderBy('created_at', 'desc');

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