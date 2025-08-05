<?php

namespace App\Services;

use App\Models\Product;
use App\Models\Brand;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Exception;

class ProductFilterService
{
    /**
     * Filter products by gender and brand
     *
     * @param Request $request
     * @return array
     */
    public static function filter(Request $request): array
    {
        try {
            $query = Product::with(['brand', 'variants', 'images']);

            // Filter by gender
            if ($request->has('gender') && !empty($request->gender)) {
                $query->where('gender', $request->gender);
            }

            // Filter by brand
            if ($request->has('brand_id') && !empty($request->brand_id)) {
                $query->where('brand_id', $request->brand_id);
            }


            // Get filtered products with pagination
            $perPage = $request->get('per_page', 15);
            $products = $query->paginate($perPage);

            return [
                'success' => true,
                'data' => $products,
                'message' => 'Products filtered successfully',
                'status' => 200
            ];

        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Failed to filter products: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    /**
     * Get single product details
     *
     * @param int $id
     * @return array
     */
    public static function getProductDetails(int $id): array
    {
        try {
            $product = Product::with(['brand', 'category', 'variants', 'images', 'accords'])
                ->findOrFail($id);

            return [
                'success' => true,
                'data' => $product,
                'message' => 'Product details retrieved successfully',
                'status' => 200
            ];

        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Product not found',
                'status' => 404
            ];
        }
    }

    /**
     * Get available filter options
     *
     * @return array
     */
    public static function getFilterOptions(): array
    {
        try {
            $brands = Brand::select('id', 'name')->get();
            
            $genders = Product::select('gender')
                ->distinct()
                ->whereNotNull('gender')
                ->pluck('gender');

            $filterOptions = [
                'brands' => $brands,
                'genders' => $genders
            ];

            return [
                'success' => true,
                'data' => $filterOptions,
                'message' => 'Filter options retrieved successfully',
                'status' => 200
            ];

        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Failed to get filter options: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }
}
