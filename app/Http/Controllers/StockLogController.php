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

            $oldStockLog = $this->stockLogRepository->find($id); // Ambil data lama
            $oldProduct = $this->productRepository->find($oldStockLog->product_id);

            // Kembalikan stok lama ke produk lama
            if ($oldStockLog->type === 'IN') {
                $oldProduct->stock -= $oldStockLog->quantity;
            } else {
                $oldProduct->stock += $oldStockLog->quantity;
            }

            // Simpan perubahan stok ke produk lama
            $this->productRepository->update($oldProduct->id, [
                'stock' => $oldProduct->stock,
            ]);

            // Ambil produk baru (bisa saja sama dengan produk lama)
            $newProduct = $this->productRepository->find($validated['product_id']);

            // Hitung stok baru
            $newStock = $validated['type'] === 'IN'
                ? $newProduct->stock + $validated['quantity']
                : $newProduct->stock - $validated['quantity'];

            // Simpan perubahan stok ke produk baru
            $this->productRepository->update($newProduct->id, [
                'stock' => $newStock,
            ]);

            // Perbarui StockLog
            $this->stockLogRepository->update($id, $validated);

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
            $stockLog = $this->stockLogRepository->find($id);
            $product = $this->productRepository->find($stockLog->product_id);

            // Hitung efek kebalikan dari log (reversal)
            $updatedStock = $stockLog->type === 'IN'
                ? $product->stock - $stockLog->quantity
                : $product->stock + $stockLog->quantity;

            // Cek apakah stok valid
            if ($updatedStock < 0) {
                return response()->json([
                    'message' => 'Stock tidak boleh kurang dari 0.',
                ], 400);
            }

            // Update product stock
            $this->productRepository->update($product->id, [
                'stock' => $updatedStock,
            ]);

            // Delete the stock log
            $this->stockLogRepository->delete($id);

            DB::commit();

            return response()->json([
                'message' => 'Data berhasil dihapus.',
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Terjadi kesalahan saat menghapus data.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
