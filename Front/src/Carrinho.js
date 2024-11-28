import React from "react";
import "./Carrinho.css";
import increment from "./imgs/incremento.png";
import decrement from "./imgs/decremento.png";
import trash from "./imgs/lixo.png";
import Footer from "./componentes/Footer";
import { useCarrinho } from "./CarrinhoContext";
import { useAuth } from "./AuthContext";
import Header from "./componentes/Header";

const Carrinho = ({
  onVoltar,
  onFinalizarRedirect,
  onLoginRedirect,
  onCadastroRedirect,
  onAdicionarLivrosRedirect,
  onCarrinhoRedirect,
  onPerfilRedirect,
}) => {
  const {
    carrinho,
    aumentarQuantidade,
    diminuirQuantidade,
    removerProduto,
    totalCarrinho,
  } = useCarrinho();
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <div className="carrinho">
      <Header
        isAuthenticated={isAuthenticated} 
        isAdmin={isAdmin}
        onLoginRedirect={onLoginRedirect}
        onCadastroRedirect={onCadastroRedirect}
        onAdicionarLivrosRedirect={onAdicionarLivrosRedirect}
        onCarrinhoRedirect={onCarrinhoRedirect}
        onPerfilRedirect={onPerfilRedirect}
      />
      <h1>Meu carrinho</h1>
      <div className="carrinhoPrincipal">
        {carrinho.length === 0 ? (
          <p>Seu carrinho está vazio.</p>
        ) : (
          carrinho.map((item) => (
            <div key={item.id} className="produtosCarrinho">
              <div className="produtoCarrinho">
                {/* Exibindo a imagem do livro */}
                <img
                  src={`http://localhost:8000/${item.capa}`} // Certifique-se de que o caminho está correto
                  alt={`Capa do livro: ${item.titulo}`}
                  className="imagemProduto"
                />
                <div className="informacoesCarrinho">
                  <div className="superior">
                    <h2>{item.titulo}</h2>
                    <p>{item.autor}</p>
                    <p>{item.genero}</p>
                    <p>{item.ano}</p>
                    <p>{item.descricao}</p>
                  </div>
                  <div className="inferior">
                    <p className="valor">Preço: R$ {item.preco.toFixed(2)}</p>
                    <div className="botoes">
                      <button
                        onClick={() => diminuirQuantidade(item.id)}
                        className="diminuir"
                      >
                        <img src={decrement} alt="Decrementar" />
                      </button>
                      <p className="quantidade">{item.quantidade}</p>
                      <button
                        onClick={() => aumentarQuantidade(item.id)}
                        className="aumentar"
                      >
                        <img src={increment} alt="Incrementar" />
                      </button>
                      <button
                        onClick={() => removerProduto(item.id)}
                        className="lixeira"
                      >
                        <img src={trash} alt="Remover produto" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        <div className="finalizacaoCarrinho">
          <div className="descontos">
            <input placeholder="Código do Cupom" />
            <input placeholder="CEP" />
          </div>
          <div className="descontoscalculados">
            <p>Frete: R$ </p>
            <p>Desconto: R$</p>
            <p>Subtotal: R$</p>
            <h2 className="total">Total: R$ {totalCarrinho.toFixed(2)}</h2>
            <div className="botaofinalizar">
              <button onClick={onFinalizarRedirect}>Finalizar compra</button>
            </div>
          </div>
        </div>
      </div>
      <button onClick={onVoltar} className="voltarprodutos">
        Voltar para produtos
      </button>
      <Footer />
    </div>
  );
};

export default Carrinho;