<?php

namespace App\Http\Controllers\Web\Dashboard\Store;

use App\Models\Store;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class UsersController
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        if ($user->is_super_admin) {
            $users = User::query()
                ->with('store')
                ->orderBy('created_at', 'desc')
                ->paginate(20);
        } else {
            $users = User::where('store_id', $user->store_id)
                ->orderBy('created_at', 'desc')
                ->paginate(20);
        }

        return Inertia::render('Dashboard/Users/Index', [
            'users' => $users,
            'isSuperAdmin' => $user->is_super_admin,
        ]);
    }

    public function create(Request $request): Response
    {
        $stores = null;

        if ($request->user()->is_super_admin) {
            $stores = Store::where('is_active', true)->get(['id', 'name']);
        }

        return Inertia::render('Dashboard/Users/Create', [
            'stores' => $stores,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|min:8',
            'store_id' => [
                'nullable',
                'exists:stores,id',
                Rule::requiredIf(! $user->is_super_admin),
            ],
            'is_super_admin' => 'boolean',
        ]);

        if (! $user->is_super_admin) {
            $validated['store_id'] = $user->store_id;
            $validated['is_super_admin'] = false;
        }

        $validated['password'] = Hash::make($validated['password']);

        User::create($validated);

        return redirect()->route('users.index');
    }

    public function edit(int $id, Request $request): Response
    {
        $currentUser = $request->user();

        if ($currentUser->is_super_admin) {
            $editUser = User::with('store')->findOrFail($id);
        } else {
            $editUser = User::where('store_id', $currentUser->store_id)->findOrFail($id);
        }

        $stores = null;
        if ($currentUser->is_super_admin) {
            $stores = Store::where('is_active', true)->get(['id', 'name']);
        }

        return Inertia::render('Dashboard/Users/Edit', [
            'editUser' => $editUser,
            'stores' => $stores,
            'isSuperAdmin' => $currentUser->is_super_admin,
        ]);
    }

    public function update(int $id, Request $request): RedirectResponse
    {
        $currentUser = $request->user();

        if ($currentUser->is_super_admin) {
            $editUser = User::findOrFail($id);
        } else {
            $editUser = User::where('store_id', $currentUser->store_id)->findOrFail($id);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|max:255|unique:users,email,' . $editUser->id,
            'password' => 'nullable|string|min:8',
            'store_id' => 'nullable|exists:stores,id',
            'is_super_admin' => 'boolean',
        ]);

        if (! $currentUser->is_super_admin) {
            unset($validated['store_id'], $validated['is_super_admin']);
        }

        if (empty($validated['password'])) {
            unset($validated['password']);
        } else {
            $validated['password'] = Hash::make($validated['password']);
        }

        $editUser->update($validated);

        return redirect()->route('users.index');
    }

    public function destroy(int $id, Request $request): RedirectResponse
    {
        $currentUser = $request->user();

        if ($currentUser->id === (int) $id) {
            return redirect()->route('users.index')->withErrors(['error' => 'Cannot delete yourself']);
        }

        if ($currentUser->is_super_admin) {
            $editUser = User::findOrFail($id);
        } else {
            $editUser = User::where('store_id', $currentUser->store_id)->findOrFail($id);
        }

        $editUser->delete();

        return redirect()->route('users.index');
    }
}
