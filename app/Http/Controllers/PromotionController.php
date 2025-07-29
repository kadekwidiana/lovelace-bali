<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Requests\Promotions\CreatePromotionRequest;
use App\Http\Requests\Promotions\UpdatePromotionRequest;
use App\Interfaces\ProductRepositoryInterface;
use App\Interfaces\PromotionRepositoryInterface;
use App\Models\Product;
use App\Models\Promotion;
use Carbon\Carbon;
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

    public function checkPromo(Request $request)
    {
        try {
            $request->validate([
                'promo_code' => 'required|string',
                'items' => 'required|array',
                'items.*.product_id' => 'required|exists:products,id',
                'items.*.quantity' => 'required|numeric|min:1',
            ]);

            $promo = Promotion::with('products')->where('promo_code', $request->promo_code)->first();

            if (!$promo) {
                return response()->json([
                    'message' => 'Kode promo tidak valid.',
                ], 404);
            }

            $now = Carbon::now();

            if ($promo->start_date && $promo->start_date->gt($now)) {
                return response()->json([
                    'message' => 'Promo belum aktif.',
                ], 400);
            }

            if ($promo->end_date && $promo->end_date->lt($now)) {
                return response()->json([
                    'message' => 'Promo sudah berakhir.',
                ], 400);
            }

            $promoProductIds = $promo->products->pluck('id')->toArray();

            // Cek apakah semua item yang dibeli valid untuk promo
            $invalidItems = collect($request->items)->filter(function ($item) use ($promoProductIds) {
                return !in_array($item['product_id'], $promoProductIds);
            });

            if ($invalidItems->isNotEmpty()) {
                return response()->json([
                    'message' => 'Kode promo tidak berlaku untuk salah satu atau beberapa produk yang dibeli.',
                ], 400);
            }

            $discountPercentage = $promo->discount_percentage;

            // Ambil produk yang cocok dari promo (supaya dapat detail harga)
            $matchedProducts = $promo->products->filter(function ($product) use ($request) {
                return collect($request->items)->pluck('product_id')->contains($product->id);
            });

            $totalAmount = $matchedProducts->map(function ($product) use ($discountPercentage, $request) {
                $original = $product->price;
                $discounted = round($original * (1 - $discountPercentage / 100), 2);

                $item = collect($request->items)->firstWhere('product_id', $product->id);
                $quantity = $item['quantity'] ?? 1;

                return round($discounted * $quantity, 2);
            })->sum();

            return ApiResponse::success([
                'promo_code' => $promo->promo_code,
                'title' => $promo->title,
                'description' => $promo->description,
                'discount_percentage' => $discountPercentage,
                'valid_from' => $promo->start_date,
                'valid_until' => $promo->end_date,
                'products' => $matchedProducts->map(function ($product) use ($discountPercentage, $request) {
                    $original = $product->price;
                    $discounted = round($original * (1 - $discountPercentage / 100), 2);

                    // Ambil quantity dari item request
                    $item = collect($request->items)->firstWhere('product_id', $product->id);
                    $quantity = $item['quantity'] ?? 1;

                    return [
                        'id' => $product->id,
                        'name' => $product->name,
                        'original_price' => (float) $original,
                        'discounted_price' => $discounted,
                        'quantity' => $quantity,
                        'total_discounted_price' => round($discounted * $quantity, 2),
                    ];
                })->values(),
                'total_amount' => $totalAmount
            ], 'Kode promo valid dan sesuai dengan produk yang dibeli.', 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
