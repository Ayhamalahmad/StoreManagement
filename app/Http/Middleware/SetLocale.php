<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    public function handle(Request $request, Closure $next): Response
    {
        $supportedLocales = ['en', 'tr', 'ar'];
        $locale = $request->query('lang', session('locale', App::getLocale()));

        if (in_array($locale, $supportedLocales)) {
            App::setLocale($locale);
            session(['locale' => $locale]);
        }

        $currentLocale = App::getLocale();

        $translations = $this->getTranslations($currentLocale);

        Inertia::share('locale', $currentLocale);
        Inertia::share('translations', $translations);
        Inertia::share('supportedLocales', $supportedLocales);

        return $next($request);
    }

    private function getTranslations(string $locale): array
    {
        $path = lang_path("{$locale}.json");

        if (file_exists($path)) {
            return json_decode(file_get_contents($path), true) ?? [];
        }

        return [];
    }
}
