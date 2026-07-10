<?php

namespace App\Http\Controllers\Web\Dashboard\Store;

use App\Models\Store;
use App\Models\User;
use App\Services\Store\StoreService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StoresController
{
    public function __construct(
        private StoreService $storeService
    ) {}

    public function index(Request $request): Response
    {
        $user = $request->user();

        if ($user->is_super_admin) {
            $stores = Store::query()
                ->withCount('perfumes', 'users')
                ->orderBy('created_at', 'desc')
                ->paginate(20);
        } else {
            $store = $user->store;
            if (! $store) {
                abort(404);
            }
            $store->loadCount('perfumes', 'users');
            $stores = [$store];
        }

        return Inertia::render('Dashboard/Stores/Index', [
            'stores' => $stores,
            'isSuperAdmin' => $user->is_super_admin,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Dashboard/Stores/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:stores,slug',
            'description' => 'nullable|string',
            'domain' => 'nullable|string|max:255',
            'logo' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        $this->storeService->create($validated);

        return redirect()->route('stores.index');
    }

    public function edit(Store $store): Response
    {
        $store->loadCount('perfumes', 'users');

        return Inertia::render('Dashboard/Stores/Edit', [
            'store' => $store,
        ]);
    }

    public function update(Request $request, Store $store): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'slug' => 'sometimes|string|max:255|unique:stores,slug,' . $store->id,
            'description' => 'nullable|string',
            'domain' => 'nullable|string|max:255',
            'logo' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        $this->storeService->update($store, $validated);

        return redirect()->route('stores.index');
    }

    public function destroy(Store $store): RedirectResponse
    {
        $this->storeService->delete($store);

        return redirect()->route('stores.index');
    }
}
