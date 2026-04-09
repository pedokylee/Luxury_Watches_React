<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductImage extends Model
{
    protected $fillable = [
        'product_id', 'image_url', 'alt', 'is_primary'
    ];

    public function product()
    {
        return $this->belongsTo(\App\Models\Product::class);
    }
}
