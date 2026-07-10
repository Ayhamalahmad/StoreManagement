<?php

use Illuminate\Support\Facades\Route;

/* --- Public API --- */
require __DIR__.'/Api/Store/products.php';

/* --- Authentication --- */
require __DIR__.'/Api/Admin/auth.php';

/* --- Authenticated Admin API --- */
Route::middleware('auth:sanctum')->group(function () {
    require __DIR__.'/Api/Admin/products.php';
    require __DIR__.'/Api/Admin/stores.php';
});