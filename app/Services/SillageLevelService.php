<?php

namespace App\Services;

use App\Models\SillageLevel;
use Illuminate\Support\Str;

class SillageLevelService
{
    public function getAll()
    {
        return SillageLevel::orderBy('name')->get();
    }

    public function create(array $data): SillageLevel
    {
        $data['slug'] = Str::slug($data['slug'] ?? $data['name']['en']);

        return SillageLevel::create($data);
    }

    public function update(SillageLevel $sillageLevel, array $data): bool
    {
        if (isset($data['name']) && !isset($data['slug'])) {
            $data['slug'] = Str::slug($data['name']['en']);
        }

        return $sillageLevel->update($data);
    }

    public function delete(SillageLevel $sillageLevel): bool
    {
        return $sillageLevel->delete();
    }
}
