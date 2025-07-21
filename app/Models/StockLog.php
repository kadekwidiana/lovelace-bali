<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StockLog extends Model
{
    use HasFactory;

    protected $table = 'stock_logs';

    protected $fillable = [
        'product_id',
        'created_by',
        'type',
        'source',
        'destination',
        'quantity',
        'date',
        'note',
    ];

    protected $casts = [
        'date' => 'date',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'created_by');
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
