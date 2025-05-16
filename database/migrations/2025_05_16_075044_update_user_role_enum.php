<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        DB::statement("ALTER TABLE users MODIFY role ENUM('EMPLOYEE', 'ADMIN', 'CUSTOMER') DEFAULT 'EMPLOYEE'");
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        DB::statement("ALTER TABLE users MODIFY role ENUM('EMPLOYEE', 'ADMIN') DEFAULT 'EMPLOYEE'");
    }
};
