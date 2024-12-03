import React from "react";
import { useCarrinho } from "../CarrinhoContext";

import "./Header.css";
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
  onVoltar,
}) => {
  const { carrinho } = useCarrinho();

  const quantidadeTotal = carrinho.reduce(
    (acc, item) => acc + item.quantidade,
    0
  );

  return (
    <header className="header">
      <div className="navbar-container">
        <div className="esquerda">
          <div className="logo">
            <img
              src={logo}
              onClick={onVoltar}
              style={{ cursor: "pointer" }}
              alt="Logo Livrotopia"
            />
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
        {/* eslint-disable jsx-a11y/anchor-is-valid */}
          <li><a href="#">LIVROS</a></li>
          <li><a href="#">CATEQUESE</a></li>
          <li><a href="#">SAZONAIS</a></li>
          <li><a href="#">ARTIGOS</a></li>
          <li><a href="#">RELIGIOSOS</a></li>
          <li><a href="#">AUTORES</a></li>
          <li><a href="#">COLEÇÕES</a></li>
          <li><a href="#">SELOS</a></li>
          <li><a href="#">E-BOOKS</a></li>
          <li><a href="#">REVISTAS</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;