import React, { useEffect, useState } from "react";
import FormBase from "../../formBase";
import Post from "../../../../components/post/post.jsx";
import { useFormContext } from "../../FormContext";
import { IoIosArrowDown } from "react-icons/io";

import "./CSS/formEtapa8Adocao.css";

export default function FormEtapa8Adocao({ onProximo, onVoltar, totalEtapas }) {
  const { formData } = useFormContext();
  const [previews, setPreviews] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false); // ✅ Estado do modal

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

  function getDataHojeFormatada() {
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, "0");
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const ano = hoje.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

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
            <b>Confira atentamente todas as informações antes de finalizar</b>.
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
              dataDesap={formData.dataDesaparecimento || getDataHojeFormatada()}
              recompensa={formData.valorRecompensa || ""}
              telefone={formData.telefone || ""}
              email={formData.email || ""}
              periodo={formData.periodo || ""}
              situacao={formData.situacao || ""}
              descricaoLocal={formData.descricaoLocal || ""}
              localPet={formData.localPet || ""}
              cuidados={formData.caracteristicas?.cuidados || []}
              temperamento={formData.caracteristicas?.temperamento || []}
              adaptabilidade={formData.caracteristicas?.adaptabilidade || []}
              socializacao={formData.caracteristicas?.socializacao || []}
              onMostrarContato={() => setMostrarModal(true)} // Chamada para abrir modal
            />
          </div>
        </div>
      </div>
    </FormBase>
  );
}
