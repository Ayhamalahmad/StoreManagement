<?php

use App\Models\Store;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        $stores = [
            'kreasyon-parfum' => ['name' => 'loris İstanbul', 'description' => 'loris İstanbul şubesi'],
            'rose-perfumery' => ['name' => 'loris Ankara', 'description' => 'loris Ankara şubesi'],
            'oud-gold' => ['name' => 'loris İzmir', 'description' => 'loris İzmir şubesi'],
            'scent-house' => ['name' => 'loris Bursa', 'description' => 'loris Bursa şubesi'],
            'fragrance-lab' => ['name' => 'loris Antalya', 'description' => 'loris Antalya şubesi'],
            'al-misk-al-abyad' => ['name' => 'loris Riyad', 'description' => 'فرع loris الرياض'],
            'dehnal-oud' => ['name' => 'loris Dubai', 'description' => 'فرع loris دبي'],
            'atr-al-sharq' => ['name' => 'loris Kahire', 'description' => 'فرع loris القاهرة'],
        ];

        foreach ($stores as $slug => $data) {
            Store::where('slug', $slug)->update($data);
        }
    }

    public function down(): void
    {
        // No need to rollback names
    }
};
