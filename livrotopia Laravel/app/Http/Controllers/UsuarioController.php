<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     *         
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $usuarios = Usuario::all();
        return $usuarios;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

   
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nome' => 'required|string|max:255',
            'email' => 'required|email|unique:usuarios,email|max:255',
            'senha' => 'required|string|min:6',
            'telefone' => 'nullable|string|max:15',
            'cpf' => 'nullable|digits:11',
            'endereco' => 'nullable|string|max:255',
        ]);
     
        $validatedData['senha'] = Hash::make($validatedData['senha']);
         
        $user = Usuario::create($validatedData);
     
        return response()->json(['location' => route('usuarios.show', $user->id)], 201);
     }

    public function show(Usuario $usuario)
    {
        return $usuario;
    }

   
    public function update(Request $request, $id)
    {
        $usuario = Usuario::find($id);

        if (!$usuario) {
            return response()->json(['mensagem' => 'Usuário não encontrado'], 404);
        }

        $validatedData = $request->validate([
            'nome' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255|unique:usuarios,email,' . $id,
            'senha' => 'nullable|string|min:6',
            'telefone' => 'nullable|string|max:15',
            'cpf' => 'nullable|digits:11',
            'endereco' => 'nullable|string|max:255',
        ]);

        if (isset($validatedData['senha'])) {
            $validatedData['senha'] = Hash::make($validatedData['senha']);
        }

        $usuario->update($validatedData);

        return response()->json($usuario, 200);
    }


    // Deletar um usuário
    public function destroy(Usuario $usuario)
    {
        $usuario->delete();

    }

    // Autenticar um usuário
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

        return response()->json(['mensagem' => 'Cadastro não encontrado'], 401);
    }
}
