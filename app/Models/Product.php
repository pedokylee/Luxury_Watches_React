<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Product extends Model
{
    protected $appends = ['is_active'];

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

    public function getImageUrlAttribute($value)
    {
        $primaryImage = $this->relationLoaded('images')
            ? $this->images
                ->sortByDesc(fn ($image) => (int) $image->is_primary)
                ->first()
            : $this->images()
                ->orderByDesc('is_primary')
                ->orderBy('id')
                ->first();

        if ($primaryImage?->image_url) {
            return $this->resolveImageUrl($primaryImage->image_url);
        }

        $storedPath = $this->getRawOriginal('image_url') ?: $value;

        return $storedPath
            ? $this->resolveImageUrl($storedPath)
            : null;
    }

    public function getIsActiveAttribute(): bool
    {
        return ($this->attributes['status'] ?? null) === 'active';
    }

    private function resolveImageUrl(string $path): string
    {
        if (Str::startsWith($path, ['http://', 'https://', '/'])) {
            return $path;
        }

        return Storage::url($path);
    }
}
