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
        ],
    ];

    public function boot(): void
    {
        //
    }
}