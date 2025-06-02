<?php

namespace App\Http\Controllers;

use App\Http\Requests\RajaOngkirConfigs\CreateRajaOngkirConfigRequest;
use App\Http\Requests\RajaOngkirConfigs\UpdateRajaOngkirConfigRequest;
use App\Interfaces\RajaOngkirConfirRepositoryInterface;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Validation\ValidationException;

class RajaOngkirConfigController extends Controller
{
    private RajaOngkirConfirRepositoryInterface $rajaOngkirRepository;

    public function __construct(RajaOngkirConfirRepositoryInterface $rajaOngkirRepository)
    {
        $this->rajaOngkirRepository = $rajaOngkirRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $filters = $request->only(['name']);
            $perPage = $request->perpage ?? 10;

            $rajaOngkirConfigs = $this->rajaOngkirRepository->all($filters, $perPage);

            return Inertia::render('Backpage/RajaOngkirConfigs/Index', [
                'title' => 'Raja Ongkir Config',
                'rajaOngkirConfigs' => $rajaOngkirConfigs,
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
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateRajaOngkirConfigRequest $request)
    {
        try {
            $validated = $request->validated();

            $this->rajaOngkirRepository->create($validated);

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
    public function update(UpdateRajaOngkirConfigRequest $request, string $id)
    {
        try {
            $validated = $request->validated();

            $this->rajaOngkirRepository->update($id, $validated);

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
            $config = $this->rajaOngkirRepository->find($id);

            if (!$config) {
                return response()->json([
                    'message' => 'Data tidak ditemukan.',
                ], 404);
            }

            $totalCount = $this->rajaOngkirRepository->count();
            if ($totalCount <= 1) {
                return response()->json([
                    'message' => 'Data tidak bisa dihapus karena hanya ada satu konfigurasi.',
                ], 422);
            }

            if ($config->is_select) {
                return response()->json([
                    'message' => 'Data tidak bisa dihapus karena sedang digunakan sebagai konfigurasi aktif.',
                ], 422);
            }

            $this->rajaOngkirRepository->delete($id);

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

    public function setDefault(string $id)
    {
        try {
            $this->rajaOngkirRepository->setDefaultSelect($id);

            return response()->json([
                'message' => 'Data berhasil diatur sebagai konfigurasi aktif.',
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat mengatur data.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
