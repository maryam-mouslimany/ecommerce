<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders_per_hour', function (Blueprint $table) {
            $table->id();
            $table->dateTime('hour_bucket');
            $table->integer('order_count');
            $table->decimal('revenue', 12, 2);
            $table->timestamps();

            $table->index('hour_bucket');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders_per_hour');
    }
};
