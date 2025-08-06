<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\ProductService;
use App\Http\Requests\Admin\StoreProductRequest;


class ProductsController extends Controller
{
    function getProducts(Request $request)
    {
        try {
            $result = ProductService::getProducts($request);

            return $result['success']
                ? $this->responseJSON($result['data'], $result['message'], $result['status'])
                : $this->responseError($result['message'], $result['status']);
        } catch (\Exception $e) {
            return $this->responseError('Server error: ' . $e->getMessage(), 500);
        }
    }

    function getProduct($id)
    {
        try {
            $result = ProductService::getProduct($id);

            return $result['success']
                ? $this->responseJSON($result['data'], $result['message'], $result['status'])
                : $this->responseError($result['message'], $result['status']);
        } catch (\Exception $e) {
            return $this->responseError('Server error: ' . $e->getMessage(), 500);
        }
    }

    public function addOrUpdate(StoreProductRequest $request, $id = null)
    {
        $result = ProductService::addOrUpdate($id, $request->validated());

        return $result['success']
            ? $this->responseJSON($result['data'], $result['message'], $result['status'])
            : $this->responseError($result['message'], $result['status']);
    }
    function softDelete($id)
    {
        try {
            $product = ProductService::softDelete($id);

            return $this->responseJSON(
                $product,
                'Product soft deleted successfully',
                200
            );
        } catch (\Exception $e) {
            return $this->responseError('Server error: ' . $e->getMessage(), 500);
        }
    }

    function restore($id)
    {
        try {
            $product = ProductService::restore($id);

            if (!$product) {
                return $this->responseError('Product not found or not deleted', 404);
            }

            return $this->responseJSON(
                $product,
                'Product restored successfully',
                200
            );
        } catch (\Exception $e) {
            return $this->responseError('Server error: ' . $e->getMessage(), 500);
        }
    }
}
