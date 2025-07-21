<?php

namespace App\Helpers;

class StockLogHelper
{
    public const SOURCE_LABELS_ID = [
        'PURCHASE'             => 'Pembelian',
        'INTERNAL_PROCUREMENT' => 'Pengadaan Internal',
        'CUSTOMER_RETURN'      => 'Retur Pelanggan',
        'ADJUSTMENT_IN'        => 'Koreksi Tambah',
    ];

    public const DESTINATION_LABELS_ID = [
        'SALES'          => 'Penjualan',
        'INTERNAL_USE'   => 'Pemakaian Internal',
        'DAMAGED'        => 'Rusak',
        'ADJUSTMENT_OUT' => 'Koreksi Kurang',
    ];

    public static function getSourceLabel(?string $value): string
    {
        return self::SOURCE_LABELS_ID[$value] ?? '-';
    }

    public static function getDestinationLabel(?string $value): string
    {
        return self::DESTINATION_LABELS_ID[$value] ?? '-';
    }
}
