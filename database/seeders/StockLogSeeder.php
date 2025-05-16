<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StockLogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('stock_logs')->insert([
            [
                'id' => 1,
                'product_id' => 1, // Pastikan sesuai dengan id di products seeder
                'created_by' => 1, // Admin misalnya
                'type' => 'IN',
                'quantity' => 50,
                'date' => now()->subDays(10),
                'note' => 'Initial stock',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'product_id' => 1,
                'created_by' => 2, // Employee misalnya
                'type' => 'OUT',
                'quantity' => 5,
                'date' => now()->subDays(7),
                'note' => 'Customer purchase',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'product_id' => 2,
                'created_by' => 1,
                'type' => 'IN',
                'quantity' => 30,
                'date' => now()->subDays(8),
                'note' => 'New stock arrival',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 4,
                'product_id' => 3,
                'created_by' => 2,
                'type' => 'OUT',
                'quantity' => 3,
                'date' => now()->subDays(5),
                'note' => 'Sold to customer',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
