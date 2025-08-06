<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    /**
     * Get orders for the authenticated customer
     */
    public function getCustomerOrders(Request $request)
    {
        try {
            $user = Auth::user();
            
            if (!$user) {
                return $this->responseError('Unauthorized', 401);
            }

            $perPage = $request->get('per_page', 10);
            $status = $request->get('status');

            $query = Order::where('user_id', $user->id)
                          ->with(['user', 'items', 'shippingAddress', 'billingAddress'])
                          ->orderBy('created_at', 'desc');

            // Filter by status if provided
            if ($status && $status !== 'all') {
                $query->where('status', strtolower($status));
            }

            $orders = $query->paginate($perPage);

            return $this->responseJSON($orders, 'Orders retrieved successfully');

        } catch (\Exception $e) {
            return $this->responseError($e->getMessage(), 500);
        }
    }

    /**
     * Get specific order details for the authenticated customer
     */
    public function getOrderDetails(Request $request, $orderId)
    {
        try {
            $user = Auth::user();
            
            if (!$user) {
                return $this->responseError('Unauthorized', 401);
            }

            $order = Order::where('user_id', $user->id)
                         ->where('id', $orderId)
                         ->with([
                             'user', 
                             'items.productVariant.product',
                             'shippingAddress',
                             'billingAddress'
                         ])
                         ->first();

            if (!$order) {
                return $this->responseError('Order not found', 404);
            }

            return $this->responseJSON($order, 'Order details retrieved successfully');

        } catch (\Exception $e) {
            return $this->responseError($e->getMessage(), 500);
        }
    }
}
