<?php

namespace Database\Seeders;

use App\Models\Store;
use Illuminate\Database\Seeder;

class StoreSeeder extends Seeder
{
    public function run(): void
    {
        $stores = [
            ['name' => 'store b2', 'slug' => 'kreasyon-parfum', 'description' => 'store b2'],
        ];

        foreach ($stores as $data) {
            Store::create($data + ['is_active' => true]);
        }
    }
}
