import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdicionaLivros.css";
import Footer from "./componentes/Footer";
import Header from "./componentes/Header";
// import {Image} from "cloudinary-react";

const AdicionaLivros = ({
  onVoltar,
  onLoginRedirect,
  onCadastroRedirect,
  onAdicionarLivrosRedirect,
  onCarrinhoRedirect,
  onPerfilRedirect,
}) => {
  const [livros, setLivros] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [genero, setGenero] = useState("");
  const [descricao, setDescricao] = useState("");
  const [anoLancamento, setAnoLancamento] = useState("");
  const [preco, setPreco] = useState("");

  const [imageSelected, setImageSelected] = useState("");

  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  const apiUrl = "http://localhost:8000/api/livros";

  const fetchLivros = async () => {
    try {
      const { data } = await axios.get(apiUrl);
      setLivros(data);
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append("file", imageSelected);
      formData.append("upload_preset", "livrotopia");
  
      const uploadResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dqyjzmn3s/image/upload",
        formData
      );
  
      const imageUrl = uploadResponse.data.secure_url; 
  
      const livroData = {
        titulo,
        autor,
        genero,
        descricao,
        anoLancamento,
        preco,
        capa: imageUrl,
      };
  
      if (editando) {
        await axios.put(`${apiUrl}/${idEditando}`, livroData);
      } else {
        await axios.post(apiUrl, livroData);
      }
  
      fetchLivros();
      resetForm();
    } catch (error) {
      console.error("Erro ao salvar livro:", error);
    }
  };

  const apagarLivro = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchLivros();
    } catch (error) {
      console.error("Erro ao apagar livro:", error);
    }
  };

  const iniciarEdicao = (livro) => {
    setTitulo(livro.titulo);
    setAutor(livro.autor);
    setGenero(livro.genero);
    setDescricao(livro.descricao);
    setAnoLancamento(livro.anoLancamento);
    setPreco(livro.preco);
    setEditando(true);
    setIdEditando(livro.id);
  };

  const resetForm = () => {
    setTitulo("");
    setAutor("");
    setGenero("");
    setDescricao("");
    setAnoLancamento("");
    setPreco("");
    setEditando(false);
    setIdEditando(null);
  };

  useEffect(() => {
    fetchLivros();
  }, []);


  return (
    <div className="Adiciona">
      <Header
        isAuthenticated={true}
        isAdmin={true}
        onLoginRedirect={onLoginRedirect}
        onCadastroRedirect={onCadastroRedirect}
        onAdicionarLivrosRedirect={onAdicionarLivrosRedirect}
        onCarrinhoRedirect={onCarrinhoRedirect}
        onPerfilRedirect={onPerfilRedirect}
      />
      <h1>Cadastro de livros</h1>
      <form onSubmit={handleSubmit} className="cadastro">
        <div className="topo">
          <div className="topo1">
            <input
              type="text"
              placeholder="Título"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Autor"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Gênero"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              required
            />
          </div>
          <div className="topo2">
            <input
              type="text"
              placeholder="Descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Ano"
              value={anoLancamento}
              onChange={(e) => setAnoLancamento(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Valor"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              required
            />
          </div>
          {/* ========== input da imagem fica aquiiii ========== */}
          <div className="topo3">
            <input
              type="file"
              id="imagem-upload"
              className="imagem"
              onChange={(e)=> {
                setImageSelected(e.target.files[0]);
              }}
            />
            <label htmlFor="imagem-upload" className="imagem-label"></label>
            <p>Insira a capa do livro</p>
            {/* =============================================== */}
          </div>
        </div>
        <div className="baixo">
          <button type="submit">
            {editando ? "Salvar Alterações" : "Cadastrar Livro"}
          </button>
          <button onClick={onVoltar}>
            Voltar para a página inicial
          </button>
        </div>
      </form>
      <h1>Livros cadastrados</h1>
      <div className="livros-cadastrados">
        {livros.map((livro) => (
          <div className="card-cadastrados" key={livro.id}>
            <div className="capa">
            {livro.capa ? (
              <img src={livro.capa} alt={`Capa do livro ${livro.titulo}`} />
              ) : (
                <p>Sem capa disponível</p>
              )}
              {/* <Image 
                cloudName="dqyjzmn3s" 
                publicId="https://res.cloudinary.com/dqyjzmn3s/image/upload/v1733178457/cqartvy5mi5xmpil44va.jpg"
              /> */}
            </div>
            <div className="informacoes">
              <h2>{livro.titulo}</h2>
              <p>{livro.autor}</p>
              <p>{livro.genero}</p>
              <p>{livro.descricao}</p>
              <p>{livro.anoLancamento}</p>
              <p className="valor">R$ {livro.preco}</p>
            </div>
            <div className="botoes-cadastrados">
              <button onClick={() => iniciarEdicao(livro)}>Editar</button>
              <button onClick={() => apagarLivro(livro.id)}>Apagar</button>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default AdicionaLivros;