<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Brand;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $brands = [
            ['name' => 'Rolex'],
            ['name' => 'Omega'],
            ['name' => 'Patek Philippe'],
            ['name' => 'Audemars Piguet'],
            ['name' => 'Tag Heuer'],
            ['name' => 'Breitling'],
        ];

        foreach ($brands as $brand) {
            Brand::create($brand);
        }
    }
}
