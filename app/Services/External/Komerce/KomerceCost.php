<?php

namespace App\Services\External\Komerce;

use App\Helpers\ErrorHandler;
use Exception;
use Illuminate\Support\Facades\Http;

class KomerceCost
{
    public static function checkCost(
        int $origin,
        int $destination,
        int $weight,
        string $courier,
        ?int $price
    ) {
        $url = env('KOMERCE_API_URL') . '/api/v1/calculate/domestic-cost';
        $key = env('KOMERCE_API_KEY');

        try {
            $response = Http::withHeaders([
                'key' => $key
            ])->asForm()->post($url, [
                'origin' => $origin,
                'destination' => $destination,
                'weight' => $weight,
                'courier' => $courier,
                'price' => $price
            ]);

            if ($response->successful()) {
                return [
                    'success' => true,
                    'code' => $response->status(),
                    'data' => $response->json()
                ];
            }

            $err = json_decode($response->body());

            return [
                'success' => false,
                'code' => $response->status(),
                'message' => $response->json('message') ?? 'API request failed.',
                'error' => $err
            ];
        } catch (Exception $e) {
            return ErrorHandler::apiErrorResponse($e->getMessage());
        }
    }
}
