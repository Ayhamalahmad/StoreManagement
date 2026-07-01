<?php

namespace Database\Seeders;

use App\Models\SillageLevel;
use Illuminate\Database\Seeder;

class SillageLevelSeeder extends Seeder
{
    public function run(): void
    {
        $levels = [
            ['slug' => 'soft', 'name' => ['en' => 'Soft', 'tr' => 'Hafif', 'ar' => 'خفيف']],
            ['slug' => 'moderate', 'name' => ['en' => 'Moderate', 'tr' => 'Orta', 'ar' => 'متوسط']],
            ['slug' => 'heavy', 'name' => ['en' => 'Heavy', 'tr' => 'Ağır', 'ar' => 'ثقيل']],
        ];

        foreach ($levels as $level) {
            SillageLevel::create($level);
        }
    }
}
