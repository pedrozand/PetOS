import React, { useEffect, useState } from "react";
import FormBase from "../../formBase";
import Post from "../../../../components/post/post.jsx";
import { useFormContext } from "../../FormContext";

import "./CSS/formEtapa7Perdido.css";

export default function FormEtapa7Perdido({ onProximo, onVoltar }) {
  const { formData } = useFormContext();
  const [previews, setPreviews] = useState([]);

  const handleProximo = () => {
    onProximo({ confirmacao: true });
  };

  useEffect(() => {
    if (formData.fotos && formData.fotos.length > 0) {
      const previewUrls = formData.fotos.map((file) =>
        typeof file === "string" ? file : URL.createObjectURL(file)
      );
      setPreviews(previewUrls);

      return () => {
        previewUrls.forEach((url) => {
          if (url.startsWith("blob:")) URL.revokeObjectURL(url);
        });
      };
    }
  }, [formData.fotos]);

  return (
    <FormBase etapaAtual={7} onProximo={handleProximo} onVoltar={onVoltar}>
      <div className="formulario-titulo-form7 post-ajustado">
        <h2>Resumo das Informações</h2>
        <p>Confira os dados preenchidos antes de finalizar:</p>
      </div>
      <div className="formulario-conteudo-form7 post-ajustado">
        <Post
          avatar={formData.avatar || ""} // opcional, caso você tenha o campo
          nome={formData.nomeUsuario || ""}
          sobrenome={formData.sobrenomeUsuario || ""}
          nomeAnimal={formData.nomePet || ""}
          especie={formData.especie || ""}
          descricao={formData.descricao || ""}
          imgPet={previews}
          raca={formData.raca || ""}
          idade={formData.idade || ""}
          porte={formData.porte || ""}
          corPredominante={formData.corPredominante || ""}
          corOlhos={formData.corOlhos || ""}
          sexo={formData.genero || ""}
          localDesap={formData.local || ""}
          referencia={formData.referencia || ""}
          dataDesap={formData.dataDesaparecimento || ""}
          recompensa={formData.valorRecompensa || ""}
          telefone={formData.telefone || ""}
          email={formData.email || ""}
        />
      </div>
    </FormBase>
  );
}
