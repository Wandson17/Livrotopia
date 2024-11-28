<?php

namespace App\Http\Controllers;

use App\Models\Livro;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class LivroController extends Controller
{
    public function index()
    {
        return Livro::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'autor' => 'required|string|max:255',
            'descricao' => 'required|string|max:500',
            'anoLancamento' => 'required|integer',
            'preco' => 'required|numeric',
            'capa' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $livro = new Livro();
        $livro->titulo = $request->input('titulo');
        $livro->autor = $request->input('autor');
        $livro->descricao = $request->input('descricao');
        $livro->anoLancamento = $request->input('anoLancamento');
        $livro->preco = $request->input('preco');

        if ($request->hasFile('capa')) {
            $capaPath = $request->file('capa')->store('capas', 'public');
            $livro->capa = 'storage/' . $capaPath;
        }

        $livro->save();
        return response(['location' => route('livros.show', $livro->id)], 201);
    }

    public function update(Request $request, Livro $livro)
    {
        $validated = $request->validate([
            'titulo' => 'nullable|string|max:255',
            'autor' => 'nullable|string|max:255',
            'descricao' => 'nullable|string',
            'anoLancamento' => 'nullable|integer',
            'preco' => 'nullable|numeric',
            'capa' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $livro->update($validated);

        if ($request->hasFile('capa')) {
            if ($livro->capa && file_exists(storage_path('app/public/' . $livro->capa))) {
                unlink(storage_path('app/public/' . $livro->capa));
            }

            $path = $request->file('capa')->store('capas', 'public');
            $livro->capa = 'storage/' . $path;
            $livro->save();
        }

        return response()->json(['livro' => $livro], 200);
    }

    public function show(Livro $livro)
    {
        return $livro;
    }

    public function destroy(Livro $livro)
    {
        if ($livro->capa) {
            Storage::delete($livro->capa);
        }
        $livro->delete();
    }
}