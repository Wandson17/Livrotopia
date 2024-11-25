import React from "react";
import { useCarrinho } from "./CarrinhoContext";
import "./Carrinho.css";

const Carrinho = ({ onVoltar, onFinalizarRedirect}) => {
  const {
    carrinho,
    aumentarQuantidade,
    diminuirQuantidade,
    removerProduto,
    totalCarrinho,
  } = useCarrinho();

  return (
    <div className="carrinho">
      <h1>Carrinho</h1>
      {carrinho.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        carrinho.map((item) => (
          <div key={item.id} className="produto">
            <h2>{item.titulo}</h2>
            <p>Preço: R$ {item.preco.toFixed(2)}</p>
            <p>Quantidade: {item.quantidade}</p>
            <button onClick={() => aumentarQuantidade(item.id)}>+</button>
            <button onClick={() => diminuirQuantidade(item.id)}>-</button>
            <button onClick={() => removerProduto(item.id)}>Remover</button>
          </div>
        ))
      )}
      <h2>Total: R$ {totalCarrinho.toFixed(2)}</h2>
      <button onClick={onFinalizarRedirect}>
        Finalizar Compra
      </button>

      <button onClick={onVoltar}>Voltar para Produtos</button>
    </div>
  );
};

export default Carrinho;
