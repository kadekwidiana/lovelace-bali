<?php

namespace App\Repositories;

use App\Interfaces\RajaOngkirConfirRepositoryInterface;
use App\Models\Category;
use App\Models\RajaOngkirConfig;

class RajaOngkirConfigRepository implements RajaOngkirConfirRepositoryInterface
{
    protected $model;

    public function __construct(RajaOngkirConfig $rajaOngkirConfig)
    {
        $this->model = $rajaOngkirConfig;
    }

    public function all($search = [], $perPage = 10)
    {
        $query = $this->model->query();

        if (isset($search['name'])) {
            $query->where('description', 'like', '%' . $search['name'] . '%');
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
        $rajaOngkirConfig = $this->model->findOrFail($id);
        $rajaOngkirConfig->update($data);
        return $rajaOngkirConfig;
    }

    public function delete($id)
    {
        $rajaOngkirConfig = $this->model->findOrFail($id);
        return $rajaOngkirConfig->delete();
    }

    public function setDefaultSelect($id)
    {
        $this->model->where('is_select', true)->update(['is_select' => false]);

        $rajaOngkirConfig = $this->model->findOrFail($id);
        $rajaOngkirConfig->is_select = true;
        $rajaOngkirConfig->save();
    }

    public function count()
    {
        return $this->model->count();
    }
}
