<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $appends = ['order_number'];

    protected $fillable = [
        'user_id',
        'total',
        'status',
        'shipping_address',
        'payment_method',
        'notes'
    ];

    protected $casts = [
        'total' => 'decimal:2',
        'shipping_address' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }

    public function review()
    {
        return $this->hasOne(Review::class);
    }

    public function getOrderNumberAttribute(): string
    {
        $year = $this->created_at?->format('Y') ?? now()->format('Y');

        return 'ORD-' . $year . '-' . str_pad((string) $this->id, 4, '0', STR_PAD_LEFT);
    }
}
