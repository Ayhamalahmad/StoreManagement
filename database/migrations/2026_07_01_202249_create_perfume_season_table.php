<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('perfume_season', function (Blueprint $table) {
            $table->foreignId('perfume_id')->constrained()->cascadeOnDelete();
            $table->foreignId('season_id')->constrained()->cascadeOnDelete();
            $table->primary(['perfume_id', 'season_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('perfume_season');
    }
};
