<?php

namespace App\Http\Controllers;

use App\Http\Requests\Transactions\UpdateTransactionRequest;
use App\Interfaces\CategoryRepositoryInterface;
use App\Interfaces\TransactionRepositoryInterface;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class TransactionController extends Controller
{
    private TransactionRepositoryInterface $transactionRepository;
    private CategoryRepositoryInterface $categoryRepository;

    public function __construct(TransactionRepositoryInterface $transactionRepository, CategoryRepositoryInterface $categoryRepository)
    {
        $this->transactionRepository = $transactionRepository;
        $this->categoryRepository = $categoryRepository;
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

    public function detail($id)
    {
        try {
            $transaction = $this->transactionRepository->find($id);
            return Inertia::render('Backpage/Transactions/Detail', [
                'title' => 'Detail Transaksi',
                'transaction' => $transaction,
                'categories' => $this->categoryRepository->dropdown()
            ]);
        } catch (Exception $e) {
            Log::error('Error fetching categories: ' . $e->getMessage());
            return back()->withErrors(['message' => 'Failed to fetch categories']);
        }
    }

    public function update(UpdateTransactionRequest $request, $id)
    {
        try {
            $validated = $request->validated();

            $this->transactionRepository->update($id, $validated);

            return response()->json([
                'message' => 'Data berhasil diperbarui.',
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat memperbarui data.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
