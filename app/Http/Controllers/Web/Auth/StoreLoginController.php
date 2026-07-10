<?php

namespace App\Http\Controllers\Web\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class StoreLoginController extends Controller
{
    public function create(Request $request): Response
    {
        $store = $request->get('scoped_store');

        if (! $store) {
            abort(404);
        }

        return Inertia::render('auth/StoreLogin', [
            'store' => [
                'id' => $store->id,
                'name' => $store->name,
                'slug' => $store->slug,
                'logo' => $store->logo,
            ],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $store = $request->get('scoped_store');

        if (! $store) {
            abort(404);
        }

        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials, $request->boolean('remember'))) {
            $user = Auth::user();

            if (! $user->is_super_admin && $user->store_id !== $store->id) {
                Auth::logout();
                return back()->withErrors([
                    'email' => 'You do not have access to this store.',
                ])->onlyInput('email');
            }

            $request->session()->regenerate();

            return redirect()->intended(route('stores.dashboard', $store->slug));
        }

        return back()->withErrors([
            'email' => 'Invalid credentials',
        ])->onlyInput('email');
    }
}
