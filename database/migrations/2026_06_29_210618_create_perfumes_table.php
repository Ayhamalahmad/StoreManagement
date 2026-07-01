<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('perfumes', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code')->unique();
            $table->string('original_perfume')->nullable();
            $table->string('image')->nullable();
            $table->string('gender'); // Erkek, Kadın, Unisex
            $table->string('family')->nullable(); // Woody, Floral, etc.
            $table->string('shelf')->nullable();
            $table->string('section')->nullable();
            $table->string('season')->nullable(); // Summer, Autumn, Spring, Winter
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('perfumes');
    }
};
