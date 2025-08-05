<?php

// namespace App\Listeners;

// use App\Events\OrderPlaced;
// use Illuminate\Support\Facades\Http;
// use Illuminate\Contracts\Queue\ShouldQueue;

// class MockWebhookListener implements ShouldQueue
// {
//     public function handle(OrderPlaced $event): void
//     {
//         Http::post('http://localhost/api/webhooks', [
//             'order_id' => $event->order->id,
//             'user' => $event->order->user->name,
//             'total' => $event->order->total,
//         ]);
//     }
// }