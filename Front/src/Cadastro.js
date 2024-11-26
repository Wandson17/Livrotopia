import React, { useState } from "react";
import "./Login.css";
import pessoa from "./imgs/pessoa.png";
import cadeado from "./imgs/cadeado.png";
import carta from "./imgs/carta.png";

export default function Cadastro({ onCadastroSuccess, onLoginRedirect }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      });

      if (response.ok) {
        setMensagem("Cadastro realizado com sucesso!");
        onCadastroSuccess();
      } else {
        setMensagem("Erro ao cadastrar. Tente novamente.");
      }
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao conectar ao servidor.");
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
