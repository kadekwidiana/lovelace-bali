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
            'phone_number' => 'required|string|max:255',
            'recipient_name' => 'required|string|max:255',
            'province_code' => 'nullable|string|max:255',
            'province_name' => 'nullable|string|max:255',
            'city_code' => 'nullable|string|max:255',
            'city_name' => 'nullable|string|max:255',
            'sub_district' => 'nullable|string|max:255',
            'village' => 'nullable|string|max:255',
            'address' => 'required|string|max:255',
            'note' => 'nullable|string|max:512',

            // Items
            'items' => 'required|array',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|numeric|min:1',

            // Courier
            'courier' => 'required|string|max:255',

            // Destination JSON structure
            'destination_json' => 'required|array',
            'destination_json.id' => 'required|numeric',
            'destination_json.label' => 'required|string|max:255',
            'destination_json.province_name' => 'required|string|max:255',
            'destination_json.city_name' => 'required|string|max:255',
            'destination_json.district_name' => 'required|string|max:255',
            'destination_json.subdistrict_name' => 'required|string|max:255',
            'destination_json.zip_code' => 'required|string|max:255',

            // Cost JSON structure
            'cost_json' => 'required|array',
            'cost_json.name' => 'required|string|max:255',
            'cost_json.code' => 'required|string|max:255',
            'cost_json.service' => 'required|string|max:255',
            'cost_json.description' => 'required|string|max:255',
            'cost_json.cost' => 'required|numeric|min:0',
            'cost_json.etd' => 'nullable|string',
        ];
    }
}
