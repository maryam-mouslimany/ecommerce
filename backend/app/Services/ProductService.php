<?php

namespace App\Services;

use App\Models\Order;
use App\Jobs\SendInvoiceEmail;
use App\Models\Product;

class ProductService
{
    public function handleOrderAndSendInvoice(Order $order)
    {
        SendInvoiceEmail::dispatch($order);
    }

    static function getProducts($request)
    {
        $query = Product::with(['brand', 'category', 'variants', 'images', 'accords']);
        if ($request->filled('brand')) {
            $query->where('brand_id', $request->brand);
        }
        if ($request->filled('name')) {
            $query->where('name', 'like', '%' . $request->name . '%');
        }

        if ($request->filled('stock')) {
            if ($request->stock === 'low') {
                $query->whereHas('variants', fn($q) => $q->where('stock', '<', 10));
            } elseif ($request->stock === 'in') {
                $query->whereHas('variants', fn($q) => $q->where('stock', '>', 0));
            } elseif ($request->stock === 'high') {
                $query->whereHas('variants', fn($q) => $q->where('stock', '>', 50));
            }
        }

        $products = $query->paginate(10);

        if ($products->isEmpty()) {
            return [
                'success' => true,
                'message' => 'No products found with the given filters.',
                'data' => $products,  
                'status' => 200
            ];
        }

        return [
            'success' => true,
            'message' => 'Products fetched successfully',
            'data' => $products,
            'status' => 200
        ];
    }
    static function getProduct($id)
    {
        $product = Product::with(['brand', 'category', 'variants', 'accords', 'images'])
            ->find($id);

        if (!$product) {
            return [
                'success' => false,
                'message' => 'Product not found',
                'status' => 404,
            ];
        }

        return [
            'success' => true,
            'data' => $product,
            'message' => 'Product retrieved successfully',
            'status' => 200,
        ];
    }

    static function addOrUpdate(?int $id, array $data): array
    {
        $action = $data['action'] ?? 'create';

        if ($action === 'update') {
            if (!$id)
                return [
                    'success' => false,
                    'message' => 'Product ID is required for update.',
                    'data' => null,
                    'status' => 422
                ];
            else {
                $product = Product::with(['variants', 'images'])->findOrFail($id);
                $product->update($data);
                $message = 'Product updated successfully';
            }
        } else {
            $product = Product::create($data);
            $message = 'Product created successfully';
        }

        if (isset($data['variants'])) {
            $product->variants()->delete();
            foreach ($data['variants'] as $variant) {
                $product->variants()->create($variant);
            }
        }

        if (isset($data['images'])) {
            $product->images()->delete();
            foreach ($data['images'] as $image) {
                $product->images()->create($image);
            }
        }

        if (isset($data['accords'])) {
            $product->accords()->sync($data['accords']);
        }

        return [
            'success' => true,
            'message' => $message,
            'data' => $product->load(['brand', 'category', 'variants', 'images', 'accords']),
            'status' => 200
        ];
    }
}
