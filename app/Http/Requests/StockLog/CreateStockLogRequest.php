<?php

namespace App\Http\Requests\StockLog;

use Illuminate\Foundation\Http\FormRequest;

class CreateStockLogRequest extends FormRequest
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
            'product_id'   => 'required|exists:products,id',
            'created_by'   => 'required|exists:users,id',
            'type'         => 'required|in:IN,OUT',
            'quantity'     => 'required|integer|min:1',
            'date'         => 'required|date',
            'note'         => 'nullable|string',
            'source'       => 'nullable|in:PURCHASE,INTERNAL_PROCUREMENT,CUSTOMER_RETURN,ADJUSTMENT_IN',
            'destination'  => 'nullable|in:SALES,INTERNAL_USE,DAMAGED,ADJUSTMENT_OUT',
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

            // Validasi quantity jika OUT melebihi stok
            if ($type === 'OUT') {
                $product = \App\Models\Product::find($this->input('product_id'));
                if ($product && $this->input('quantity') > $product->stock) {
                    $validator->errors()->add('quantity', 'The quantity out exceeds the current product stock. (' . $product->stock . ').');
                }

                // destination wajib jika type OUT
                if (empty($this->input('destination'))) {
                    $validator->errors()->add('destination', 'Destination is mandatory when type OUT.');
                }
            }

            // source wajib jika type IN
            if ($type === 'IN' && empty($this->input('source'))) {
                $validator->errors()->add('source', 'Source is required when typing IN.');
            }
        });
    }
}
