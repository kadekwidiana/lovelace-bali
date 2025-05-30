<?php

namespace App\Repositories;

use App\Interfaces\TransactionDetailRepositoryInterface;
use App\Models\TransactionDetail;

class TransactionDetailRepository implements TransactionDetailRepositoryInterface
{
    protected $model;

    public function __construct(TransactionDetail $transactionDetail)
    {
        $this->model = $transactionDetail;
    }

    public function create($data)
    {
        return $this->model->create($data);
    }
}
