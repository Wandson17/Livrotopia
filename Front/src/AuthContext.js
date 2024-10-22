//Tutorial de useContext pra iuri redesss

import React, { createContext, useState, useContext } from 'react';

// Criando o Context de Autenticação
const AuthContext = createContext();

// Provider que vai envolver toda a aplicação
export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false); // Estado para saber se é admin

    // Função para autenticar o usuário
    const login = (email, password) => {
        setIsAuthenticated(true);
        if (email === 'admin@gmail.com' && password === 'admin123') {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    };

    // Função para desautenticar o usuário
    const logout = () => {
        setIsAuthenticated(false);
        setIsAdmin(false); // Reseta o estado de admin ao deslogar
    };

    const value = { isAuthenticated, isAdmin, login, logout };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook customizado para usar o contexto mais facilmente
export function useAuth() {
    return useContext(AuthContext);
}
