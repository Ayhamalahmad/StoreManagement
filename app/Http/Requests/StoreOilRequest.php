<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOilRequest extends FormRequest
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
            'code' => 'required|string|max:50|unique:oils,code',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'category' => 'required|array',
            'category.en' => 'required|string|max:255',
            'category.tr' => 'required|string|max:255',
            'category.ar' => 'required|string|max:255',
            'brand' => 'nullable|string|max:255',
            'volume' => 'nullable|numeric|min:0|max:99999999.99',
            'price' => 'nullable|numeric|min:0|max:99999999.99',
            'shelf' => 'nullable|string|max:50',
            'section' => 'nullable|string|max:50',
            'warehouse' => 'nullable|string|max:255',
            'notes' => 'nullable|array',
            'notes.en' => 'nullable|string',
            'notes.tr' => 'nullable|string',
            'notes.ar' => 'nullable|string',
            'supplier' => 'nullable|string|max:255',
        ];
    }
}
