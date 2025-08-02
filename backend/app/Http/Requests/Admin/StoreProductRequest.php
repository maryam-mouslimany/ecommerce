<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Traits\ResponseTrait;

class StoreProductRequest extends FormRequest
{
    use ResponseTrait;

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $action = $this->input('action');

        $commonRules = [
            'brand_id' => $action === 'create' ? 'required|exists:brands,id' : 'sometimes|exists:brands,id',
            'category_id' => $action === 'create' ? 'required|exists:categories,id' : 'sometimes|exists:categories,id',
            'gender' => $action === 'create' ? 'required|in:male,female,unisex' : 'sometimes|in:male,female,unisex',
            'variants' => $action === 'create' ? 'required|array|min:1' : 'sometimes|array',
            'variants.*.size_ml' => $action === 'create' ? 'required|integer|min:1' : 'sometimes|integer|min:1',
            'variants.*.price' => $action === 'create' ? 'required|numeric|min:0' : 'sometimes|numeric|min:0',
            'variants.*.stock' => $action === 'create' ? 'required|integer|min:0' : 'sometimes|integer|min:0',
            'images' => $action === 'create' ? 'required|array|min:1' : 'sometimes|array',
            'images.*.url' => 'required|url',
            'images.*.thumbnail' => 'required|url',
            'images.*.sort_order' => 'sometimes|integer|min:0',
            'accords' => 'sometimes|array',
            'accords.*' => 'exists:accords,id',

        ];

        return array_merge([
            'action' => 'required|in:create,update',
            'name' => $action === 'create' ? 'required|string|max:255' : 'sometimes|string|max:255',
        ], $commonRules);
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            $this->responseValidationError($validator->errors())
        );
    }
}
