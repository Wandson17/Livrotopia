import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  const login = async (email, senha) => {
    try {
      const response = await fetch("http://localhost:8000/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });
      const data = await response.json();

      if (response.ok) {
        setIsAuthenticated(true);
        setUsuarioLogado(data);
        if (email === "admin@gmail.com" && senha === "admin123") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
        console.log("Usuário logado:", data);
      } else {
        alert(data.mensagem || "Erro ao fazer login.");
      }
    } catch (error) {
      console.error("Erro na requisição de login:", error);
      alert("Erro ao se conectar ao servidor.");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUsuarioLogado(null);
  };

  const updateUser = (updatedUser) => {
    setUsuarioLogado(updatedUser);
  };

  const value = { isAuthenticated, isAdmin, usuarioLogado, login, logout, updateUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
