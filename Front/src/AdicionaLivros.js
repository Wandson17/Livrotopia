import React, { useState, useEffect } from "react";
import "./AdicionaLivros.css";

const AdicionaLivros = ({ onLivroAdicionado, onVoltarPaginaInicial }) => {
  const [livros, setLivros] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  const fetchLivros = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/livros");
      if (!response.ok) {
        throw new Error("Erro ao buscar livros");
      }
      const data = await response.json();
      setLivros(data);
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
    }
  };

  // adiciona
  const adicionarLivro = async (e) => {
    e.preventDefault();

    if (editando) {
      alterarLivro(idEditando);
    } else {
      try {
        const response = await fetch("http://localhost:8000/api/livros", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            titulo,
            descricao,
          }),
        });

        if (!response.ok) {
          throw new Error("Erro ao adicionar livro");
        }

        const data = await response.json();
        fetchLivros(); 
        
      } catch (error) {
        console.error("Erro ao adicionar livro:", error);
      }
    }

    setTitulo("");
    setDescricao("");
    setEditando(false);
    setIdEditando(null);
  };

  //edição
  const iniciarEdicao = (livro) => {
    setTitulo(livro.titulo);
    setDescricao(livro.descricao);
    setIdEditando(livro.id);
    setEditando(true);
  };

  
  const alterarLivro = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/livros/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo,
          descricao,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao alterar livro");
      }

      const data = await response.json();
      fetchLivros(); 
      setEditando(false);
      setTitulo("");
      setDescricao("");
      setIdEditando(null);
    } catch (error) {
      console.error("Erro ao alterar livro:", error);
    }
  };

  // apaga
  const apagarLivro = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/livros/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao apagar livro");
      }

      fetchLivros();
    } catch (error) {
      console.error("Erro ao apagar livro:", error);
    }
  };

  useEffect(() => {
    fetchLivros();
  }, []);

  return (
    <div>
      <h1>Cadastro de Livros</h1>

      <form onSubmit={adicionarLivro}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descrição:</label>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>
        <button type="submit">
          {editando ? "Salvar Alterações" : "Adicionar Livro"}
        </button>
      </form>

      <h2>Livros Cadastrados:</h2>
      <ul>
        {livros.map((livro) => (
          <li key={livro.id}>
            {livro.titulo} - {livro.descricao}{" "}
            <button onClick={() => iniciarEdicao(livro)}>Editar</button>
            <button onClick={() => apagarLivro(livro.id)}>Apagar</button>
          </li>
        ))}
      </ul>

      {/* Botão para voltar à página inicial */}
      <button onClick={onVoltarPaginaInicial}>Voltar para a Página Inicial</button>
    </div>
  );
};

export default AdicionaLivros;
