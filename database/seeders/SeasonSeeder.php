<?php

namespace Database\Seeders;

use App\Models\Season;
use Illuminate\Database\Seeder;

class SeasonSeeder extends Seeder
{
    public function run(): void
    {
        $seasons = [
            ['slug' => 'summer', 'name' => ['en' => 'Summer', 'tr' => 'Yaz', 'ar' => 'الصيف']],
            ['slug' => 'autumn', 'name' => ['en' => 'Autumn', 'tr' => 'Sonbahar', 'ar' => 'الخريف']],
            ['slug' => 'spring', 'name' => ['en' => 'Spring', 'tr' => 'İlkbahar', 'ar' => 'الربيع']],
            ['slug' => 'winter', 'name' => ['en' => 'Winter', 'tr' => 'Kış', 'ar' => 'الشتاء']],
        ];

        foreach ($seasons as $season) {
            Season::create($season);
        }
    }
}
