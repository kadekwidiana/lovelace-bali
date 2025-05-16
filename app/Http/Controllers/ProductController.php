<?php

namespace App\Http\Controllers;

use App\Http\Requests\Products\CreateProductRequest;
use App\Http\Requests\Products\UpdateProductRequest;
use App\Interfaces\CategoryRepositoryInterface;
use App\Interfaces\ProductRepositoryInterface;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class ProductController extends Controller
{
    private ProductRepositoryInterface $productRepository;
    private CategoryRepositoryInterface $categoryRepository;

    public function __construct(
        ProductRepositoryInterface $productRepository,
        CategoryRepositoryInterface $categoryRepository
    ) {
        $this->productRepository = $productRepository;
        $this->categoryRepository = $categoryRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $filters = $request->only(['name', 'category_id']);
            $perPage = $request->perpage ?? 10;

            $products = $this->productRepository->all($filters, $perPage);

            return Inertia::render('Backpage/Products/Index', [
                'title' => 'Produk',
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

    /**
     * Show the form for creating a new resource.
     */
    public function create() {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateProductRequest $request)
    {
        try {
            $validated = $request->validated();

            if ($request->hasFile('image') && $request->file('image')->isValid()) {
                $path = $request->file('image')->store('products');
                $validated['image'] = Storage::url($path);
            }

            $this->productRepository->create($validated);

            return response()->json([
                'message' => 'Data berhasil ditambahkan.',
            ], 201);
        } catch (\Exception $e) {
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
    public function update(UpdateProductRequest $request, string $id)
    {
        try {
            $validated = $request->validated();

            $product = $this->productRepository->find($id);

            if ($request->hasFile('image') && $request->file('image')->isValid()) {
                if ($product->image) {
                    Storage::delete(str_replace(Storage::url(''), '', $product->image));
                }

                $path = $request->file('image')->store('images');
                $validated['image'] = Storage::url($path);
            } else {
                $validated['image'] = $product->image;
            }

            $this->productRepository->update($id, $validated);

            return response()->json([
                'message' => 'Data berhasil diperbarui.',
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat memperbarui data.',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
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
            $product = $this->productRepository->find($id);

            if (!$product) {
                return response()->json([
                    'message' => 'Data tidak ditemukan.',
                ], 404);
            }

            if ($product->image) {
                $imagePath = str_replace(Storage::url(''), '', $product->image);
                Storage::delete($imagePath);
            }

            $this->productRepository->delete($id);

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
