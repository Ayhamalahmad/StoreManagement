<?php

use App\Http\Controllers\Api\Store\ProductController;
use Illuminate\Support\Facades\Route;

Route::get('{store}/products', [ProductController::class, 'index']);
Route::get('{store}/products/{code}', [ProductController::class, 'show']);