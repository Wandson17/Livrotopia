<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('livros', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('titulo');
            $table->string('autor');
            $table->string('descricao');
            $table->integer('anoLancamento');
            $table->float('preco');
            $table->string('capa')->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('livros');
    }
};
