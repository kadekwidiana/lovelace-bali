<?php

namespace App\Http\Requests\Products;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProductRequest extends FormRequest
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
        $productId = is_object($this->route('id')) ? $this->route('id')->id : $this->route('id');

        return [
            'category_id' => 'sometimes|required|exists:categories,id',
            'name' => 'sometimes|required|string|max:255',
            'code' => [
                'sometimes',
                'required',
                'string',
                Rule::unique('products', 'code')->ignore($productId),
            ],
            'size' => 'sometimes|required|string|max:100',
            'color' => 'sometimes|required|string|max:100',
            'price' => 'sometimes|required|numeric|min:0',
            'stock' => 'sometimes|required|integer|min:0',
            'description' => 'nullable|string',
            'image' => 'nullable|file|mimes:jpeg,png,jpg|max:2048',
        ];
    }
}
