import "../../global.css";
import NavBar from "../../components/navbar/navbar.jsx";

function Inicial() {
  return (
    <div className="container-geral">
      <NavBar />
      <h1>Sobre o PetOS</h1>
      <p>
        O PetOS é um aplicativo dedicado a ajudar na busca e adoção de animais
        perdidos.
      </p>
    </div>
  );
}

export default Inicial;
