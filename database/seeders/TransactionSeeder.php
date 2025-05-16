<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('transactions')->insert([
            [
                'id' => 1,
                'created_by' => 1, // Sesuaikan dengan users seeder (user admin/employee)
                'date' => '2025-03-18',
                'total_price' => 250000.00,
                'note' => 'First transaction, customer ordered multiple products.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'created_by' => 2, // User kedua
                'date' => '2025-03-19',
                'total_price' => 500000.00,
                'note' => 'Bulk purchase for promotional sale.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
