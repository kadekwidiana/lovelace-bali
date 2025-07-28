<?php

namespace App\Repositories;

use App\Interfaces\CartRepositoryInterface;
use App\Models\Cart;

class CartRepository implements CartRepositoryInterface
{
    protected $model;

    public function __construct(Cart $cart)
    {
        $this->model = $cart;
    }

    public function all($search = [], $perPage = 10)
    {
        $query = $this->model->with(['product']);

        if (isset($search['user_id'])) {
            $query->where('user_id', $search['user_id']);
        }

        if (isset($search['product_id'])) {
            $query->where('product_id', $search['product_id']);
        }

        if ($perPage) {
            return $query->latest()->paginate($perPage)->appends($search);
        }

        return $query->latest()->get();
    }

    public function allNoLimit($search = [])
    {
        $query = $this->model->with(['product.category']);

        if (isset($search['user_id'])) {
            $query->where('user_id', $search['user_id']);
        }

        if (isset($search['product_id'])) {
            $query->where('product_id', $search['product_id']);
        }

        return $query->latest()->get();
    }

    public function find($id)
    {
        return $this->model->findOrFail($id);
    }

    public function findByUserAndProduct($user_id, $product_id)
    {
        return $this->model->where('user_id', $user_id)->where('product_id', $product_id)->first();
    }

    public function create($data)
    {
        return $this->model->create($data);
    }
    public function update($id, $data)
    {
        $cart = $this->model->findOrFail($id);
        $cart->update($data);
        return $cart;
    }

    public function delete($id)
    {
        $cart = $this->model->findOrFail($id);
        return $cart->delete();
    }

    public function orderSummary($user_id)
    {
        return [
            'total_item' => $this->model
                ->where('user_id', $user_id)
                ->where('is_select', 1)
                ->count(),
            'total' => $this->model
                ->where('user_id', $user_id)
                ->where('is_select', 1)
                ->with('product')
                ->get()
                ->sum(function ($item) {
                    return ($item->product->price ?? 0) * $item->quantity;
                }),
            'total_weight' => $this->model
                ->where('user_id', $user_id)
                ->where('is_select', 1)
                ->with('product')
                ->get()
                ->sum(function ($item) {
                    return ($item->product->weight ?? 0) * $item->quantity;
                }),
            'items' => $this->model
                ->with(['product.category'])
                ->where('user_id', $user_id)
                ->where('is_select', 1)
                ->get()
        ];
    }

    public function deleteByItems($items)
    {
        $collection = collect($items);

        $userId = $collection->first()['user_id'] ?? null;
        $productIds = $collection->pluck('product_id')->toArray();

        if (!$userId || empty($productIds)) {
            return 0;
        }

        return $this->model
            ->where('user_id', $userId)
            ->whereIn('product_id', $productIds)
            ->delete();
    }
}
