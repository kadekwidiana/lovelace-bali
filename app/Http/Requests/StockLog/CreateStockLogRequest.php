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
            'product_id' => 'required|exists:products,id',
            'created_by' => 'required|exists:users,id',
            'type' => 'required|in:IN,OUT',
            'quantity' => 'required|integer|min:1',
            'date' => 'required|date',
            'note' => 'nullable|string',
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
            if ($this->input('type') === 'OUT') {
                $product = \App\Models\Product::find($this->input('product_id'));

                if ($product && $this->input('quantity') > $product->stock) {
                    $validator->errors()->add('quantity', 'The quantity out exceeds the current product stock (' . $product->stock . ').');
                }
            }
        });
    }
}
