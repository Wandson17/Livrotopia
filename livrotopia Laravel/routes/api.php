<?php

use App\Http\Controllers\LivroController;
use App\Http\Controllers\UsuarioController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource('livros', LivroController::class);
Route::apiResource('usuarios', UsuarioController::class);
Route::post('usuarios/login', [UsuarioController::class, 'login']);
Route::put('/usuarios/{id}', [UsuarioController::class, 'update']);