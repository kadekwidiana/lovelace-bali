<?php

namespace App\Http\Controllers;

use App\Interfaces\TransactionRepositoryInterface;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class TransactionController extends Controller
{
    private TransactionRepositoryInterface $transactionRepository;

    public function __construct(TransactionRepositoryInterface $transactionRepository)
    {
        $this->transactionRepository = $transactionRepository;
    }

    public function index(Request $request)
    {
        try {
            $filters = $request->only(['id', 'created_by', 'date', 'status']);
            $perPage = $request->perpage ?? 10;

            $transactions = $this->transactionRepository->all($filters, $perPage);

            return Inertia::render('Backpage/Transactions/Index', [
                'title' => 'Transaksi',
                'transactions' => $transactions,
                'users' =>  User::where('role', 'CUSTOMER')->get(),
                'filters' => $filters
            ]);
        } catch (Exception $e) {
            Log::error('Error fetching categories: ' . $e->getMessage());
            return back()->withErrors(['message' => 'Failed to fetch categories']);
        }
    }
}
