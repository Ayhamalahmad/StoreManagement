<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePerfumeRequest extends FormRequest
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
            'code' => 'required|string|max:50|unique:perfumes,code',
            'original_perfume' => 'nullable|array',
            'original_perfume.en' => 'nullable|string|max:255',
            'original_perfume.tr' => 'nullable|string|max:255',
            'original_perfume.ar' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'family' => 'nullable|array',
            'family.en' => 'nullable|string|max:255',
            'family.tr' => 'nullable|string|max:255',
            'family.ar' => 'nullable|string|max:255',
            'shelf' => 'nullable|string|max:50',
            'section' => 'nullable|string|max:50',
            'notes' => 'nullable|array',
            'notes.en' => 'nullable|string',
            'notes.tr' => 'nullable|string',
            'notes.ar' => 'nullable|string',
            'top_notes' => 'nullable|array',
            'top_notes.en' => 'nullable|string|max:255',
            'top_notes.tr' => 'nullable|string|max:255',
            'top_notes.ar' => 'nullable|string|max:255',
            'middle_notes' => 'nullable|array',
            'middle_notes.en' => 'nullable|string|max:255',
            'middle_notes.tr' => 'nullable|string|max:255',
            'middle_notes.ar' => 'nullable|string|max:255',
            'base_notes' => 'nullable|array',
            'base_notes.en' => 'nullable|string|max:255',
            'base_notes.tr' => 'nullable|string|max:255',
            'base_notes.ar' => 'nullable|string|max:255',
            'warehouse' => 'nullable|string|max:255',
            'concentration' => 'nullable|array',
            'concentration.en' => 'nullable|string|max:255',
            'concentration.tr' => 'nullable|string|max:255',
            'concentration.ar' => 'nullable|string|max:255',
            'sillage' => 'nullable|array',
            'sillage.en' => 'nullable|string|max:255',
            'sillage.tr' => 'nullable|string|max:255',
            'sillage.ar' => 'nullable|string|max:255',
            'price' => 'nullable|numeric|min:0|max:99999999.99',
            'season_ids' => 'nullable|array',
            'season_ids.*' => 'exists:seasons,id',
            'fragrance_category_ids' => 'nullable|array',
            'fragrance_category_ids.*' => 'exists:fragrance_categories,id',
            'sillage_level_ids' => 'nullable|array',
            'sillage_level_ids.*' => 'exists:sillage_levels,id',
        ];
    }
}
