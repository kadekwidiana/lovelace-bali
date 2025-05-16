<?php

namespace App\Http\Controllers;

use App\Http\Requests\Categories\CreateCategoryRequest;
use App\Http\Requests\Categories\UpdateCategoryRequest;
use App\Interfaces\CategoryRepositoryInterface;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class CategoryController extends Controller
{
    private CategoryRepositoryInterface $categoryRepository;

    public function __construct(CategoryRepositoryInterface $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $filters = $request->only(['name']);
            $perPage = $request->perpage ?? 10;

            $categories = $this->categoryRepository->all($filters, $perPage);

            return Inertia::render('Backpage/Categories/Index', [
                'title' => 'Kategori',
                'categories' => $categories,
                'searchByNameValue' => $filters['name'] ?? null,
            ]);
        } catch (Exception $e) {
            Log::error('Error fetching categories: ' . $e->getMessage());
            return back()->withErrors(['message' => 'Failed to fetch categories']);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateCategoryRequest $request)
    {
        try {
            $validated = $request->validated();

            $this->categoryRepository->create($validated);

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
    public function update(UpdateCategoryRequest $request, string $id)
    {
        try {
            $validated = $request->validated();

            $this->categoryRepository->update($id, $validated);

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
            $this->categoryRepository->delete($id);

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
