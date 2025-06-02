<?php

namespace App\Http\Requests\RajaOngkirConfigs;

use Illuminate\Foundation\Http\FormRequest;

class CreateRajaOngkirConfigRequest extends FormRequest
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
            'api_url' => 'required|string',
            'api_key' => 'required|string',
            'is_select' => 'required|boolean',
            'origin_default' => 'required|integer',
            'origin_description' => 'required|string',
        ];
    }
}
