<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CartService
{
    /**
     * Get the current cart for user or guest.
     */
    public function getCart(Request $request)
    {
        $cartId = $this->getCartIdentifier($request);
        $cart = Cart::with('items.product')->find($cartId);
        
        if (!$cart) {
            $cart = $this->createCart($request);
        }
        
        return $cart;
    }

    /**
     * Get cart count for current user/guest.
     */
    public function getCartCount(Request $request)
    {
        $cartId = $this->getCartIdentifier($request);
        $cart = Cart::with('items')->find($cartId);
        return $cart ? $cart->items->sum('quantity') : 0;
    }

    /**
     * Add item to cart.
     */
    public function addToCart(Request $request, int $productId, int $quantity = 1)
    {
        return DB::transaction(function () use ($request, $productId, $quantity) {
            $cart = $this->getOrCreateCart($request);
            
            $cartItem = CartItem::where('cart_id', $cart->id)
                ->where('product_id', $productId)
                ->first();

            if ($cartItem) {
                $cartItem->quantity += $quantity;
                $cartItem->save();
            } else {
                $cartItem = CartItem::create([
                    'cart_id' => $cart->id,
                    'product_id' => $productId,
                    'quantity' => $quantity,
                    'price' => Product::findOrFail($productId)->price,
                ]);
            }

            return $cartItem;
        });
    }

    /**
     * Update cart item quantity.
     */
    public function updateQuantity(Request $request, int $cartItemId, int $quantity)
    {
        $cartItem = CartItem::whereHas('cart', function ($query) use ($request) {
            $query->whereKey($this->getCartIdentifier($request));
        })->findOrFail($cartItemId);

        $cartItem->quantity = $quantity;
        $cartItem->save();

        if ($quantity <= 0) {
            $cartItem->delete();
        }
    }

    /**
     * Remove item from cart.
     */
    public function removeFromCart(Request $request, int $cartItemId)
    {
        $cartItem = CartItem::whereHas('cart', function ($query) use ($request) {
            $query->whereKey($this->getCartIdentifier($request));
        })->findOrFail($cartItemId);

        $cartItem->delete();
    }

    /**
     * Merge guest cart to user cart on login.
     */
    public function mergeGuestCart(Request $request, User $user)
    {
        $oldSessionId = $request->session()->get('cart_id');
        if (!$oldSessionId) return;

        $guestCart = Cart::where('session_id', $oldSessionId)->first();
        if (!$guestCart) return;

        $userCart = Cart::firstOrCreate(['user_id' => $user->id]);

        // Move items
        $guestCart->items->each(function ($item) use ($userCart) {
            $existing = CartItem::where('cart_id', $userCart->id)
                ->where('product_id', $item->product_id)
                ->first();
            
            if ($existing) {
                $existing->quantity += $item->quantity;
                $existing->save();
            } else {
                $item->replicate(['cart_id'])->fill(['cart_id' => $userCart->id])->save();
            }
        });

        // Delete guest cart
        $guestCart->delete();
        $request->session()->forget('cart_id');
    }

    /**
     * Get or create cart identifier.
     */
    private function getCartIdentifier(Request $request): ?int
    {
        if (Auth::check()) {
            $cart = Cart::firstOrCreate(['user_id' => Auth::id()]);
            return $cart->id;
        }

        $sessionId = $request->session()->get('cart_id');
        if (!$sessionId) {
            $sessionId = Str::uuid()->toString();
            $request->session()->put('cart_id', $sessionId);
        }

        $cart = Cart::firstOrCreate(['session_id' => $sessionId]);
        return $cart->id;
    }

    /**
     * Create new cart.
     */
    private function createCart(Request $request): Cart
    {
        $sessionId = $request->session()->get('cart_id') ?: Str::uuid()->toString();
        $request->session()->put('cart_id', $sessionId);

        return Cart::create([
            'session_id' => $sessionId,
            'user_id' => Auth::id(),
        ]);
    }

    /**
     * Get or create cart (internal).
     */
    private function getOrCreateCart(Request $request): Cart
    {
        $identifier = $this->getCartIdentifier($request);
        return Cart::find($identifier) ?? $this->createCart($request);
    }
}

