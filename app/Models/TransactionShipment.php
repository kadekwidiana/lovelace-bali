<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionShipment extends Model
{
    use HasFactory;

    protected $table = 'transaction_shipments';

    protected $fillable = [
        'transaction_id',
        'courier',
        'phone_number',
        'province_code',
        'province_name',
        'city_code',
        'city_name',
        'sub_district',
        'village',
        'address',
    ];

    public function transaction()
    {
        return $this->belongsTo(Transaction::class);
    }
}
