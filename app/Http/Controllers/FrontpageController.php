<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Interfaces\CategoryRepositoryInterface;
use App\Interfaces\ProductRepositoryInterface;
use App\Interfaces\PromotionRepositoryInterface;
use App\Interfaces\TransactionRepositoryInterface;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class FrontpageController extends Controller
{
    private  ProductRepositoryInterface $productRepository;
    private PromotionRepositoryInterface $promotionRepository;
    private CategoryRepositoryInterface $categoryRepository;
    private TransactionRepositoryInterface $transactionRepository;

    public function __construct(
        ProductRepositoryInterface $productRepository,
        PromotionRepositoryInterface $promotionRepository,
        CategoryRepositoryInterface $categoryRepository,
        TransactionRepositoryInterface $transactionRepository,
    ) {
        $this->productRepository = $productRepository;
        $this->promotionRepository = $promotionRepository;
        $this->categoryRepository = $categoryRepository;
        $this->transactionRepository = $transactionRepository;
    }
    public function index()
    {
        return Inertia::render('Frontpage/Index', [
            'title' => 'Home',
            'description' => 'Selamat Datang di Website Love Lace Bali',
            'products' => $this->productRepository->all([], 4),
            'promotions' => $this->promotionRepository->all([], 2),
        ]);
    }

    public function about()
    {
        return Inertia::render('Frontpage/About', [
            'title' => 'About',
            'description' => 'Selamat Datang di Website Love Lace Bali',
        ]);
    }

    public function product(Request $request)
    {
        try {
            $filters = $request->only(['name', 'category_id']);

            $products = $this->productRepository->all($filters, 8);

            return Inertia::render('Frontpage/Product', [
                'title' => 'Produk',
                'description' => 'Selamat Datang di Website Love Lace Bali',
                'products' => $products,
                'categories' => $this->categoryRepository->dropdown(),
                'searchByNameValue' => $filters['name'] ?? null,
                'filterByCategoryValue' => $filters['category_id'] ?? null,
            ]);
        } catch (Exception $e) {
            Log::error('Error fetching products: ' . $e->getMessage());
            return back()->withErrors(['message' => 'Failed to fetch products']);
        }
    }

    public function promotion(Request $request)
    {
        try {
            $filters = $request->only(['title', 'start_date', 'end_date']);

            $promotions = $this->promotionRepository->all($filters, 8);

            return Inertia::render('Frontpage/Promotion', [
                'title' => 'Promosi',
                'description' => 'Selamat Datang di Website Love Lace Bali',
                'promotions' => $promotions,
                'searchByTitleValue' => $filters['title'] ?? null,
                'filterByStartDateValue' => $filters['start_date'] ?? null,
                'filterByEndDateValue' => $filters['end_date'] ?? null,
            ]);
        } catch (Exception $e) {
            Log::error('Error fetching promotions: ' . $e->getMessage());
            return back()->withErrors(['message' => 'Failed to fetch promotions']);
        }
    }

    public function promotionDetail($id)
    {
        return Inertia::render('Frontpage/PromotionDetail', [
            'title' => 'Promosi',
            'description' => 'Selamat Datang di Website Love Lace Bali',
            'promotion' => $this->promotionRepository->find($id),
        ]);
    }

    public function contact()
    {
        return Inertia::render('Frontpage/Contact', [
            'title' => 'Kontak',
            'description' => 'Selamat Datang di Website Love Lace Bali',
        ]);
    }

    public function profile()
    {
        return Inertia::render('Frontpage/Profile', [
            'title' => 'Profil',
            'description' => 'Selamat Datang di Website Love Lace Bali',
        ]);
    }

    public function carts()
    {
        return Inertia::render('Frontpage/Cart', [
            'title' => 'Keranjang',
            'description' => 'Selamat Datang di Website Love Lace Bali',
        ]);
    }

    // public function transactions()
    // {
    //     return Inertia::render('Frontpage/Transaction', [
    //         'title' => 'Transaksi',
    //         'description' => 'Selamat Datang di Website Love Lace Bali',
    //     ]);
    // }

    public function transactions(Request $request)
    {
        $user = Auth::user();

        try {
            $filters = $request->only(['id', 'date', 'status']);
            $perPage = $request->perpage ?? 10;

            $transactions = $this->transactionRepository->all([
                'id' => $filters['id'] ?? null,
                'created_by' => $user->id,
                'date' => $filters['date'] ?? null,
                'status' => $filters['status'] ?? null
            ], $perPage);

            return Inertia::render('Frontpage/Transaction', [
                'title' => 'Riwayat Transaksi',
                'description' => 'Selamat Datang di Website Love Lace Bali',
                'transactions' => $transactions,
                'filters' => $filters
            ]);
        } catch (Exception $e) {
            Log::error('Error fetching categories: ' . $e->getMessage());
            return back()->withErrors(['message' => 'Failed to fetch categories']);
        }
    }

    public function transactionDetail($id)
    {
        try {
            $transaction = $this->transactionRepository->find($id);
            return Inertia::render('Frontpage/TransactionDetail', [
                'title' => 'Detail Transaksi',
                'transaction' => $transaction,
            ]);
        } catch (Exception $e) {
            Log::error('Error fetching categories: ' . $e->getMessage());
            return back()->withErrors(['message' => 'Failed to fetch categories']);
        }
    }
}
