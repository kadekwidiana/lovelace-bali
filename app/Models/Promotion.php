<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Promotion extends Model
{
    use HasFactory;

    protected $table = 'promotions';

    protected $fillable = [
        'title',
        'promo_code',
        'description',
        'image',
        'start_date',
        'end_date',
        'discount_percentage',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_promotions')->withTimestamps();
    }
}
