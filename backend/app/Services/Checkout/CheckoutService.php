<?php

namespace App\Services\Checkout;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Address;
use App\Models\ProductVariant;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CheckoutService
{
    public static function processCheckout(array $data, User $user): array
    {
        try {
            DB::beginTransaction();

            // Validate stock availability
            $stockValidation = self::validateStock($data['cart_items']);
            if (!$stockValidation['success']) {
                return $stockValidation;
            }

            // Create addresses (simplified)
            $shippingAddress = self::createAddress($data['shipping_address'], $user, 'shipping');
            $billingAddress = self::createAddress($data['billing_address'] ?? $data['shipping_address'], $user, 'billing');

            // Calculate total
            $total = self::calculateTotal($data['cart_items']);

            // Create order
            $order = Order::create([
                'user_id' => $user->id,
                'shipping_address_id' => $shippingAddress->id,
                'billing_address_id' => $billingAddress->id,
                'total_amount' => $total,
                'status' => 'pending'
            ]);

            // Create order items
            foreach ($data['cart_items'] as $item) {
                $variant = ProductVariant::find($item['product_variant_id']);

                OrderItem::create([
                    'order_id' => $order->id,
                    'product_variant_id' => $item['product_variant_id'],
                    'quantity' => $item['quantity'],
                    'unit_price' => $variant->price
                ]);

                // Stock update will be handled by UpdateStockJob via OrderPlaced event
            }

            DB::commit();

            return [
                'success' => true,
                'message' => 'Order placed successfully',
                'data' => [
                    'order_id' => $order->id,
                    'total_amount' => $order->total_amount
                ],
                'status' => 201
            ];
        } catch (\Exception $e) {
            DB::rollBack();
            return [
                'success' => false,
                'message' => 'Failed to process checkout: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    public static function calculateSummary(Request $request): array
    {
        try {
            $cartItems = $request->input('cart_items', []);

            // Handle cart items passed as JSON string in query parameter
            if (is_string($cartItems)) {
                $cartItems = json_decode($cartItems, true);
            }

            if (empty($cartItems)) {
                return [
                    'success' => false,
                    'message' => 'Cart items are required',
                    'status' => 422
                ];
            }

            $total = self::calculateTotal($cartItems);

            return [
                'success' => true,
                'data' => [
                    'total' => $total,
                    'item_count' => count($cartItems)
                ],
                'message' => 'Checkout summary calculated successfully',
                'status' => 200
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => 'Failed to calculate summary: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    private static function calculateTotal(array $cartItems): float
    {
        $total = 0;

        foreach ($cartItems as $item) {
            $variant = ProductVariant::find($item['product_variant_id']);
            if ($variant) {
                $total += $variant->price * $item['quantity'];
            }
        }

        return $total;
    }

    private static function validateStock(array $cartItems): array
    {
        foreach ($cartItems as $item) {
            $variant = ProductVariant::find($item['product_variant_id']);

            if (!$variant) {
                return [
                    'success' => false,
                    'message' => 'Product variant not found',
                    'status' => 404
                ];
            }

            if ($variant->stock < $item['quantity']) {
                return [
                    'success' => false,
                    'message' => 'Insufficient stock',
                    'status' => 422
                ];
            }
        }

        return ['success' => true];
    }

    private static function createAddress(array $addressData, User $user, string $type): Address
    {
        return Address::create([
            'user_id' => $user->id,
            'line1' => $addressData['line1'],
            'line2' => $addressData['line2'] ?? null,
            'city' => $addressData['city'],
            'region' => $addressData['region'] ?? null,
            'postal_code' => $addressData['postal_code'] ?? null,
            'country' => $addressData['country'],
            'type' => $type,
            'is_default' => false
        ]);
    }
}
