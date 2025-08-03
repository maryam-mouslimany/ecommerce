<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductFilterRequest extends FormRequest
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
            'gender' => 'nullable|string|in:male,female,unisex',
            'brand_id' => 'nullable|integer|exists:brands,id',
            'min_price' => 'nullable|numeric|min:0',
            'max_price' => 'nullable|numeric|min:0|gte:min_price',
            'per_page' => 'nullable|integer|min:1|max:100',
            'page' => 'nullable|integer|min:1'
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'gender.in' => 'Gender must be one of: male, female, unisex',
            'brand_id.exists' => 'The selected brand does not exist',
            'min_price.numeric' => 'Minimum price must be a valid number',
            'max_price.numeric' => 'Maximum price must be a valid number',
            'max_price.gte' => 'Maximum price must be greater than or equal to minimum price',
            'per_page.max' => 'Per page cannot exceed 100 items'
        ];
    }
}
