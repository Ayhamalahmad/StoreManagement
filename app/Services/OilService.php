<?php

namespace App\Services;

use App\Models\Oil;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class OilService
{
    public function getAll()
    {
        return Oil::orderBy('created_at', 'desc')->get();
    }

    public function getBrowseData()
    {
        return Oil::orderBy('created_at', 'desc')->get();
    }

    public function create(array $data, ?UploadedFile $image = null): Oil
    {
        return DB::transaction(function () use ($data, $image) {
            if ($image) {
                $data['image'] = $image->store('oils', 'public');
            }

            return Oil::create($data);
        });
    }

    public function update(Oil $oil, array $data, ?UploadedFile $image = null): bool
    {
        return DB::transaction(function () use ($oil, $data, $image) {
            if ($image) {
                if ($oil->image) {
                    Storage::disk('public')->delete($oil->image);
                }
                $data['image'] = $image->store('oils', 'public');
            }

            return $oil->update($data);
        });
    }

    public function delete(Oil $oil): bool
    {
        return DB::transaction(function () use ($oil) {
            if ($oil->image) {
                Storage::disk('public')->delete($oil->image);
            }

            return $oil->delete();
        });
    }
}
