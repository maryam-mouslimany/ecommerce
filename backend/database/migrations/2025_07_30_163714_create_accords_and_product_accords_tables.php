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
        Schema::create('accords', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->timestamps();
        });

        Schema::create('product_accords', function (Blueprint $table) {
            $table->foreignId('product_id')
                ->constrained('products')
                ->onDelete('cascade');

            $table->foreignId('accord_id')
                ->constrained('accords')
                ->onDelete('cascade');

            $table->integer('sort_order')
                ->default(0);

            // Composite primary key
            $table->primary(['product_id', 'accord_id', 'sort_order']);

            // Indexes for foreign key columns
            $table->index('product_id');
            $table->index('accord_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_accords');
        Schema::dropIfExists('accords');
    }
};
