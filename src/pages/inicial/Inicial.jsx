import "../../global.css";
import "./Inicial.css";

import NavBar from "../../components/navbar/navbar.jsx";

function Inicial() {
  return (
    <div className="container-geral">
      <NavBar />
      <div>
        <h1 className="inicial-titulo">Sobre o PetOS</h1>
        <p>
          O PetOS é um aplicativo dedicado a ajudar na busca e adoção de animais
          perdidos.
        </p>
      </div>
    </div>
  );
}

export default Inicial;
