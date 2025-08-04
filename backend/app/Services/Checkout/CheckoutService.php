<?php

namespace App\Services\Checkout;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Address;
use App\Models\ProductVariant;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class CheckoutService
{
    public function processCheckout(array $data, User $user): array
    {
        try {
            DB::beginTransaction();

            // Validate stock availability
            $stockValidation = $this->validateStock($data['cart_items']);
            if (!$stockValidation['success']) {
                return $stockValidation;
            }

            // Create or get addresses
            $shippingAddress = $this->createOrGetAddress($data['shipping_address'], $user, 'shipping');
            $billingAddress = isset($data['billing_address'])
                ? $this->createOrGetAddress($data['billing_address'], $user, 'billing')
                : $shippingAddress;

            // Calculate total
            $summary = $this->calculateSummary($data['cart_items']);

            // Create order
            $order = Order::create([
                'user_id' => $user->id,
                'shipping_address_id' => $shippingAddress->id,
                'billing_address_id' => $billingAddress->id,
                'total_amount' => $summary['total'],
                'status' => 'pending'
            ]);

            // Create order items and update stock
            foreach ($data['cart_items'] as $item) {
                $variant = ProductVariant::find($item['product_variant_id']);

                OrderItem::create([
                    'order_id' => $order->id,
                    'product_variant_id' => $item['product_variant_id'],
                    'quantity' => $item['quantity'],
                    'unit_price' => $variant->price
                ]);

                // Update stock
                $variant->decrement('stock', $item['quantity']);
            }

            DB::commit();

            return [
                'success' => true,
                'message' => 'Order placed successfully',
                'data' => [
                    'order_id' => $order->id,
                    'total_amount' => $order->total_amount,
                    'status' => $order->status
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

    public function calculateSummary(array $cartItems): array
    {
        $items = [];
        $total = 0;

        foreach ($cartItems as $item) {
            $variant = ProductVariant::with('product')->find($item['product_variant_id']);

            if (!$variant) {
                continue;
            }

            $itemTotal = $variant->price * $item['quantity'];
            $total += $itemTotal;

            $items[] = [
                'product_variant_id' => $variant->id,
                'product_name' => $variant->product->name,
                'quantity' => $item['quantity'],
                'unit_price' => $variant->price,
                'total' => $itemTotal
            ];
        }

        return [
            'items' => $items,
            'total' => $total,
            'item_count' => count($items)
        ];
    }

    private function validateStock(array $cartItems): array
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
                    'message' => "Insufficient stock for {$variant->product->name}. Available: {$variant->stock}",
                    'status' => 422
                ];
            }
        }

        return ['success' => true];
    }

    private function createOrGetAddress(array $addressData, User $user, string $type): Address
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
