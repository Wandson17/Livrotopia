import React from "react";
import { useCarrinho } from "./CarrinhoContext";
import "./Produto.css";

const Produto = ({ onVoltar}) => {
  const { livroSelecionado, adicionarProduto } = useCarrinho();

  if (!livroSelecionado) {
    return <p>Produto não encontrado.</p>; // Caso não tenha livro selecionado
  }

  return (
    <div className="container">
      <main>
        <section className="product-section">
          <div className="product">
            <div className="product-image">
              <img
                src="https://via.placeholder.com/300"
                alt="Imagem do Produto"
              />
            </div>
            <div className="product-info">
              <h1 className="product-title">{livroSelecionado.titulo}</h1>
              <p className="product-author">Autor: {livroSelecionado.autor}</p>
              <p className="product-genre">Gênero: Literatura</p>
              <p className="product-year">Ano: {livroSelecionado.anoLancamento}</p>
              <p className="product-description">{livroSelecionado.descricao}</p>
            </div>
            <div className="product-pricing">
              <p className="price">Preço: R$ {livroSelecionado.preco.toFixed(2)}</p>
              <button className="btn btn-primary" onClick={() => adicionarProduto(livroSelecionado)}>
                Adicionar ao Carrinho
              </button>
              <button className="btn btn-secondary">Comprar Agora</button>
            </div>
          </div>
        </section>

        {/* Seção de Feedback */}
        <section className="feedback-section">
          <h2 className="section-title">Avaliações</h2>
          <form className="feedback-form">
            <textarea placeholder="Adicione seu feedback"></textarea>
            <button type="submit" className="btn btn-primary">
              Enviar
            </button>
          </form>

          <div className="reviews">
            <div className="review">
              <h3 className="review-title">Ótimo Produto</h3>
              <p className="review-body">A descrição é fiel ao que recebi. Recomendo!</p>
              <p className="review-author">Por: Cliente Satisfeito</p>
            </div>
            <div className="review">
              <h3 className="review-title">Bom, mas pode melhorar</h3>
              <p className="review-body">Gostei bastante, mas tive problemas na entrega.</p>
              <p className="review-author">Por: Usuário Anônimo</p>
            </div>
          </div>
        </section>
      </main>
      <button onClick={onVoltar}>Voltar para Inicio</button>
    </div>
  );
}

export default Produto;
