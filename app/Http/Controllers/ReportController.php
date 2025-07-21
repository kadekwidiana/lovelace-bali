<?php

namespace App\Http\Controllers;

use App\Helpers\StockLogHelper;
use App\Interfaces\ProductRepositoryInterface;
use App\Interfaces\StockLogRepositoryInterface;
use App\Interfaces\TransactionRepositoryInterface;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    private StockLogRepositoryInterface $stockLogRepository;
    private ProductRepositoryInterface $productRepository;
    private TransactionRepositoryInterface $transactionRepository;

    public function __construct(StockLogRepositoryInterface $stockLogRepository, ProductRepositoryInterface $productRepository, TransactionRepositoryInterface $transactionRepository)
    {
        $this->stockLogRepository = $stockLogRepository;
        $this->productRepository = $productRepository;
        $this->transactionRepository = $transactionRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Backpage/Report/Index', [
            'products' => $this->productRepository->allNoLimit(),
            'title' => 'Laporan Stok',
        ]);
    }

    public function transactionReportView()
    {
        return Inertia::render('Backpage/Report/Transaction', [
            'users' => User::where('role', 'CUSTOMER')->get(),
            'title' => 'Laporan Transaksi',
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
                    $label = StockLogHelper::getSourceLabel($report->source);
                } else if ($report->type === 'OUT') {
                    $stockBefore = $stockAfter + $report->quantity;
                    $tipe = 'Produk Keluar';
                    $label = StockLogHelper::getDestinationLabel($report->destination);
                }

                $sourceOrDestination = 'Sumber/Tujuan';

                return [
                    'Kode Produk' => $report->product->code,
                    'Nama Produk' => $report->product->name,
                    'Tipe' => $tipe,
                    $sourceOrDestination => $label, // Sumber atau Tujuan
                    'Stok Sebelum' => $stockBefore,
                    'Stok Sesudah' => $stockAfter,
                    'Dibuat Oleh' => $report->user->name,
                    'Jumlah' => $report->quantity,
                    'Tanggal' => Carbon::parse($report->date)->translatedFormat('d F Y H:i:s'),
                    'Catatan' => $report->note,
                    'Dibuat Pada' => Carbon::parse($report->created_at)->translatedFormat('d F Y H:i:s'),
                    'Diperbarui Pada' => Carbon::parse($report->updated_at)->translatedFormat('d F Y H:i:s'),
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

    public function transactionReport(Request $request)
    {
        try {
            $startDate = $request->start_date;
            $endDate = $request->end_date;
            $status = $request->status;
            $userId = $request->user_id;

            $reports = $this->transactionRepository->getReports($startDate, $endDate, $status, $userId);

            if ($reports->isEmpty()) {
                return response()->json([
                    'message' => 'Data tidak ditemukan.',
                ], 404);
            }

            $mappedReports = $reports->map(function ($report) {
                $items = [];
                foreach ($report->details as $detail) {
                    $items[] =
                        $detail->product->name . ' - ' .
                        $detail->quantity . ' x ' .
                        'Rp. ' . number_format($detail->price_at_time, 0, ',', '.') . ' = ' .
                        'Rp. ' . number_format($detail->quantity * $detail->price_at_time, 0, ',', '.');
                }

                $shipment = $report->shipment;
                $shipmentInfo = '-';
                if ($shipment) {
                    $destination = $shipment->destination_json ?? [];
                    $cost = $shipment->cost_json ?? [];

                    $shipmentInfo = implode("\n", [
                        "Kurir: " . ($shipment->courier ?? '-'),
                        "Nama Penerima: " . ($shipment->recipient_name ?? '-'),
                        "No. HP: " . ($shipment->phone_number ?? '-'),
                        "Alamat: " . ($shipment->address ?? '-'),
                        "Wilayah Tujuan: " . ($destination['label'] ?? '-'),
                        "Kode Pos: " . ($destination['zip_code'] ?? '-'),
                        "Layanan: " . ($cost['name'] ?? '-') . ' - ' . ($cost['service'] ?? '-') . ' (' . ($cost['description'] ?? '-') . ')',
                        "Biaya Pengiriman: Rp. " . number_format($cost['cost'] ?? 0, 0, ',', '.'),
                    ]);
                }


                return [
                    'ID Transaksi' => $report->id,
                    'Dibuat Oleh' => $report->user->name,
                    'Tanggal' => Carbon::parse($report->date)->translatedFormat('d F Y H:i:s'),
                    'Status' => $report->status,
                    'Total Harga' => 'Rp. ' . number_format($report->total_amount, 0, ',', '.'),
                    'Items' => implode(",\n ", $items),
                    'Snap Token Midtrans' => $report->snap_token_midtrans ?? '-',
                    'Nomor Resi' => $report->receipt_number ?? '-',
                    'Catatan' => $report->note ?? '-',
                    'Pengiriman' => $shipmentInfo,
                    'Dibuat Pada' => Carbon::parse($report->created_at)->translatedFormat('d F Y H:i:s'),
                    'Diperbarui Pada' => Carbon::parse($report->updated_at)->translatedFormat('d F Y H:i:s'),
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
