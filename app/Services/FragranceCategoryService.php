<?php

namespace App\Services;

use App\Models\FragranceCategory;
use Illuminate\Support\Str;

class FragranceCategoryService
{
    public function getAll()
    {
        return FragranceCategory::orderBy('type')->orderBy('name')->get();
    }

    public function getByType(string $type)
    {
        return FragranceCategory::where('type', $type)->get();
    }

    public function create(array $data): FragranceCategory
    {
        $data['slug'] = Str::slug($data['slug'] ?? $data['name']['en']);

        return FragranceCategory::create($data);
    }

    public function update(FragranceCategory $category, array $data): bool
    {
        if (isset($data['name']) && !isset($data['slug'])) {
            $data['slug'] = Str::slug($data['name']['en']);
        }

        return $category->update($data);
    }

    public function delete(FragranceCategory $category): bool
    {
        return $category->delete();
    }
}
