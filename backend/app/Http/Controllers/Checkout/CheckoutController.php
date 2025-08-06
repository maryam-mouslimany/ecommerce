<?php

namespace App\Http\Controllers\Checkout;

use App\Http\Controllers\Controller;
use App\Http\Requests\Checkout\CheckoutRequest;
use App\Services\Checkout\CheckoutService;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Events\OrderPlaced;


class CheckoutController extends Controller
{
    use ResponseTrait;

    public function processCheckout(CheckoutRequest $request)
    {
        $result = CheckoutService::processCheckout($request->validated(), $request->user());

        if ($result['success']) {
            
            $order = Order::find($result['data']['order_id']);
            event(new OrderPlaced($order));
            return $this->responseJSON($result['data'], $result['message'], $result['status']);
        }

        return $this->responseError($result['message'], $result['status']);
    }

    public function getCheckoutSummary(Request $request)
    {
        $result = CheckoutService::calculateSummary($request);

        if ($result['success']) {

            return $this->responseJSON($result['data'], $result['message'], $result['status']);
        }

        return $this->responseError($result['message'], $result['status']);
    }
}
