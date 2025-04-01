import "../../global.css";
import "./Inicial.css";

import NavBar from "../../components/navbar/navbar.jsx";

function Inicial() {
  return (
    <div className="container-geral">
      <NavBar />
      <div>
        <h1 className="inicial-titulo">Procure por seu pet perdido</h1>
        <p className="inicial-sub-titulo">
          O PetOS conecta você ao seu melhor amigo! Encontre e ajude pets
          perdidos com o PetOS. Cadastre seu post gratuitamente e faça a
          diferença!
        </p>
      </div>
    </div>
  );
}

export default Inicial;
