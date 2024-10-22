import React, { useEffect, useState } from "react";
import { useAuth } from './AuthContext'; // O useAuth continua aqui, onde já está envolvido pelo AuthProvider
import "./Site.css";
import carrinhoImage from './imgs/carrinho-de-compras.png';
import setaEsquerda from './imgs/seta-esquerda.png';
import setaDireita from './imgs/seta-direita.png';


const Site = ({ onLoginRedirect, onAdicionarLivrosRedirect }) => {
  const { isAuthenticated, isAdmin, logout } = useAuth(); 
  const [livros, setLivros] = useState([]);

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

  
  const handleAdicionar = () => {
    if (isAuthenticated) {
      alert("Adicionado ao carrinho com sucesso.");
    } else {
      onLoginRedirect(); 
    }
  };

  
  useEffect(() => {
    fetchLivros();
  }, []);

  return (
    <div className="site">
      <header className="header">
        <div className="vercarrinho">
          <div>
            <img src={carrinhoImage} alt="Carrinho de compras" />
          </div>
        </div>
        <nav className="navbar">
          <ul>
            <li><a href="#">Livros</a></li>
            <li><a href="#">Catequese</a></li>
            <li><a href="#">Sazonais</a></li>
            <li><a href="#">Artigos</a></li>
            <li><a href="#">Religiosos</a></li>
            <li><a href="#">Autores</a></li>
            <li><a href="#">Coleções</a></li>
            <li><a href="#">Selos</a></li>
            <li><a href="#">E-books</a></li>
            <li><a href="#">Revistas</a></li>
          </ul>
        </nav>
        <div className="noticias">
          <img src={setaEsquerda} alt="Seta esquerda" />
          <h1>Frete grátis para compras acima de R$9.999,00</h1>
          <img src={setaDireita} alt="Seta direita" />
        </div>
        <div className="logado">
          {isAuthenticated ? (
            <h2>Logado, pode adicionar ao carrinho agora!</h2>
          ) : (
            <p></p>
          )}
          {isAuthenticated && (
            <button onClick={logout}>Sair</button>
          )}
          {/* Botão de Adicionar Livros visível apenas para o administrador */}
          {isAdmin && (
            <button onClick={onAdicionarLivrosRedirect}>Adicionar Livros</button>
          )}
        </div>
      </header>

      <div className="product-list">
        {livros.length > 0 ? (
          livros.map((livro) => (
           <div key={livro.id} className="product-card">
              <img src="https://pbs.twimg.com/media/FHpc19KXwAcVuXn.jpg"/>
              <p>{livro.titulo}</p>
              <p>{livro.descricao}</p>
              <button onClick={handleAdicionar} className="add-to-cart">Adicionar ao carrinho</button>
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
