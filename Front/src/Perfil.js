import React, { useState, useEffect } from "react";
import "./Perfil.css";
import { useAuth } from "./AuthContext";
import Header from "./componentes/Header";
import Footer from "./componentes/Footer";
import axios from "axios";

const Perfil = ({
  onVoltar,
  onLoginRedirect,
  onCadastroRedirect,
  onAdicionarLivrosRedirect,
  onCarrinhoRedirect,
  onPerfilRedirect,
}) => {
  const { logout, usuarioLogado, updateUser } = useAuth();
  const { isAuthenticated, isAdmin } = useAuth();

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    telefone: "",
    cpf: "",
    endereco: "",
  });
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    if (usuarioLogado) {
      setFormData({
        nome: usuarioLogado.nome || "",
        email: usuarioLogado.email || "",
        senha: usuarioLogado.senha || "",
        telefone: usuarioLogado.telefone || "",
        cpf: usuarioLogado.cpf || "",
        endereco: usuarioLogado.endereco || "",
      });
    }
  }, [usuarioLogado]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validarFormulario = () => {
    const { nome, email, telefone, cpf } = formData;

    if (!nome || !email) {
      alert("Por favor, preencha os campos obrigatórios: Nome e Email.");
      return false;
    }

    if (telefone && isNaN(parseInt(telefone, 10))) {
      alert("O telefone deve ser um número válido.");
      return false;
    }

    const cpfRegex = /^\d{11}$/;
    if (cpf && !cpfRegex.test(cpf)) {
      alert("O CPF deve conter exatamente 11 dígitos numéricos.");
      return false;
    }

    return true;
  };

  const salvarAlteracoes = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    try {
      const response = await axios.put(
        `http://localhost:8000/api/usuarios/${usuarioLogado.id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (response.status === 200) {
        const updatedUser = response.data;
        updateUser(updatedUser);
        setEditando(false);
        alert("Informações atualizadas com sucesso!");
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        const messages = Object.values(error.response.data.errors).flat().join("\n");
        alert(`Erro de validação:\n${messages}`);
      } else {
        console.error("Erro ao salvar no backend:", error);
        alert("Erro ao salvar as alterações. Verifique sua conexão.");
      }
    }
  };

  // Exclui o perfil do usuário
  const excluirPerfil = async () => {
    if (!window.confirm("Tem certeza de que deseja excluir o perfil?")) return;
  
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/usuarios/${usuarioLogado.id}`
      );
  
      if (response.status === 200) {
        logout();
        onLoginRedirect();
        alert("Perfil excluído com sucesso.");
      } else {
        alert("Erro ao excluir perfil.");
      }
    } catch (error) {
      console.error("Erro ao excluir perfil:", error);
      alert("Erro ao excluir perfil.");
    }
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
      />
      <h1 className="profile-title">Perfil</h1>
      <main className="profile-container">
        <div className="left-section">
          <div className="avatar">
            <img src="https://via.placeholder.com/100" alt="Avatar" />
          </div>
          <h2>{formData.nome || "Usuário"}</h2>
          <button onClick={() => setEditando(true)}>Editar</button>
          <button onClick={excluirPerfil}>Excluir Conta</button>
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
              {["nome", "email", "senha", "telefone", "cpf", "endereco"].map(
                (field) => (
                  <div key={field}>
                    <label>
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <div>
                      <input
                        type={field === "senha" ? "password" : "text"}
                        name={field}
                        value={formData[field]}
                        onChange={handleInputChange}
                        placeholder={
                          field.charAt(0).toUpperCase() + field.slice(1)
                        }
                      />
                    </div>
                  </div>
                )
              )}
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
                <strong>Email:</strong> {formData.email || "Indisponível"}
              </p>
              <p>
                <strong>Telefone:</strong> {formData.telefone || "Indisponível"}
              </p>
              <p>
                <strong>CPF:</strong> {formData.cpf || "Indisponível"}
              </p>
              <p>
                <strong>Endereço:</strong> {formData.endereco || "Indisponível"}
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
