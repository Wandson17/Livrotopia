import React from "react";
import "./ModalCompraRealizada.css"; 

const ModalCompraRealizada = ({ isAberto, aoFechar }) => {
  if (!isAberto) return null;

  return (
    <div className="overlay">
      <div className="modal">
        <h2>Compra Realizada!</h2>
        <p>Obrigado por comprar conosco. Seu pedido foi processado com sucesso.</p>
        <button className="botao" onClick={aoFechar}>
          Fechar
        </button>
      </div>
    </div>
  );
};

export default ModalCompraRealizada;