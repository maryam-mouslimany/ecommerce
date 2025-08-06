<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use App\Events\OrderPlaced;
use App\Listeners\DispatchOrderJobs;

class EventServiceProvider extends ServiceProvider
{
protected $listen = [
    \App\Events\OrderPlaced::class => [
        \App\Listeners\DispatchOrderJobs::class,
    ],
];



    public function boot(): void
    {
        //
    }
}