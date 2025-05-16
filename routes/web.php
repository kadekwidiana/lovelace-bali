<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FrontpageController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PromotionController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\StockLogController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Catch-all route to handle 404 errors
Route::fallback(function () {
    return Inertia::render('Error/Error', ['status' => 404])
        ->toResponse(request())
        ->setStatusCode(404);
});

// frontpage
Route::get('/', [FrontpageController::class, 'index'])->name('frontpage.home');
Route::get('/about', [FrontpageController::class, 'about'])->name('frontpage.about');
Route::get('/product', [FrontpageController::class, 'product'])->name('frontpage.product');
Route::get('/promotion', [FrontpageController::class, 'promotion'])->name('frontpage.promotion');
Route::get('/promotion/{id}', [FrontpageController::class, 'promotionDetail'])->name('frontpage.promotion-detail');
Route::get('/contact', [FrontpageController::class, 'contact'])->name('frontpage.contact');
Route::post('contacts', [ContactController::class, 'store'])->name('contacts.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::group(['middleware' => 'checkRole:EMPLOYEE'], function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::post('/profile/{userId}', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        // stock log
        Route::resource('stock-logs', StockLogController::class);
        Route::post('stock-logs/{id}/update', [StockLogController::class, 'update'])->name('stock-logs.update');
        Route::get('product-ins', [StockLogController::class, 'productIn'])->name('stock-logs.product-in');
        Route::get('product-outs', [StockLogController::class, 'productOut'])->name('stock-logs.product-out');

        // report
        Route::resource('reports', ReportController::class);
        Route::get('data-reports', [ReportController::class, 'report'])->name('data-reports.');

        Route::group(['middleware' => 'checkRole:ADMIN'], function () {
            // category
            Route::resource('categories', CategoryController::class);
            // Route::post('categories/{id}/update', [CategoryController::class, 'update'])->name('categories.update');

            // product
            Route::resource('products', ProductController::class);
            Route::post('products/{id}/update', [ProductController::class, 'update'])->name('products.update');

            // promotion
            Route::resource('promotions', PromotionController::class);
            Route::post('promotions/{id}/update', [PromotionController::class, 'update'])->name('promotions.update');
            Route::get('promotions/{promotionId}/products', [PromotionController::class, 'getProductIds'])->name('promotions.product-ids');

            // contact
            Route::get('contacts', [ContactController::class, 'index'])->name('contacts.index');
            Route::delete('contacts/{id}', [ContactController::class, 'destroy'])->name('contacts.destroy');
        });
    });
});

require __DIR__ . '/auth.php';
