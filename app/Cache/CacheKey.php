<?php

namespace App\Cache;

class CacheKey
{
    public const TTL_60 = 60;

    public const TTL_120 = 120;

    public const TTL_3600 = 3600;

    public const STORES_ALL = 'stores.all';

    public const STORES_ONE = 'stores.one.%d';

    public const STORES_BY_SLUG = 'stores.by_slug.%s';

    public const PRODUCTS_ALL = 'products.all.%d';

    public const PRODUCTS_ONE = 'products.one.%d';

    public const PRODUCTS_BY_CODE = 'products.by_code.%s';

    public const PROFILE_DATA = 'profile.data.%d';

    public static function make(string $pattern, mixed ...$args): string
    {
        return $args ? sprintf($pattern, ...$args) : $pattern;
    }
}