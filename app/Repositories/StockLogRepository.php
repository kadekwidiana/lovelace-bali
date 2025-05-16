<?php

namespace App\Repositories;

use App\Interfaces\StockLogRepositoryInterface;
use App\Models\Category;
use App\Models\StockLog;

class StockLogRepository implements StockLogRepositoryInterface
{
    protected $model;

    public function __construct(StockLog $stockLog)
    {
        $this->model = $stockLog;
    }

    public function all($search = [], $perPage = 10)
    {
        $query = $this->model->with(['product', 'user']);

        if (isset($search['name'])) {
            $query->whereHas('product', function ($q) use ($search) {
                $q->where('name', 'like', '%' . $search['name'] . '%')->orWhere('code', 'like', '%' . $search['name'] . '%');
            });
        }

        if (isset($search['type'])) {
            $query->where('type', $search['type']);
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

    public function getReports($startDate = null, $endDate = null, $typeReport = null, $productId = null)
    {
        $query = $this->model->with(['product', 'user']);

        if ($startDate && $endDate) {
            $query->whereBetween('date', [$startDate, $endDate]);
        }

        if ($typeReport) {
            $query->where('type', $typeReport);
        }

        if ($productId) {
            $query->where('product_id', $productId);
        }

        return $query->get();
    }

    public function create($data)
    {
        return $this->model->create($data);
    }

    public function update($id, $data)
    {
        $stockLog = $this->model->findOrFail($id);
        $stockLog->update($data);
        return $stockLog;
    }

    public function delete($id)
    {
        $stockLog = $this->model->findOrFail($id);
        return $stockLog->delete();
    }
}
