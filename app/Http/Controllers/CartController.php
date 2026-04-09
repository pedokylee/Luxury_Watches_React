<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\CartService;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    protected $cartService;

    public function __construct(CartService $cartService)
    {
        $this->cartService = $cartService;
    }

    public function index(Request $request)
    {
        $cart = $this->cartService->getCart($request);
        
        return Inertia::render('Cart/Index', [
            'cart' => $cart,
            'cartCount' => $cart->items ? $cart->items->count() : 0,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1|max:10',
        ]);

        $this->cartService->addToCart($request, $request->product_id, $request->quantity);

        return back()->with('success', 'Added to cart')->with('cartCount', $this->cartService->getCartCount($request));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1|max:99',
        ]);

        $this->cartService->updateQuantity($request, $id, $request->quantity);

        return back()->with('success', 'Updated cart item');
    }

    public function destroy(Request $request, $id)
    {
        $this->cartService->removeFromCart($request, $id);

        return back()->with('success', 'Removed from cart');
    }


}
