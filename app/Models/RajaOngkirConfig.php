<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RajaOngkirConfig extends Model
{
    use HasFactory;

    protected $table = 'raja_ongkir_configs';

    protected $fillable = [
        'api_url',
        'api_key',
        'is_select',
        'description',
        'origin_default',
        'origin_description',
    ];

    protected $casts = [
        'is_select' => 'boolean',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_select', true);
    }

    public function scopeNotActive($query)
    {
        return $query->where('is_select', false);
    }

    public static function getActiveConfig()
    {
        return static::query()->where('is_select', true)->first();
    }
}
