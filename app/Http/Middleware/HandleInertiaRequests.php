<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Illuminate\Support\Facades\Schema;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $cart = null;
        $cartCount = 0;

        if ($request->user() && Schema::hasTable('carts') && Schema::hasTable('cart_items')) {
            try {
                $cartService = app(\App\Services\CartService::class);
                $cart = $cartService->getCart($request);
                $cartCount = $cartService->getCartCount($request);
            } catch (\Throwable $e) {
                $cart = null;
                $cartCount = 0;
            }
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'cart' => $cart,
            'cartCount' => $cartCount,
        ];
    }
}
