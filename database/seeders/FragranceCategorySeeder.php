<?php

namespace Database\Seeders;

use App\Models\FragranceCategory;
use Illuminate\Database\Seeder;

class FragranceCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['type' => 'frequency', 'slug' => 'erkek', 'name' => ['en' => 'Male', 'tr' => 'Erkek', 'ar' => 'ذكر']],
            ['type' => 'frequency', 'slug' => 'kadin', 'name' => ['en' => 'Female', 'tr' => 'Kadın', 'ar' => 'أنثى']],
            ['type' => 'frequency', 'slug' => 'unisex', 'name' => ['en' => 'Unisex', 'tr' => 'Unisex', 'ar' => 'للجنسين']],
            ['type' => 'niche', 'slug' => 'niche', 'name' => ['en' => 'Niche', 'tr' => 'Niche', 'ar' => 'نيش']],
        ];

        foreach ($categories as $category) {
            FragranceCategory::create($category);
        }
    }
}
