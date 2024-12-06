import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdicionaLivros.css";
import Footer from "./componentes/Footer";
import Header from "./componentes/Header";

const AdicionaLivros = ({
  onVoltar,
  onLoginRedirect,
  onCadastroRedirect,
  onAdicionarLivrosRedirect,
  onCarrinhoRedirect,
  onPerfilRedirect,
  handleVoltarPaginaInicial,
}) => {
  const [livros, setLivros] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [genero, setGenero] = useState("");
  const [descricao, setDescricao] = useState("");
  const [anoLancamento, setAnoLancamento] = useState("");
  const [preco, setPreco] = useState("");
  const [imageSelected, setImageSelected] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
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
      let imageUrl = previewImage;

      if (imageSelected) {
        const formData = new FormData();
        formData.append("file", imageSelected);
        formData.append("upload_preset", "livrotopia");

        const uploadResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dqyjzmn3s/image/upload",
          formData
        );
        imageUrl = uploadResponse.data.secure_url;
      }

      const livroData = {
        titulo,
        autor,
        genero,
        descricao,
        anoLancamento,
        preco,
        capa: imageUrl
      };

      if (editando && idEditando) {
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
    setPreviewImage(livro.capa);
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
    setImageSelected(null);
    setPreviewImage("");
    setEditando(false);
    setIdEditando(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageSelected(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImageSelected(null);
    setPreviewImage("");
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
        onVoltar={handleVoltarPaginaInicial}
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
          <div className="topo3">
            {previewImage ? (
              <div className="preview-container">
                <img src={previewImage} alt="Preview da capa" className="preview-image" />
                <button type="button" onClick={removeImage}>
                  Remover Imagem
                </button>
              </div>
            ) : (
              <>
                <input
                  type="file"
                  id="imagem-upload"
                  className="imagem"
                  onChange={handleImageChange}
                />
                <label htmlFor="imagem-upload" className="imagem-label"></label>
                <p>Insira a capa do livro</p>
              </>
            )}
          </div>
        </div>
        <div className="baixo">
          <button type="submit">
            {editando ? "Salvar Alterações" : "Cadastrar Livro"}
          </button>
          <button type="button" onClick={onVoltar}>
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