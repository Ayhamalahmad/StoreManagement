<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PerfumeResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'code' => $this->code,
            'name' => $this->name,
            'brand' => $this->brand,
            'inspired_by' => $this->inspired_by,
            'gender' => $this->gender,
            'category' => $this->category,
            'description' => $this->description,
            'top_notes' => $this->top_notes,
            'middle_notes' => $this->middle_notes,
            'base_notes' => $this->base_notes,
            'section_number' => $this->section_number,
            'shelf_number' => $this->shelf_number,
            'is_available' => $this->is_available,
            'perfume_image' => $this->getFirstMediaUrl('perfume_image', 'thumb')
                ?: $this->getFirstMediaUrl('perfume_image'),
            'perfume_image_full' => $this->getFirstMediaUrl('perfume_image'),
            'inspired_image' => $this->getFirstMediaUrl('inspired_image', 'thumb')
                ?: $this->getFirstMediaUrl('inspired_image'),
            'inspired_image_full' => $this->getFirstMediaUrl('inspired_image'),
            'store_id' => $this->store_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
