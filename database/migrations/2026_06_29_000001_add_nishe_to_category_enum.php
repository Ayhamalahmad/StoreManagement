<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement("ALTER TABLE perfumes MODIFY COLUMN category ENUM('designer', 'niche', 'nishe') NOT NULL");
    }

    public function down(): void
    {
        DB::statement("ALTER TABLE perfumes MODIFY COLUMN category ENUM('designer', 'niche') NOT NULL");
    }
};