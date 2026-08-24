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
        Schema::create('registrations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('division_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('nim')->unique();
            $table->string('angkatan', 4);
            $table->string('study_program');
            $table->string('email');
            $table->string('whatsapp');
            $table->text('motivation');
            $table->boolean('agreed_to_rules')->default(false);
            $table->enum('status', ['pending', 'lolos', 'ditolak'])->default('pending');
            $table->timestamps();

            $table->index(['nim', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registrations');
    }
};
