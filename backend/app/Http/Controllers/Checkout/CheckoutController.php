<?php

namespace App\Http\Controllers\Checkout;

use App\Http\Controllers\Controller;
use App\Http\Requests\Checkout\CheckoutRequest;
use App\Services\Checkout\CheckoutService;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;

class CheckoutController extends Controller
{
    use ResponseTrait;

    protected $checkoutService;

    public function __construct(CheckoutService $checkoutService)
    {
        $this->checkoutService = $checkoutService;
    }

    public function processCheckout(CheckoutRequest $request)
    {
        try {
            $result = $this->checkoutService->processCheckout($request->validated(), $request->user());

            return $this->responseJSON($result['data'], $result['message'], $result['status']);
        } catch (\Exception $e) {
            return $this->responseError($e->getMessage(), 500);
        }
    }

    public function getCheckoutSummary(Request $request)
    {
        try {
            $cartItems = $request->input('cart_items', []);
            $summary = $this->checkoutService->calculateSummary($cartItems);

            return $this->responseJSON($summary, 'Checkout summary calculated successfully');
        } catch (\Exception $e) {
            return $this->responseError($e->getMessage(), 500);
        }
    }
}
