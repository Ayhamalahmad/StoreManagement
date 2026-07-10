<?php

namespace App\Services\Product;

use App\Cache\CacheKey;
use App\Models\Perfume;
use App\Traits\HasCache;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class ProductService
{
    use HasCache;

    protected function cacheKeyList(): array
    {
        return [
            CacheKey::PRODUCTS_ALL,
        ];
    }

    public function list(int $storeId, array $filters = []): LengthAwarePaginator
    {
        $query = Perfume::forStore($storeId);

        if ($search = $filters['search'] ?? null) {
            $searchType = $filters['search_type'] ?? 'all';

            if ($searchType === 'code') {
                $query->where('code', 'like', "%{$search}%");
            } elseif ($searchType === 'brand') {
                $query->where('brand', 'like', "%{$search}%");
            } else {
                $query->where(function ($q) use ($search) {
                    $q->where('code', 'like', "%{$search}%")
                      ->orWhere('name', 'like', "%{$search}%")
                      ->orWhere('brand', 'like', "%{$search}%")
                      ->orWhere('inspired_by', 'like', "%{$search}%")
                      ->orWhere('top_notes', 'like', "%{$search}%")
                      ->orWhere('middle_notes', 'like', "%{$search}%")
                      ->orWhere('base_notes', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%");
                });
            }
        }

        if ($gender = $filters['gender'] ?? null) {
            $query->where('gender', $gender);
        }

        if ($category = $filters['category'] ?? null) {
            $query->where('category', $category);
        }

        if ($section = $filters['section_number'] ?? null) {
            $query->where('section_number', $section);
        }

        if ($shelf = $filters['shelf_number'] ?? null) {
            $query->where('shelf_number', $shelf);
        }

        if (isset($filters['is_available'])) {
            $query->where('is_available', filter_var($filters['is_available'], FILTER_VALIDATE_BOOLEAN));
        }

        return $query->orderBy('created_at', 'desc')
            ->paginate($filters['per_page'] ?? 20);
    }

    public function find(int $id): ?Perfume
    {
        return Perfume::find($id);
    }

    public function findByCode(string $code, int $storeId): ?Perfume
    {
        return Perfume::forStore($storeId)->where('code', $code)->first();
    }

    public function create(int $storeId, array $data, ?Request $request = null): Perfume
    {
        $this->cacheFlushAll();

        $data['store_id'] = $storeId;
        $perfume = Perfume::create($data);

        if ($request) {
            $this->handleMediaUploads($perfume, $request);
        }

        return $perfume->fresh();
    }

    public function update(int $id, array $data, ?Request $request = null): Perfume
    {
        $this->cacheFlushAll();

        $perfume = Perfume::findOrFail($id);
        $perfume->update($data);

        if ($request) {
            $this->handleMediaUploads($perfume, $request);
        }

        return $perfume->fresh();
    }

    public function delete(int $id): bool
    {
        $this->cacheFlushAll();

        $perfume = Perfume::findOrFail($id);
        $perfume->clearMediaCollection('perfume_image');
        $perfume->clearMediaCollection('inspired_image');

        return $perfume->delete();
    }

    private function handleMediaUploads(Perfume $perfume, Request $request): void
    {
        if ($request->hasFile('perfume_image')) {
            $perfume->clearMediaCollection('perfume_image');
            $perfume->addMediaFromRequest('perfume_image')->toMediaCollection('perfume_image');
        }

        if ($request->hasFile('inspired_image')) {
            $perfume->clearMediaCollection('inspired_image');
            $perfume->addMediaFromRequest('inspired_image')->toMediaCollection('inspired_image');
        }
    }
}