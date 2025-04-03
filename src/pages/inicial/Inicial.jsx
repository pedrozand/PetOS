import { Link } from "react-router-dom";
import CarrosselHistorias from "../../components/carrosel/CarrosselHistorias.jsx";

import "../../global.css";
import "./CSS/Inicial.css";
import "./CSS/video.css";

// Importação dos ícones do React Icons
import { RiSearch2Fill } from "react-icons/ri";
import { LiaBoneSolid } from "react-icons/lia";
import { FaPaw } from "react-icons/fa";
import { MdOutlineQuestionMark } from "react-icons/md";

import NavBar from "../../components/navbar/navbar.jsx";
import meuVideo from "../../assets/video/page-inicial-og.mp4";

function Inicial() {
  return (
    <>
      <div className="container-inicial">
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
            <Link to="/main" className="botao botao-perdi">
              <div className="icon-container">
                <RiSearch2Fill className="icon-search-perdi" />
                <LiaBoneSolid className="icon-bone-perdi" />
              </div>
              <div>
                <strong className="strong-achei">Perdi meu Pet</strong>
                <span>Quero buscar meu pet</span>
              </div>
            </Link>

            <button className="botao botao-achei">
              <div className="icon-container">
                <RiSearch2Fill className="icon-search-achei" />
                <LiaBoneSolid className="icon-bone-achei" />
              </div>
              <div>
                <strong className="strong-perdi">Achei um Pet</strong>
                <span>Quero buscar o tutor</span>
              </div>
            </button>
          </div>
          {/* Novo botão abaixo */}
          <button className="botao botao-extra">
            <div className="icon-container">
              <FaPaw className="icone-paw" />
              <MdOutlineQuestionMark className="icone-question" />
            </div>
            <div>
              <strong className="strong-extra">Como o PetOS funciona?</strong>
              <span>Sistema de busca e exibição</span>
            </div>
          </button>
        </div>

        {/* Vídeo posicionado ao lado */}
        <div className="video-container">
          <video autoPlay loop muted playsInline className="video-fundo">
            <source src={meuVideo} type="video/mp4" />
            Seu navegador não suporta vídeos.
          </video>
        </div>

        <div className="linha-divisoria"></div>

        <div className="linha-divisoria">
          <CarrosselHistorias />
        </div>
      </div>
    </>
  );
}

export default Inicial;
