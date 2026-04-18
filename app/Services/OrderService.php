<?php

namespace App\Services;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Cart;
use Illuminate\Support\Facades\DB;

class OrderService
{
    /**
     * Create an order from cart data
     */
    public function createOrder($userId, $data)
    {
        return DB::transaction(function () use ($userId, $data) {
            // Get the user's cart
            $cart = Cart::where('user_id', $userId)->first();
            
            if (!$cart || $cart->items->isEmpty()) {
                throw new \Exception('Cart is empty');
            }

            $cart->loadMissing('items.product');

            // Calculate total from cart items
            $total = $cart->items->sum(fn($item) => $item->price * $item->quantity);

            // Create order
            $order = Order::create([
                'user_id' => $userId,
                'total' => $total + 250, // add shipping
                'status' => 'pending',
                'shipping_address' => $data['shipping_address'],
                'payment_method' => $data['payment_method'] ?? null,
                'notes' => $data['notes'] ?? null,
            ]);

            // Create order items from cart items
            foreach ($cart->items as $cartItem) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $cartItem->product_id,
                    'quantity' => $cartItem->quantity,
                    'price' => $cartItem->price,
                ]);
            }

            // Clear the cart
            $cart->items()->delete();

            return $order;
        });
    }

    /**
     * Update order status
     */
    public function updateOrderStatus($orderId, $status)
    {
        $order = Order::findOrFail($orderId);
        $order->update(['status' => $status]);
        return $order;
    }

    /**
     * Get user's orders
     */
    public function getUserOrders($userId)
    {
        return Order::where('user_id', $userId)
            ->with(['items.product.images', 'items.product.brand', 'payment'])
            ->orderBy('created_at', 'desc')
            ->get();
    }
}
