import React, { useState } from "react";
import "./Login.css";
import pessoa from "./imgs/pessoa.png";
import cadeado from "./imgs/cadeado.png";
import carta from "./imgs/carta.png";
import axios from "axios";

export default function Cadastro({ onCadastroSuccess, onLoginRedirect }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/usuarios", {
        nome,
        email,
        senha,
      });

      if (response.status === 201) {
        setMensagem("Cadastro realizado com sucesso!");
        onCadastroSuccess();
      } else {
        setMensagem("Erro ao cadastrar. Tente novamente.");
      }
    } catch (error) {
      if (error.response) {
        // Tratando erro vindo da API
        setMensagem(error.response.data.mensagem || "Erro ao cadastrar. Tente novamente.");
      } else {
        console.error(error);
        setMensagem("Erro ao conectar ao servidor.");
      }
    }
  };

  return (
    <div className="Login">
      <div className="logincontent">
        <div className="cadastrar">
          <h1>Já possui uma conta?</h1>
          <p>Faça o login</p>
          <p>e continue a usar nossa plataforma :)</p>
          <button onClick={onLoginRedirect}>
            Login
          </button>
        </div>
        <div className="login">
          <h1>Cadastro</h1>
          <form onSubmit={handleSubmit}>
            <div className="inputContainer">
              <img src={pessoa} alt="Ícone pessoa" />
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                placeholder="Nome"
              />
            </div>
            <div className="inputContainer">
              <img src={carta} alt="Ícone do email" />
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
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                placeholder="Senha"
              />
            </div>
            <button type="submit">Cadastrar</button>
          </form>
          {mensagem && <p>{mensagem}</p>}
        </div>
      </div>
    </div>
  );
}