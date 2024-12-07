import React, { useState } from "react";
import "./Pix.css";
import qrcodeImage from "./imgs/qrcode-pix.png";
import Header from "./componentes/Header";
import Footer from "./componentes/Footer";
import { useAuth } from "./AuthContext";
import ModalCompraRealizada from "./componentes/ModalCompraRealizada";

const Pix = ({
  onVoltar,
  onLoginRedirect,
  onCadastroRedirect,
  onAdicionarLivrosRedirect,
  onCarrinhoRedirect,
  onPerfilRedirect,
  onPaginaInicialRedirect,
}) => {
  const { isAuthenticated, isAdmin } = useAuth();
  const [modalAberto, setModalAberto] = useState(false);
  const [pagamentoConfirmado, setPagamentoConfirmado] = useState(false);

  const finalizarCompra = () => {
    setModalAberto(true);
    setPagamentoConfirmado(true); 
  };

  return (
    <div className="Pix">
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
      <div className="pix-container">
        <h1>Pagamento via PIX</h1>
        <p className="Aviso">
          Atenção! O QR Code e o código PIX exibidos são apenas para fins
          <br />
          ilustrativos e não funcionam para transações reais.
        </p>
        <div className="pix-content">
          <p>Escaneie o QR Code abaixo para finalizar seu pagamento via PIX:</p>

          <div className="qr-code">
            <img src={qrcodeImage} alt="QR Code PIX" className="qr-code-img" />
          </div>

          <p>Ou copie o código abaixo e faça a transferência:</p>
          <div className="pix-code">
            00020101021129370016BR.GOV.BCB.PIX0114000BR.GOV.BCB.ID8914104000000000230326000001000000000044000000000000
          </div>

          <button className="pix-button" onClick={finalizarCompra}>
            Confirmar Pagamento
          </button>

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

export default Pix;

