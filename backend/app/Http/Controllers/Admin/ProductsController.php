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
            $result = ProductService::getProducts($request->query());

            return $result['success']
                ? $this->responseJSON($result['data'], $result['message'], $result['status'])
                : $this->responseError($result['message'], $result['status']);
        } catch (\Exception $e) {
            return $this->responseError('Server error: ' . $e->getMessage(), 500);
        }
    }

    public function addOrCreate( StoreProductRequest $request, $id = null)
    {
        $result = ProductService::addOrCreate($id, $request->validated());

        return $result['success']
            ? $this->responseJSON($result['data'], $result['message'], $result['status'])
            : $this->responseError($result['message'], $result['status']);
    }
}
