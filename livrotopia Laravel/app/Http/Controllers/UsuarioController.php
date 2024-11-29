<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UsuarioController extends Controller
{
    public function index()
    {
        $usuarios = Usuario::all();
        return $usuarios;
    }

    public function store(Request $request)
    {   
        $nome = $request->input('nome');
        $email = $request->input('email');
        $senha = Hash::make($request->input('senha'));

        $user = Usuario::create(['nome' => $nome, 'email' => $email, 'senha' => $senha]);
        $id = $user->id;
        return response(
            ['location' => route('usuarios.show', $id)],201
        );
    }

    public function show(Usuario $usuario)
    {
        return $usuario;
    }

    public function update(Request $request, Usuario $usuario)
    {
        $nome = request()->input('nome');
        if ($nome)
            $usuario->nome = $nome;
        $email = request()->input('email');
        if ($email)
            $usuario->email = $email;
        $senha = request()->input('senha');
        if ($senha)
            $usuario->senha = $senha;
        
        $usuario->save();
    }

    public function destroy(Usuario $usuario)
    {
        $usuario->delete();

    }

    public function login(Request $request)
    {
        $usuario = Usuario::where('email', $request->input('email'))->first();

        if ($usuario && Hash::check($request->input('senha'), $usuario->senha)) {
            return response()->json([
                'mensagem' => 'Login bem-sucedido!',
                'nome' => $usuario->nome,
                'email' => $usuario->email
            ], 200);
        }

        return response()->json(['mensagem' => 'Credenciais inválidas.'], 401);
    }
}
