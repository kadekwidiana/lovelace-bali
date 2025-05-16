<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PromotionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('promotions')->insert([
            [
                'id' => 1,
                'title' => 'New Year Sale',
                'description' => 'Get amazing discounts this New Year!',
                'image' => '/assets/images/product-example.jpeg',
                'start_date' => '2025-01-01',
                'end_date' => '2025-01-10',
                'discount_percentage' => 20,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'title' => 'Ramadhan Special',
                'description' => 'Exclusive deals during Ramadhan!',
                'image' => '/assets/images/product-example.jpeg',
                'start_date' => '2025-03-01',
                'end_date' => '2025-04-10',
                'discount_percentage' => 15,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'title' => 'Clearance Sale',
                'description' => 'Up to 50% off on selected items.',
                'image' => '/assets/images/product-example.jpeg',
                'start_date' => '2025-05-01',
                'end_date' => '2025-05-15',
                'discount_percentage' => 50,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
