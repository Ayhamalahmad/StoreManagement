<?php

namespace App\Http\Controllers\Web\Dashboard\Store;

use App\Models\Store;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController
{
    public function index(Request $request): Response
    {
        $user = $request->user();
        $store = $user->store;

        $stats = [
            'total_products' => $store ? $store->perfumes()->count() : 0,
        ];

        if ($user->is_super_admin) {
            $stats['total_stores'] = Store::count();
            $stats['total_users'] = User::count();
            $stats['active_stores'] = Store::where('is_active', true)->count();
        } elseif ($store) {
            $stats['total_users'] = User::where('store_id', $store->id)->count();
        }

        return Inertia::render('Dashboard/Index', [
            'store' => $store ? [
                'id' => $store->id,
                'name' => $store->name,
                'slug' => $store->slug,
            ] : null,
            'isSuperAdmin' => $user->is_super_admin,
            'stats' => $stats,
        ]);
    }
}
