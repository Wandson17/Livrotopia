<?php

use App\Http\Controllers\LivroController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\ImageController;

use Illuminate\Support\Facades\Route;

Route::apiResource('livros', LivroController::class);
Route::apiResource('usuarios', UsuarioController::class);
Route::post('usuarios/login', [UsuarioController::class, 'login']);

Route::post('/upload-image', [ImageController::class, 'uploadToImgbb']);