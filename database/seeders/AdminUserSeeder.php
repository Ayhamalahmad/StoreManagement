<?php

namespace Database\Seeders;

use App\Models\Store;
use App\Models\User;
use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $stores = Store::all();

        if ($stores->isEmpty()) {
            $this->command->warn('No stores found. Run StoreSeeder first.');
            return;
        }

        User::create([
            'name' => 'Super Admin',
            'email' => 'admin@store.com',
            'password' => bcrypt('password'),
            'is_super_admin' => true,
        ]);

        foreach ($stores as $store) {
            User::create([
                'name' => $store->name . ' Admin',
                'email' => 'admin@' . $store->slug . '.com',
                'password' => bcrypt('password'),
                'store_id' => $store->id,
                'is_super_admin' => false,
            ]);
        }
    }
}
