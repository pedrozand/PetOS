import { Link } from "react-router-dom";
import Carrosel from "../../components/carrosel/carrosel.jsx";
import Perdidos from "../../components/cards/perdidos/perdid.jsx";

import "../../global.css";
import "./CSS/Inicial.css";
import "./CSS/video.css";
import "./CSS/perdid-inicial.css";
import "./CSS/divulgacao.css";

import imgPet1 from "../../assets/img/post/corgi-1.jpg";
import divulga1 from "../../assets/img/divulgacao/divulga-1.png";

// Importação dos ícones do React Icons
import { RiSearch2Fill } from "react-icons/ri";
import { LiaBoneSolid } from "react-icons/lia";
import { FaPaw } from "react-icons/fa";
import { MdOutlineQuestionMark } from "react-icons/md";

import NavBar from "../../components/navbar/navbar.jsx";
import meuVideo from "../../assets/video/page-inicial-op.mp4";
import meuVideo2 from "../../assets/video/divulga-op.mp4";

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
          <Carrosel />
        </div>

        <div className="perdid-container">
          <div className="perdid-header">
            <div>
              <h2>Achados e Perdidos</h2>
              <p>Pets anunciados em Bragança Paulista - SP.</p>
            </div>
            <Link to="/main">
              <a href="/regiao" className="ver-mais">
                Ver mais em Achados e Perdidos
              </a>
            </Link>
          </div>

          <div className="cartoes-perdid-container">
            <Perdidos
              imgPet={imgPet1}
              nome={"Antônia Tomtom"}
              local={"Penha, São Paulo"}
              hora={"9 horas atrás"}
            />
            <Perdidos
              imgPet={imgPet1}
              nome={"Dante"}
              local={"City Bussocaba, Osasco"}
              hora={"1 dia atrás"}
            />
            <Perdidos
              imgPet={imgPet1}
              nome={"Fiona"}
              local={"Praça Londres/ Pão de Açúcar"}
              hora={"2 dias atrás"}
            />
            <Perdidos
              imgPet={imgPet1}
              nome={"Sí"}
              local={"Visto perto da Praça XYZ"}
              hora={"3 dias atrás"}
            />
          </div>
        </div>

        <div className="templates-container">
          <div className="templates-conteudo">
            <div className="templates-texto">
              <h2>
                Crie posts personalizados e acelere o reencontro com seu melhor
                amigo!
              </h2>
              <p>
                Ative uma campanha de divulgação de alto impacto em redes
                sociais. Seu anúncio aparece para pessoas ao redor da região do
                sumiço, aumentando significativamente as chances de reencontro.
              </p>
              <button className="templates-botao">Saiba Mais</button>
            </div>

            <div className="templates-imagem">
              <img src={divulga1} alt="Pet perdido" />
            </div>
          </div>
        </div>

        <div className="templates-segundo-container">
          <div className="templates-conteudo">
            <div className="templates-imagem">
              <video
                src={meuVideo2} // ou outro vídeo que quiser
                autoPlay
                loop
                muted
                playsInline
                className="templates-video"
              />
            </div>

            <div className="templates-texto">
              <h2>Aumente o alcance e agilize o reencontro!</h2>
              <p>
                Com a PetOS, seus vídeos ganham destaque e impactam diretamente
                pessoas próximas. Mobilize vizinhos em tempo real para trazer
                seu pet de volta para casa com mais rapidez.
              </p>
              <button className="templates-botao">Entenda como funciona</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Inicial;
