<?php

use App\Http\Controllers\Api\Admin\Store\StoreController;
use Illuminate\Support\Facades\Route;

Route::apiResource('stores', StoreController::class);