<?php

namespace App\Interfaces;

interface ContactRepositoryInterface
{
    public function all($search = [], $perPage = 10);
    public function create($data);
    public function find($id);
    public function delete($id);
}
