<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('stock_logs', function (Blueprint $table) {
            $table->enum('source', ['PURCHASE', 'INTERNAL_PROCUREMENT', 'CUSTOMER_RETURN', 'ADJUSTMENT_IN'])
                ->nullable()
                ->after('type');
            $table->enum('destination', ['SALES', 'INTERNAL_USE', 'DAMAGED', 'ADJUSTMENT_OUT'])
                ->nullable()
                ->after('source');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('stock_logs', function (Blueprint $table) {
            $table->dropColumn(['source', 'destination']);
        });
    }
};
