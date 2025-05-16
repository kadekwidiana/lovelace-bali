<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Promotion;
use App\Models\StockLog;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $count = [
            'category' => Category::count(),
            'product' => Product::count(),
            'promotion' => Promotion::count(),
            'transaction' => Transaction::count(),
            'productIn' => StockLog::where('type', 'IN')->count(),
            'productOut' => StockLog::where('type', 'OUT')->count(),
        ];

        return Inertia::render('Backpage/Dashboard/Index', [
            'title' => 'Dashboard',
            'count' => $count
        ]);
    }
}
