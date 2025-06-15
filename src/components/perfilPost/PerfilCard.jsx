import React, { useEffect, useState } from "react";
import { useAuth } from "../../../server/context/AuthContext.jsx";

import ImagemDefault from "../../assets/img/perfil/img-default.png";
import CapaPerfil from "../../assets/img/perfil/capa-perfil-card.png";

import "./CSS/perfilCard.css";

export default function PerfilCard({ imagemCapa }) {
  const { usuario } = useAuth();
  const [userData, setUserData] = useState({
    nome: "",
    sobrenome: "",
    fotoPerfil: "",
  });

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
    <div className="perfil-card-pc">
      <div className="capa-pc">
        <img src={CapaPerfil} alt="Capa" className="imagem-capa-pc" />
      </div>
      <div className="conteudo-pc">
        <div className="imagem-perfil-container-pc">
          <img
            src={userData.fotoPerfil}
            alt="Perfil"
            className="imagem-perfil-pc"
          />
        </div>
        <h2 className="nome-pc">
          {userData.nome} {userData.sobrenome}{" "}
        </h2>
      </div>
    </div>
  );
}
