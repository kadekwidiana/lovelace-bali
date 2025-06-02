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
        Schema::create('raja_ongkir_configs', function (Blueprint $table) {
            $table->id();
            $table->string('api_url')->default('https://rajaongkir.komerce.id');
            $table->string('api_key');
            $table->boolean('is_select')->default(false);
            $table->text('description')->nullable();
            $table->integer('origin_default')->default(26288);
            $table->text('origin_description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('raja_ongkir_configs');
    }
};
