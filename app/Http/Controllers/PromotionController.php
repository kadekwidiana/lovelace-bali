<?php

namespace App\Http\Controllers;

use App\Http\Requests\Promotions\CreatePromotionRequest;
use App\Http\Requests\Promotions\UpdatePromotionRequest;
use App\Interfaces\ProductRepositoryInterface;
use App\Interfaces\PromotionRepositoryInterface;
use App\Models\Product;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class PromotionController extends Controller
{
    private PromotionRepositoryInterface $promotionRepository;
    private ProductRepositoryInterface $productRepository;

    public function __construct(
        PromotionRepositoryInterface $promotionRepository,
        ProductRepositoryInterface $productRepository
    ) {
        $this->promotionRepository = $promotionRepository;
        $this->productRepository = $productRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $filters = $request->only(['title']);
            $perPage = $request->perpage ?? 10;

            $promotions = $this->promotionRepository->all($filters, $perPage);

            return Inertia::render('Backpage/Promotions/Index', [
                'title' => 'Promosi',
                'promotions' => $promotions,
                'products' => $this->productRepository->dropdown(),
                'searchByTitleValue' => $filters['title'] ?? null,
            ]);
        } catch (Exception $e) {
            Log::error('Error fetching promotions: ' . $e->getMessage());
            return back()->withErrors(['message' => 'Failed to fetch promotions']);
        }
    }

    public function getProductIds($promotionId)
    {
        try {
            $productIds = $this->promotionRepository->productIds($promotionId);
            return response()->json($productIds);
        } catch (Exception $e) {
            Log::error('Error fetching product ids: ' . $e->getMessage());
            return back()->withErrors(['message' => 'Failed to fetch product ids']);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreatePromotionRequest $request)
    {
        DB::beginTransaction();
        try {
            $validated = $request->validated();

            if ($request->hasFile('image') && $request->file('image')->isValid()) {
                $path = $request->file('image')->store('promotions');
                $validated['image'] = Storage::url($path);
            }

            $promotion = $this->promotionRepository->create([
                'title' => $validated['title'],
                'promo_code' => $validated['promo_code'],
                'description' => $validated['description'],
                'image' => $validated['image'],
                'start_date' => $validated['start_date'],
                'end_date' => $validated['end_date'],
                'discount_percentage' => $validated['discount_percentage'],
            ]);

            $this->promotionRepository->syncProducts($promotion->id, $validated['product_ids']);

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
    public function update(UpdatePromotionRequest $request, string $id)
    {
        DB::beginTransaction();
        try {
            $validated = $request->validated();

            $product = $this->promotionRepository->find($id);

            if ($request->hasFile('image') && $request->file('image')->isValid()) {
                if ($product->image) {
                    Storage::delete(str_replace(Storage::url(''), '', $product->image));
                }

                $path = $request->file('image')->store('images');
                $validated['image'] = Storage::url($path);
            } else {
                $validated['image'] = $product->image;
            }

            $this->promotionRepository->update($id, [
                'title' => $validated['title'],
                'promo_code' => $validated['promo_code'],
                'description' => $validated['description'],
                'image' => $validated['image'],
                'start_date' => $validated['start_date'],
                'end_date' => $validated['end_date'],
                'discount_percentage' => $validated['discount_percentage'],
            ]);

            $this->promotionRepository->syncProducts($id, $validated['product_ids']);

            DB::commit();
            return response()->json([
                'message' => 'Data berhasil diperbarui.',
            ], 201);
        } catch (ValidationException $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Terjadi kesalahan saat memperbarui data.',
                'errors' => $e->errors(),
            ], 422);
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
        try {
            $product = $this->promotionRepository->find($id);

            if (!$product) {
                return response()->json([
                    'message' => 'Data tidak ditemukan.',
                ], 404);
            }

            if ($product->image) {
                $imagePath = str_replace(Storage::url(''), '', $product->image);
                Storage::delete($imagePath);
            }

            $this->promotionRepository->delete($id);

            return response()->json([
                'message' => 'Data berhasil dihapus.',
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat menghapus data.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
