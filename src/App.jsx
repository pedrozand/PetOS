
import NavBar from "./components/navbar/navbar.jsx"

import Post from "./components/post/post.jsx"

import imgGoku from "./assets/img/Goku.jpg"

import imgPet from "./assets/img/Bills.png"

import logoimg from "./assets/img/adocao_icon.png"

import "./App.css"
import Filtro from "./components/filtro/filtro.jsx"

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
            avatar={logoimg}
            nome={"Vegeta"}
            descricao={"Perdi a Bulma"}
            imgPet={imgPet}
          />

          <Filtro />
        </div>

      </div>
    </>
  )
}

export default App
