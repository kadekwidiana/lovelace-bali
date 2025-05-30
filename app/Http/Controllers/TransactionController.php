<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Requests\Transactions\CreateTransactionRequest;
use App\Http\Requests\Transactions\UpdateTransactionRequest;
use App\Interfaces\CartRepositoryInterface;
use App\Interfaces\CategoryRepositoryInterface;
use App\Interfaces\ProductRepositoryInterface;
use App\Interfaces\TransactionRepositoryInterface;
use App\Interfaces\TransactionShipmentRepositoryInterface;
use App\Models\User;
use App\Repositories\TransactionDetailRepository;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Midtrans\Config;
use Midtrans\Snap;

class TransactionController extends Controller
{
    private TransactionRepositoryInterface $transactionRepository;
    private CategoryRepositoryInterface $categoryRepository;
    private ProductRepositoryInterface $productRepository;
    private TransactionShipmentRepositoryInterface $transactionShipmentRepository;
    private CartRepositoryInterface $cartRepository;
    private TransactionDetailRepository $transactionDetailRepository;

    public function __construct(
        TransactionRepositoryInterface $transactionRepository,
        CategoryRepositoryInterface $categoryRepository,
        ProductRepositoryInterface $productRepository,
        TransactionShipmentRepositoryInterface $transactionShipmentRepository,
        CartRepositoryInterface $cartRepository,
        TransactionDetailRepository $transactionDetailRepository
    ) {
        $this->transactionRepository = $transactionRepository;
        $this->categoryRepository = $categoryRepository;
        $this->productRepository = $productRepository;
        $this->transactionShipmentRepository = $transactionShipmentRepository;
        $this->cartRepository = $cartRepository;
        $this->transactionDetailRepository = $transactionDetailRepository;

        // midtrans config
        Config::$serverKey = config('midtrans.server_key');
        Config::$isProduction = config('midtrans.is_production');
        Config::$isSanitized = config('midtrans.is_sanitized');
        Config::$is3ds = config('midtrans.is_3ds');
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

    public function store(CreateTransactionRequest $request)
    {
        DB::beginTransaction();
        try {
            $validated = $request->validated();

            $createdBy = $validated['created_by'];
            $user = User::with('customer')->find($createdBy);

            // create transaction
            $transaction = $this->transactionRepository->create([
                'created_by' => $createdBy,
                'date' => now(),
                'shipment_cost' => $validated['shipment_cost'],
                'total_amount' => $this->calculateTotalAmount($validated['items']) + $validated['shipment_cost'],
                'status' => 'PENDING',
                'note' => $validated['note']
            ]);

            // shipment cost sebagai item terpisah
            $itemDetails[] = [
                'id' => 'SHIPPING_COST',
                'price' => $validated['shipment_cost'],
                'quantity' => 1,
                'name' => 'Biaya Pengiriman',
            ];

            // create transaction detail
            foreach ($validated['items'] as $item) {
                $product = $this->productRepository->find($item['product_id']);

                if ($product->stock < $item['quantity']) {
                    DB::rollBack();

                    return ApiResponse::error([
                        'detail' => 'Stock not enough',
                    ], 'Stok produk tidak mencukupi', 400);
                }

                $this->transactionDetailRepository->create([
                    'transaction_id' => $transaction->id,
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'price_at_time' => $product->price,
                    'subtotal' => $product->price * $item['quantity'],
                ]);

                $itemDetails[] = [
                    'id' => (string) $item['product_id'],
                    'price' => $product->price,
                    'quantity' => $item['quantity'],
                    'name' => $product->name,
                ];

                $product->stock -= $item['quantity'];
                $product->save();
            }

            // create transaction shipment
            $shipment =   $this->transactionShipmentRepository->create([
                'transaction_id' => $transaction->id,
                'courier' => $validated['courier'],
                'phone_number' => $validated['phone_number'],
                'province_code' => $validated['province_code'],
                'province_name' => $validated['province_name'],
                'city_code' => $validated['city_code'],
                'city_name' => $validated['city_name'],
                'sub_district' => $validated['sub_district'],
                'village' => $validated['village'],
                'address' => $validated['address'],
            ]);

            // integration midtrans
            // get snap token midtrans
            $snapTokenMidtrans = Snap::getSnapToken([
                'transaction_details' => [
                    'order_id' => $transaction->id,
                    'gross_amount' => $transaction->total_amount,
                ],
                'item_details' => $itemDetails,
                'customer_details' => [
                    'first_name' => $user->name,
                    'last_name' => '-',
                    'email' => $user->email,
                    'phone' => $user->customer->phone_number,
                ],
            ]);

            // update snap token
            $transaction->update([
                'snap_token_midtrans' => $snapTokenMidtrans,
            ]);

            // delete cart items
            $this->cartRepository->deleteByItems($validated['items']);

            Log::info('Transaction created successfully', ['transaction_id' => $transaction->id]);

            DB::commit();

            return ApiResponse::success([
                'transaction' => $transaction,
                'items' => $itemDetails,
                'shipment' => $shipment,
                'user' => $user
            ], 'Transaksi berhasil dibuat.', 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return ApiResponse::error([
                'detail' => $e->getMessage(),
            ]);
        }
    }

    private function calculateTotalAmount(array $items): float
    {
        return collect($items)->sum(fn($item) => $this->productRepository->find($item['product_id'])->price * $item['quantity']);
    }

    public function midtransCallback(Request $request)
    {
        $serverKey = config('midtrans.server_key');
        $hashedKey = hash('sha512', $request->order_id . $request->status_code . $request->gross_amount . $serverKey);

        if ($hashedKey !== $request->signature_key) {
            return ApiResponse::error(['message' => 'Invalid signature key'], 'Invalid signature key', 400);
        }

        $transactionStatus = $request->transaction_status;
        $orderId = $request->order_id;
        $transaction = $this->transactionRepository->find($orderId);

        if (!$transaction) {
            return ApiResponse::error(['message' => 'Order not found'], 'Order not found', 404);
        }

        switch ($transactionStatus) {
            case 'capture':
                if ($request->payment_type === 'credit_card') {
                    $status = ($request->fraud_status === 'challenge') ? 'PENDING' : 'PAID';
                } else {
                    $status = 'PAID';
                }
                break;

            case 'settlement':
                $status = 'PAID';
                break;

            case 'pending':
                $status = 'PENDING';
                break;

            case 'deny':
            case 'expire':
            case 'cancel':
                $status = 'CANCELLED';
                break;

            default:
                $status = 'PENDING';
                break;
        }

        $transaction->update(['status' => $status]);

        return ApiResponse::success(['transaction' => $transaction], 'Transaction status updated successfully');
    }
}
