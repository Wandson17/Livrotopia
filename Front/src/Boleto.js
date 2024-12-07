import React, { useState } from "react";
import "./Boleto.css";
import barcode from "./imgs/barcode.png";
import Header from "./componentes/Header";
import Footer from "./componentes/Footer";
import { useAuth } from "./AuthContext";
import ModalCompraRealizada from "./componentes/ModalCompraRealizada";

const Boleto = ({
  onVoltar,
  onLoginRedirect,
  onCadastroRedirect,
  onAdicionarLivrosRedirect,
  onCarrinhoRedirect,
  onPerfilRedirect,
}) => {
  const { isAuthenticated, isAdmin } = useAuth();
  const [modalAberto, setModalAberto] = useState(false);
  const [pagamentoConfirmado, setPagamentoConfirmado] = useState(false);

  const finalizarCompra = () => {
    setModalAberto(true);
    setPagamentoConfirmado(true); 
  };

  return (
    <div className="Boleto">
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
      <div className="boleto-container">
        <h1>Pagamento via Boleto</h1>
        <p className="boleto-warning">
          Atenção: O código do boleto e a imagem <br />
          são apenas para fins ilustrativos e não funcionam para transações
          reais.
        </p>
        <div className="boleto-content">
          <p>Para finalizar, clique em confirmar pagamento:</p>

          <div className="boleto-img-container">
            <img src={barcode} alt="Boleto Simulado" className="boleto-img" />
          </div>

          <p>
            Ou copie o código do boleto abaixo e faça o pagamento no seu banco:
          </p>
          <div className="boleto-code">
            12345678901234567890123456789012345678901234567890
          </div>

          <button className="boleto-button" onClick={finalizarCompra}>Confirmar Pagamento</button>
          {!pagamentoConfirmado && ( 
            <button className="pix-button" onClick={onCarrinhoRedirect}>
              Cancelar
            </button>
          )}

          {pagamentoConfirmado && ( 
            <button
              className="pix-button"
              onClick={onVoltar}
            >
              Voltar à Página Inicial
            </button>
          )}
        </div>
      </div>
      <ModalCompraRealizada
          isAberto={modalAberto}
          aoFechar={() => setModalAberto(false)}
        />
      <Footer />
    </div>
  );
};

export default Boleto;
