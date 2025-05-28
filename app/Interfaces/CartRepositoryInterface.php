<?php

namespace App\Interfaces;

interface CartRepositoryInterface extends BaseRepositoryInterface
{
    public function allNoLimit($search = []);

    public function findByUserAndProduct($user_id, $product_id);

    public function orderSummary($user_id);
}
