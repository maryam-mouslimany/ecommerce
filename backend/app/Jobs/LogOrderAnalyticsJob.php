<?php

namespace App\Jobs;

use App\Models\Order;
use App\Models\OrdersPerHour;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class LogOrderAnalyticsJob implements ShouldQueue
{
    use InteractsWithQueue, Queueable, SerializesModels;

    protected Order $order;

    public function __construct(Order $order)
    {
        $this->order = $order;
    }

    public function handle(): void
    {
        $hourBucket = $this->order->created_at->format('Y-m-d H:00:00');

        // Find or create the record for this hour
        $record = OrdersPerHour::firstOrNew(['hour_bucket' => $hourBucket]);

        // If new record, initialize counts
        if (!$record->exists) {
            $record->order_count = 0;
            $record->revenue = 0;
        }

        // Increment counts
        $record->order_count += 1;
        $record->revenue += $this->order->total_price; 

        $record->save();
    }
}

