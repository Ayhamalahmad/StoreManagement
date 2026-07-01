<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateSillageLevelRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $sillageLevel = $this->route('sillage_level');

        return [
            'name' => 'required|array',
            'name.en' => 'required|string|max:255',
            'name.tr' => 'required|string|max:255',
            'name.ar' => 'required|string|max:255',
            'slug' => ['nullable', 'string', 'max:255', Rule::unique('sillage_levels', 'slug')->ignore($sillageLevel)],
        ];
    }
}
