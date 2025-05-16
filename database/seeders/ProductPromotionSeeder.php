<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductPromotionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('product_promotions')->insert([
            [
                'id' => 1,
                'product_id' => 1, // Sesuaikan dengan product_id di ProductsTableSeeder
                'promotion_id' => 1, // New Year Sale
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'product_id' => 2, // Produk kedua
                'promotion_id' => 2, // Ramadhan Special
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'product_id' => 3, // Produk ketiga
                'promotion_id' => 3, // Clearance Sale
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 4,
                'product_id' => 1, // Produk pertama juga ikut Clearance Sale
                'promotion_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
