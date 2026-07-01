<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class Oil extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'oils';

    protected $fillable = [
        'name',
        'code',
        'image',
        'category',
        'brand',
        'volume',
        'price',
        'shelf',
        'section',
        'warehouse',
        'notes',
        'supplier',
    ];

    protected $appends = ['image_url'];

    protected function casts(): array
    {
        return [
            'name' => 'array',
            'category' => 'array',
            'notes' => 'array',
            'volume' => 'decimal:2',
            'price' => 'decimal:2',
            'deleted_at' => 'datetime',
        ];
    }

    public function getImageUrlAttribute(): ?string
    {
        if (!$this->image) {
            return null;
        }

        return Storage::disk('public')->url($this->image);
    }
}
