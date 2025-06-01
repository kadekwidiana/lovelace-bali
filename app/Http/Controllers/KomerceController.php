<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Requests\Komerces\CheckCostRequest;
use App\Services\External\Komerce\KomerceCost;
use App\Services\External\Komerce\KomerceDestination;
use Illuminate\Http\Request;

class KomerceController extends Controller
{
    public function searchDestination(Request $request)
    {
        try {
            $search = $request->search;
            $limit = $request->limit;
            $offset = $request->offset;

            $destinationResponse = KomerceDestination::searchDestination($search, $limit, $offset);

            if (!$destinationResponse['success']) {
                return ApiResponse::error($destinationResponse, 'Destinasi gagal ditemukan, silahkan coba lagi atau hubungi admin');
            }

            return ApiResponse::success($destinationResponse['data'], 'Destinasi berhasil ditemukan');
        } catch (\Exception $e) {
            return ApiResponse::error(
                [
                    'detail' => $e->getMessage(),
                ],
                'Destinasi gagal ditemukan, silahkan coba lagi atau hubungi admin'
            );
        }
    }

    public function checkCost(CheckCostRequest $request)
    {
        try {
            $validated = $request->validated();

            $costResponse = KomerceCost::checkCost(
                $validated['origin'],
                $validated['destination'],
                $validated['weight'],
                $validated['courier'],
                $validated['price']
            );

            if (!$costResponse['success']) {
                return ApiResponse::error($costResponse, 'Biaya pengiriman gagal dihitung, silahkan coba lagi atau hubungi admin');
            }

            return ApiResponse::success($costResponse['data'], 'Biaya pengiriman berhasil dihitung');
        } catch (\Exception $e) {
            return ApiResponse::error(
                [
                    'detail' => $e->getMessage(),
                ],
                'Biaya pengiriman gagal dihitung, silahkan coba lagi atau hubungi admin'
            );
        }
    }
}
