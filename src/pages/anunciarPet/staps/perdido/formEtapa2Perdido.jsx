import React, { useState } from "react";
import FormBase from "../../formBase";
import { FiImage, FiX } from "react-icons/fi";
import "./CSS/formEtapa2Perdido.css";

export default function FormEtapa2Perdido({ onProximo, onVoltar, dados }) {
  const [imagens, setImagens] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const [erro, setErro] = useState("");

  const adicionarImagens = (arquivos) => {
    const restantes = 5 - imagens.length;
    const arquivosValidos = arquivos.filter((file) =>
      file.type.startsWith("image/")
    );

    if (arquivosValidos.length > restantes) {
      setErro(`Você só pode adicionar até 5 imagens!`);
    } else {
      setErro(""); // limpa erro anterior
    }

    const novosArquivos = arquivosValidos.slice(0, restantes);
    const imagensPreview = novosArquivos.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImagens((prev) => [...prev, ...imagensPreview]);
  };

  const handleImagemChange = (e) => {
    const arquivos = Array.from(e.target.files);
    adicionarImagens(arquivos);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const arquivos = Array.from(e.dataTransfer.files);
    adicionarImagens(arquivos);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const removerImagem = (index) => {
    setImagens((prev) => prev.filter((_, i) => i !== index));
    setErro(""); // limpa o erro ao remover uma imagem
  };

  const handleProximo = () => {
    onProximo({ fotos: imagens.map((img) => img.file) });
  };

  return (
    <FormBase etapaAtual={2} onProximo={handleProximo} onVoltar={onVoltar}>
      <div className="formulario-conteudo">
        <div className="box-texto-destaque">
          <p>
            Carregue <b>até 5 fotos</b> do seu pet. Elas serão utilizadas em
            todos os materiais de divulgação, incluindo cartazes, postagens em
            redes sociais e anúncios online.
          </p>
        </div>

        <div className="upload-area-wrapper">
          <h3 className="titulo-upload-img">Fotos do pet</h3>
          <label
            className={`upload-area ${dragOver ? "dragover" : ""}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImagemChange}
              style={{ display: "none" }}
              disabled={imagens.length >= 5}
            />
            <FiImage size={40} />
            <p>
              Arraste uma imagem nesta área, ou clique para selecionar uma
              imagem.
            </p>
            <span>
              Para obter máximo resultado, prefira fotos onde apareça apenas o
              seu pet em evidência, sem escritos adicionais.
            </span>
          </label>

          {/* Exibe mensagem de erro */}
          {erro && <p className="mensagem-erro">{erro}</p>}

          <div className="preview-imagens">
            {imagens.map((img, index) => (
              <div className="preview-item" key={index}>
                <img src={img.preview} alt={`Preview ${index}`} />
                <button
                  className="btn-remover"
                  onClick={() => removerImagem(index)}
                >
                  <FiX />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FormBase>
  );
}
