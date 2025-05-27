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

    public function find($id)
    {
        return $this->model->findOrFail($id);
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
}
