<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Log;
use App\Models\Order;

class LogSMSJob implements ShouldQueue
{
    use Dispatchable, Queueable;

    protected Order $order;

    /**
     * Create a new job instance.
     */
    public function __construct(Order $order)
    {
        $this->order = $order;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
              Log::info('SMS sent to customer', [
            'order_id' => $this->order->id,
            'user_id' => $this->order->user_id,
            'user_email' => $this->order->user->email ,
            'total_amount' => $this->order->total_amount,
            'status' => $this->order->status,
            'shipping_address' => $this->order->shippingAddress ,
            'billing_address' => $this->order->billingAddress ,
            'items_count' => $this->order->items->count(),
        ]);
    }
}
