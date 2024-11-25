import React, { useState, useEffect } from "react";
import "./Perfil.css";
import { useAuth } from "./AuthContext";

const Perfil = ({ onVoltar, onCarrinhoRedirect, onLoginRedirect }) => {
  const { logout, usuarioLogado, updateUser } = useAuth();

  // Estados para armazenar dados do formulário
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    telefone: "",
    cpf: "",
    endereco: "",
  });
  const [editando, setEditando] = useState(false);

  // Atualiza os campos com os dados do usuário logado
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

  // Manipula mudanças no formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Validações de formulário
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


  // Salva alterações no backend
  const salvarAlteracoes = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    try {
        const response = await fetch(
            `http://localhost:8000/api/usuarios/${usuarioLogado.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(formData),
            }
        );

        if (response.ok) {
            const updatedUser = await response.json();
            updateUser(updatedUser);
            setEditando(false);
            alert("Informações atualizadas com sucesso!");
        } else {
            const errorData = await response.json();
            if (errorData.errors) {
                const messages = Object.values(errorData.errors)
                    .flat()
                    .join("\n");
                alert(`Erro de validação:\n${messages}`);
            } else {
                alert(
                    `Erro ao salvar as alterações: ${
                        errorData.message || "Erro desconhecido no backend"
                    }`
                );
            }
        }
    } catch (error) {
        console.error("Erro ao salvar no backend:", error);
        alert("Erro ao salvar as alterações. Verifique sua conexão.");
    }
};

  // Exclui o perfil do usuário
  const excluirPerfil = async () => {
    if (!window.confirm("Tem certeza de que deseja excluir o perfil?")) return;

    try {
      const response = await fetch(
        `http://localhost:8000/api/usuarios/${usuarioLogado.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
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
      {/* Barra de Navegação */}
      <header className="navbar">
        <div className="logo" onClick={onVoltar}>
          LOGO
        </div>
        <div className="nav-icons">
          <button className="profile-btn">👤</button>
          <button className="cart-btn" onClick={onCarrinhoRedirect}>
            🛒
          </button>
        </div>
      </header>

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
        </div>

        <div className="right-section">
          <h2>Dados Pessoais:</h2>
          {editando ? (
            <form onSubmit={salvarAlteracoes}>
              {["nome", "email", "senha", "telefone", "cpf", "endereco"].map(
                (field) => (
                  <div key={field}>
                    <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                    <input
                      type={field === "senha" ? "password" : "text"}
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    />
                  </div>
                )
              )}
              <button type="submit">Salvar</button>
              <button type="button" onClick={() => setEditando(false)}>
                Cancelar
              </button>
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
    </div>
  );
};

export default Perfil;
