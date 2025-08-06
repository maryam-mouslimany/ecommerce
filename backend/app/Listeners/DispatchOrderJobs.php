<?php

namespace App\Listeners;

use App\Events\OrderPlaced;
use App\Jobs\SendInvoiceEmail;
use App\Jobs\UpdateStockJob;
use App\Jobs\MockWebhookJob;
use App\Jobs\LogOrderAnalyticsJob;
use App\Jobs\LogSMSJob;

class DispatchOrderJobs
{
    public function handle(OrderPlaced $event): void
    {
        dispatch(new SendInvoiceEmail($event->order));
        dispatch(new UpdateStockJob($event->order));
        dispatch(new MockWebhookJob($event->order));
        dispatch(new LogOrderAnalyticsJob($event->order));
        dispatch(new LogSMSJob($event->order));
    }

}
