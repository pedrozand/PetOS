import React, { useEffect, useState } from "react";
import FormBase from "../../formBase";
import Post from "../../../../components/post/post.jsx";
import { useFormContext } from "../../FormContext";

import "./CSS/formEtapa8Adocao.css"; // também alterado o nome do arquivo CSS importado

export default function FormEtapa8Adocao({ onProximo, onVoltar, totalEtapas }) {
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
    <FormBase
      etapaAtual={8}
      onProximo={handleProximo}
      onVoltar={onVoltar}
      totalEtapas={totalEtapas}
    >
      <div className="formulario-scroll-ado">
        <div className="formulario-conteudo-form7-ado">
          <h2>Resumo das Informações</h2>
          <p className="formulario-desc-form7-ado">
            Seu anúncio está pronto!{" "}
            <b>Confira atentamente todas as informações antes de finalizar</b>.{" "}
            Desejamos muita sorte na busca pelo pet!
          </p>
          <div className="resumo-dados-form7-ado post-ajustado-ado">
            <Post
              avatar={formData.avatar || ""}
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
