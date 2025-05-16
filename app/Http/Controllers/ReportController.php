<?php

namespace App\Http\Controllers;

use App\Interfaces\ProductRepositoryInterface;
use App\Interfaces\StockLogRepositoryInterface;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
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
        return Inertia::render('Backpage/Report/Index', [
            'products' => $this->productRepository->allNoLimit(),
            'title' => 'Laporan',
        ]);
    }

    public function report(Request $request)
    {
        try {
            $startDate = $request->start_date;
            $endDate = $request->end_date;
            $typeReport = $request->type_report;
            $productId = $request->product_id;

            $reports = $this->stockLogRepository->getReports($startDate, $endDate, $typeReport, $productId);

            if ($reports->isEmpty()) {
                return response()->json([
                    'message' => 'Data tidak ditemukan.',
                ], 404);
            }

            $mappedReports = $reports->map(function ($report) {
                $stockAfter = $report->product->stock;

                if ($report->type === 'IN') {
                    $stockBefore = $stockAfter - $report->quantity;
                    $tipe = 'Produk Masuk';
                } else {
                    $stockBefore = $stockAfter + $report->quantity;
                    $tipe = 'Produk Keluar';
                }

                return [
                    // 'ID' => $report->id,
                    // 'ID Produk' => $report->product_id,
                    'Kode Produk' => $report->product->code,
                    'Nama Produk' => $report->product->name,
                    // 'Ukuran Produk' => $report->product->size,
                    // 'Warna Produk' => $report->product->color,
                    // 'Harga Produk' => $report->product->price,
                    'Tipe' => $tipe,
                    'Stok Sebelum' => $stockBefore,
                    'Stok Sesudah' => $stockAfter,
                    'Dibuat Oleh' => $report->user->name,
                    'Jumlah' => $report->quantity,
                    'Tanggal' => Carbon::parse($report->date)->translatedFormat('d F Y'),
                    'Catatan' => $report->note,
                    'Dibuat Pada' => Carbon::parse($report->created_at)->translatedFormat('d F Y'),
                    'Diperbarui Pada' => Carbon::parse($report->updated_at)->translatedFormat('d F Y'),
                ];
            });

            return response()->json([
                'message' => 'Berhasil mengambil data.',
                'data' => $mappedReports
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat mengambil data.',
                'error' => $e->getMessage(),
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
    public function store(Request $request)
    {
        //
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
        //
    }
}
