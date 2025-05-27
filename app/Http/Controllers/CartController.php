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
            $perPage = $request->perpage ?? 10;

            $carts = $this->cartRepository->all($filters, $perPage);

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

            $validated['price_at_time'] = $product->price;
            $validated['subtotal'] = $product->price * $validated['quantity'];

            $this->cartRepository->create($validated);

            return response()->json([
                'message' => 'Cart created successfully',
            ], 201);
        } catch (Exception $e) {
            Log::error('Error creating cart: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to create cart',
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
                'message' => 'Cart updated successfully'
            ], 200);
        } catch (Exception $e) {
            Log::error('Error updating cart: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to update cart',
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
                'message' => 'Cart deleted successfully'
            ], 200);
        } catch (Exception $e) {
            Log::error('Error deleting cart: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to delete cart',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
