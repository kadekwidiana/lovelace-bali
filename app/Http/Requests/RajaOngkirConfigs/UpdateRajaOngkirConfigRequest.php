<?php

namespace App\Http\Requests\RajaOngkirConfigs;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRajaOngkirConfigRequest extends FormRequest
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
            'api_url' => 'sometimes|string',
            'api_key' => 'sometimes|string',
            'is_select' => 'sometimes|boolean',
            'origin_default' => 'sometimes|integer',
            'origin_description' => 'sometimes|string',
        ];
    }
}
