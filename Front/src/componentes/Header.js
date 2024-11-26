import React from "react";
import "./Header.css"; 
import menu from "../imgs/menu.png";
import logo from "../imgs/logo-livrotopia.png";
import lupa from "../imgs/lupa.png";
import user from "../imgs/user.png";
import pincel from "../imgs/pincel.png";
import carrinhoImage from "../imgs/carrinho-de-compras.png";

const Header = ({
  isAuthenticated,
  isAdmin,
  onLoginRedirect,
  onCadastroRedirect,
  onAdicionarLivrosRedirect,
  onCarrinhoRedirect,
  onPerfilRedirect,
}) => {
  return (
    <header className="header">
      <div className="navbar-container">
        <div className="esquerda">
          <div className="logo">
            <img src={logo} alt="Logo Livrotopia" />
          </div>
        </div>
        <div className="direita">
          <div className="pesquisa">
            <input type="text" placeholder="Pesquisar..." />
            <button className="lupinha">
              <img src={lupa} alt="Pesquisar" />
            </button>
          </div>
          <div className="actions">
            {isAuthenticated ? (
              <>
                {isAdmin ? (
                  <button
                    className="pincelbutton"
                    onClick={onAdicionarLivrosRedirect}
                  >
                    <img
                      src={pincel}
                      alt="Editar livros"
                      className="pincel-icon"
                    />
                  </button>
                ) : (
                  <button
                    className="carrinhobutton"
                    onClick={onCarrinhoRedirect}
                  >
                    <img
                      src={carrinhoImage}
                      alt="Carrinho de compras"
                      className="cart-icon"
                    />
                  </button>
                )}
                <button className="userbutton" onClick={onPerfilRedirect}>
                  <img className="user-icon" src={user} alt="Perfil" />
                </button>
              </>
            ) : (
              <>
                <button className="botaologin" onClick={onLoginRedirect}>
                  Login
                </button>
                <button className="botaocadastro" onClick={onCadastroRedirect}>
                  Cadastro
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <nav className="navbar">
        <ul>
          <li><a href="/livros">LIVROS</a></li>
          <li><a href="/catequese">CATEQUESE</a></li>
          <li><a href="/sazonais">SAZONAIS</a></li>
          <li><a href="/artigos">ARTIGOS</a></li>
          <li><a href="/religiosos">RELIGIOSOS</a></li>
          <li><a href="/autores">AUTORES</a></li>
          <li><a href="/colecoes">COLEÇÕES</a></li>
          <li><a href="/selos">SELOS</a></li>
          <li><a href="/ebooks">E-BOOKS</a></li>
          <li><a href="/revistas">REVISTAS</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
