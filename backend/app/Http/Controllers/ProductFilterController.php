<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\ProductFilterService;
use App\Traits\ResponseTrait;
use App\Http\Requests\ProductFilterRequest;

class ProductFilterController extends Controller
{
    use ResponseTrait;

    public function filter(ProductFilterRequest $request)
    {
        $result = ProductFilterService::filter($request);

        if ($result['success']) {
            return $this->responseJSON($result['data'], $result['message'], $result['status']);
        }

        return $this->responseError($result['message'], $result['status']);
    }

    public function show($id)
    {
        $result = ProductFilterService::getProductDetails($id);

        if ($result['success']) {
            return $this->responseJSON($result['data'], $result['message'], $result['status']);
        }

        return $this->responseError($result['message'], $result['status']);
    }

    public function getFilterOptions()
    {
        $result = ProductFilterService::getFilterOptions();

        if ($result['success']) {
            return $this->responseJSON($result['data'], $result['message'], $result['status']);
        }

        return $this->responseError($result['message'], $result['status']);
    }
}
