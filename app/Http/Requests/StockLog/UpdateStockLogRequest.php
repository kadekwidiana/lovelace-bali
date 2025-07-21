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
            'product_id'   => 'sometimes|required|exists:products,id',
            'created_by'   => 'sometimes|required|exists:users,id',
            'type'         => 'sometimes|required|in:IN,OUT',
            'quantity'     => 'sometimes|required|integer|min:1',
            'date'         => 'sometimes|required|date',
            'note'         => 'nullable|string',
            'source'       => 'sometimes|nullable|in:PURCHASE,INTERNAL_PROCUREMENT,CUSTOMER_RETURN,ADJUSTMENT_IN',
            'destination'  => 'sometimes|nullable|in:SALES,INTERNAL_USE,DAMAGED,ADJUSTMENT_OUT',
        ];
    }

    /**
     * Configure the validator instance.
     *
     * @param  \Illuminate\Validation\Validator  $validator
     * @return void
     */
    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $type = $this->input('type');

            if ($type === 'IN' && !$this->filled('source')) {
                $validator->errors()->add('source', 'Source is required when type is IN.');
            }

            if ($type === 'OUT') {
                if (!$this->filled('destination')) {
                    $validator->errors()->add('destination', 'Destination is required when type is OUT.');
                }

                // Optional stock check if product and quantity are available
                if ($this->filled('product_id') && $this->filled('quantity')) {
                    $product = \App\Models\Product::find($this->input('product_id'));
                    if ($product && $this->input('quantity') > $product->stock) {
                        $validator->errors()->add('quantity', 'The quantity out exceeds the current product stock (' . $product->stock . ').');
                    }
                }
            }
        });
    }
}
