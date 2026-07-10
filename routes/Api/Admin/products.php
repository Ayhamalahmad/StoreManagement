<?php

use App\Http\Controllers\Api\Admin\Store\ProductController;
use Illuminate\Support\Facades\Route;

Route::apiResource('products', ProductController::class);