import React, { useState } from "react";
import {useCarrinho} from "../CarrinhoContext";
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
  onVoltar
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const { carrinho } = useCarrinho();

  const quantidadeTotal = carrinho.reduce(
    (acc, item) => acc + item.quantidade,
    0
  );

  return (
    <header className="header">
      <div className="navbar-container">
        <div className="esquerda">
          <img 
            className="hamburguer" 
            src={menu} 
            alt="Menu" 
            onClick={toggleMenu} 
          />
          <div className="logo">
            <img src={logo} alt="Logo Livrotopia" onClick={onVoltar} style={{cursor: "pointer"}}/>
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
                    style={{ position: "relative" }}
                  >
                  <img
                    src={carrinhoImage}
                    alt="Carrinho de compras"
                    className="cart-icon"
                  />
                  {quantidadeTotal > 0 && (
                    <span className="cart-count">{quantidadeTotal}</span>
                  )}
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
          {/* eslint-disable-next-line */}
          <li><a href="#">FICÇÃO</a></li>
          <li><a href="#">AVENTURA</a></li>
          <li><a href="#">TERROR</a></li>
          <li><a href="#">ROMANCE</a></li>
          <li><a href="#">DRAMA</a></li>
          <li><a href="#">COMÉDIA</a></li>
          <li><a href="#">BIOGRAFIA</a></li>
          <li><a href="#">INFANTIS</a></li>
          <li><a href="#">E-BOOKS</a></li>
          <li><a href="#">REVISTAS</a></li>
        </ul>
      </nav>
      {isMenuOpen && (
        <nav className="navbarMobile">
          <ul>
            {isAuthenticated ? (
              <>
                
                {isAdmin ? (
                  <li><a href="#" onClick={onAdicionarLivrosRedirect}>ADICIONAR LIVROS</a></li>
                ) : (
                  <li><a href="#" onClick={onCarrinhoRedirect}>CARRINHO</a></li>
                )}
                <li><a href="#" onClick={onPerfilRedirect}>PERFIL</a></li>
              </>
            ) : (
              <>
                <li><a href="#" onClick={onLoginRedirect}>LOGIN</a></li>
                <li><a href="#" onClick={onCadastroRedirect}>CADASTRO</a></li>
              </>
            )}
            {/* eslint-disable-next-line */}
            <li><a href="#">FICÇÃO</a></li>
            <li><a href="#">AVENTURA</a></li>
            <li><a href="#">TERROR</a></li>
            <li><a href="#">ROMANCE</a></li>
            <li><a href="#">DRAMA</a></li>
            <li><a href="#">COMÉDIA</a></li>
            <li><a href="#">BIOGRAFIA</a></li>
            <li><a href="#">INFANTIS</a></li>
            <li><a href="#">E-BOOKS</a></li>
            <li><a href="#">REVISTAS</a></li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;