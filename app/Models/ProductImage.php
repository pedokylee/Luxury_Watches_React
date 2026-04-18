<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductImage extends Model
{
    protected $appends = ['url'];

    protected $fillable = [
        'product_id', 'image_url', 'alt', 'is_primary'
    ];

    protected $casts = [
        'is_primary' => 'boolean',
    ];

    public function product()
    {
        return $this->belongsTo(\App\Models\Product::class);
    }

    public function getUrlAttribute(): ?string
    {
        if (!$this->image_url) {
            return null;
        }

        if (Str::startsWith($this->image_url, ['http://', 'https://', '/'])) {
            return $this->image_url;
        }

        return Storage::url($this->image_url);
    }
}
