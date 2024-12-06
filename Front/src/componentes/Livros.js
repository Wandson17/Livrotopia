import React, { useState } from "react";
import "./Livros.css";
import setaEsquerda from "../imgs/seta-esquerda.png";
import setaDireita from "../imgs/seta-direita.png";
import anuncio1 from "../imgs/anuncio1.jpg";
import anuncio2 from "../imgs/anuncio2.jpg";
import anuncio3 from "../imgs/anuncio3.jpg";
import capaPadrao from "../imgs/capaPadrao.jpeg";

const Livros = ({ livros, onAdicionar, onVermais }) => {
  const imagens = [anuncio1, anuncio2, anuncio3];
  const [imagemAtual, setImagemAtual] = useState(0);

  const proximaImagem = () => {
    setImagemAtual((prev) => (prev + 1) % imagens.length);
  };

  const imagemAnterior = () => {
    setImagemAtual((prev) => (prev - 1 + imagens.length) % imagens.length);
  };

  return (
    <div className="Livros">
      <div className="conteudo">
        <div
          className="carrosel"
          style={{ backgroundImage: `url(${imagens[imagemAtual]})` }}
        >
          <div className="setaEsquerda" onClick={imagemAnterior}>
            <img className="seta" src={setaEsquerda} alt="Ícone de seta Esquerda" />
          </div>
          <div className="bolinhas">
            {imagens.map((_, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: imagemAtual === index ? "white" : "black",
                }}
              ></div>
            ))}
          </div>
          <div className="setaDireita" onClick={proximaImagem}>
            <img className="seta" src={setaDireita} alt="Ícone de seta Direita" />
          </div>
        </div>
        
        <div>
          <h3>Mais populares</h3>
        </div>
        <div className="lista-livros">
          {livros.length > 0 ? (
            livros.map((livro) => (
              <div key={livro.id} className="card">
                <img
                  src={livro.capa || capaPadrao} 
                  alt={`Capa do livro ${livro.titulo}`}
                  onError={(e) => (e.target.src = capaPadrao)}
                />
                <h4 onClick={() => onVermais(livro)} style={{ cursor: "pointer" }}>
                  {livro.titulo}
                </h4>
                <p>{livro.autor}</p>
                <p>{livro.anoLancamento}</p>
                <p>
                  R${" "}
                  {typeof livro.preco === "number"
                    ? livro.preco.toFixed(2)
                    : "Preço indisponível"}
                </p>
                <button onClick={() => onAdicionar(livro)}>Adicionar ao carrinho</button>
              </div>
            ))
          ) : (
            <p>Nenhum livro disponível no momento.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Livros;