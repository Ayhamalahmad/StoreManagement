<?php

namespace App\Traits;

use App\Cache\CacheKey;
use Closure;
use Illuminate\Support\Facades\Cache;

trait HasCache
{
    protected function cacheRemember(string $key, Closure $callback, ?int $ttl = null): mixed
    {
        return Cache::remember($key, $ttl ?? CacheKey::TTL_3600, $callback);
    }

    protected function cacheFlushAll(): void
    {
        $this->cacheFlushMany($this->cacheKeyList());
    }

    protected function cacheFlushMany(array $keys): void
    {
        foreach ($keys as $key) {
            Cache::forget($key);
        }
    }

    abstract protected function cacheKeyList(): array;
}