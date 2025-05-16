<?php

namespace App\Interfaces;

interface PromotionRepositoryInterface extends BaseRepositoryInterface
{
    public function syncProducts($promotionId, $productIds);
    public function productIds($promotionId);
}
