<?php

namespace App\Services\Store;

use App\Cache\CacheKey;
use App\Models\Store;
use App\Traits\HasCache;
use Illuminate\Pagination\LengthAwarePaginator;

class StoreService
{
    use HasCache;

    protected function cacheKeyList(): array
    {
        return [
            CacheKey::STORES_ALL,
        ];
    }

    public function list(): LengthAwarePaginator
    {
        return Store::query()
            ->orderBy('created_at', 'desc')
            ->paginate(20);
    }

    public function findBySlug(string $slug): ?Store
    {
        return $this->cacheRemember(
            CacheKey::make(CacheKey::STORES_BY_SLUG, $slug),
            fn () => Store::where('slug', $slug)->first()
        );
    }

    public function create(array $data): Store
    {
        $this->cacheFlushAll();

        return Store::create($data);
    }

    public function update(Store $store, array $data): Store
    {
        $this->cacheFlushAll();

        $store->update($data);

        return $store->fresh();
    }

    public function delete(Store $store): bool
    {
        $this->cacheFlushAll();

        return $store->delete();
    }
}