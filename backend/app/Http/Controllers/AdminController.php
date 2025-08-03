<?php

namespace App\Http\Controllers;
use  App\Services\AdminService;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function getOrder(Request $request)
    {
        $status = $request->query('status'); 
        $orders = AdminService::getOrder($status);

        if ($orders) {
            return $this->responseJSON($orders);
        }

        return $this->responseJSON(null, "not found", 404);
    }
}
