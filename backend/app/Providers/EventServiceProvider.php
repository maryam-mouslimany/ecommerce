<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use App\Events\OrderPlaced;
use App\Listeners\SendInvoiceEmailListener;

class EventServiceProvider extends ServiceProvider
{
  protected $listen = [
    OrderPlaced::class => [
        SendInvoiceEmailListener::class,
        UpdateStockListener::class,
        LogOrderAnalyticsListener::class,
        MockWebhookListener::class,
    ],
];


    public function boot(): void
    {
        //
    }
}