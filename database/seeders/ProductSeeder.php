<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Brand;
use App\Models\Category;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name' => 'Submariner Date 41mm Black',
                'slug' => 'rolex-submariner-date-41mm-black',
                'description' => 'The iconic Rolex Submariner is a symbol of excellence in watchmaking. With its distinctive design and robust construction, it\'s the perfect timepiece for professionals.',
                'price' => 14550,
                'stock' => 3,
                'brand_id' => Brand::where('name', 'Rolex')->first()?->id ?? 1,
                'category_id' => Category::where('name', 'Dive')->first()?->id ?? 3,
                'image_url' => 'https://images.unsplash.com/photo-1579546929662-711aa50e9f11?w=600&h=600&fit=crop',
            ],
            [
                'name' => 'Cosmograph Daytona Steel',
                'slug' => 'rolex-cosmograph-daytona-steel',
                'description' => 'The most sought-after sports chronograph. Rolex\'s legendary racing watch with impeccable precision.',
                'price' => 42000,
                'stock' => 1,
                'brand_id' => Brand::where('name', 'Rolex')->first()?->id ?? 1,
                'category_id' => Category::where('name', 'Chronograph')->first()?->id ?? 5,
                'image_url' => 'https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=600&h=600&fit=crop',
            ],
            [
                'name' => 'Seamaster Planet Ocean 600M',
                'slug' => 'omega-seamaster-planet-ocean-600m',
                'description' => 'The Seamaster Planet Ocean combines elegance with technical excellence. Professional-grade diving watch with co-axial movement.',
                'price' => 6350,
                'stock' => 7,
                'brand_id' => Brand::where('name', 'Omega')->first()?->id ?? 2,
                'category_id' => Category::where('name', 'Dive')->first()?->id ?? 3,
                'image_url' => 'https://images.unsplash.com/photo-1523206489230-c012066a36c7?w=600&h=600&fit=crop',
            ],
            [
                'name' => 'Speedmaster Professional Moonwatch',
                'slug' => 'omega-speedmaster-professional-moonwatch',
                'description' => 'The only watch on the moon. Omega\'s legendary chronograph trusted by NASA astronauts.',
                'price' => 5800,
                'stock' => 4,
                'brand_id' => Brand::where('name', 'Omega')->first()?->id ?? 2,
                'category_id' => Category::where('name', 'Chronograph')->first()?->id ?? 5,
                'image_url' => 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&h=600&fit=crop',
            ],
            [
                'name' => 'Nautilus 5711/1A-001',
                'slug' => 'patek-philippe-nautilus-5711-001',
                'description' => 'The legendary Patek Philippe Nautilus. One of the most coveted watches defining modern luxury.',
                'price' => 35000,
                'stock' => 1,
                'brand_id' => Brand::where('name', 'Patek Philippe')->first()?->id ?? 3,
                'category_id' => Category::where('name', 'Dress')->first()?->id ?? 2,
                'image_url' => 'https://images.unsplash.com/photo-1559056199-641a0ac8b3f4?w=600&h=600&fit=crop',
            ],
            [
                'name' => 'Aquanaut 5167A Travel Time',
                'slug' => 'patek-philippe-aquanaut-5167a',
                'description' => 'Patek Philippe\'s sports watch with integrated bracelet and advanced complications.',
                'price' => 28700,
                'stock' => 2,
                'brand_id' => Brand::where('name', 'Patek Philippe')->first()?->id ?? 3,
                'category_id' => Category::where('name', 'Sports')->first()?->id ?? 1,
                'image_url' => 'https://images.unsplash.com/photo-1533139202713-33b47b94d629?w=600&h=600&fit=crop',
            ],
            [
                'name' => 'Royal Oak 41mm Blue Dial',
                'slug' => 'audemars-piguet-royal-oak-41mm-blue',
                'description' => 'The Audemars Piguet Royal Oak is an icon of modern luxury. Its octagonal bezel is instantly recognizable.',
                'price' => 28900,
                'stock' => 4,
                'brand_id' => Brand::where('name', 'Audemars Piguet')->first()?->id ?? 4,
                'category_id' => Category::where('name', 'Sports')->first()?->id ?? 1,
                'image_url' => 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop',
            ],
            [
                'name' => 'Royal Oak Offshore Chronograph',
                'slug' => 'audemars-piguet-royal-oak-offshore',
                'description' => 'The bold sports version of the legendary Royal Oak with chronograph complications.',
                'price' => 38500,
                'stock' => 2,
                'brand_id' => Brand::where('name', 'Audemars Piguet')->first()?->id ?? 4,
                'category_id' => Category::where('name', 'Chronograph')->first()?->id ?? 5,
                'image_url' => 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&h=600&fit=crop',
            ],
            [
                'name' => 'Carrera Chronograph Black',
                'slug' => 'tag-heuer-carrera-chronograph-black',
                'description' => 'The Tag Heuer Carrera is a sports watch with authentic racing heritage.',
                'price' => 8500,
                'stock' => 5,
                'brand_id' => Brand::where('name', 'Tag Heuer')->first()?->id ?? 5,
                'category_id' => Category::where('name', 'Chronograph')->first()?->id ?? 5,
                'image_url' => 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=600&fit=crop',
            ],
            [
                'name' => 'Navitimer World GMT Chronograph',
                'slug' => 'breitling-navitimer-world-gmt',
                'description' => 'The Breitling Navitimer is the aviation watch with legendary status and professional reliability.',
                'price' => 12000,
                'stock' => 2,
                'brand_id' => Brand::where('name', 'Breitling')->first()?->id ?? 6,
                'category_id' => Category::where('name', 'Chronograph')->first()?->id ?? 5,
                'image_url' => 'https://images.unsplash.com/photo-1569495253637-d52e7ba58e1d?w=600&h=600&fit=crop',
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}

