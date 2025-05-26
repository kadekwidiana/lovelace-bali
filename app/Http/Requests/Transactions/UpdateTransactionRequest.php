<?php

namespace App\Http\Requests\Transactions;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTransactionRequest extends FormRequest
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
            'created_by' => 'sometimes|required|exists:users,id',
            'date' => 'sometimes|required|date',
            'total_amount' => 'sometimes|required|numeric|min:0',
            'status' => 'sometimes|required|in:PENDING,PAID,PROCESSING,SHIPPED,DELIVERED,CANCELLED',
            'snap_token_midtrans' => 'nullable|string',
            'receipt_number' => 'nullable|string',
            'note' => 'nullable|string',
        ];
    }
}
