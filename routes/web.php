<?php

use App\Http\Controllers\OilController;
use App\Http\Controllers\PerfumeController;
use App\Models\Oil;
use App\Models\Perfume;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        $stats = [
            'total_perfumes' => Perfume::count(),
            'total_oils' => Oil::count(),
            'total_categories' => 0,
            'low_stock' => 0,
        ];

        return Inertia::render('dashboard', [
            'stats' => $stats,
        ]);
    })->name('dashboard');

    Route::get('perfumes', [PerfumeController::class, 'browse'])->name('perfumes.index');
    Route::get('perfumes/manage', [PerfumeController::class, 'index'])->name('perfumes.manage');
    Route::get('perfumes/{perfume}', [PerfumeController::class, 'show'])->name('perfumes.show');
    Route::post('perfumes', [PerfumeController::class, 'store'])->name('perfumes.store');
    Route::put('perfumes/{perfume}', [PerfumeController::class, 'update'])->name('perfumes.update');
    Route::delete('perfumes/{perfume}', [PerfumeController::class, 'destroy'])->name('perfumes.destroy');

    Route::get('oils', [OilController::class, 'browse'])->name('oils.index');
    Route::get('oils/manage', [OilController::class, 'index'])->name('oils.manage');
    Route::get('oils/{oil}', [OilController::class, 'show'])->name('oils.show');
    Route::post('oils', [OilController::class, 'store'])->name('oils.store');
    Route::put('oils/{oil}', [OilController::class, 'update'])->name('oils.update');
    Route::delete('oils/{oil}', [OilController::class, 'destroy'])->name('oils.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
