<?php

namespace App\Http\Controllers\Api\Store;

use App\Http\Controllers\Controller;
use App\Http\Resources\PerfumeResource;
use App\Models\Perfume;
use App\Models\Store;
use App\Services\Product\ProductService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function __construct(
        private ProductService $productService
    ) {}

    public function index(string $storeSlug, Request $request): JsonResponse
    {
        $store = Store::where('slug', $storeSlug)->firstOrFail();

        $filters = $request->only([
            'search', 'gender', 'category',
            'section_number', 'shelf_number', 'is_available', 'per_page',
        ]);

        $products = $this->productService->list($store->id, $filters);

        return response()->json([
            'store' => [
                'id' => $store->id,
                'name' => $store->name,
                'slug' => $store->slug,
            ],
            'products' => PerfumeResource::collection($products),
            'meta' => [
                'current_page' => $products->currentPage(),
                'last_page' => $products->lastPage(),
                'per_page' => $products->perPage(),
                'total' => $products->total(),
            ],
        ]);
    }

    public function show(string $storeSlug, string $code): JsonResponse
    {
        $store = Store::where('slug', $storeSlug)->firstOrFail();

        $perfume = $this->productService->findByCode($code, $store->id);

        if (! $perfume) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json([
            'store' => [
                'id' => $store->id,
                'name' => $store->name,
                'slug' => $store->slug,
            ],
            'product' => new PerfumeResource($perfume),
        ]);
    }
}