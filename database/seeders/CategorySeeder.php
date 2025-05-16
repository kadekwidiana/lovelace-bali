<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert([
            [
                'id' => 1,
                'name' => 'Clothing',
                'description' => 'Various types of clothing items.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'name' => 'Accessories',
                'description' => 'Accessories like belts, hats, etc.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'name' => 'Footwear',
                'description' => 'Shoes, sandals, and other footwear.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
