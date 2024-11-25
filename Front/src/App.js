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

function App() {
  const [currentPage, setCurrentPage] = useState("site");

  const handleLoginRedirect = () => {
    setCurrentPage("login");
  };

  const handleCadastroRedirect = () => {
    setCurrentPage("cadastro");
  };

  const handleLoginSuccess = () => {
    setCurrentPage("site");
  };

  const handleCadastroSuccess = () => {
    setCurrentPage("login");
  };

  const handleCarrinhoRedirect = () => {
    setCurrentPage("carrinho");
  };

  const handlePerfilRedirect = () => {
    setCurrentPage("perfil");
  };

  const handleVoltarPaginaInicial = () => {
    setCurrentPage("site");
  };
  const handleFinalizarCompraRedirect = () => {
    setCurrentPage("finalizarCompra");
  };
  const handleProdutoRedirect = () => {
    setCurrentPage("produto");
  }
 
  return (
        <AuthProvider>
            <div>
                <CarrinhoProvider>
                <div>
                    {currentPage === "site" && (
                    <Site
                        onLoginRedirect={handleLoginRedirect}
                        onCadastroRedirect={handleCadastroRedirect}
                        onAdicionarLivrosRedirect={() => setCurrentPage("adicionarLivros")}
                        onCarrinhoRedirect={handleCarrinhoRedirect}
                        onPerfilRedirect={handlePerfilRedirect}
                        onProdutoRedirect={handleProdutoRedirect}
                    />
                    )}
                    {currentPage === "carrinho" && (
                    <Carrinho 
                      onVoltar={handleVoltarPaginaInicial} 
                      onFinalizarRedirect={handleFinalizarCompraRedirect}
                      />
                    )}
                    {currentPage === "adicionarLivros" && (
                    <AdicionaLivros onVoltar={handleVoltarPaginaInicial} />
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
                      onLoginRedirect={handleLoginRedirect}
                      onVoltar={handleVoltarPaginaInicial} 
                      onCarrinhoRedirect={handleCarrinhoRedirect}
                    />
                    )}
                    {currentPage === "finalizarCompra" && (
                      <FinalizarCompra 
                        onVoltar={handleVoltarPaginaInicial}
                        onCarrinhoRedirect={handleCarrinhoRedirect}
                      />
                    )}
                    {currentPage === "produto" && (
                      <Produto onVoltar={handleVoltarPaginaInicial} />
                    )}
                    </div>
                </CarrinhoProvider>

            </div>
        </AuthProvider>
    );
}

export default App;
