import { useState, useEffect } from "react";
import { useFormContext } from "../../FormContext.jsx";
import FormBase from "../../formBase";
import { FiImage, FiX } from "react-icons/fi";
import { useAuth } from "../../../../../server/context/AuthContext.jsx";
import "./CSS/formEtapa2Perdido.css";

export default function FormEtapa2Perdido({ onProximo, onVoltar }) {
  const { formData, updateFormData } = useFormContext();
  const { user } = useAuth();

  const [imagens, setImagens] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const [erroImagem, setErroImagem] = useState("");

  useEffect(() => {
    if (formData?.fotos?.length > 0) {
      const imagensPreview = formData.fotos
        .filter((file) => file)
        .map((file) => ({
          file,
          preview: file instanceof File ? URL.createObjectURL(file) : file,
        }));

      setImagens(imagensPreview);

      return () => {
        imagensPreview.forEach((img) => {
          if (
            typeof img.preview === "string" &&
            img.preview.startsWith("blob:")
          ) {
            URL.revokeObjectURL(img.preview);
          }
        });
      };
    }
  }, [formData?.fotos]);

  const adicionarImagens = (arquivos) => {
    const novosArquivos = arquivos
      .filter((file) => file.type.startsWith("image/"))
      .slice(0, 5 - imagens.length);

    if (novosArquivos.length + imagens.length > 5) {
      setErroImagem("Você pode adicionar no máximo 5 fotos.");
      return;
    }

    if (novosArquivos.length === 0) return;

    const imagensPreview = novosArquivos.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    const novasImagens = [...imagens, ...imagensPreview];
    setImagens(novasImagens);
    setErroImagem("");
  };

  const handleImagemChange = (e) => {
    const arquivos = Array.from(e.target.files);
    adicionarImagens(arquivos);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const arquivos = Array.from(e.dataTransfer.files);
    adicionarImagens(arquivos);
    setDragOver(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const removerImagem = (index) => {
    const novasImagens = imagens.filter((_, i) => i !== index);
    setImagens(novasImagens);
    setErroImagem("");
  };

  const handleProximo = () => {
    if (imagens.length === 0) {
      setErroImagem("Por favor, adicione ao menos uma foto do pet.");
      return;
    }

    const fotos = imagens.map((img) => img.file);
    updateFormData({ fotos });
    setErroImagem("");
    onProximo({ fotos });
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
            className={`upload-area ${dragOver ? "drag-over" : ""}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={() => setDragOver(true)}
            onDragLeave={() => setDragOver(false)}
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

          {erroImagem && <div className="mensagem-erro-2">{erroImagem}</div>}

          <div className="preview-imagens">
            {imagens.map((img, index) => (
              <div className="preview-item" key={index}>
                <img src={img.preview || null} alt={`Preview ${index}`} />
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
