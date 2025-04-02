import "../../global.css";
import "./CSS/Inicial.css";
import "./CSS/video.css";

import NavBar from "../../components/navbar/navbar.jsx";
import meuVideo from "../../assets/video/page-inicial.mp4";

function Inicial() {
  return (
    <div className="container-geral">
      <NavBar />
      <div className="conteudo">
        <h1 className="inicial-titulo">Procure por seu pet perdido</h1>
        <p className="inicial-sub-titulo">
          O PetOS conecta você ao seu melhor amigo! Encontre e ajude pets
          perdidos com o PetOS. Cadastre seu post gratuitamente e faça a
          diferença!
        </p>

        {/* Botões */}
        <div className="botoes-container">
          <button className="botao botao-perdi">
            <img src="/icons/perdi-icon.png" alt="Ícone de pet perdido" />
            <div>
              <strong className="strong-achei">Perdi meu Pet</strong>
              <span>Quero buscar meu pet</span>
            </div>
          </button>

          <button className="botao botao-achei">
            <img src="/icons/achei-icon.png" alt="Ícone de pet encontrado" />
            <div>
              <strong className="strong-perdi">Achei um Pet</strong>
              <span>Quero buscar o tutor</span>
            </div>
          </button>
        </div>
      </div>

      {/* Vídeo posicionado ao lado */}
      <div className="video-container">
        <video autoPlay loop muted playsInline className="video-fundo">
          <source src={meuVideo} type="video/mp4" />
          Seu navegador não suporta vídeos.
        </video>
      </div>
    </div>
  );
}

export default Inicial;
