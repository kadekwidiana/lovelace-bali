<?php

namespace App\Services\External\Komerce;

use App\Helpers\ErrorHandler;
use Exception;
use Illuminate\Support\Facades\Http;

class KomerceDestination
{
    public static function searchDestination(
        ?string $search = null,
        ?int $limit = null,
        ?int $offset = null
    ) {
        $url = env('KOMERCE_API_URL') . '/api/v1/destination/domestic-destination';
        $key = env('KOMERCE_API_KEY');

        $queryParams = [
            'search' => $search,
            'limit' => $limit,
            'offset' => $offset
        ];

        try {
            $response = Http::withHeaders([
                'key' => $key
            ])->get($url, $queryParams);

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
