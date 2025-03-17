import NavBar from "./components/navbar/navbar.jsx";

import Post from "./components/post/post.jsx";

import imgGoku from "./assets/img/Goku.jpg";

import imgPet from "./assets/img/Bills.jpg";

import imgPet2 from "./assets/img/Bulma.jpg";

import imgVegeta from "./assets/img/Vegeta.jpeg";

import "./App.css";
import Filtro from "./components/filtro/filtro.jsx";

function App() {
  return (
    <>
      <div>
        <NavBar />

        <div className="container-geral">
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
