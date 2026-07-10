<?php

namespace App\Http\Controllers\Api\Admin\Store;

use App\Http\Controllers\Controller;
use App\Models\Store;
use App\Services\Store\StoreService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StoreController extends Controller
{
    public function __construct(
        private StoreService $storeService
    ) {}

    public function index(): JsonResponse
    {
        $stores = Store::query()->orderBy('created_at', 'desc')->paginate(20);

        return response()->json($stores);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:stores,slug',
            'description' => 'nullable|string',
            'domain' => 'nullable|string|max:255',
            'logo' => 'nullable|string|max:255',
            'settings' => 'nullable|json',
            'is_active' => 'boolean',
        ]);

        if (isset($validated['settings']) && is_string($validated['settings'])) {
            $validated['settings'] = json_decode($validated['settings'], true);
        }

        $store = $this->storeService->create($validated);

        return response()->json($store, 201);
    }

    public function show(Store $store): JsonResponse
    {
        $store->load('users', 'perfumes');

        return response()->json($store);
    }

    public function update(Request $request, Store $store): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'slug' => 'sometimes|string|max:255|unique:stores,slug,' . $store->id,
            'description' => 'nullable|string',
            'domain' => 'nullable|string|max:255',
            'logo' => 'nullable|string|max:255',
            'settings' => 'nullable|json',
            'is_active' => 'boolean',
        ]);

        if (isset($validated['settings']) && is_string($validated['settings'])) {
            $validated['settings'] = json_decode($validated['settings'], true);
        }

        $store = $this->storeService->update($store, $validated);

        return response()->json($store);
    }

    public function destroy(Store $store): JsonResponse
    {
        $this->storeService->delete($store);

        return response()->json(['message' => 'Store deleted successfully']);
    }
}