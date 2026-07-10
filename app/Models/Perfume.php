<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class Perfume extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'code',
        'original_perfume',
        'image',
        'family',
        'shelf',
        'section',
        'notes',
        'top_notes',
        'middle_notes',
        'base_notes',
        'warehouse',
        'concentration',
        'sillage',
        'price',
    ];

    protected $appends = ['image_url'];

    protected function casts(): array
    {
        return [
            'name' => 'array',
            'original_perfume' => 'array',
            'family' => 'array',
            'notes' => 'array',
            'top_notes' => 'array',
            'middle_notes' => 'array',
            'base_notes' => 'array',
            'concentration' => 'array',
            'sillage' => 'array',
            'deleted_at' => 'datetime',
        ];
    }

    public function getImageUrlAttribute(): string
    {
        if (!$this->image) {
            return '/placeholder.png';
        }

        return Storage::disk('public')->url($this->image);
    }

    public function seasons(): BelongsToMany
    {
        return $this->belongsToMany(Season::class);
    }

    public function fragranceCategories(): BelongsToMany
    {
        return $this->belongsToMany(FragranceCategory::class);
    }

    public function sillageLevels(): BelongsToMany
    {
        return $this->belongsToMany(SillageLevel::class);
    }
}
