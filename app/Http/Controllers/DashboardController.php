<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Promotion;
use App\Models\StockLog;
use App\Models\Transaction;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $startDate = $request->start_date ?? now()->subDays(6)->toDateString();
        $endDate = $request->end_date ?? now()->toDateString();
        $productId = $request->product_id;
        $categoryId = $request->category_id;

        $count = [
            'category' => Category::count(),
            'product' => Product::count(),
            'promotion' => Promotion::count(),
            'transaction' => Transaction::count(),
            'productIn' => StockLog::where('type', 'IN')->count(),
            'productOut' => StockLog::where('type', 'OUT')->count(),
        ];

        // FILTERED STOCK
        $stocks = StockLog::with('product')
            ->whereBetween('date', [$startDate, $endDate])
            ->when($productId, fn($query) => $query->where('product_id', $productId))
            ->when($categoryId, function ($query) use ($categoryId) {
                $query->whereHas('product', fn($q) => $q->where('category_id', $categoryId));
            })
            ->get();

        // GROUPING BY DATE + TYPE
        $grouped = $stocks->groupBy(
            fn($item) => Carbon::parse($item->date)->format('Y-m-d') . '_' . $item->type
        );

        // BUILD DATE RANGE
        $period = CarbonPeriod::create($startDate, $endDate);

        $stockByDate = collect($period)->map(function ($date) use ($grouped) {
            $formattedDate = $date->format('Y-m-d');

            return [
                'date' => $formattedDate,
                'in' => $grouped->get("{$formattedDate}_IN")?->sum('quantity') ?? 0,
                'out' => $grouped->get("{$formattedDate}_OUT")?->sum('quantity') ?? 0,
            ];
        })->values()->all();

        // SOURCE & DESTINATION LABELS
        $allSources = [
            'PURCHASE' => 'Pembelian',
            'INTERNAL_PROCUREMENT' => 'Pengadaan Internal',
            'CUSTOMER_RETURN' => 'Retur Pelanggan',
            'ADJUSTMENT_IN' => 'Koreksi Tambah',
        ];

        $allDestinations = [
            'SALES' => 'Penjualan',
            'INTERNAL_USE' => 'Pemakaian Internal',
            'DAMAGED' => 'Rusak',
            'ADJUSTMENT_OUT' => 'Koreksi Kurang',
        ];

        // STOCK IN BY SOURCE
        $stockIn = StockLog::with('product')
            ->where('type', 'IN')
            ->whereBetween('date', [$startDate, $endDate])
            ->when($productId, fn($query) => $query->where('product_id', $productId))
            ->when(
                $categoryId,
                fn($query) =>
                $query->whereHas('product', fn($q) => $q->where('category_id', $categoryId))
            )
            ->get()
            ->groupBy('source')
            ->map(fn($group) => $group->sum('quantity'));

        // STOCK OUT BY DESTINATION
        $stockOut = StockLog::with('product')
            ->where('type', 'OUT')
            ->whereBetween('date', [$startDate, $endDate])
            ->when($productId, fn($query) => $query->where('product_id', $productId))
            ->when(
                $categoryId,
                fn($query) =>
                $query->whereHas('product', fn($q) => $q->where('category_id', $categoryId))
            )
            ->get()
            ->groupBy('destination')
            ->map(fn($group) => $group->sum('quantity'));

        $stockInBySource = collect($allSources)->mapWithKeys(fn($label, $key) => [
            $key => $stockIn[$key] ?? 0,
        ]);

        $stockOutByDestination = collect($allDestinations)->mapWithKeys(fn($label, $key) => [
            $key => $stockOut[$key] ?? 0,
        ]);

        return Inertia::render('Backpage/Dashboard/Index', [
            'title' => 'Dashboard',
            'count' => $count,
            'products' => Product::latest()->get(),
            'categories' => Category::all(),
            'initialStartDate' => $startDate,
            'initialEndDate' => $endDate,
            'initialProductId' => $productId,
            'initialCategoryId' => $categoryId,
            'stockByDate' => $stockByDate,
            'stockInBySource' => $stockInBySource,
            'stockOutByDestination' => $stockOutByDestination,
        ]);
    }
}
