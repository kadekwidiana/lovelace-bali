<?php

namespace App\Http\Controllers;

use App\Http\Requests\Carts\CreateCartRequest;
use App\Http\Requests\Carts\UpdateCartRequest;
use App\Interfaces\CartRepositoryInterface;
use App\Interfaces\ProductRepositoryInterface;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CartController extends Controller
{
    private CartRepositoryInterface $cartRepository;
    private ProductRepositoryInterface $productRepository;

    public function __construct(CartRepositoryInterface $cartRepository, ProductRepositoryInterface $productRepository)
    {
        $this->cartRepository = $cartRepository;
        $this->productRepository = $productRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $filters = $request->only(['user_id', 'product_id']);

            $carts = $this->cartRepository->allNoLimit($filters);

            return response()->json([
                'message' => 'Carts fetched successfully',
                'data' => $carts
            ], 200);
        } catch (Exception $e) {
            Log::error('Error fetching carts: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to fetch carts',
                'error' => $e->getMessage()
            ], 500);
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
    public function store(CreateCartRequest $request)
    {
        try {
            $validated = $request->validated();

            $product = $this->productRepository->find($validated['product_id']);

            if ($product->stock < $validated['quantity']) {
                return response()->json([
                    'message' => 'Stok produk tidak mencukupi',
                ], 400);
            }

            // Cek apakah produk sudah ada di keranjang user
            $existingCart = $this->cartRepository->findByUserAndProduct($validated['user_id'], $validated['product_id']);

            if ($existingCart) {
                $newQuantity = $existingCart->quantity + $validated['quantity'];

                if ($product->stock < $newQuantity) {
                    return response()->json([
                        'message' => 'Total jumlah melebihi stok produk yang tersedia',
                    ], 400);
                }

                $existingCart->update([
                    'quantity' => $newQuantity,
                    'price_at_time' => $product->price,
                    'subtotal' => $product->price * $newQuantity,
                ]);
            } else {
                $validated['price_at_time'] = $product->price;
                $validated['subtotal'] = $product->price * $validated['quantity'];
                $this->cartRepository->create($validated);
            }

            return response()->json([
                'message' => 'Produk berhasil ditambahkan ke keranjang',
            ], 201);
        } catch (Exception $e) {
            Log::error('Error creating/updating cart: ' . $e->getMessage());
            return response()->json([
                'message' => 'Gagal menambahkan produk ke keranjang',
                'error' => $e->getMessage()
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
    public function update(UpdateCartRequest $request, string $id)
    {
        try {
            $validated = $request->validated();

            $product = $this->productRepository->find($validated['product_id']);

            $validated['price_at_time'] = $product->price;
            $validated['subtotal'] = $product->price * $validated['quantity'];

            $this->cartRepository->update($id, $validated);

            return response()->json([
                'message' => 'Keranjang berhasil diperbarui'
            ], 200);
        } catch (Exception $e) {
            Log::error('Error updating cart: ' . $e->getMessage());
            return response()->json([
                'message' => 'Gagal memperbarui keranjang',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $this->cartRepository->delete($id);

            return response()->json([
                'message' => 'Produk berhasil dihapus dari keranjang'
            ], 200);
        } catch (Exception $e) {
            Log::error('Error deleting cart: ' . $e->getMessage());
            return response()->json([
                'message' => 'Gagal menghapus produk dari keranjang',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function orderSummary($user_id)
    {
        try {
            $summary = $this->cartRepository->orderSummary($user_id);
            return response()->json([
                'message' => 'Order summary fetched successfully',
                'data' => $summary
            ], 200);
        } catch (Exception $e) {
            Log::error('Error fetching order summary: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to fetch order summary',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
