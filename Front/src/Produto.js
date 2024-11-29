import React, { useState, useEffect } from "react";
import { useCarrinho } from "./CarrinhoContext";
import { useAuth } from "./AuthContext";
import "./Produto.css";
import estrela from "./imgs/estrela.png";
import Footer from "./componentes/Footer";
import Header from "./componentes/Header";

const Produto = ({
  onVoltar,
  onLoginRedirect,
  onCadastroRedirect,
  onAdicionarLivrosRedirect,
  onCarrinhoRedirect,
  onPerfilRedirect,
}) => {
  const { livroSelecionado, adicionarProduto } = useCarrinho();
  const { isAuthenticated, isAdmin, usuarioLogado } = useAuth();

  const [avaliacoes, setAvaliacoes] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [corpo, setCorpo] = useState("");
  const [nota, setNota] = useState(1);
  const [editandoIndex, setEditandoIndex] = useState(null);

  useEffect(() => {
    if (livroSelecionado) {
      const storedAvaliacoes = localStorage.getItem(`avaliacoes_${livroSelecionado.id}`);
      if (storedAvaliacoes) {
        setAvaliacoes(JSON.parse(storedAvaliacoes));
      }
    }
  }, [livroSelecionado]);

  useEffect(() => {
    if (livroSelecionado && avaliacoes.length > 0) {
      localStorage.setItem(`avaliacoes_${livroSelecionado.id}`, JSON.stringify(avaliacoes));
    }
  }, [avaliacoes, livroSelecionado]);

  if (!livroSelecionado) {
    return <p>Produto não encontrado.</p>;
  }

  const calcularMediaNotas = () => {
    if (avaliacoes.length === 0) return 0;
    const somaNotas = avaliacoes.reduce((acc, avaliacao) => acc + avaliacao.nota, 0);
    return (somaNotas / avaliacoes.length).toFixed(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert("Você precisa estar logado para deixar uma avaliação.");
      return;
    }

    if (!titulo || !corpo) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (editandoIndex !== null) {
      // Editar avaliação existente
      const novasAvaliacoes = [...avaliacoes];
      novasAvaliacoes[editandoIndex] = {
        ...novasAvaliacoes[editandoIndex],
        titulo,
        corpo,
        nota,
      };
      setAvaliacoes(novasAvaliacoes);
      setEditandoIndex(null);
    } else {
      // Adicionar nova avaliação
      const novaAvaliacao = {
        titulo,
        corpo,
        nota,
        autor: usuarioLogado ? usuarioLogado.nome : "Usuário Anônimo",
      };
      setAvaliacoes([...avaliacoes, novaAvaliacao]);
    }

    // Limpar campos do formulário após envio
    setTitulo("");
    setCorpo("");
    setNota(1);
  };

  const handleEditar = (index) => {
    const avaliacao = avaliacoes[index];
    setTitulo(avaliacao.titulo);
    setCorpo(avaliacao.corpo);
    setNota(avaliacao.nota);
    setEditandoIndex(index);
  };

  const handleExcluir = (index) => {
    const novasAvaliacoes = avaliacoes.filter((_, i) => i !== index);
    setAvaliacoes(novasAvaliacoes);
  };

  return (
    <div>
      <Header
        isAuthenticated={isAuthenticated}
        isAdmin={isAdmin}
        onLoginRedirect={onLoginRedirect}
        onCadastroRedirect={onCadastroRedirect}
        onAdicionarLivrosRedirect={onAdicionarLivrosRedirect}
        onCarrinhoRedirect={onCarrinhoRedirect}
        onPerfilRedirect={onPerfilRedirect}
      />
      <div className="container">
        <main>
          <section className="product-section">
            <div className="product">
              <div className="product-image">
                <img
                  src={`http://localhost:8000/${livroSelecionado.capa}`}
                  alt={`Capa do livro: ${livroSelecionado.titulo}`}
                />
              </div>
              <div className="product-info">
                <h1 className="product-title">{livroSelecionado.titulo}</h1>
                <p className="product-author">
                  Autor: {livroSelecionado.autor}
                </p>
                <p className="product-genre">Gênero: Literatura</p>
                <p className="product-year">
                  Ano: {livroSelecionado.anoLancamento}
                </p>
                <p className="product-description">
                  {livroSelecionado.descricao}
                </p>
                <div className="average-rating">
                  <p>Avaliação: {calcularMediaNotas()} {calcularMediaNotas() > 0 ? "de 5.0" : "Nenhuma avaliação ainda"}</p>
                </div>
              </div>
              <div className="product-pricing">
                <p className="price">
                  Preço: R$ {livroSelecionado.preco.toFixed(2)}
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => adicionarProduto(livroSelecionado)}
                >
                  Adicionar ao Carrinho
                </button>
                <button className="btn btn-secondary">Comprar Agora</button>
              </div>
            </div>
          </section>

          {/* Seção de Feedback */}
          <section className="feedback-section">
            <h2 className="section-title">Avaliações</h2>
            {isAuthenticated ? (
              <form className="feedback-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Título da avaliação"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  required
                />
                <textarea
                  placeholder="Adicione seu comentário"
                  value={corpo}
                  onChange={(e) => setCorpo(e.target.value)}
                  required
                ></textarea>
                <label>
                  Nota:
                  <select
                    value={nota}
                    onChange={(e) => setNota(Number(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5].map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </label>
                <button type="submit" className="enviarbotao">
                  {editandoIndex !== null ? "Atualizar" : "Enviar"}
                </button>
              </form>
            ) : (
              <p>Você precisa estar logado para deixar uma avaliação.</p>
            )}

            <div className="reviews">
              {avaliacoes.map((avaliacao, index) => (
                <div key={index} className="review">
                  <div className="ranqueando">
                    {[...Array(avaliacao.nota)].map((_, i) => (
                      <img key={i} src={estrela} alt="Estrela" />
                    ))}
                  </div>
                  <h3 className="review-title">{avaliacao.titulo}</h3>
                  <p className="review-body">{avaliacao.corpo}</p>
                  <p className="review-author">Por: {avaliacao.autor}</p>
                  {isAuthenticated && avaliacao.autor === usuarioLogado?.nome && (
                    <div className="review-actions">
                      <button onClick={() => handleEditar(index)}>Editar</button>
                      <button onClick={() => handleExcluir(index)}>Excluir</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </main>
        <button className="voltarproduto" onClick={onVoltar}>
          Voltar para Inicio
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Produto;