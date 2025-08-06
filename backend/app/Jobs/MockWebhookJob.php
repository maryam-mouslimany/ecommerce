<?php

// app/Jobs/MockWebhook.php
namespace App\Jobs;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;

class MockWebhookJob implements ShouldQueue
{
    use InteractsWithQueue, Queueable, SerializesModels;

    public $tries = 3;

    public function __construct(public Order $order) {}

    public function handle(): void
    {
        Http::post('http://localhost/api/mock-webhook', [
            'order_id' => $this->order->id,
            'status'   => $this->order->status,
            'total'    => $this->order->total_amount,
        ]);
    }
}
