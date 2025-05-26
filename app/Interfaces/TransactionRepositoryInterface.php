<?php

namespace App\Interfaces;

interface TransactionRepositoryInterface
{
    public function all($search = [], $perPage = 10);

    public function find($id);

    public function create($data);

    public function update($id, $data);

    public function delete($id);

    public function getReports($startDate, $endDate, $status, $userId);
}
