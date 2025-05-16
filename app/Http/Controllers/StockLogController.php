<?php

namespace App\Http\Controllers;

use App\Http\Requests\StockLog\CreateStockLogRequest;
use App\Http\Requests\StockLog\UpdateStockLogRequest;
use App\Interfaces\ProductRepositoryInterface;
use App\Interfaces\StockLogRepositoryInterface;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class StockLogController extends Controller
{
    private StockLogRepositoryInterface $stockLogRepository;
    private ProductRepositoryInterface $productRepository;

    public function __construct(StockLogRepositoryInterface $stockLogRepository, ProductRepositoryInterface $productRepository)
    {
        $this->stockLogRepository = $stockLogRepository;
        $this->productRepository = $productRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function productIn(Request $request)
    {
        try {
            $filters = $request->only(['name']);
            $perPage = $request->perpage ?? 10;

            $filters['type'] = 'IN';

            $stockLogs = $this->stockLogRepository->all($filters, $perPage);

            return Inertia::render('Backpage/StockLogs/In', [
                'title' => 'Produk Masuk',
                'stockLogs' => $stockLogs,
                'products' => $this->productRepository->allNoLimit(),
                'searchByNameValue' => $filters['name'] ?? null,
            ]);
        } catch (Exception $e) {
            Log::error('Error fetching stockLogs: ' . $e->getMessage());
            return back()->withErrors(['message' => 'Failed to fetch stockLogs']);
        }
    }

    public function productOut(Request $request)
    {
        try {
            $filters = $request->only(['name']);
            $perPage = $request->perpage ?? 10;

            $filters['type'] = 'OUT';

            $stockLogs = $this->stockLogRepository->all($filters, $perPage);

            return Inertia::render('Backpage/StockLogs/Out', [
                'title' => 'Produk Keluar',
                'stockLogs' => $stockLogs,
                'products' => $this->productRepository->allNoLimit(),
                'searchByNameValue' => $filters['name'] ?? null,
            ]);
        } catch (Exception $e) {
            Log::error('Error fetching stockLogs: ' . $e->getMessage());
            return back()->withErrors(['message' => 'Failed to fetch stockLogs']);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateStockLogRequest $request)
    {
        DB::beginTransaction();
        try {
            $validated = $request->validated();

            $product = $this->productRepository->find($validated['product_id']);

            $updateStockValue = $validated['type'] === 'IN' ? $product->stock + $validated['quantity'] : $product->stock - $validated['quantity']; // Update stock (IN/OUT)

            $this->stockLogRepository->create($validated);

            $this->productRepository->update($validated['product_id'], [
                'stock' => $updateStockValue,
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Data berhasil ditambahkan.',
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Terjadi kesalahan saat menambahkan data.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStockLogRequest $request, string $id)
    {
        Log::debug($request->all());
        DB::beginTransaction();
        try {
            $validated = $request->validated();

            $this->stockLogRepository->update($id, $validated);

            $product = $this->productRepository->find($validated['product_id']);

            $updateStockValue = $validated['type'] === 'IN' ? $product->stock + $validated['quantity'] : $product->stock - $validated['quantity']; // Update stock (IN/OUT)

            $this->productRepository->update($validated['product_id'], [
                'stock' => $updateStockValue,
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Data berhasil diperbarui.',
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Terjadi kesalahan saat memperbarui data.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        DB::beginTransaction();
        try {
            // Get stock log
            $stockLog = $this->stockLogRepository->find($id);

            // Get product
            $product = $this->productRepository->find($stockLog->product_id);

            // Update stock
            $updateStockValue = $stockLog->type === 'OUT'
                ? $product->stock + $stockLog->quantity
                : $product->stock - $stockLog->quantity;

            // Optional: prevent negative stock
            if ($updateStockValue < 0) {
                return response()->json([
                    'message' => 'Stock tidak boleh kurang dari 0.',
                ], 400);
            }

            $this->productRepository->update($product->id, [
                'stock' => $updateStockValue,
            ]);

            // Delete stock log
            $this->stockLogRepository->delete($id);

            DB::commit();

            return response()->json([
                'message' => 'Data berhasil dihapus.',
            ], 200); // 200 OK
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Terjadi kesalahan saat menghapus data.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
