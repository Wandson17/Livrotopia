import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import "./Login.css";
import pessoa from "./imgs/pessoa.png";
import cadeado from "./imgs/cadeado.png";

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password); 
    onLoginSuccess();
  };

  return (
    <div className="Login">
      <div className="logincontent">
        <div className="cadastrar">
          <h1>Seja bem vindo!</h1>
          <p>Se cadastre caso não possua uma conta</p>
          <p>e continue a usar nossa plataforma :)</p>
          <button>Cadastrar-se</button>
        </div>
        <div className="login">
          <h1>Login</h1>
          <p>Precisa estar logado para adicionar ao carrinho</p>
          <form onSubmit={handleSubmit}>
            <div className="inputContainer">
              <img src={pessoa}></img>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
              ></input>
            </div>
            <div className="inputContainer">
              <img src={cadeado}></img>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Senha"
              ></input>
            </div>
            <button type="submit">Logar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
