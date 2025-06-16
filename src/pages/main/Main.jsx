import { Link } from "react-router-dom";
import { useAuth } from "../../../server/context/AuthContext.jsx";
import React, { useEffect, useState } from "react";

import NavBar from "../../components/navbar/navbar.jsx";
import Post from "../../components/post/post.jsx";
import Encontrados from "../../components/cards/encontrados/encontr.jsx";
import SideBarFilter from "../../components/filtro/sidebarfilter.jsx";
import imgPerfilTeste from "../../assets/img/perfil/Pedrozand.jpg";
import { LocationProvider } from "../../../server/location/LocationContext.jsx";
import Cabecalho from "../../components/cabecalho/cabecalho.jsx";
import PerfilCard from "../../components/perfilPost/PerfilCard.jsx";

import imgPostPet1 from "../../assets/img/post/corgi-2.jpg";
import imgPostPet2 from "../../assets/img/post/corgi-5.jpg";
import imgPostPet3 from "../../assets/img/post/corgi-4.jpg";
import imgPostPet4 from "../../assets/img/post/corgi-3.jpg";
import imgPostPet5 from "../../assets/img/post/corgi-1.jpg";

import imgCardPet1 from "../../assets/img/card/card-encontrado-1.jpg";
import imgCardPet2 from "../../assets/img/card/card-encontrado-2.jpg";
import imgCardPet3 from "../../assets/img/card/card-encontrado-3.jpg";

import "./CSS/main.css";

function Main() {
  const { usuario } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/posts")
      .then((r) => r.json())
      .then(setPosts)
      .catch(console.error);
  }, []);

  return (
    <>
      <div className="container-geral">
        <NavBar />
        <LocationProvider>
          <div>
            {usuario && <PerfilCard />} <SideBarFilter />
          </div>
          <div>
            <Cabecalho />
            {posts.map((p) => (
              <Post
                key={p.idPost}
                fotoPerfil={
                  p.usuario.fotoPerfil
                    ? `http://localhost:3001/uploads/${p.usuario.fotoPerfil}`
                    : imgPostPet5
                }
                nome={p.usuario.nome}
                sobrenome={p.usuario.sobrenome}
                email={p.usuario.email}
                nomeAnimal={p.animal.nome}
                especie={p.animal.especie}
                descricao={p.animal.descricao}
                imgPet={[`http://localhost:3001/uploads/${p.animal.imagem}`]}
                raca={p.animal.raca}
                idade={p.animal.idade}
                porte={p.animal.porte}
                corPredominante={p.animal.corPredominante}
                corOlhos={p.animal.corOlhos}
                sexo={"TESTE"}
                localDesap={p.endereco}
                referencia={p.pontoReferencia}
                dataDesap={p.dataPost}
                periodo={p.periodoPost}
                recompensa={p.statusPost}
                telefone={p.usuario.telefone}
                situacao={p.situacao}
              />
            ))}
          </div>
        </LocationProvider>

        <div>
          <Encontrados
            imgPet={imgCardPet1}
            nome={"Bills"}
            local={"Avenida Lindóia, 204 - Jardim Recreio"}
            hora={"5 horas atrás"}
            intervalo={"Encontrado 2 dias depois do anúncio!"}
          />
          <Encontrados
            imgPet={imgCardPet2}
            nome={"Bulma"}
            local={"Rua Felicio Helito, 220 - Penha"}
            hora={"12 horas atrás"}
            intervalo={"Encontrado 8 horas depois do anúncio!"}
          />
          <Encontrados
            imgPet={imgCardPet3}
            nome={"Bills"}
            local={"Avenida Lindóia, 204 - Jardim Recreio"}
            hora={"5 horas atrás"}
            intervalo={"Encontrado 2 dias depois do anúncio!"}
          />
          {/* Botão Ver Mais */}
          <button
            className="btn-ver-mais"
            onClick={() => navigate("/pagina-destino")}
          >
            Ver Mais
          </button>
        </div>
      </div>
    </>
  );
}

export default Main;
