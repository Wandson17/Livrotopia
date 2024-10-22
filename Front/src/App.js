import React, { useState } from 'react';
import { AuthProvider } from './AuthContext';
import Site from './Site';
import Login from './Login';
import AdicionaLivros from './AdicionaLivros';

function App() {
    const [currentPage, setCurrentPage] = useState('site');

    const handleLoginRedirect = () => {
        setCurrentPage('login');
    };

    const handleLoginSuccess = () => {
        setCurrentPage('site');
    };

    const handleLivroAdicionado = () => {
        
    };

    const handleAdicionarLivrosRedirect = () => {
        setCurrentPage('adicionarLivros'); 
    };

    const handleVoltarPaginaInicial = () => {
        setCurrentPage('site'); 
    };

    return (
        <AuthProvider>
            <div>
                {currentPage === 'site' && (
                    <Site 
                        onLoginRedirect={handleLoginRedirect}
                        onAdicionarLivrosRedirect={handleAdicionarLivrosRedirect}
                    />
                )}
                {currentPage === 'login' && (
                    <Login onLoginSuccess={handleLoginSuccess} />
                )}
                {currentPage === 'adicionarLivros' && (
                    <AdicionaLivros 
                        onLivroAdicionado={handleLivroAdicionado} 
                        onVoltarPaginaInicial={handleVoltarPaginaInicial}
                    />
                )}
            </div>
        </AuthProvider>
    );
}

export default App;
