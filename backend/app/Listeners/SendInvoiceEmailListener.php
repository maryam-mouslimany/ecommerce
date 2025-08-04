<?php

namespace App\Listeners;

use App\Events\OrderPlaced;
// use App\Jobs\SendInvoiceEmail;
use App\Mail\OrderInvoiceMail;
use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendInvoiceEmailListener
{
    public function handle(OrderPlaced $event): void
    {
        // Dispatch the queued job with the order from the event
        // SendInvoiceEmail::dispatch($event->order);
              Mail::to($event->order->user->email)
            ->send(new OrderInvoiceMail($event->order));
    }
}
