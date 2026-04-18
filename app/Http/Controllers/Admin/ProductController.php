<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Brand;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $products = Product::with(['brand', 'category', 'images'])
            ->when($request->filled('search'), function ($query) use ($request) {
                $search = $request->string('search')->trim()->toString();

                $query->where(function ($builder) use ($search) {
                    $builder->where('name', 'like', '%' . $search . '%')
                        ->orWhere('slug', 'like', '%' . $search . '%')
                        ->orWhere('description', 'like', '%' . $search . '%');
                });
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        $brands = Brand::pluck('name', 'id');
        $categories = Category::pluck('name', 'id');

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
            'filters' => $request->only('search'),
            'brands' => $brands,
            'categories' => $categories,
        ]);
    }

    public function create()
    {
        $brands = Brand::pluck('name', 'id');
        $categories = Category::pluck('name', 'id');

        return Inertia::render('Admin/Products/Create', [
            'brands' => $brands,
            'categories' => $categories,
        ]);
    }

    public function store(ProductRequest $request)
    {
        $product = Product::create($this->productPayload($request));
        $this->syncUploadedImages($request, $product);

        return redirect()->route('products.index')
            ->with('success', 'Product created successfully!');
    }

    public function edit(Product $product)
    {
        $brands = Brand::pluck('name', 'id');
        $categories = Category::pluck('name', 'id');

        return Inertia::render('Admin/Products/Edit', [
            'product' => $product->load('images'),
            'brands' => $brands,
            'categories' => $categories,
        ]);
    }

    public function update(ProductRequest $request, Product $product)
    {
        $product->update($this->productPayload($request, $product));
        $this->syncUploadedImages($request, $product, true);

        return redirect()->route('products.index')
            ->with('success', 'Product updated successfully!');
    }

    public function destroy(Product $product)
    {
        foreach ($product->images as $image) {
            Storage::disk('public')->delete($image->image_url);
            $image->delete();
        }

        $product->delete();

        return redirect()->route('products.index')
            ->with('success', 'Product deleted successfully!');
    }

    public function toggleStatus(Product $product)
    {
        $product->update([
            'status' => $product->status === 'active' ? 'inactive' : 'active',
        ]);

        return back()->with('success', 'Product status updated successfully!');
    }

    private function productPayload(ProductRequest $request, ?Product $product = null): array
    {
        $name = (string) $request->string('name');

        return [
            'name' => $name,
            'slug' => $this->uniqueSlug($name, $product),
            'description' => $request->input('description'),
            'price' => $request->input('price'),
            'stock' => $request->integer('stock'),
            'brand_id' => $request->input('brand_id'),
            'category_id' => $request->input('category_id'),
            'status' => $request->boolean('is_active', true) ? 'active' : 'inactive',
        ];
    }

    private function syncUploadedImages(Request $request, Product $product, bool $replaceExisting = false): void
    {
        $files = $this->uploadedImages($request);

        if ($files === []) {
            return;
        }

        if ($replaceExisting) {
            foreach ($product->images as $image) {
                Storage::disk('public')->delete($image->image_url);
                $image->delete();
            }
        }

        foreach ($files as $index => $image) {
            $path = $image->store('products', 'public');

            $product->images()->create([
                'image_url' => $path,
                'is_primary' => $index === 0,
            ]);

            if ($index === 0) {
                $product->forceFill(['image_url' => $path])->save();
            }
        }
    }

    private function uploadedImages(Request $request): array
    {
        if ($request->hasFile('images')) {
            $files = $request->file('images');

            return is_array($files) ? $files : [$files];
        }

        if ($request->hasFile('image')) {
            return [$request->file('image')];
        }

        return [];
    }

    private function uniqueSlug(string $name, ?Product $product = null): string
    {
        $baseSlug = Str::slug($name) ?: 'product';
        $slug = $baseSlug;
        $suffix = 2;

        while (
            Product::where('slug', $slug)
                ->when($product, fn ($query) => $query->whereKeyNot($product->getKey()))
                ->exists()
        ) {
            $slug = "{$baseSlug}-{$suffix}";
            $suffix++;
        }

        return $slug;
    }
}
