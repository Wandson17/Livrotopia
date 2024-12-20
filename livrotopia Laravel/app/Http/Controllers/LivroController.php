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
        $autor = $request->input('autor');
        $genero = $request->input('genero');
        $descricao = $request->input('descricao');
        $anoLancamento = $request->input('anoLancamento');
        $preco = $request->input('preco');
        $capa = $request->input('capa') ?? 'https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';


        $p = Livro::create(['titulo' => $titulo, 'autor' => $autor, 'genero' => $genero,
        'descricao' => $descricao, 'anoLancamento' => $anoLancamento, 'preco' => $preco, 'capa' => $capa]);
        
        
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
        $autor = request()->input('autor');
        if ($autor)
            $livro->autor = $autor;
        $genero = request()->input('genero');
        if ($genero)
            $livro->genero = $genero;
        $descricao = request()->input('descricao');
        if ($descricao)
            $livro->descricao = $descricao;
        $anoLancamento = request()->input('anoLancamento');
        if ($anoLancamento)
            $livro->anoLancamento = $anoLancamento;
        $preco = request()->input('preco');
        if ($preco)
            $livro->preco = $preco;
        $capa = request()->input('capa') ?? 
            $livro->capa = $preco ?? 'https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';
    
        
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
