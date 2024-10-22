<?php

namespace App\Http\Controllers;

use App\Models\Livro;
use Illuminate\Http\Request;

class LivroController extends Controller
{
    /**
     * Display a listing of the resource.
     *         
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $livros = Livro::all();
        return $livros;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $titulo = $request->input('titulo');
        $descricao = $request->input('descricao');
        $p = Livro::create(['titulo' => $titulo, 'descricao' => $descricao]);
        $id = $p->id;
        return response(
            ['location' => route('livros.show', $id)],
            201
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Livro  $Livro
     * @return \Illuminate\Http\Response
     */
    public function show(Livro $livro)
    {
        return $livro;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Livro  $Livro
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Livro $livro)
    {
        $titulo = request()->input('titulo');
        if ($titulo)
            $livro->titulo = $titulo;
        $descricao = request()->input('descricao');
        if ($descricao)
            $livro->descricao = $descricao;
        $livro->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Livro  $Livro
     * @return \Illuminate\Http\Response
     */
    public function destroy(Livro $livro)
    {
        $livro->delete();
    }
}
