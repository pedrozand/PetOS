import NavBar from "./components/navbar/navbar.jsx";
import Post from "./components/post/post.jsx";
import Filtro from "./components/filtro/filtro.jsx";
import Encontrados from "./components/encontrados/encontr.jsx";

import imgGoku from "./assets/img/Goku.jpg";
import imgPet from "./assets/img/Bills.jpg";
import imgPet2 from "./assets/img/Bulma.jpg";
import imgVegeta from "./assets/img/Vegeta.jpeg";

import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <div className="container-geral">
        <div className="container-encontrados">
          <Encontrados
            imgPet={imgPet}
            nome={"Bills"}
            local={"Avenida Lindóia, 204 - Jardim Recreio"}
            hora={"5 horas atrás"}
            intervalo={"Encontrado após 2 dias"}
          />
          <Encontrados
            imgPet={imgPet}
            nome={"Bills"}
            local={"Avenida Lindóia, 204 - Jardim Recreio"}
            hora={"5 horas atrás"}
            intervalo={"Encontrado após 2 dias"}
          />
        </div>
        <div className="posts-container">
          <Post
            avatar={imgGoku}
            nome={"Goku"}
            descricao={"Perdi o Bills"}
            imgPet={imgPet}
          />
          <Post
            avatar={imgVegeta}
            nome={"Vegeta"}
            descricao={"Perdi a Bulma"}
            imgPet={imgPet2}
          />
          <Filtro />
        </div>
      </div>
    </>
  );
}

export default App;
