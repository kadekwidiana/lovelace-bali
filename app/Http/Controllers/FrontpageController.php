<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Interfaces\CartRepositoryInterface;
use App\Interfaces\CategoryRepositoryInterface;
use App\Interfaces\ProductRepositoryInterface;
use App\Interfaces\PromotionRepositoryInterface;
use App\Interfaces\TransactionRepositoryInterface;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class FrontpageController extends Controller
{
    private ProductRepositoryInterface $productRepository;
    private PromotionRepositoryInterface $promotionRepository;
    private CategoryRepositoryInterface $categoryRepository;
    private TransactionRepositoryInterface $transactionRepository;
    private CartRepositoryInterface $cartRepository;

    public function __construct(
        ProductRepositoryInterface $productRepository,
        PromotionRepositoryInterface $promotionRepository,
        CategoryRepositoryInterface $categoryRepository,
        TransactionRepositoryInterface $transactionRepository,
        CartRepositoryInterface $cartRepository
    ) {
        $this->productRepository = $productRepository;
        $this->promotionRepository = $promotionRepository;
        $this->categoryRepository = $categoryRepository;
        $this->transactionRepository = $transactionRepository;
        $this->cartRepository = $cartRepository;
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

    public function transactionDetail($id, Request $request)
    {
        try {
            $transaction = $this->transactionRepository->find($id);

            // only allow user to access their own transaction
            if ($transaction->created_by !== Auth::user()->id) {
                return Inertia::render('Error/Error', ['status' => 403])
                    ->toResponse($request)
                    ->setStatusCode(403);
            }

            return Inertia::render('Frontpage/TransactionDetail', [
                'title' => 'Detail Transaksi',
                'transaction' => $transaction,
            ]);
        } catch (ModelNotFoundException $e) {
            return back()->withErrors(['message' => 'Transaksi tidak ditemukan.']);
        } catch (Exception $e) {
            Log::error('Error fetching transaction detail: ' . $e->getMessage());
            return back()->withErrors(['message' => 'Terjadi kesalahan saat mengambil detail transaksi.']);
        }
    }

    public function checkout()
    {
        // if cart is empty, redirect to cart page
        $carts = $this->cartRepository->orderSummary(Auth::user()->id);

        if (count($carts['items']) == 0) {
            return redirect()->route('frontpage.customer.carts');
        }

        return Inertia::render('Frontpage/Checkout', [
            'title' => 'Checkout',
            'description' => 'Selamat Datang di Website Love Lace Bali',
        ]);
    }
}
