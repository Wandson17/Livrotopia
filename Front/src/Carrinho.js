import React, { useState } from "react";
import "./Carrinho.css";
import increment from "./imgs/incremento.png";
import decrement from "./imgs/decremento.png";
import trash from "./imgs/lixo.png";
import Footer from "./componentes/Footer";
import capa from "./imgs/capaPadrao.jpeg";
import setabaixo from "./imgs/setabaixo.png";
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
  onPixRedirect,
  onBoletoRedirect,
}) => {
  const {
    carrinho,
    aumentarQuantidade,
    diminuirQuantidade,
    removerProduto,
    totalCarrinho,
  } = useCarrinho();
  const { isAuthenticated, isAdmin } = useAuth();

  const [expandir, setExpandir] = useState({});
  const [opcaoPagamento, setOpcaoPagamento] = useState("");

  const toggleDescricao = (id) => {
    setExpandir((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const finalizarCompra = () => {
    if (opcaoPagamento === "pix") {
      onPixRedirect();
    } else if (opcaoPagamento === "cartao") {
      onFinalizarRedirect();
    } else if (opcaoPagamento === "boleto") {
      onBoletoRedirect();
    }
  };

  const quantidadeTotal = (totalCarrinho, carrinho) => {
    const quantidadeTotal = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    const textoProduto = quantidadeTotal === 1 ? "produto" : "produtos";
    return `R$ ${totalCarrinho.toFixed(2)} (${quantidadeTotal} ${textoProduto})`;
  };


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
        onVoltar={onVoltar}
      />
      <h1>Meu carrinho</h1>
      <div className="carrinhoPrincipal">
        <div className="produtosCarrinho">
          {carrinho.length === 0 ? (
            <p>Seu carrinho está vazio.</p>
          ) : (
            carrinho.map((item) => (
              <div key={item.id} className="produtoCarrinho">
                <img
                  src={item.capa ? item.capa : capa}
                  alt={`Capa do livro: ${item.titulo}`}
                  className="imagemProduto"
                  onError={(e) => (e.target.src = capa)}
                />
                <div className="informacoesCarrinho">
                  <div className="superior">
                    <h2>{item.titulo}</h2>
                    <p>{item.autor}</p>
                    <p>{item.genero}</p>
                    <p>{item.ano}</p>
                    <p>
                      {expandir[item.id]
                        ? item.descricao
                        : `${item.descricao.slice(0, 100)}...`}
                    </p>
                    <button
                      onClick={() => toggleDescricao(item.id)}
                      className="leiaMais"
                    >
                      {expandir[item.id] ? "Leia Menos" : "Leia Mais"}
                      <img src={setabaixo} alt="icone de seta para baixo"></img>
                    </button>
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
            ))
          )}
        </div>
        <div className="finalizacaoCarrinho">
          <div className="descontos">
            <input placeholder="Código do Cupom" />
            <input placeholder="CEP" />
            <p>Frete gratuito para todo o país</p>
          </div>
          <div className="descontoscalculados">
            <p>Desconto: R$0.00</p>
            <p>Subtotal: R$ {totalCarrinho.toFixed(2)}</p>
            <h2 className="total">Total: {quantidadeTotal(totalCarrinho, carrinho)}</h2>

            <div className="opcoesPagamento">
              <label htmlFor="opcoes">Escolha uma forma de pagamento:</label>
              <select
                id="opcoes"
                name="opcoes"
                onChange={(e) => setOpcaoPagamento(e.target.value)}
              >
                <option value="">Selecione</option>
                <option value="pix">PIX</option>
                <option value="boleto">Boleto</option>
                <option value="cartao">Cartão</option>
              </select>
            </div>
            <div className="botaofinalizar">
              <button onClick={finalizarCompra}>Finalizar compra</button>
              <button onClick={onVoltar} className="voltarprodutos">
                Voltar para produtos
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Carrinho;

