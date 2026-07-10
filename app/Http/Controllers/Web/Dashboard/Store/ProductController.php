<?php

namespace App\Http\Controllers\Web\Dashboard\Store;

use App\Models\Perfume;
use App\Services\Product\ProductService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController
{
    public function __construct(
        private ProductService $productService
    ) {}

    public function index(Request $request): Response
    {
        $storeId = $this->getStoreId($request);

        $filters = $request->only([
            'search', 'gender', 'category',
            'section_number', 'shelf_number', 'is_available', 'per_page',
        ]);

        $products = $this->productService->list($storeId, $filters);

        return Inertia::render('Dashboard/Products/Index', [
            'products' => $products,
            'filters' => $filters,
        ]);
    }

    public function create(Request $request): Response
    {
        return Inertia::render('Dashboard/Products/Create');
    }

    public function edit(int $id, Request $request): Response
    {
        $storeId = $this->getStoreId($request);

        $product = Perfume::forStore($storeId)->findOrFail($id);

        return Inertia::render('Dashboard/Products/Edit', [
            'product' => $product,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $storeId = $this->getStoreId($request);

        $validated = $request->validate([
            'code' => 'required|string|unique:perfumes,code|max:50',
            'name' => 'required|string|max:255',
            'brand' => 'required|string|max:255',
            'inspired_by' => 'nullable|string|max:255',
            'gender' => 'required|in:men,women,unisex',
            'category' => 'required|in:designer,niche,nishe',
            'description' => 'nullable|string',
            'top_notes' => 'nullable|string',
            'middle_notes' => 'nullable|string',
            'base_notes' => 'nullable|string',
            'section_number' => 'required|integer|min:1|max:255',
            'shelf_number' => 'required|integer|min:1|max:255',
            'is_available' => 'boolean',
        ]);

        try {
            $this->productService->create($storeId, $validated, $request);
            session()->flash('response', 'Product created successfully');
        } catch (\Throwable $e) {
            session()->flash('response', 'Failed to create product: ' . $e->getMessage());
        }

        return redirect($this->productsIndexRoute($request));
    }

    public function update(int $id, Request $request): RedirectResponse
    {
        $storeId = $this->getStoreId($request);

        $perfume = Perfume::forStore($storeId)->findOrFail($id);

        $validated = $request->validate([
            'code' => 'required|string|unique:perfumes,code,' . $id . '|max:50',
            'name' => 'required|string|max:255',
            'brand' => 'required|string|max:255',
            'inspired_by' => 'nullable|string|max:255',
            'gender' => 'required|in:men,women,unisex',
            'category' => 'required|in:designer,niche,nishe',
            'description' => 'nullable|string',
            'top_notes' => 'nullable|string',
            'middle_notes' => 'nullable|string',
            'base_notes' => 'nullable|string',
            'section_number' => 'required|integer|min:1|max:255',
            'shelf_number' => 'required|integer|min:1|max:255',
            'is_available' => 'boolean',
        ]);

        $this->productService->update($id, $validated, $request);

        return redirect($this->productsIndexRoute($request));
    }

    public function destroy(int $id, Request $request): RedirectResponse
    {
        $storeId = $this->getStoreId($request);

        Perfume::forStore($storeId)->findOrFail($id);

        $this->productService->delete($id);

        return redirect($this->productsIndexRoute($request));
    }

    private function getStoreId(Request $request): int
    {
        $scoped = $request->get('scoped_store');

        if ($scoped) {
            return $scoped->id;
        }

        $user = $request->user();

        if ($user->is_super_admin) {
            return (int) ($request->get('store_id') ?? $user->store_id);
        }

        return $user->store_id;
    }

    private function productsIndexRoute(Request $request): string
    {
        $scoped = $request->get('scoped_store');

        if ($scoped) {
            return route('store.products.index', $scoped->slug);
        }

        return route('stores.products.index');
    }
}