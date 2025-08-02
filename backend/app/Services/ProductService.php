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

    static function getProducts(array $filters = [])
    {
        $query = Product::with(['brand', 'category', 'variants', 'images', 'accords']);

        if (!empty($filters['brand_id'])) {
            $query->where('brand_id', $filters['brand_id']);
        }
        if (!empty($filters['category_id'])) {
            $query->where('category_id', $filters['category_id']);
        }
        if (!empty($filters['gender'])) {
            $query->where('gender', $filters['gender']);
        }
        if (!empty($filters['stock_min']) || !empty($filters['stock_max'])) {
            $query->whereHas('variants', function ($q) use ($filters) {
                if (!empty($filters['stock_min'])) {
                    $q->where('stock', '>=', $filters['stock_min']);
                }
                if (!empty($filters['stock_max'])) {
                    $q->where('stock', '<=', $filters['stock_max']);
                }
            });
        }

        $products = $query->paginate(10);

        if ($products->isEmpty()) {
            return [
                'success' => false,
                'message' => 'No products found with the given filters.',
                'data' => null,
                'status' => 404
            ];
        }

        return [
            'success' => true,
            'message' => 'Products fetched successfully',
            'data' => $products,
            'status' => 200
        ];
    }

    static function addOrCreate(?int $id, array $data): array
    {
        if ($id) {
            $product = Product::with(['variants', 'images'])->findOrFail($id);
            $product->update($data);
            $message = 'Product updated successfully';
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
