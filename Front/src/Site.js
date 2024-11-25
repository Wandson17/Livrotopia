import React, { useEffect, useState } from "react";
import { useCarrinho } from "./CarrinhoContext";
import { useAuth } from "./AuthContext";
import "./Site.css";
import carrinhoImage from "./imgs/carrinho-de-compras.png";


const Site = ({ onLoginRedirect, onCadastroRedirect, onAdicionarLivrosRedirect, onCarrinhoRedirect, onPerfilRedirect, onProdutoRedirect }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  const { adicionarProduto , selecionarProduto } = useCarrinho();
  const [livros, setLivros] = useState([]);

  const fetchLivros = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/livros");
      if (!response.ok) throw new Error("Erro ao buscar livros");

      const data = await response.json();
      setLivros(data);
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
    }
  };

  useEffect(() => {
    fetchLivros();
  }, []);

  const handleAdicionar = (livro) => {
    if (isAuthenticated) {
      adicionarProduto(livro);
      alert("Adicionado ao carrinho com sucesso.");
    } else {
      onLoginRedirect();
    }
  };
  const handleVerMais = (livro) => {
    selecionarProduto(livro);
    onProdutoRedirect(); 
  };

  return (
    <div className="site">
      <header className="header">
        <div className="navbar-container">
          <div className="logo">
            <h1>MeuSite</h1>
          </div>
          <div className="search-bar">
            <input type="text" placeholder="Pesquisar..." />
          </div>
          <div className="actions">
            {isAuthenticated && (
              <>
                <button onClick={onCarrinhoRedirect}>
                  <img
                    src={carrinhoImage}
                    alt="Carrinho de compras"
                    className="cart-icon"
                  />
                </button>
                <button onClick={onPerfilRedirect}>Perfil</button>
              </>
            )}
            {!isAuthenticated ? (
              <>
                <button onClick={onLoginRedirect}>Login</button>
                <button onClick={onCadastroRedirect}>Cadastro</button>
              </>
            ) : (
              <>
                {isAdmin && (
                  <button onClick={onAdicionarLivrosRedirect}>Adicionar Livros</button>
                )}
              </>
            )}
          </div>
        </div>
        <nav className="navbar">
          <ul>
            <li><a href="/livros">Livros</a></li>
            <li><a href="/catequese">Catequese</a></li>
            <li><a href="/sazonais">Sazonais</a></li>
            <li><a href="/artigos">Artigos</a></li>
            <li><a href="/religiosos">Religiosos</a></li>
            <li><a href="/autores">Autores</a></li>
            <li><a href="/colecoes">Coleções</a></li>
            <li><a href="/selos">Selos</a></li>
            <li><a href="/ebooks">E-books</a></li>
            <li><a href="/revistas">Revistas</a></li>
          </ul>
        </nav>
      </header>
      <div className="product-list">
        {livros.length > 0 ? (
          livros.map((livro) => (
            <div key={livro.id} className="product-card">
              <img src="https://pbs.twimg.com/media/FHpc19KXwAcVuXn.jpg" alt="Livro" />
              <h3 onClick={() => handleVerMais(livro)} style={{ cursor: 'pointer' }}>{livro.titulo}</h3>
              <p>{livro.autor}</p>
              <p>{livro.anoLancamento}</p>
              <p>{livro.preco.toFixed(2)}</p>
              <button onClick={() => handleAdicionar(livro)} className="add-to-cart">
                Adicionar ao carrinho
              </button>
            </div>
          ))
        ) : (
          <p>Nenhum livro disponível no momento.</p>
        )}
      </div>
    </div>
  );
};

export default Site;
