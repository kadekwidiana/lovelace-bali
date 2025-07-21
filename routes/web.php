<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CheckOngkirController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FrontpageController;
use App\Http\Controllers\KomerceController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PromotionController;
use App\Http\Controllers\RajaOngkirConfigController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\StockLogController;
use App\Http\Controllers\TransactionController;
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

Route::resource('data/carts', CartController::class);
Route::get('/data/carts/order-summary/{user_id}', [CartController::class, 'orderSummary'])->name('carts.order-summary');

// ongkir
Route::prefix('raja-ongkir')->group(function () {
    Route::get('/province', [CheckOngkirController::class, 'getProvince'])->name('raja-ongkir.province');
    Route::get('/city', [CheckOngkirController::class, 'getCity'])->name('raja-ongkir.city');
    Route::post('/cost', [CheckOngkirController::class, 'checkCost'])->name('raja-ongkir.check-cost');
});

// komerce
Route::prefix('komerce')->group(function () {
    Route::get('/destination', [KomerceController::class, 'searchDestination'])->name('komerce.destination');
    Route::post('/cost', [KomerceController::class, 'checkCost'])->name('komerce.cost');
});

// transaction
Route::prefix('transactions')->group(function () {
    Route::post('/store', [TransactionController::class, 'store'])->name('transactions.store');
});

// midtrans callback
Route::post('/midtrans/callback', [TransactionController::class, 'midtransCallback'])->name('midtrans.callback');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/customer/profile', [FrontpageController::class, 'profile'])->name('frontpage.customer.profile');
    Route::post('/profile/{userId}', [ProfileController::class, 'update'])->name('profile.update');
    Route::get('/customer/transactions', [FrontpageController::class, 'transactions'])->name('frontpage.customer.transactions');
    Route::get('/customer/transactions/{id}', [FrontpageController::class, 'transactionDetail'])->name('frontpage.customer.transaction-detail');
    Route::put('transactions/{id}', [TransactionController::class, 'update'])->name('transactions.update');
    Route::get('/customer/carts', [FrontpageController::class, 'carts'])->name('frontpage.customer.carts');
    Route::get('/customer/checkout', [FrontpageController::class, 'checkout'])->name('frontpage.customer.checkout');

    Route::group(['middleware' => 'checkRole:EMPLOYEE'], function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        // stock log
        Route::resource('stock-logs', StockLogController::class);
        Route::post('stock-logs/{id}/update', [StockLogController::class, 'update'])->name('stock-logs.update');
        Route::get('product-ins', [StockLogController::class, 'productIn'])->name('stock-logs.product-in');
        Route::get('product-outs', [StockLogController::class, 'productOut'])->name('stock-logs.product-out');

        // report
        Route::resource('reports', ReportController::class);
        Route::get('data-reports', [ReportController::class, 'report'])->name('data-reports.');

        Route::get('transaction-reports', [ReportController::class, 'transactionReportView'])->name('transaction.reports');
        Route::get('data-transaction-reports', [ReportController::class, 'transactionReport'])->name('data-transaction-reports.');

        // transactions
        Route::get('transactions', [TransactionController::class, 'index'])->name('transactions.index');
        Route::get('transactions/{id}', [TransactionController::class, 'detail'])->name('transactions.detail');

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

            // config raja ongkir
            Route::resource('raja-ongkirs', RajaOngkirConfigController::class);
            Route::patch('raja-ongkirs/{id}/selected', [RajaOngkirConfigController::class, 'setDefault'])->name('raja-ongkirs.selected');
        });
    });
});

require __DIR__ . '/auth.php';
