<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TransactionDetailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('transaction_details')->insert([
            // Detail untuk transaksi 1
            [
                'id' => 1,
                'transaction_id' => 1,
                'product_id' => 1, // Pastikan produk_id sesuai dengan seeder produk
                'quantity' => 2,
                'price_at_time' => 100000.00,
                'subtotal' => 200000.00,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'transaction_id' => 1,
                'product_id' => 2,
                'quantity' => 1,
                'price_at_time' => 50000.00,
                'subtotal' => 50000.00,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Detail untuk transaksi 2
            [
                'id' => 3,
                'transaction_id' => 2,
                'product_id' => 1,
                'quantity' => 3,
                'price_at_time' => 95000.00, // Misal promo
                'subtotal' => 285000.00,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 4,
                'transaction_id' => 2,
                'product_id' => 3,
                'quantity' => 2,
                'price_at_time' => 107500.00, // Misal promo
                'subtotal' => 215000.00,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
