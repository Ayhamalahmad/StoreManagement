<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('fragrance_category_perfume', function (Blueprint $table) {
            $table->foreignId('fragrance_category_id')->constrained()->cascadeOnDelete();
            $table->foreignId('perfume_id')->constrained()->cascadeOnDelete();
            $table->primary(['fragrance_category_id', 'perfume_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('fragrance_category_perfume');
    }
};
