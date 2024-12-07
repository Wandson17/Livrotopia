import React, { useState } from "react";
import { AuthProvider } from "./AuthContext";
import { CarrinhoProvider } from "./CarrinhoContext";
import Site from "./Site";
import Carrinho from "./Carrinho";
import Login from "./Login";
import Cadastro from "./Cadastro";
import AdicionaLivros from "./AdicionaLivros";
import Perfil from "./Perfil";
import FinalizarCompra from "./FinalizarCompra";
import Produto from "./Produto";
import Header from "./componentes/Header";
import Pix from "./Pix";
import Boleto from "./Boleto";

function App() {
  const [currentPage, setCurrentPage] = useState("site");

  const handleLoginRedirect = () => setCurrentPage("login");
  const handleCadastroRedirect = () => setCurrentPage("cadastro");
  const handleLoginSuccess = () => setCurrentPage("site");
  const handleCadastroSuccess = () => setCurrentPage("login");
  const handleCarrinhoRedirect = () => setCurrentPage("carrinho");
  const handlePerfilRedirect = () => setCurrentPage("perfil");
  const handleVoltarPaginaInicial = () => setCurrentPage("site");
  const handleFinalizarCompraRedirect = () => setCurrentPage("finalizarCompra");
  const handleProdutoRedirect = () => setCurrentPage("produto");
  const handleAdicionarLivrosRedirect = () => setCurrentPage("adicionarLivros");
  const handlePixRedirect = () => setCurrentPage("pix");
  const handleBoletoRedirect = () => setCurrentPage("boleto");

  return (
    <AuthProvider>
      <CarrinhoProvider>
        <div>
          {currentPage === "site" && (
            <Site
              onVoltar={handleVoltarPaginaInicial}
              onLoginRedirect={handleLoginRedirect}
              onCadastroRedirect={handleCadastroRedirect}
              onAdicionarLivrosRedirect={handleAdicionarLivrosRedirect}
              onCarrinhoRedirect={handleCarrinhoRedirect}
              onPerfilRedirect={handlePerfilRedirect}
              onProdutoRedirect={handleProdutoRedirect}
            />
          )}
          {currentPage === "carrinho" && (
            <Carrinho
              onVoltar={handleVoltarPaginaInicial}
              onFinalizarRedirect={handleFinalizarCompraRedirect}
              onLoginRedirect={handleLoginRedirect}
              onCadastroRedirect={handleCadastroRedirect}
              onAdicionarLivrosRedirect={handleAdicionarLivrosRedirect}
              onCarrinhoRedirect={handleCarrinhoRedirect}
              onPerfilRedirect={handlePerfilRedirect}
              onPixRedirect={handlePixRedirect}
              onBoletoRedirect={handleBoletoRedirect}
            />
          )}
          {currentPage === "adicionarLivros" && (
            <AdicionaLivros
              onVoltar={handleVoltarPaginaInicial}
              onLoginRedirect={handleLoginRedirect}
              onCadastroRedirect={handleCadastroRedirect}
              onAdicionarLivrosRedirect={handleAdicionarLivrosRedirect}
              onCarrinhoRedirect={handleCarrinhoRedirect}
              onPerfilRedirect={handlePerfilRedirect}
            />
          )}
          {currentPage === "login" && (
            <Login
              onLoginSuccess={handleLoginSuccess}
              onCadastroRedirect={handleCadastroRedirect}
            />
          )}
          {currentPage === "cadastro" && (
            <Cadastro
              onCadastroSuccess={handleCadastroSuccess}
              onLoginRedirect={handleLoginRedirect}
            />
          )}
          {currentPage === "perfil" && (
            <Perfil
              onVoltar={handleVoltarPaginaInicial}
              onFinalizarRedirect={handleFinalizarCompraRedirect}
              onLoginRedirect={handleLoginRedirect}
              onCadastroRedirect={handleCadastroRedirect}
              onAdicionarLivrosRedirect={handleAdicionarLivrosRedirect}
              onCarrinhoRedirect={handleCarrinhoRedirect}
              onPerfilRedirect={handlePerfilRedirect}
            />
          )}
          {currentPage === "finalizarCompra" && (
            <FinalizarCompra
              onVoltar={handleVoltarPaginaInicial}
              onLoginRedirect={handleLoginRedirect}
              onCadastroRedirect={handleCadastroRedirect}
              onAdicionarLivrosRedirect={handleAdicionarLivrosRedirect}
              onCarrinhoRedirect={handleCarrinhoRedirect}
              onPerfilRedirect={handlePerfilRedirect}
            />
          )}
          {currentPage === "produto" && (
            <Produto
              onVoltar={handleVoltarPaginaInicial}
              onLoginRedirect={handleLoginRedirect}
              onCadastroRedirect={handleCadastroRedirect}
              onAdicionarLivrosRedirect={handleAdicionarLivrosRedirect}
              onCarrinhoRedirect={handleCarrinhoRedirect}
              onPerfilRedirect={handlePerfilRedirect}
            />
          )}
          {currentPage === "header" && (
            <Header onVoltar={handleVoltarPaginaInicial} />
          )}
          {currentPage === "pix" && (
            <Pix
              onVoltar={handleVoltarPaginaInicial}
              onLoginRedirect={handleLoginRedirect}
              onCadastroRedirect={handleCadastroRedirect}
              onAdicionarLivrosRedirect={handleAdicionarLivrosRedirect}
              onCarrinhoRedirect={handleCarrinhoRedirect}
              onPerfilRedirect={handlePerfilRedirect}
            />
          )}
          {currentPage === "boleto" && (
            <Boleto
              onVoltar={handleVoltarPaginaInicial}
              onLoginRedirect={handleLoginRedirect}
              onCadastroRedirect={handleCadastroRedirect}
              onAdicionarLivrosRedirect={handleAdicionarLivrosRedirect}
              onCarrinhoRedirect={handleCarrinhoRedirect}
              onPerfilRedirect={handlePerfilRedirect}
            />
          )}
        </div>
      </CarrinhoProvider>
    </AuthProvider>
  );
}

export default App;
