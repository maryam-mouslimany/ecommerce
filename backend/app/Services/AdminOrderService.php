<?php

namespace App\services;

use App\Models\Order;
use App\Notifications\OrderStatusUpdated;

class AdminOrderService
{
    static function editStatus($request, $orderId)
    {
        $request->validate([
            'status' => 'required|in:pending,paid,packed,shipped',
        ]);
        $order = Order::findOrFail($orderId);
        $order->status = $request->input('status');
        $order->save();
        $order->user->notify(new OrderStatusUpdated($order));  

        return $order;
    }
}
