<?php

use App\Http\Controllers\Web\Dashboard\Store\StoresController;
use Illuminate\Support\Facades\Route;

Route::resource('stores', StoresController::class)->names('stores');
