<?php

namespace App\Http\Requests\StockLog;

use Illuminate\Foundation\Http\FormRequest;

class UpdateStockLogRequest extends FormRequest
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
            'product_id' => 'sometimes|required|exists:products,id',
            'created_by' => 'sometimes|required|exists:users,id',
            'type' => 'sometimes|required|in:IN,OUT',
            'quantity' => 'sometimes|required|integer|min:1',
            'date' => 'sometimes|required|date',
            'note' => 'nullable|string',
        ];
    }
}
