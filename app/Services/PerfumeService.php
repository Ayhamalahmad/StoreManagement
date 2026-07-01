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
        return Perfume::orderBy('created_at', 'desc')->get();
    }

    public function getBrowseData()
    {
        return Perfume::orderBy('created_at', 'desc')->get();
    }

    public function create(array $data, ?UploadedFile $image = null): Perfume
    {
        return DB::transaction(function () use ($data, $image) {
            if ($image) {
                $data['image'] = $image->store('perfumes', 'public');
            }

            return Perfume::create($data);
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

            return $perfume->update($data);
        });
    }

    public function delete(Perfume $perfume): bool
    {
        return DB::transaction(function () use ($perfume) {
            if ($perfume->image) {
                Storage::disk('public')->delete($perfume->image);
            }

            return $perfume->delete();
        });
    }
}
