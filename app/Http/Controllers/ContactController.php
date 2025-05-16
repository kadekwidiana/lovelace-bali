<?php

namespace App\Http\Controllers;

use App\Http\Requests\Contacts\CreateContactRequest;
use App\Interfaces\ContactRepositoryInterface;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ContactController extends Controller
{
    private $contactRepository;

    public function __construct(ContactRepositoryInterface $contactRepository)
    {
        $this->contactRepository = $contactRepository;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $filters = $request->only(['name']);
            $perPage = $request->perpage ?? 10;

            $contacts = $this->contactRepository->all($filters, $perPage);

            return Inertia::render('Backpage/Contacts/Index', [
                'title' => 'Kontak',
                'contacts' => $contacts,
                'searchByNameValue' => $filters['name'] ?? null,
            ]);
        } catch (Exception $e) {
            Log::error('Error fetching contacts: ' . $e->getMessage());
            return back()->withErrors(['message' => 'Failed to fetch contacts']);
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
    public function store(CreateContactRequest $request)
    {
        try {
            $validated = $request->validated();

            $this->contactRepository->create($validated);

            return response()->json([
                'message' => 'Pesan berhasil dikirim.',
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat mengirimkan pesan.',
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $this->contactRepository->delete($id);

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
