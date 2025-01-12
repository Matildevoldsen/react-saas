<?php

use App\Http\Controllers\PayController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SubscriptionPayController;
use App\Http\Controllers\SubscriptionShowController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', function () {
    return Inertia::render('Dashboard');
})->name('home');

Route::middleware('auth')->group(function () {
    Route::get('/pay', PayController::class)->name('pay');
    Route::get('/account/subscriptions', SubscriptionShowController::class)->name('account.subscription');
    Route::get('/premium', function () {
        return Inertia::render('Premium');
    })->name('premium')->middleware('subscribedTo:basic,premium,basic annual,premium annual');
    Route::post('/subscription/pay/{id}', SubscriptionPayController::class)->name('subscribe');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
