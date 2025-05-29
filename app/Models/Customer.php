<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'phone_number',
        'province_code',
        'province_name',
        'city_code',
        'city_name',
        'sub_district',
        'village',
        'address',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
