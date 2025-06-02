<?php

namespace App\Http\Requests\Komerces;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Helpers\ApiResponse;
use Symfony\Component\HttpFoundation\Response;

class CheckCostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // 'origin' => 'required|integer',
            'destination' => 'required|integer',
            'weight' => 'required|integer',
            'courier' => 'required|in:jne,sicepat,jnt,ninja',
            'price' => 'nullable|string',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            ApiResponse::error(
                $validator->errors(),
                'Validation failed',
                Response::HTTP_UNPROCESSABLE_ENTITY
            )
        );
    }
}
