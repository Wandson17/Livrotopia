import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email, senha) => {
    try {
      const response = await axios.post("http://localhost:8000/api/usuarios/login", {
        email,
        senha,
      });

      const data = response.data;
      const token = data.token;
      localStorage.setItem("authToken", token);
      setIsAuthenticated(true);
      setUsuarioLogado(data);

      if (email === "admin@gmail.com" && senha === "admin123") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }

      console.log("Usuário logado:", data);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.mensagem || "Erro ao fazer login.");
      } else {
        console.error("Erro na requisição de login:", error);
        alert("Erro ao se conectar ao servidor.");
      }
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUsuarioLogado(null);
    localStorage.removeItem("authToken");
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