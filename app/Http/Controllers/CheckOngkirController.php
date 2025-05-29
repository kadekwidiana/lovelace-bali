<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Requests\Ongkirs\CheckCostRequest;
use App\Services\External\RajaOngkir\RajaOngkirCost;
use App\Services\External\RajaOngkir\RajaOngkirRegion;
use Illuminate\Http\Request;

class CheckOngkirController extends Controller
{
    public function getProvince()
    {
        try {
            $provinceResponse = RajaOngkirRegion::getProvince();

            if (!$provinceResponse['success']) {
                return ApiResponse::error($provinceResponse);
            }

            return ApiResponse::success($provinceResponse['data'], 'Province fetched successfully');
        } catch (\Exception $e) {
            return ApiResponse::error(
                [
                    'detail' => $e->getMessage(),
                ]
            );
        }
    }

    public function getCity(Request $request)
    {
        try {
            $cityResponse = RajaOngkirRegion::getCity($request->province);

            if (!$cityResponse['success']) {
                return ApiResponse::error($cityResponse);
            }

            return ApiResponse::success($cityResponse['data'], 'Province fetched successfully');
        } catch (\Exception $e) {
            return ApiResponse::error(
                [
                    'detail' => $e->getMessage(),
                ]
            );
        }
    }

    public function checkCost(CheckCostRequest $request)
    {
        try {
            $validated = $request->validated();

            $costResponse = RajaOngkirCost::checkCost(
                $validated['origin'],
                $validated['destination'],
                $validated['weight'],
                $validated['courier']
            );

            if (!$costResponse['success']) {
                return ApiResponse::error($costResponse);
            }

            return ApiResponse::success($costResponse['data'], 'Cost fetched successfully');
        } catch (\Exception $e) {
            return ApiResponse::error(
                [
                    'detail' => $e->getMessage(),
                ]
            );
        }
    }
}
