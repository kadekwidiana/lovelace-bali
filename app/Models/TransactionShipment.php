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
        'recipient_name',
        'province_code',
        'province_name',
        'city_code',
        'city_name',
        'sub_district',
        'village',
        'address',
        'destination_json',
        'cost_json',
    ];

    protected $casts = [
        'destination_json' => 'array',
        'cost_json' => 'array',
    ];

    public function transaction()
    {
        return $this->belongsTo(Transaction::class);
    }

    public function prepareForValidation()
    {
        $this->merge([
            'destination_json' => json_decode($this->destination_json, true),
            'cost_json' => json_decode($this->cost_json, true),
        ]);
    }
}
