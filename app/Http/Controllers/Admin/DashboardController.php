<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Order;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'totalProducts' => Product::count(),
            'totalOrders' => Order::count(),
            'totalUsers' => User::count(),
            'totalRevenue' => Order::sum('total'),
            'recentOrders' => Order::with('user')->latest()->take(5)->get(['id', 'user_id', 'total', 'status', 'created_at']),
            'lowStockProducts' => Product::with('brand')->where('stock', '<=', 5)->take(5)->get(['id', 'name', 'stock', 'brand_id']),
        ];

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
        ]);
    }
}
