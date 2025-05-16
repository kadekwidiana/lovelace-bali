<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ContactSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('contacts')->insert([
            [
                'email' => 'test@gmail.com',
                'phone' => '0987654321',
                'name' => 'Made',
                'message' => 'Mantap'
            ]
        ]);
    }
}
