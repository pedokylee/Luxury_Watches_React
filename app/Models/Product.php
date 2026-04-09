<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name', 'slug', 'description', 'price', 'stock', 'brand_id', 'category_id', 'status', 'image_url'
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'stock' => 'integer',
    ];

    public function brand()
    {
        return $this->belongsTo(\App\Models\Brand::class);
    }

    public function category()
    {
        return $this->belongsTo(\App\Models\Category::class);
    }

    public function images()
    {
        return $this->hasMany(\App\Models\ProductImage::class);
    }

    public function getImageUrlAttribute()
    {
        // First check if the image_url column has a value
        if ($this->attributes['image_url'] ?? null) {
            return $this->attributes['image_url'];
        }
        
        // Otherwise check ProductImage records
        $firstImage = $this->images->first();
        return $firstImage && $firstImage->path 
            ? \Illuminate\Support\Facades\Storage::url($firstImage->path) 
            : '/images/placeholder.jpg';
    }
}
