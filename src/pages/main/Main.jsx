import { Link } from "react-router-dom";

import NavBar from "../../components/navbar/navbar.jsx";
import Post from "../../components/post/post.jsx";
import Filtro from "../../components/filtro/filtro.jsx";
import Encontrados from "../../components/cards/encontrados/encontr.jsx";
import Cabecalho from "../../components/cabecalho/cabecalho.jsx";
import { LocationProvider } from "../../components/location/LocationContext.jsx";

import imgPerfilTeste from "../../assets/img/perfil/Pedrozand.jpg";

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
              imgPet={[
                imgPostPet1,
                imgPostPet2,
                imgPostPet3,
                imgPostPet4,
                imgPostPet5,
              ]}
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
