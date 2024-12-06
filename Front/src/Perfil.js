import React, { useState, useEffect } from "react";
import "./Perfil.css";
import { useAuth } from "./AuthContext";
import Header from "./componentes/Header";
import Footer from "./componentes/Footer";

const Perfil = ({
  onVoltar,
  onLoginRedirect,
  onCadastroRedirect,
  onAdicionarLivrosRedirect,
  onCarrinhoRedirect,
  onPerfilRedirect,
  handleVoltarPaginaInicial,
}) => {
  const { logout, usuarioLogado } = useAuth();
  const { isAuthenticated, isAdmin } = useAuth();

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cep: "",
    endereco: "",
  });
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    // Carrega dados do localStorage e do usuário logado
    if (usuarioLogado) {
      setFormData({
        nome: usuarioLogado.nome || "",
        email: usuarioLogado.email || "",
        telefone: localStorage.getItem("telefone") || "",
        cep: localStorage.getItem("cep") || "",
        endereco: localStorage.getItem("endereco") || "",
      });
    }
  }, [usuarioLogado]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const salvarAlteracoes = (e) => {
    e.preventDefault();

    // Salva os dados no localStorage
    localStorage.setItem("telefone", formData.telefone);
    localStorage.setItem("cep", formData.cep);
    localStorage.setItem("endereco", formData.endereco);

    alert("Informações atualizadas com sucesso!");
    setEditando(false);
  };

  return (
    <div>
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
      <h1 className="profile-title">Perfil</h1>
      <main className="profile-container">
        <div className="left-section">
          <div className="avatar">
            <img
              src="https://i.pinimg.com/736x/a8/0e/36/a80e3690318c08114011145fdcfa3ddb.jpg"
              alt="Avatar"
            />
          </div>
          <h2>{formData.nome || "Usuário"}</h2>
          <button onClick={() => setEditando(true)}>Editar Dados</button>
          <button>Minhas Compras</button>
          <button
            onClick={() => {
              logout();
              onLoginRedirect();
            }}
          >
            Sair
          </button>
          <button onClick={onVoltar}>Voltar</button>
        </div>

        <div className="right-section">
          <h2>Dados Pessoais:</h2>
          {editando ? (
            <form onSubmit={salvarAlteracoes}>
              {["nome", "email", "telefone", "cep", "endereco"].map((field) => (
                <div key={field}>
                  <label>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <div>
                    <input
                      type="text"
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      placeholder={
                        field.charAt(0).toUpperCase() + field.slice(1)
                      }
                    />
                  </div>
                </div>
              ))}
              <div className="SalvareCancelar">
                <button className="salvarperfil" type="submit">
                  Salvar
                </button>
                <button
                  className="cancelarperfil"
                  type="button"
                  onClick={() => setEditando(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <div>
              <p>
                <strong>Email:</strong> {formData.email || "Não informado"}
              </p>
              <p>
                <strong>Telefone:</strong> {formData.telefone || "Não informado"}
              </p>
              <p>
                <strong>CEP:</strong> {formData.cep || "Não informado"}
              </p>
              <p>
                <strong>Endereço:</strong> {formData.endereco || "Não informado"}
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Perfil;