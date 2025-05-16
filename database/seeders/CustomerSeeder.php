<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $userId = DB::table('users')->insertGetId([
            'name' => 'Customer One',
            'email' => 'customer1@example.com',
            'password' => Hash::make('password123'),
            'role' => 'CUSTOMER',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('customers')->insert([
            'user_id' => $userId,
            'phone_number' => '081234567890',
            'city_code' => '501',
            'city_name' => 'Denpasar',
            'address' => 'Jl. Raya No.123, Denpasar',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
