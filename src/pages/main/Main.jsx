import { Link } from "react-router-dom";

import NavBar from "../../components/navbar/navbar.jsx";
import Post from "../../components/post/post.jsx";
import Filtro from "../../components/filtro/filtro.jsx";
import Encontrados from "../../components/cards/encontrados/encontr.jsx";
import Cabecalho from "../../components/cabecalho/cabecalho.jsx";
import { LocationProvider } from "../../components/location/LocationContext.jsx";

import imgPerfilTeste from "../../assets/img/perfil/Pedrozand.jpg";

import imgPet1 from "../../assets/img/post/corgi-2.jpg";
import imgPet2 from "../../assets/img/post/corgi-5.jpg";
import imgPet3 from "../../assets/img/post/corgi-4.jpg";
import imgPet4 from "../../assets/img/post/corgi-3.jpg";
import imgPet5 from "../../assets/img/post/corgi-1.jpg";
import imgBulma from "../../assets/img/Bulma.jpg";

import "./CSS/main.css";

function Main() {
  return (
    <>
      <div className="container-geral">
        <NavBar />
        <LocationProvider>
          <div>
            <Filtro />
          </div>
          <div>
            <Cabecalho />
            <Post
              avatar={imgPerfilTeste}
              nomeUser={"Pedro Henrique de Oliveira"}
              nomeAnimal={"Goku"}
              especie={"Cachorro"}
              descricao={
                "Animal calmo e adestrado, responde por Goku, fugiu próximo ao bairro do Jardim Recreio, deixei meu portão aberto assim que cheguei do serviço e ele acabou fugindo"
              }
              imgPet={[imgPet1, imgPet2, imgPet3, imgPet4, imgPet5]}
              raca={"Corgi"}
              idade={"Senior"}
              porte={"Médio"}
              corPredominante={"Preto e Laranja"}
              corOlhos={"Castanhos"}
              sexo={"Macho"}
              localDesap={"Bragança Paulista - São Paulo"}
              dataDesap={"2025/03/15"}
            />
          </div>
        </LocationProvider>
        <div>
          <Encontrados
            imgPet={imgPet1}
            nome={"Bills"}
            local={"Avenida Lindóia, 204 - Jardim Recreio"}
            hora={"5 horas atrás"}
            intervalo={"Encontrado 2 dias depois do anúncio!"}
          />
          <Encontrados
            imgPet={imgBulma}
            nome={"Bulma"}
            local={"Rua Felicio Helito, 220 - Penha"}
            hora={"12 horas atrás"}
            intervalo={"Encontrado 8 horas depois do anúncio!"}
          />
          <Encontrados
            imgPet={imgPet1}
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
