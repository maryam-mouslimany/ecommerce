<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\services\AdminOrderService;

class OrderController extends Controller
{
    function editStatus(Request $request, $orderId)
    {
        try {
            $result = AdminOrderService::editStatus($request, $orderId);
            return $this->responseJSON($result, "Order status updated successfully.");
        } catch (\Illuminate\Validation\ValidationException $ve) {
            return $this->responseValidationError($ve->errors());
        } catch (\Exception $e) {
            return $this->responseError($e->getMessage(), 500);
        }
    }
}
