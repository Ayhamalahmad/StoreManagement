<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreFragranceCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|array',
            'name.en' => 'required|string|max:255',
            'name.tr' => 'required|string|max:255',
            'name.ar' => 'required|string|max:255',
            'type' => 'required|string|max:50',
            'slug' => 'nullable|string|max:255|unique:fragrance_categories,slug',
        ];
    }
}
