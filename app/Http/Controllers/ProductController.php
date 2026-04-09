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
                ->select('id', 'name', 'slug', 'price', 'stock', 'brand_id', 'category_id', 'image_url');

            if ($request->filled('search')) {
                $query->where('name', 'like', '%' . $request->search . '%')
                    ->orWhere('description', 'like', '%' . $request->search . '%');
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

            $products = $query->paginate(12)->appends($request->query());

            $categories = Category::select('id', 'name')->orderBy('name')->get();
            $brands = Brand::select('id', 'name')->orderBy('name')->get();
        } catch (\Exception $e) {
            // DB error (MySQL not running), use empty data - frontend demo fallback
        }

        return Inertia::render('Products/Index', [
            'products' => $products,
            'filters' => $filters,
            'categories' => $categories,
            'brands' => $brands,
        ]);
    }

    public function show($id)
    {
        $product = Product::with(['brand', 'category', 'images'])->findOrFail($id);
        
        $relatedProducts = Product::where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->with(['brand', 'images'])
            ->limit(4)
            ->get();

        return Inertia::render('Products/Show', [
            'product' => $product,
            'relatedProducts' => $relatedProducts,
        ]);
    }
}
