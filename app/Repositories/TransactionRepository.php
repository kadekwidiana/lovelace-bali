<?php

namespace App\Repositories;

use App\Interfaces\TransactionRepositoryInterface;
use App\Models\Transaction;

class TransactionRepository implements TransactionRepositoryInterface
{
    protected $model;

    public function __construct(Transaction $transaction)
    {
        $this->model = $transaction;
    }

    public function all($search = [], $perPage = 10)
    {
        $query = $this->model->with(['user', 'details.product']);

        if (isset($search['id'])) {
            $query->where('id', 'like', '%' . $search['id'] . '%');
        }

        if (isset($search['created_by'])) {
            $query->where('created_by', $search['created_by']);
        }

        if (isset($search['date'])) {
            $query->where('date', $search['date']);
        }

        if (isset($search['status'])) {
            $query->where('status', $search['status']);
        }

        if ($perPage) {
            return $query->latest()->paginate($perPage)->appends($search);
        }

        return $query->latest()->get();
    }

    public function find($id)
    {
        return $this->model->with(['user.customer', 'details.product'])->findOrFail($id);
    }

    public function create($data)
    {
        return $this->model->create($data);
    }

    public function update($id, $data)
    {
        return $this->model->findOrFail($id)->update($data);
    }

    public function delete($id)
    {
        return $this->model->findOrFail($id)->delete();
    }

    public function getReports($startDate = null, $endDate = null, $status = null, $userId = null)
    {
        $query = $this->model->with(['details.product', 'user.customer']);

        if ($startDate && $endDate) {
            $query->whereBetween('date', [$startDate, $endDate]);
        }

        if ($status) {
            $query->where('status', $status);
        }

        if ($userId) {
            $query->where('created_by', $userId);
        }

        return $query->get();
    }
}
