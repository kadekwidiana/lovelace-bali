<?php

namespace App\Repositories;

use App\Interfaces\PromotionRepositoryInterface;
use App\Models\Category;
use App\Models\Promotion;

class PromotionRepository implements PromotionRepositoryInterface
{
    protected $model;

    public function __construct(Promotion $promotion)
    {
        $this->model = $promotion;
    }

    public function all($search = [], $perPage = 10)
    {
        $query = $this->model->with('products:id'); // Load only id field to optimize

        if (isset($search['title'])) {
            $query->where('title', 'like', '%' . $search['title'] . '%');
        }

        // Rentang pencarian promo
        if (isset($search['start_date']) && isset($search['end_date'])) {
            $query->whereDate('start_date', '<=', $search['end_date'])  // Promo mulai sebelum akhir pencarian
                ->whereDate('end_date', '>=', $search['start_date']); // Promo selesai setelah awal pencarian
        }

        if ($perPage) {
            $promotions = $query->latest()->paginate($perPage)->appends($search);
        } else {
            $promotions = $query->latest()->get();
        }

        // Transform product_ids
        $promotions->getCollection()->transform(function ($promotion) {
            $promotion->product_ids = $promotion->products->pluck('id')->toArray();
            unset($promotion->products);
            return $promotion;
        });

        return $promotions;
    }

    public function find($id)
    {
        $promotion = $this->model->with('products.category')->findOrFail($id);

        // Mapping product harga + diskon
        $promotion->products->transform(function ($product) use ($promotion) {
            $product->original_price = $product->price;
            $product->discount_percentage = $promotion->discount_percentage;
            $product->discounted_price = round($product->price - ($product->price * ($promotion->discount_percentage / 100)));

            return $product;
        });

        return $promotion;
    }

    public function productIds($promotionId)
    {
        return $this->model->findOrFail($promotionId)->products()->pluck('id')->toArray();
    }

    public function create($data)
    {
        return $this->model->create($data);
    }

    public function update($id, $data)
    {
        $promotion = $this->model->findOrFail($id);
        $promotion->update($data);
        return $promotion;
    }

    public function syncProducts($promotionId, $productIds)
    {
        $promotion = $this->model->findOrFail($promotionId);
        $promotion->products()->sync($productIds);
    }

    public function delete($id)
    {
        $promotion = $this->model->findOrFail($id);
        return $promotion->delete();
    }
}
