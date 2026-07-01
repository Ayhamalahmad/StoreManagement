<?php

namespace App\Services;

use App\Models\Perfume;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class PerfumeService
{
    public function getAll()
    {
        return Perfume::with(['seasons', 'fragranceCategories', 'sillageLevels'])->orderBy('created_at', 'desc')->get();
    }

    public function getBrowseData()
    {
        return Perfume::with(['seasons', 'fragranceCategories', 'sillageLevels'])->orderBy('created_at', 'desc')->get();
    }

    public function create(array $data, ?UploadedFile $image = null): Perfume
    {
        return DB::transaction(function () use ($data, $image) {
            if ($image) {
                $data['image'] = $image->store('perfumes', 'public');
            }

            $seasonIds = $data['season_ids'] ?? [];
            $fragranceCategoryIds = $data['fragrance_category_ids'] ?? [];
            $sillageLevelIds = $data['sillage_level_ids'] ?? [];
            unset($data['season_ids'], $data['fragrance_category_ids'], $data['sillage_level_ids']);

            $perfume = Perfume::create($data);

            if (!empty($seasonIds)) {
                $perfume->seasons()->sync($seasonIds);
            }

            if (!empty($fragranceCategoryIds)) {
                $perfume->fragranceCategories()->sync($fragranceCategoryIds);
            }

            if (!empty($sillageLevelIds)) {
                $perfume->sillageLevels()->sync($sillageLevelIds);
            }

            return $perfume->load(['seasons', 'fragranceCategories', 'sillageLevels']);
        });
    }

    public function update(Perfume $perfume, array $data, ?UploadedFile $image = null): bool
    {
        return DB::transaction(function () use ($perfume, $data, $image) {
            if ($image) {
                if ($perfume->image) {
                    Storage::disk('public')->delete($perfume->image);
                }
                $data['image'] = $image->store('perfumes', 'public');
            }

            $seasonIds = $data['season_ids'] ?? [];
            $fragranceCategoryIds = $data['fragrance_category_ids'] ?? [];
            $sillageLevelIds = $data['sillage_level_ids'] ?? [];
            unset($data['season_ids'], $data['fragrance_category_ids'], $data['sillage_level_ids']);

            $result = $perfume->update($data);

            $perfume->seasons()->sync($seasonIds);
            $perfume->fragranceCategories()->sync($fragranceCategoryIds);
            $perfume->sillageLevels()->sync($sillageLevelIds);

            return $result;
        });
    }

    public function delete(Perfume $perfume): bool
    {
        return DB::transaction(function () use ($perfume) {
            if ($perfume->image) {
                Storage::disk('public')->delete($perfume->image);
            }

            $perfume->seasons()->detach();
            $perfume->fragranceCategories()->detach();
            $perfume->sillageLevels()->detach();

            return $perfume->delete();
        });
    }
}
