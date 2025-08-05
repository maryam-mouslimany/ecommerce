<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use App\Events\OrderPlaced;
<<<<<<< HEAD
use App\Listeners\SendInvoiceEmailListener;

class EventServiceProvider extends ServiceProvider
{
  protected $listen = [
    OrderPlaced::class => [
        SendInvoiceEmailListener::class,
        UpdateStockListener::class,
        LogOrderAnalyticsListener::class,
        MockWebhookListener::class,
=======
use App\Listeners\DispatchOrderJobs;

class EventServiceProvider extends ServiceProvider
{
protected $listen = [
    \App\Events\OrderPlaced::class => [
        \App\Listeners\DispatchOrderJobs::class,
>>>>>>> jobs
    ],
];


<<<<<<< HEAD
=======

>>>>>>> jobs
    public function boot(): void
    {
        //
    }
}