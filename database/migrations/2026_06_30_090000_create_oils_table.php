<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('oils', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code')->unique();
            $table->string('image')->nullable();
            $table->string('category');
            $table->string('brand')->nullable();
            $table->decimal('volume', 10, 2)->nullable();
            $table->decimal('price', 10, 2)->nullable();
            $table->string('shelf')->nullable();
            $table->string('section')->nullable();
            $table->string('warehouse')->nullable();
            $table->text('notes')->nullable();
            $table->string('supplier')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('oils');
    }
};
