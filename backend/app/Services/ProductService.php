<?php

namespace App\Services;

use App\Models\Order;
use App\Jobs\SendInvoiceEmail;

class ProductService
{
     public function handleOrderAndSendInvoice(Order $order)
    {
        SendInvoiceEmail::dispatch($order);
    }
}
