<?php

namespace App\Providers;

use App\Interfaces\CategoryRepositoryInterface;
use App\Interfaces\ContactRepositoryInterface;
use App\Interfaces\ProductRepositoryInterface;
use App\Interfaces\PromotionRepositoryInterface;
use App\Interfaces\StockLogRepositoryInterface;
use App\Repositories\CategoryRepository;
use App\Repositories\ContactRepository;
use App\Repositories\ProductRepository;
use App\Repositories\PromotionRepository;
use App\Repositories\StockLogRepository;
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
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }
}
