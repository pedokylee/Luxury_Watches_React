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
            'totalRevenue' => Order::sum('total_amount'),
            'recentOrders' => Order::with('user')->latest()->take(5)->get(['id', 'order_number', 'total_amount', 'status', 'created_at']),
            'lowStockProducts' => Product::where('stock', '<=', 5)->take(5)->get(['id', 'name', 'stock']),
        ];

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
        ]);
    }
}

