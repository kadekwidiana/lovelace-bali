<?php

namespace App\Interfaces;

interface ProductRepositoryInterface extends BaseRepositoryInterface
{
    public function dropdown();
    public function allNoLimit();
    public function lockForUpdate($id);
}
