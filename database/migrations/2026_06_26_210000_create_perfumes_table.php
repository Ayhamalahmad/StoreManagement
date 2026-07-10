<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('perfumes', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->string('name');
            $table->string('brand');
            $table->string('inspired_by')->nullable();
            $table->enum('gender', ['men', 'women', 'unisex']);
            $table->enum('category', ['designer', 'niche', 'nishe']);
            $table->text('description')->nullable();
            $table->text('top_notes')->nullable();
            $table->text('middle_notes')->nullable();
            $table->text('base_notes')->nullable();
            $table->unsignedTinyInteger('section_number');
            $table->unsignedTinyInteger('shelf_number');
            $table->boolean('is_available')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('perfumes');
    }
};
