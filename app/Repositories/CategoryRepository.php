<?php

namespace App\Repositories;

use App\Interfaces\CategoryRepositoryInterface;
use App\Models\Category;

class CategoryRepository implements CategoryRepositoryInterface
{
    protected $model;

    public function __construct(Category $category)
    {
        $this->model = $category;
    }

    public function all($search = [], $perPage = 10)
    {
        $query = $this->model->query();

        if (isset($search['name'])) {
            $query->where('name', 'like', '%' . $search['name'] . '%');
        }

        if ($perPage) {
            return $query->latest()->paginate($perPage)->appends($search);
        }

        return $query->latest()->get();
    }

    public function dropdown()
    {
        return $this->model->select('id', 'name')->latest()->get();
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
