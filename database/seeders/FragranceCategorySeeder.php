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
            ['type' => 'oil', 'slug' => 'essential-oil', 'name' => ['en' => 'Essential Oil', 'tr' => 'Esansiyel Yağ', 'ar' => 'زيت عطري']],
            ['type' => 'oil', 'slug' => 'fragrance-oil', 'name' => ['en' => 'Fragrance Oil', 'tr' => 'Koku Yağı', 'ar' => 'زيت عطر']],
            ['type' => 'oil', 'slug' => 'carrier-oil', 'name' => ['en' => 'Carrier Oil', 'tr' => 'Taşıyıcı Yağ', 'ar' => 'زيت ناقل']],
        ];

        foreach ($categories as $category) {
            FragranceCategory::create($category);
        }
    }
}
