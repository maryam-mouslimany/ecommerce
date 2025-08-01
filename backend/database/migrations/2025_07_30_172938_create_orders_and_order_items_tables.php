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
        Schema::create('addresses', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')
                ->constrained('users')
                ->onDelete('cascade');

            $table->string('line1');
            $table->string('line2')->nullable();
            $table->string('city');
            $table->string('region')->nullable();
            $table->string('postal_code')->nullable();
            $table->string('country');
            $table->enum('type', ['billing', 'shipping']);
            $table->boolean('is_default')->default(false);

            $table->timestamps();

            $table->index('user_id');
            $table->index('type');
        });

        Schema::create('orders', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')
                ->constrained('users')
                ->onDelete('cascade');

            $table->foreignId('shipping_address_id')
                ->nullable()
                ->constrained('addresses')
                ->nullOnDelete();

            $table->foreignId('billing_address_id')
                ->nullable()
                ->constrained('addresses')
                ->nullOnDelete();

            $table->decimal('total_amount', 10, 2);

            $table->enum('status', ['pending', 'paid', 'packed', 'shipped'])
                ->default('pending');

            $table->timestamps();
            $table->softDeletes();

            $table->index('user_id');
            $table->index('shipping_address_id');
            $table->index('billing_address_id');
            $table->index('status');
            $table->index('created_at');
        });

        Schema::create('order_items', function (Blueprint $table) {
            $table->id();

            $table->foreignId('order_id')
                ->constrained('orders')
                ->onDelete('cascade');

            $table->foreignId('product_variant_id')
                ->constrained('product_variants')
                ->onDelete('cascade');

            $table->integer('quantity');
            $table->decimal('unit_price', 10, 2);

            $table->timestamps();

            // Add indexes for foreign key columns
            $table->index('order_id');
            $table->index('product_variant_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_items');
        Schema::dropIfExists('orders');
        Schema::dropIfExists('addresses');
    }
};
