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
        Schema::create('audit_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('admin_id')
                ->constrained('users')
                ->onDelete('cascade');
            $table->foreignId('subject_user_id')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();
            $table->string('action');
            $table->unsignedBigInteger('subject_id');
            $table->string('subject_type');
            $table->json('changes')
                ->nullable();
            $table->string('ip_address')
                ->nullable();
            $table->timestamp('created_at');

            $table->index('admin_id');
            $table->index('subject_user_id');
            $table->index('action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audit_logs');
    }
};
