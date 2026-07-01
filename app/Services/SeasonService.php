<?php

namespace App\Services;

use App\Models\Season;
use Illuminate\Support\Str;

class SeasonService
{
    public function getAll()
    {
        return Season::orderBy('name')->get();
    }

    public function create(array $data): Season
    {
        $data['slug'] = Str::slug($data['slug'] ?? $data['name']['en']);

        return Season::create($data);
    }

    public function update(Season $season, array $data): bool
    {
        if (isset($data['name']) && !isset($data['slug'])) {
            $data['slug'] = Str::slug($data['name']['en']);
        }

        return $season->update($data);
    }

    public function delete(Season $season): bool
    {
        return $season->delete();
    }
}
