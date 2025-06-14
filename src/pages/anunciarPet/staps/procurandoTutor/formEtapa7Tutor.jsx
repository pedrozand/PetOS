import React, { useEffect, useState } from "react";
import FormBase from "../../formBase";
import Post from "../../../../components/post/post.jsx";
import { useFormContext } from "../../FormContext";

import "./CSS/formEtapa7Tutor.css";

export default function FormEtapa7Tutor({ onProximo, onVoltar }) {
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
      <div className="formulario-scroll-tut">
        <div className="formulario-conteudo-form7-tut">
          <h2>Resumo das Informações</h2>
          <p className="formulario-desc-form7-tut">
            Seu anúncio está pronto!{" "}
            <b>Confira atentamente todas as informações antes de finalizar</b>.{" "}
            Desejamos muita sorte na busca pelo pet!
          </p>
          <div className="resumo-dados-form7-tut post-ajustado-tut">
            <Post
              fotoPerfil={formData.fotoPerfil || ""} // opcional, caso você tenha o campo
              nome={formData.nomeUsuario || ""}
              sobrenome={formData.sobrenomeUsuario || ""}
              nomeAnimal={formData.nomePet || ""}
              especie={formData.especie || ""}
              descricao={formData.descricao || "Não Informado"}
              imgPet={previews}
              raca={formData.raca || "-"}
              idade={formData.idade || "-"}
              porte={formData.porte || "-"}
              corPredominante={formData.corPredominante || "-"}
              corOlhos={formData.corOlhos || "-"}
              sexo={formData.genero || "-"}
              localDesap={formData.local || ""}
              referencia={formData.referencia || ""}
              dataDesap={formData.dataDesaparecimento || ""}
              recompensa={formData.valorRecompensa || ""}
              telefone={formData.telefone || ""}
              email={formData.email || ""}
              periodo={formData.periodo || ""}
              situacao={formData.situacao || ""}
              descricaoLocal={formData.descricaoLocal || ""}
              localPet={formData.localPet || ""}
            />
          </div>
        </div>
      </div>
    </FormBase>
  );
}
