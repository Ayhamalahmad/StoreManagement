<?php

namespace App\Http\Controllers\Api\Admin\Store;

use App\Http\Controllers\Controller;
use App\Http\Resources\PerfumeResource;
use App\Models\Perfume;
use App\Services\Product\ProductService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function __construct(
        private ProductService $productService
    ) {}

    public function index(Request $request): JsonResponse
    {
        $storeId = $this->getStoreId($request);

        $filters = $request->only([
            'search', 'gender', 'category',
            'section_number', 'shelf_number', 'is_available', 'per_page',
        ]);

        $products = $this->productService->list($storeId, $filters);

        return PerfumeResource::collection($products);
    }

    public function store(Request $request): JsonResponse
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
            'perfume_image' => 'nullable|image|max:2048',
            'inspired_image' => 'nullable|image|max:2048',
        ]);

        $perfume = $this->productService->create($storeId, $validated, $request);

        return response()->json(new PerfumeResource($perfume), 201);
    }

    public function show(int $id, Request $request): JsonResponse
    {
        $storeId = $this->getStoreId($request);

        $perfume = Perfume::forStore($storeId)->findOrFail($id);

        return response()->json(new PerfumeResource($perfume));
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $storeId = $this->getStoreId($request);

        // Ensure the product belongs to the admin's store
        Perfume::forStore($storeId)->findOrFail($id);

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
            'perfume_image' => 'nullable|image|max:2048',
            'inspired_image' => 'nullable|image|max:2048',
        ]);

        $perfume = $this->productService->update($id, $validated, $request);

        return response()->json(new PerfumeResource($perfume));
    }

    public function destroy(int $id, Request $request): JsonResponse
    {
        $storeId = $this->getStoreId($request);

        // Ensure the product belongs to the admin's store
        Perfume::forStore($storeId)->findOrFail($id);

        $this->productService->delete($id);

        return response()->json(['message' => 'Deleted successfully']);
    }

    private function getStoreId(Request $request): int
    {
        $user = $request->user();

        if ($user->is_super_admin) {
            // Super admin can pass a store_id query param or use their managed store
            return (int) ($request->get('store_id') ?? $user->store_id);
        }

        // Regular store admin - scoped to their store
        return $user->store_id;
    }
}