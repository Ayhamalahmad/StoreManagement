<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('perfume_sillage_level', function (Blueprint $table) {
            $table->foreignId('perfume_id')->constrained()->cascadeOnDelete();
            $table->foreignId('sillage_level_id')->constrained()->cascadeOnDelete();
            $table->primary(['perfume_id', 'sillage_level_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('perfume_sillage_level');
    }
};
