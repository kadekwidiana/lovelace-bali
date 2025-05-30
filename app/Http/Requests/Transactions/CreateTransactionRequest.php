<?php

namespace App\Http\Requests\Transactions;

use Illuminate\Foundation\Http\FormRequest;

class CreateTransactionRequest extends FormRequest
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
            'created_by' => 'required|exists:users,id',
            'shipment_cost' => 'required|numeric|min:0',
            'phone_number' => 'required|string',
            'province_code' => 'required|string',
            'province_name' => 'required|string',
            'city_code' => 'required|string',
            'city_name' => 'required|string',
            'sub_district' => 'required|string',
            'village' => 'required|string',
            'address' => 'required|string',
            'note' => 'nullable|string',
            'items' => 'required|array',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|numeric|min:1',
            'courier' => 'required|string',
        ];
    }
}
