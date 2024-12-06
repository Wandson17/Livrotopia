import React, { useEffect, useState } from "react";
import { useCarrinho } from "./CarrinhoContext";
import { useAuth } from "./AuthContext";
import "./Site.css";
import Livros from "./componentes/Livros";
import Footer from "./componentes/Footer";
import Header from "./componentes/Header";
import axios from "axios";

const Site = ({
  onLoginRedirect,
  onCadastroRedirect,
  onAdicionarLivrosRedirect,
  onCarrinhoRedirect,
  onPerfilRedirect,
  onProdutoRedirect,
  handleVoltarPaginaInicial,
}) => {
  const { isAuthenticated, isAdmin } = useAuth();
  const { adicionarProduto, selecionarProduto } = useCarrinho();
  const [livros, setLivros] = useState([]);

  const fetchLivros = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/livros");
      setLivros(response.data);
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
      <Header
        isAuthenticated={isAuthenticated}
        isAdmin={isAdmin}
        onLoginRedirect={onLoginRedirect}
        onCadastroRedirect={onCadastroRedirect}
        onAdicionarLivrosRedirect={onAdicionarLivrosRedirect}
        onCarrinhoRedirect={onCarrinhoRedirect}
        onPerfilRedirect={onPerfilRedirect}
        onVoltar={handleVoltarPaginaInicial}
      />
      <Livros
        livros={livros}
        onAdicionar={handleAdicionar}
        onVermais={handleVerMais}
      />
      <Footer />
    </div>
  );
};

export default Site;
