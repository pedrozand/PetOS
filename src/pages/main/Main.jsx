import { Link } from "react-router-dom";
import { useAuth } from "../../../server/context/AuthContext.jsx";
import React, { useEffect, useState } from "react";

import NavBar from "../../components/navbar/navbar.jsx";
import Post from "../../components/post/post.jsx";
import Encontrados from "../../components/cards/encontrados/encontr.jsx";
import SideBarFilter from "../../components/filtro/sidebarfilter.jsx";

import { LocationProvider } from "../../../server/location/LocationContext.jsx";
import Cabecalho from "../../components/cabecalho/cabecalho.jsx";
import PerfilCard from "../../components/perfilPost/PerfilCard.jsx";

import "./CSS/main.css";

function Main() {
  const { usuario } = useAuth();
  const [posts, setPosts] = useState([]);
  const [encontrados, setEncontrados] = useState([]);
  const [filtrosAtivos, setFiltrosAtivos] = useState({
    nomeAnimal: "",
    situacao: "",
    especies: {
      Cachorro: false,
      Gato: false,
      Pássaro: false,
    },
    racasSelecionadas: {},
    idade: "",
    porte: "",
    corPredominante: "",
    corOlhos: "",
    sexo: {
      Macho: false,
      Fêmea: false,
    },
  });

  const handleFilterChange = (filtros) => {
    console.log("Filtros recebidos:", filtros);
    setFiltrosAtivos(filtros);
  };

  const calcularTempoRelativo = (data) => {
    const agora = new Date();
    const dataHora = new Date(data);
    const diffMs = agora - dataHora;
    const segundos = Math.floor(diffMs / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);

    if (dias > 0) return `${dias} dia${dias > 1 ? "s" : ""} atrás`;
    if (horas > 0) return `${horas} hora${horas > 1 ? "s" : ""} atrás`;
    if (minutos > 0) return `${minutos} minuto${minutos > 1 ? "s" : ""} atrás`;
    return "Agora mesmo";
  };

  const calcularIntervaloStatus = (dataPost, statusAtualizadoEm) => {
    const inicio = new Date(dataPost);
    const fim = new Date(statusAtualizadoEm);
    const diffMs = fim - inicio;

    const dias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diffMs / (1000 * 60)) % 60);

    if (dias > 0)
      return `Encontrado ${dias} dia${dias > 1 ? "s" : ""} depois do anúncio!`;
    if (horas > 0)
      return `Encontrado ${horas} hora${
        horas > 1 ? "s" : ""
      } depois do anúncio!`;
    if (minutos > 0)
      return `Encontrado ${minutos} minuto${
        minutos > 1 ? "s" : ""
      } depois do anúncio!`;
    return "Encontrado imediatamente após o anúncio!";
  };

  useEffect(() => {
    async function fetchPostsFiltrados() {
      try {
        const queryParams = new URLSearchParams();

        if (filtrosAtivos) {
          if (filtrosAtivos.nomeAnimal)
            queryParams.append("nomeAnimal", filtrosAtivos.nomeAnimal);
          if (filtrosAtivos.situacao)
            queryParams.append("situacao", filtrosAtivos.situacao);

          // Espécies selecionadas
          const especiesSelecionadas = Object.entries(filtrosAtivos.especies)
            .filter(([_, ativo]) => ativo)
            .map(([esp]) => esp);
          if (especiesSelecionadas.length > 0)
            especiesSelecionadas.forEach((esp) =>
              queryParams.append("especies", esp)
            );

          // Raças selecionadas
          const racasSelecionadas = Object.values(
            filtrosAtivos.racasSelecionadas
          ).filter(Boolean);
          if (racasSelecionadas.length > 0)
            racasSelecionadas.forEach((r) => queryParams.append("raca", r));

          if (filtrosAtivos.idade)
            queryParams.append("idade", filtrosAtivos.idade);
          if (filtrosAtivos.porte)
            queryParams.append("porte", filtrosAtivos.porte);
          if (filtrosAtivos.corPredominante)
            queryParams.append(
              "corPredominante",
              filtrosAtivos.corPredominante
            );
          if (filtrosAtivos.corOlhos)
            queryParams.append("corOlhos", filtrosAtivos.corOlhos);

          const sexoSelecionado = Object.entries(filtrosAtivos.sexo)
            .filter(([_, ativo]) => ativo)
            .map(([sx]) => sx);
          if (sexoSelecionado.length > 0)
            sexoSelecionado.forEach((sx) => queryParams.append("sexo", sx));
        }

        const response = await fetch(
          `http://localhost:3001/api/posts?${queryParams.toString() || ""}`
        );
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Erro ao buscar posts filtrados:", error);
      }
    }

    fetchPostsFiltrados();
    window.scrollTo(0, 0);
  }, [filtrosAtivos]);

  useEffect(() => {
    async function fetchEncontrados() {
      try {
        const response = await fetch(
          "http://localhost:3001/api/postagens/encontrados"
        );
        const data = await response.json();
        setEncontrados(data);
      } catch (error) {
        console.error("Erro ao buscar cards encontrados:", error);
      }
    }

    fetchEncontrados();
  }, []);

  const atualizarPosts = async () => {
    const response = await fetch("http://localhost:3001/api/posts");
    const data = await response.json();
    setPosts(data);
  };

  return (
    <>
      <div className="container-geral">
        <NavBar />
        <LocationProvider>
          <div>
            {usuario && <PerfilCard />}{" "}
            <SideBarFilter onFilterChange={handleFilterChange} />
          </div>
          <div>
            <Cabecalho />
            {posts.map((p) => (
              <Post
                usuario={usuario}
                idPost={p.idPost}
                curtidas={p.curtidas || []}
                comentarios={p.comentarios || []}
                compartilhamentos={p.compartilhamentos || []}
                key={p.idPost}
                fotoPerfil={
                  p.usuario.fotoPerfil
                    ? `http://localhost:3001/uploads/${p.usuario.fotoPerfil}`
                    : []
                }
                nome={p.usuario.nome}
                sobrenome={p.usuario.sobrenome}
                email={p.usuario.email}
                nomeAnimal={p.animal.nome}
                especie={p.animal.especie}
                descricao={p.animal.descricao}
                imgPet={
                  p.animal.imagensAnimal && p.animal.imagensAnimal.length > 0
                    ? p.animal.imagensAnimal.map(
                        (img) => `http://localhost:3001/uploads/${img}`
                      )
                    : []
                }
                raca={p.animal.raca}
                idade={p.animal.idade}
                porte={p.animal.porte}
                corPredominante={p.animal.corPredominante}
                corOlhos={p.animal.corOlhos}
                sexo={p.animal.sexo}
                localDesap={p.endereco}
                referencia={p.pontoReferencia}
                dataDesap={p.dataPost}
                periodo={p.periodoPost}
                recompensa={p.recompensa}
                descricaoLocal={p.descricaoLocal}
                localPet={p.localPet}
                telefone={p.telefonePost}
                situacao={p.situacao}
                cuidados={p.animal.cuidados}
                temperamento={p.animal.temperamento}
                adaptabilidade={p.animal.adaptabilidade}
                socializacao={p.animal.socializacao}
                status={p.status}
                dataHoraPost={p.dataHoraPost}
                onAtualizarPost={atualizarPosts}
              />
            ))}
          </div>
        </LocationProvider>

        <div>
          {encontrados.map((p) => (
            <Encontrados
              key={p.idPost}
              imgPet={
                p.animal.imagensAnimal?.[0]
                  ? `http://localhost:3001/uploads/${p.animal.imagensAnimal[0]}`
                  : "https://via.placeholder.com/150"
              }
              nome={p.animal.nome}
              local={p.endereco}
              hora={calcularTempoRelativo(p.dataHoraPost)}
              intervalo={calcularIntervaloStatus(
                p.dataPost,
                p.statusAtualizadoEm
              )}
            />
          ))}
          <Link to="/petEncontr">
            <button
              className="btn-ver-mais"
              onClick={() => navigate("/pagina-destino")}
            >
              Ver Mais
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Main;
