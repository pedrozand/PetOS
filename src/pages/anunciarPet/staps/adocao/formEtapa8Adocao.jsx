import React, { useEffect, useState } from "react";
import FormBase from "../../formBase";
import Post from "../../../../components/post/post.jsx";

import { useFormContext } from "../../FormContext";
import { useAuth } from "../../../../../server/context/AuthContext.jsx";

import ImagemDefault from "../../../../assets/img/perfil/img-default.png";

import "./CSS/formEtapa8Adocao.css";

export default function FormEtapa8Adocao({ onProximo, onVoltar, totalEtapas }) {
  const { usuario } = useAuth();
  const { formData } = useFormContext();
  const [previews, setPreviews] = useState([]);
  const [userData, setUserData] = useState({
    nome: "",
    sobrenome: "",
    fotoPerfil: "",
  });

  const handleProximo = () => {
    onProximo({ confirmacao: true });
  };

  // Gera preview das imagens
  useEffect(() => {
    if (formData.fotos && formData.fotos.length > 0) {
      const previewUrls = formData.fotos
        .filter((file) => typeof file === "string" || file instanceof File)
        .map((file) =>
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

  // Buscar nome, sobrenome e foto de perfil do usuário logado
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!usuario?.idUser) return;

        const res = await fetch(
          `http://localhost:3001/api/usuarios/${usuario.idUser}`
        );
        if (!res.ok) throw new Error("Erro ao buscar dados do usuário");

        const data = await res.json();

        setUserData({
          nome: data.nome,
          sobrenome: data.sobrenome,
          fotoPerfil: data.fotoPerfil
            ? `http://localhost:3001/uploads/${data.fotoPerfil}`
            : ImagemDefault,
        });
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error.message);
      }
    };

    fetchUserData();
  }, [usuario]);

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
              fotoPerfil={userData.fotoPerfil}
              nome={userData.nome}
              sobrenome={userData.sobrenome}
              email={usuario?.email || ""}
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
