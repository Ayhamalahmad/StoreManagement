<?php

namespace App\Http\Middleware;

use App\Models\Store;
use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class StoreScoped
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        $storeSlug = $request->route('store');

        if ($storeSlug) {
            if ($storeSlug instanceof Store) {
                $store = $storeSlug;
            } else {
                $store = Store::where('slug', $storeSlug)->where('is_active', true)->first();

                if (! $store) {
                    abort(404);
                }
            }

            $storeData = [
                'id' => $store->id,
                'name' => $store->name,
                'slug' => $store->slug,
                'description' => $store->description,
                'logo' => $store->logo,
            ];

            Inertia::share('currentStore', $storeData);

            if ($user && ! $user->is_super_admin) {
                if ($user->store_id !== $store->id) {
                    abort(403, 'You do not have access to this store.');
                }
            }

            $request->merge(['scoped_store' => $store]);
            $request->route()->setParameter('store', $store);
        } elseif ($user && ! $user->is_super_admin && $user->store_id) {
            $store = $user->store;

            Inertia::share('currentStore', [
                'id' => $store->id,
                'name' => $store->name,
                'slug' => $store->slug,
            ]);

            $request->merge(['scoped_store' => $store]);
        }

        return $next($request);
    }
}