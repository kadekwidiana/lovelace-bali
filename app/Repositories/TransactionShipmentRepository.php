<?php

namespace App\Repositories;

use App\Interfaces\TransactionShipmentRepositoryInterface;
use App\Models\TransactionShipment;

class TransactionShipmentRepository implements TransactionShipmentRepositoryInterface
{
    protected $model;

    public function __construct(TransactionShipment $transactionShipment)
    {
        $this->model = $transactionShipment;
    }

    public function create($data)
    {
        return $this->model->create($data);
    }
}
