import React, { useEffect, useState } from "react";
import FormBase from "../../formBase";
import Post from "../../../../components/post/post.jsx";

import { useFormContext } from "../../FormContext";
import { useAuth } from "../../../../../server/context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

import ImagemDefault from "../../../../assets/img/perfil/img-default.png";

import "./CSS/formEtapa7Tutor.css";

export default function FormEtapa7Tutor({ onProximo, onVoltar }) {
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const { formData } = useFormContext();
  const [previews, setPreviews] = useState([]);
  const [userData, setUserData] = useState({
    nome: "",
    sobrenome: "",
    fotoPerfil: "",
  });

  const handleCriarPost = async () => {
    try {
      const form = new FormData();
      for (let i = 0; i < formData.fotos.length; i++) {
        form.append("fotos", formData.fotos[i]);
      }

      const uploadRes = await fetch("http://localhost:3001/api/upload/fotos", {
        method: "POST",
        body: form,
      });

      if (!uploadRes.ok) throw new Error("Erro ao fazer upload das imagens");

      const { arquivosSalvos } = await uploadRes.json();

      const payload = {
        nomePet: formData.nomePet,
        especie: formData.especie,
        raca: formData.raca,
        sexo: formData.genero,
        porte: formData.porte,
        corPredominante: formData.corPredominante,
        corOlhos: formData.corOlhos,
        idade: formData.idade,
        descricao: formData.descricao,
        fotos: arquivosSalvos,
        situacao: formData.situacao,
        local: formData.local,
        telefonePost: formData.telefone,
        pontoReferencia: formData.referencia,
        dataDesaparecimento: formData.dataDesaparecimento,
        periodo: formData.periodo,
        recompensa: formData.valorRecompensa,
        descricaoLocal: formData.descricaoLocal,
        localPet: formData.localPet,
        idUser: usuario?.idUser,
      };

      const res = await fetch("http://localhost:3001/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Falha ao salvar anúncio");

      await res.json();
      onProximo({ confirmacao: true });
    } catch (err) {
      alert(err.message);
    }

    if (window.location.pathname === "/main") {
      window.location.reload();
    } else {
      navigate("/main");
    }
  };

  // Gera preview das imagens
  useEffect(() => {
    if (formData.fotos && formData.fotos.length > 0) {
      const previewUrls = formData.fotos.map((file) => {
        if (file instanceof File) {
          return URL.createObjectURL(file);
        }
        // se for string (nome do arquivo salvo no backend)
        return `http://localhost:3001/uploads/${file}`;
      });

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
    <FormBase etapaAtual={7} onProximo={handleCriarPost} onVoltar={onVoltar}>
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
              dataDesap={formData.dataDesaparecimento || ""}
              recompensa={formData.valorRecompensa || ""}
              telefone={formData.telefone || ""}
              periodo={formData.periodo || ""}
              situacao={formData.situacao || ""}
              descricaoLocal={formData.descricaoLocal || ""}
              localPet={formData.localPet || ""}
              mostrarInteracoes={false}
            />
          </div>
        </div>
      </div>
    </FormBase>
  );
}
