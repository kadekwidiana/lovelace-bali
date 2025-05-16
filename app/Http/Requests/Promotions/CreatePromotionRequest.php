<?php

namespace App\Http\Requests\Promotions;

use Illuminate\Foundation\Http\FormRequest;

class CreatePromotionRequest extends FormRequest
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
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'required|file|mimes:jpeg,png,jpg|max:2048',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'discount_percentage' => 'required|integer|min:1|max:100',

            // Produk yang dipromosikan
            'product_ids' => 'required|array|min:1', // array wajib diisi minimal 1 produk
            'product_ids.*' => 'exists:products,id', // setiap elemen harus ID produk yang valid
        ];
    }
}
