<?php

use App\Http\Controllers\Web\Dashboard\Store\UsersController;
use Illuminate\Support\Facades\Route;

Route::resource('users', UsersController::class)->names('users');
