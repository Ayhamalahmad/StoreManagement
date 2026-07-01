<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Ayham',
            'email' => 'ayham@ayham.com',
            'password' => Hash::make('123456789'),
        ]);

        $this->call([
            SeasonSeeder::class,
            FragranceCategorySeeder::class,
            PerfumeSeeder::class,
            OilSeeder::class,
        ]);
    }
}
