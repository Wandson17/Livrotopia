import React, { useState } from "react";
import { useCarrinho } from "./CarrinhoContext";
import "./FinalizarCompra.css";

const FinalizarCompra = ({ onVoltar, onCarrinhoRedirect }) => {
  const { carrinho, totalCarrinho } = useCarrinho();
  const [nomeCartao, setNomeCartao] = useState("");
  const [numeroCartao, setNumeroCartao] = useState("");
  const [validade, setValidade] = useState("");
  const [cvv, setCvv] = useState("");
  const [compraFinalizada, setCompraFinalizada] = useState(false);

  const handleFinalizarCompra = (e) => {
    e.preventDefault();
    console.log("Compra finalizada:", {
      nomeCartao,
      numeroCartao,
      validade,
      cvv,
      itens: carrinho,
      total: totalCarrinho.toFixed(2),
    });

    setCompraFinalizada(true);
  };

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>Finalizar Compra</h1>
        <p>Revise seus itens e complete sua compra com segurança.</p>
      </div>
      <div className="checkout-content">
        {/* Resumo da compra */}
        <div className="summary-section">
          <h2>Resumo do Pedido</h2>
          {carrinho.map((item) => (
            <div key={item.id} className="item">
              <div className="item-details">
                <h3>{item.titulo}</h3>
                <span>Quantidade: {item.quantidade}</span>
              </div>
              <span className="price">R$ {item.preco.toFixed(2)}</span>
            </div>
          ))}
          <div className="total">
            <span>Total</span>
            <span>R$ {totalCarrinho.toFixed(2)}</span>
          </div>
        </div>

        {/* Formulário de pagamento */}
        <div className="payment-section">
          <h2>Informações de Pagamento</h2>
          {compraFinalizada ? (
            <div>
              <h3>Compra realizada com sucesso!</h3>
              <p>Obrigado pela sua compra.</p>
              <button onClick={onVoltar} className="btn-primary">Voltar à Página Inicial</button>
            </div>
          ) : (
            <form className="form" onSubmit={handleFinalizarCompra}>
              <label className="label">Nome no Cartão:</label>
              <input
                className="big-input"
                type="text"
                value={nomeCartao}
                onChange={(e) => setNomeCartao(e.target.value)}
                required
                placeholder="Nome Completo"
              />
              <label className="label">Número do Cartão:</label>
              <input
                className="big-input"
                type="text"
                value={numeroCartao}
                onChange={(e) => setNumeroCartao(e.target.value)}
                required
                placeholder="0000 0000 0000 0000"
              />
              <div className="card-details">
                <div>
                  <label className="label">Validade</label>
                  <input
                    className="small-input"
                    type="text"
                    value={validade}
                    onChange={(e) => setValidade(e.target.value)}
                    required
                    placeholder="MM/AA"
                  />
                </div>
                <div>
                  <label className="label">CVV</label>
                  <input
                    className="small-input"
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    required
                    placeholder="123"
                  />
                </div>
              </div>
              <button type="submit" className="btn-primary">Confirmar Compra</button>
              <button type="submit" className="btn-primary" onClick={onCarrinhoRedirect}>Cancelar</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinalizarCompra;