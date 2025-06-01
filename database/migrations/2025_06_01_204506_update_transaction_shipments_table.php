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
        Schema::table('transaction_shipments', function (Blueprint $table) {
            $table->string('province_code')->nullable()->change();
            $table->string('province_name')->nullable()->change();
            $table->string('city_code')->nullable()->change();
            $table->string('city_name')->nullable()->change();
            $table->string('sub_district')->nullable()->change();
            $table->string('village')->nullable()->change();

            $table->string('recipient_name')->nullable()->after('phone_number');
            $table->json('destination_json')->nullable()->after('address');
            $table->json('cost_json')->nullable()->after('destination_json');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('transaction_shipments', function (Blueprint $table) {
            $table->string('province_code')->nullable(false)->change();
            $table->string('province_name')->nullable(false)->change();
            $table->string('city_code')->nullable(false)->change();
            $table->string('city_name')->nullable(false)->change();
            $table->string('sub_district')->nullable(false)->change();
            $table->string('village')->nullable(false)->change();

            $table->dropColumn(['destination_json', 'cost_json', 'recipient_name']);
        });
    }
};
