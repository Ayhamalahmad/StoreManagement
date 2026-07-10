<?php

namespace App\Http\Controllers\Web\Dashboard\Store;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StoreDashboardController
{
    public function index(Request $request): Response
    {
        $store = $request->get('scoped_store');

        if (! $store) {
            abort(404);
        }

        $user = $request->user();

        return Inertia::render('Dashboard/StoreIndex', [
            'store' => [
                'id' => $store->id,
                'name' => $store->name,
                'slug' => $store->slug,
                'description' => $store->description,
                'logo' => $store->logo,
            ],
            'isSuperAdmin' => $user->is_super_admin,
            'stats' => [
                'total_products' => $store->perfumes()->count(),
            ],
        ]);
    }
}
