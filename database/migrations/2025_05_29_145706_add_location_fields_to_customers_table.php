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
        Schema::table('customers', function (Blueprint $table) {
            $table->string('province_code')->after('phone_number')->default('');
            $table->string('province_name')->after('province_code')->default('');
            $table->string('sub_district')->after('city_name')->default('');
            $table->string('village')->after('sub_district')->default('');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('customers', function (Blueprint $table) {
            $table->dropColumn(['province_code', 'province_name', 'sub_district', 'village']);
        });
    }
};
