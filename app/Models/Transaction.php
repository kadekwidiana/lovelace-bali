<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Transaction extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'transactions';

    protected $fillable = [
        'id',
        'created_by',
        'date',
        'shipment_cost',
        'total_amount',
        'note',
        'status',
        'snap_token_midtrans',
        'receipt_number',
    ];

    protected $casts = [
        'id' => 'string',
        'created_by' => 'integer',
        'date' => 'datetime',
        'total_amount' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function details()
    {
        return $this->hasMany(TransactionDetail::class);
    }

    public function shipment()
    {
        return $this->hasOne(TransactionShipment::class);
    }

    public function getDateAttribute($value)
    {
        return Carbon::parse($value)
            ->setTimezone('Asia/Makassar') // ubah ke WITA
            ->format('Y-m-d H:i:s'); // format tanpa ISO 8601
    }

    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)
            ->setTimezone('Asia/Makassar')
            ->format('Y-m-d H:i:s');
    }

    public function getUpdatedAtAttribute($value)
    {
        return Carbon::parse($value)
            ->setTimezone('Asia/Makassar')
            ->format('Y-m-d H:i:s');
    }
}
