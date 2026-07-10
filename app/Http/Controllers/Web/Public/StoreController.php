<?php

namespace App\Http\Controllers\Web\Public;

use App\Models\Perfume;
use App\Models\Store;
use App\Services\Product\ProductService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StoreController
{
    public function __construct(
        private ProductService $productService
    ) {}

    public function show(Request $request): Response
    {
        $store = $request->get('scoped_store');

        if (! $store) {
            abort(404);
        }

        $filters = $request->only([
            'search', 'search_type', 'gender', 'category',
            'section_number', 'shelf_number', 'is_available', 'per_page',
        ]);

        $products = $this->productService->list($store->id, $filters);

        $sections = Perfume::forStore($store->id)
            ->select('section_number')
            ->distinct()
            ->orderBy('section_number')
            ->pluck('section_number');

        $shelves = Perfume::forStore($store->id)
            ->select('shelf_number')
            ->distinct()
            ->orderBy('shelf_number')
            ->pluck('shelf_number');

        return Inertia::render('Public/Stores/Show', [
            'store' => [
                'id' => $store->id,
                'name' => $store->name,
                'slug' => $store->slug,
                'description' => $store->description,
                'logo' => $store->logo,
            ],
            'products' => $products,
            'filters' => $filters,
            'sections' => $sections,
            'shelves' => $shelves,
        ]);
    }
}