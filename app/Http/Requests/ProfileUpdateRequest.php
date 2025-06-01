<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
        ];

        if ($this->user()->role === 'CUSTOMER') {
            $rules['phone_number'] = ['required', 'string', 'max:20'];
            $rules['province_code'] = ['nullable', 'string'];
            $rules['province_name'] = ['nullable', 'string', 'max:255'];
            $rules['city_code'] = ['nullable', 'string'];
            $rules['city_name'] = ['nullable', 'string', 'max:255'];
            $rules['sub_district'] = ['nullable', 'string', 'max:255'];
            $rules['village'] = ['nullable', 'string', 'max:255'];
            $rules['address'] = ['required', 'string', 'max:500'];
        }

        return $rules;
    }
}
