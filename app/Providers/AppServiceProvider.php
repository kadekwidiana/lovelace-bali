<?php

namespace App\Providers;

use App\Interfaces\CartRepositoryInterface;
use App\Interfaces\CategoryRepositoryInterface;
use App\Interfaces\ContactRepositoryInterface;
use App\Interfaces\ProductRepositoryInterface;
use App\Interfaces\PromotionRepositoryInterface;
use App\Interfaces\RajaOngkirConfirRepositoryInterface;
use App\Interfaces\StockLogRepositoryInterface;
use App\Interfaces\TransactionDetailRepositoryInterface;
use App\Interfaces\TransactionRepositoryInterface;
use App\Interfaces\TransactionShipmentRepositoryInterface;
use App\Repositories\CartRepository;
use App\Repositories\CategoryRepository;
use App\Repositories\ContactRepository;
use App\Repositories\ProductRepository;
use App\Repositories\PromotionRepository;
use App\Repositories\RajaOngkirConfigRepository;
use App\Repositories\StockLogRepository;
use App\Repositories\TransactionDetailRepository;
use App\Repositories\TransactionRepository;
use App\Repositories\TransactionShipmentRepository;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(CategoryRepositoryInterface::class, CategoryRepository::class);
        $this->app->bind(ProductRepositoryInterface::class, ProductRepository::class);
        $this->app->bind(PromotionRepositoryInterface::class, PromotionRepository::class);
        $this->app->bind(StockLogRepositoryInterface::class, StockLogRepository::class);
        $this->app->bind(ContactRepositoryInterface::class, ContactRepository::class);
        $this->app->bind(TransactionRepositoryInterface::class, TransactionRepository::class);
        $this->app->bind(CartRepositoryInterface::class, CartRepository::class);
        $this->app->bind(TransactionDetailRepositoryInterface::class, TransactionDetailRepository::class);
        $this->app->bind(TransactionShipmentRepositoryInterface::class, TransactionShipmentRepository::class);
        $this->app->bind(RajaOngkirConfirRepositoryInterface::class, RajaOngkirConfigRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }
}
