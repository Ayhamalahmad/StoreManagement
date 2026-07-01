<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSillageLevelRequest extends FormRequest
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
            'slug' => 'nullable|string|max:255|unique:sillage_levels,slug',
        ];
    }
}
