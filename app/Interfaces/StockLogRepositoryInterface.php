<?php

namespace App\Interfaces;

interface StockLogRepositoryInterface extends BaseRepositoryInterface
{
    public function getReports($startDate, $endDate, $typeReport, $productId);
}
