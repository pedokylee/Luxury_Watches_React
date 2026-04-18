<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category; 
use App\Models\Brand;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $products = (object) ['data' => [], 'links' => [], 'meta' => (object)['total' => 0]];
        $categories = [];
        $brands = [];
        $filters = $request->only(['search', 'category', 'brand', 'min_price', 'max_price', 'sort']);

        try {
            $query = Product::with(['brand', 'category', 'images'])
                ->where('status', 'active')
                ->select('id', 'name', 'slug', 'price', 'stock', 'brand_id', 'category_id', 'image_url', 'status');

            if ($request->filled('search')) {
                $search = $request->string('search')->trim()->toString();

                $query->where(function ($builder) use ($search) {
                    $builder->where('name', 'like', '%' . $search . '%')
                        ->orWhere('description', 'like', '%' . $search . '%');
                });
            }
            if ($request->filled('category')) {
                $query->where('category_id', $request->category);
            }
            if ($request->filled('brand')) {
                $query->where('brand_id', $request->brand);
            }
            if ($request->filled('min_price')) {
                $query->where('price', '>=', $request->min_price);
            }
            if ($request->filled('max_price')) {
                $query->where('price', '<=', $request->max_price);
            }

            // Handle sorting
            $sort = $request->input('sort', 'newest');
            switch ($sort) {
                case 'price_asc':
                    $query->orderBy('price', 'asc');
                    break;
                case 'price_desc':
                    $query->orderBy('price', 'desc');
                    break;
                case 'name_asc':
                    $query->orderBy('name', 'asc');
                    break;
                case 'newest':
                default:
                    $query->orderBy('created_at', 'desc');
                    break;
            }

            $products = $query->paginate(12)->withQueryString();

            $categories = Category::select('id', 'name')->orderBy('name')->get();
            $brands = Brand::select('id', 'name')->orderBy('name')->get();
        } catch (\Throwable $e) {
            // Return empty data when the database is unavailable.
        }

        return Inertia::render('Products/Index', [
            'products' => $products,
            'filters' => $filters,
            'categories' => $categories,
            'brands' => $brands,
        ]);
    }

    public function show(Request $request, $id)
    {
        $product = Product::with(['brand', 'category', 'images'])->findOrFail($id);

        if ($product->status !== 'active' && !optional($request->user())->is_admin) {
            abort(404);
        }

        $relatedProducts = Product::where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->where('status', 'active')
            ->with(['brand', 'images'])
            ->limit(4)
            ->get();

        return Inertia::render('Products/Show', [
            'product' => $product,
            'relatedProducts' => $relatedProducts,
        ]);
    }
}
