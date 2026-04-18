<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\CartService;
use App\Services\OrderService;
use Illuminate\Support\Facades\Auth;

class CheckoutController extends Controller
{
    protected $cartService;
    protected $orderService;

    public function __construct(CartService $cartService, OrderService $orderService)
    {
        $this->cartService = $cartService;
        $this->orderService = $orderService;
    }

    public function index(Request $request)
    {
        $cart = $this->cartService->getCart($request);

        if (!$cart->items || $cart->items->isEmpty()) {
            return redirect()->route('cart.index')->with('error', 'Your cart is empty');
        }

        return Inertia::render('Checkout/Index', [
            'cart' => $cart,
            'cartTotal' => $cart->getTotal(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'full_name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:100',
            'province' => 'required|string|max:100',
            'postal_code' => 'required|string|max:20',
            'payment_method' => 'required|string|in:cod,bank_transfer',
        ]);

        $shipping_address = [
            'full_name' => $request->full_name,
            'phone' => $request->phone,
            'address' => $request->address,
            'city' => $request->city,
            'province' => $request->province,
            'postal_code' => $request->postal_code,
            'state' => $request->province,
            'zip' => $request->postal_code,
            'country' => 'Philippines',
        ];

        $order = $this->orderService->createOrder(
            Auth::id(),
            [
                'shipping_address' => $shipping_address,
                'payment_method' => $request->payment_method,
                'notes' => $request->notes,
            ]
        );

        return redirect()->route('checkout.confirmation', $order->id)
            ->with('success', 'Order created successfully!');
    }

    public function confirmation(Order $order)
    {
        if ($order->user_id !== Auth::id()) {
            abort(403);
        }

        $order->load('items.product.brand', 'items.product.category');

        return Inertia::render('Checkout/Confirmation', [
            'order' => $order,
        ]);
    }
}
