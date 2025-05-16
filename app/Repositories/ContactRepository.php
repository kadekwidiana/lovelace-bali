<?php

namespace App\Repositories;

use App\Interfaces\ContactRepositoryInterface;
use App\Models\Contact;

class ContactRepository implements ContactRepositoryInterface
{
    protected $model;

    public function __construct(Contact $contact)
    {
        $this->model = $contact;
    }

    public function all($search = [], $perPage = 10)
    {
        $query = $this->model->query();

        if (isset($search['name'])) {
            $query->where('name', 'like', '%' . $search['name'] . '%');
        }

        if ($perPage) {
            return $query->latest()->paginate($perPage)->appends($search);
        }

        return $query->latest()->get();
    }

    public function find($id)
    {
        return $this->model->findOrFail($id);
    }

    public function create($data)
    {
        return $this->model->create($data);
    }

    public function delete($id)
    {
        $category = $this->model->findOrFail($id);
        return $category->delete();
    }
}
