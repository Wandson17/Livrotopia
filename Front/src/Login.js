import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import "./Login.css";
import pessoa from "./imgs/pessoa.png";
import cadeado from "./imgs/cadeado.png";
import axios from "axios";

export default function Login({ onLoginSuccess, onCadastroRedirect }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(password);
      const response = await axios.post("http://localhost:8000/api/usuarios/login", {
        email,
        senha: password,
      });

      if (response.status === 200) {
        const { nome } = response.data;
        login(email, password, nome);
        onLoginSuccess();
      } else {
        alert("Credenciais inválidas.");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.mensagem || "O cadastro não foi encontrado");
      } else {
        console.error(error);
        alert("Erro ao conectar ao servidor.");
      }
    }
  };

  return (
    <div className="Login">
      <div className="logincontent">
        <div className="cadastrar">
          <h1>Seja bem-vindo!</h1>
          <p>Se cadastre caso não possua uma conta</p>
          <p>e continue a usar nossa plataforma :)</p>
          <button onClick={onCadastroRedirect}>
            Cadastrar-se
          </button>
        </div>
        <div className="login">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="inputContainer">
              <img src={pessoa} alt="Ícone pessoa" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
              />
            </div>
            <div className="inputContainer">
              <img src={cadeado} alt="Ícone cadeado" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Senha"
              />
            </div>
            <button type="submit">Logar</button>
          </form>
        </div>
      </div>
    </div>
  );
}