<?php

namespace App\Http\Requests\Checkout;

use Illuminate\Foundation\Http\FormRequest;

class CheckoutRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'cart_items' => 'required|array|min:1',
            'cart_items.*.product_variant_id' => 'required|integer|exists:product_variants,id',
            'cart_items.*.quantity' => 'required|integer|min:1',
            'shipping_address' => 'required|array',
            'shipping_address.line1' => 'required|string|max:255',
            'shipping_address.city' => 'required|string|max:255',
            'shipping_address.country' => 'required|string|max:255',
            'shipping_address.postal_code' => 'nullable|string|max:20',
            'billing_address' => 'nullable|array',
            'billing_address.line1' => 'required_with:billing_address|string|max:255',
            'billing_address.city' => 'required_with:billing_address|string|max:255',
            'billing_address.country' => 'required_with:billing_address|string|max:255',
            'billing_address.postal_code' => 'nullable|string|max:20',
        ];
    }

    public function messages(): array
    {
        return [
            'cart_items.required' => 'Cart items are required',
            'cart_items.min' => 'At least one item is required',
            'cart_items.*.product_variant_id.exists' => 'Product variant not found',
            'cart_items.*.quantity.min' => 'Quantity must be at least 1',
            'shipping_address.required' => 'Shipping address is required',
            'shipping_address.line1.required' => 'Shipping address line 1 is required',
            'shipping_address.city.required' => 'Shipping city is required',
            'shipping_address.country.required' => 'Shipping country is required',
        ];
    }
}
