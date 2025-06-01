<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';

    protected $fillable = [
        'category_id',
        'name',
        'code',
        'size',
        'color',
        'price',
        'stock',
        'description',
        'image',
        'weight',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'weight' => 'decimal:2',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function promotions()
    {
        return $this->belongsToMany(Promotion::class, 'product_promotions')->withTimestamps();
    }

    public function transactionDetails()
    {
        return $this->hasMany(TransactionDetail::class);
    }

    public function stockLogs()
    {
        return $this->hasMany(StockLog::class);
    }
}
