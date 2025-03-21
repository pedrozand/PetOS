import NavBar from "./components/navbar/navbar.jsx";
import Post from "./components/post/post.jsx";
import Filtro from "./components/filtro/filtro.jsx";
import Encontrados from "./components/encontrados/encontr.jsx";

import imgGoku from "./assets/img/Goku.jpg";
import imgPet1 from "./assets/img/Bills.jpg";
import imgPet2 from "./assets/img/Bills2.jpg";
import imgPet3 from "./assets/img/Bills3.jpeg";
import imgPet4 from "./assets/img/Bills4.jpg";
import imgPet5 from "./assets/img/Bills5.jpg";
import imgBulma from "./assets/img/Bulma.jpg";
import imgVegeta from "./assets/img/Vegeta.jpeg";

import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <div className="container-geral">
        <div>
          <Filtro />
        </div>
        <div>
          <Post
            avatar={imgGoku}
            nomeUser={"Goku de Oliveira Santana"}
            nomeAnimal={"Bills"}
            especie={"Gato"}
            descricao={
              "Poderoso, confiante, e um obsessivo cabeça-quente, ele é o Deus da Destruição do Sétimo Universo, e assim, sua ocupação é manter equilíbrio destruindo planetas."
            }
            imgPet={[imgPet1, imgPet2, imgPet3, imgPet4, imgPet5]}
            raca={"Sphynx"}
            idade={"Senior"}
            porte={"Médio"}
            corPredominante={"Roxo"}
            corOlhos={"Amarelo"}
            sexo={"Macho"}
            localDesap={"Bragança Paulista - São Paulo"}
            dataDesap={"2025/03/15"}
          />
        </div>
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

export default App;
