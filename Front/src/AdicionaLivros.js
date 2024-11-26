import React, { useState, useEffect } from "react";
import "./AdicionaLivros.css";
import Footer from "./componentes/Footer";
import Header from "./componentes/Header"; // Importe o Header

const AdicionaLivros = ({
  onVoltar,
  onLoginRedirect,
  onCadastroRedirect,
  onAdicionarLivrosRedirect,
  onCarrinhoRedirect,
  onPerfilRedirect,
}) => {
  const [livros, setLivros] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [genero, setGenero] = useState("");
  const [descricao, setDescricao] = useState("");
  const [anoLancamento, setAnoLancamento] = useState("");
  const [preco, setPreco] = useState("");
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  const fetchLivros = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/livros");
      if (!response.ok) throw new Error("Erro ao buscar livros");
      const data = await response.json();
      setLivros(data);
    } catch (error) {
      console.error(error);
    }
  };

  const adicionarLivro = async (e) => {
    e.preventDefault();
    const novoLivro = {
      titulo,
      autor,
      genero,
      descricao,
      anoLancamento,
      preco,
    };
    const url = editando
      ? `http://localhost:8000/api/livros/${idEditando}`
      : "http://localhost:8000/api/livros";
    const method = editando ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoLivro),
      });
      if (!response.ok) throw new Error("Erro ao salvar livro");
      fetchLivros();
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setTitulo("");
    setAutor("");
    setGenero("");
    setDescricao("");
    setAnoLancamento("");
    setPreco("");
    setEditando(false);
    setIdEditando(null);
  };

  const iniciarEdicao = (livro) => {
    setTitulo(livro.titulo);
    setAutor(livro.autor);
    setGenero(livro.genero);
    setDescricao(livro.descricao);
    setAnoLancamento(livro.anoLancamento);
    setPreco(livro.preco);
    setEditando(true);
    setIdEditando(livro.id);
  };

  const apagarLivro = async (id) => {
    try {
      await fetch(`http://localhost:8000/api/livros/${id}`, {
        method: "DELETE",
      });
      fetchLivros();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLivros();
  }, []);

  return (
    <div className="Adiciona">
      <Header
        isAuthenticated={true} // Defina conforme necessário
        isAdmin={true} // Acesso administrativo
        onLoginRedirect={onLoginRedirect}
        onCadastroRedirect={onCadastroRedirect}
        onAdicionarLivrosRedirect={onAdicionarLivrosRedirect}
        onCarrinhoRedirect={onCarrinhoRedirect}
        onPerfilRedirect={onPerfilRedirect}
      />
      <h1>Cadastro de livros</h1>
      <form onSubmit={adicionarLivro} className="cadastro">
        <div className="topo">
          <div className="topo1">
            <input
              type="text"
              placeholder="Título"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Autor"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Gênero"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              required
            />
          </div>
          <div className="topo2">
            <input
              type="text"
              placeholder="Descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Ano"
              value={anoLancamento}
              onChange={(e) => setAnoLancamento(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Valor"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              required
            />
          </div>
          <div className="topo3">
            <input
              type="file"
              id="imagem-upload"
              className="imagem"
              onChange={(e) => console.log(e.target.files[0])} // Pode salvar a imagem no estado
            />
            <label htmlFor="imagem-upload" className="imagem-label">
            </label>
            <p>Insira a capa do livro</p>
          </div>
        </div>
        <div className="baixo">
          <button type="submit">
            {editando ? "Salvar Alterações" : "Cadastrar Livro"}
          </button>
        </div>
      </form>
      <h1>Livros cadastrados</h1>
      <div className="livros-cadastrados">
        {livros.map((livro) => (
          <div className="card-cadastrados" key={livro.id}>
            <div className="capa">
              <img src={livro.capa || "default.jpg"} alt="Capa do Livro" />
            </div>
            <div className="informacoes">
              <h2>{livro.titulo}</h2>
              <p>{livro.autor}</p>
              <p>{livro.genero}</p>
              <p>{livro.descricao}</p>
              <p>{livro.anoLancamento}</p>
              <p className="valor">R$ {livro.preco}</p>
            </div>
            <div className="botoes-cadastrados">
              <button onClick={() => iniciarEdicao(livro)}>Editar</button>
              <button onClick={() => apagarLivro(livro.id)}>Apagar</button>
            </div>
          </div>
        ))}
      </div>
      <button className="voltar" onClick={onVoltar}>
        Voltar para a página inicial
      </button>
      <Footer />
    </div>
  );
};

export default AdicionaLivros;
