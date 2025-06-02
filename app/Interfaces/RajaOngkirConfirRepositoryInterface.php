<?php

namespace App\Interfaces;

interface RajaOngkirConfirRepositoryInterface extends BaseRepositoryInterface
{
    public function setDefaultSelect($id);

    public function count();
}
