import React, { createContext, useState, useContext } from 'react';

const CarrinhoContext = createContext();

export const useCarrinho = () => useContext(CarrinhoContext);

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);
  const [livroSelecionado, setLivroSelecionado] = useState(null);

  const adicionarProduto = (produto) => {
    const itemExistente = carrinho.find((item) => item.id === produto.id);
    if (itemExistente) {
      setCarrinho(
        carrinho.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        )
      );
    } else {
      setCarrinho([...carrinho, { ...produto, quantidade: 1 }]);
    }
  };

  const selecionarProduto = (produto) => {
    setLivroSelecionado(produto);
  };

  const aumentarQuantidade = (id) => {
    setCarrinho(
      carrinho.map((item) =>
        item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item
      )
    );
  };

  const diminuirQuantidade = (id) => {
    setCarrinho(
      carrinho.map((item) =>
        item.id === id && item.quantidade > 1
          ? { ...item, quantidade: item.quantidade - 1 }
          : item
      )
    );
  };

  const removerProduto = (id) => {
    setCarrinho(carrinho.filter((item) => item.id !== id));
  };

  const totalCarrinho = carrinho.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        adicionarProduto,
        selecionarProduto, 
        livroSelecionado,
        aumentarQuantidade,
        diminuirQuantidade,
        removerProduto,
        totalCarrinho,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};
