<?php

namespace App\Repositories;

use App\Interfaces\ProductRepositoryInterface;
use App\Models\Category;
use App\Models\Product;

class ProductRepository implements ProductRepositoryInterface
{
    protected $model;

    public function __construct(Product $category)
    {
        $this->model = $category;
    }

    public function all($search = [], $perPage = 10)
    {
        $query = $this->model->with('category');

        if (isset($search['name'])) {
            $query->where('name', 'like', '%' . $search['name'] . '%')->orWhere('code', 'like', '%' . $search['name'] . '%');
        }

        if (isset($search['category_id'])) {
            $query->where('category_id', $search['category_id']);
        }

        if ($perPage) {
            return $query->latest()->paginate($perPage)->appends($search);
        }

        return $query->latest()->get();
    }

    public function allNoLimit()
    {
        return $this->model->with('category')->latest()->get();
    }

    public function dropdown()
    {
        return $this->model->select('id', 'name')->latest()->get();
    }

    public function find($id)
    {
        return $this->model->with(['category', 'promotions', 'transactionDetails', 'stockLogs'])->findOrFail($id);
    }

    public function lockForUpdate($id)
    {
        return $this->model->lockForUpdate()->findOrFail($id);
    }

    public function create($data)
    {
        return $this->model->create($data);
    }

    public function update($id, $data)
    {
        $category = $this->model->findOrFail($id);
        $category->update($data);
        return $category;
    }

    public function delete($id)
    {
        $category = $this->model->findOrFail($id);
        return $category->delete();
    }
}
