import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Carrosel from "../../components/carrosel/carrosel.jsx";
import Perdidos from "../../components/cards/perdidos/perdid.jsx";
import NavBar from "../../components/navbar/navbar.jsx";
import Footer from "../../components/footer/footer.jsx"; //

import "../../style/global.css";
import "./CSS/Inicial.css";
import "./CSS/video.css";
import "./CSS/perdid-inicial.css";
import "./CSS/divulgacao.css";
import "./CSS/beneficios.css";
import "./CSS/faqInicial.css";

import imgPet1 from "../../assets/img/post/corgi-1.jpg";
import faqImage from "../../assets/img/divulgacao/faqInicial.png";

// Importação dos ícones do React Icons
import { RiSearch2Fill } from "react-icons/ri";
import { LiaBoneSolid } from "react-icons/lia";
import { MdOutlineQuestionMark } from "react-icons/md";
import { TbHeartHandshake } from "react-icons/tb";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { HiBellAlert } from "react-icons/hi2";
import { GiDogHouse } from "react-icons/gi";
import {
  FaSearchLocation,
  FaBullhorn,
  FaHandshake,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaPaw,
  FaChevronDown,
} from "react-icons/fa";

import meuVideo from "../../assets/video/page-inicial-op.mp4";
import meuVideo2 from "../../assets/video/divulga-op.mp4";
import meuVideo3 from "../../assets/video/divulga-2-op.mp4";
import meuVideo4 from "../../assets/video/divulga-3-op.mp4";

function Inicial() {
  const [postsPerdidos, setPostsPerdidos] = useState([]);

  useEffect(() => {
    const fetchPostsPerdidos = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/posts");
        const data = await response.json();

        const perdidosFiltrados = data
          .filter((post) => post.situacao === "Perdido" && post.ativo)
          .sort((a, b) => new Date(b.dataHoraPost) - new Date(a.dataHoraPost));

        setPostsPerdidos(perdidosFiltrados);
      } catch (err) {
        console.error("Erro ao buscar posts perdidos:", err);
      }
    };

    fetchPostsPerdidos();
  }, []);

  const calcularTempoRelativo = (data) => {
    const agora = new Date();
    const dataPost = new Date(data);
    const diffMs = agora - dataPost;
    const minutos = Math.floor(diffMs / (1000 * 60));
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);

    if (dias > 0) return `${dias} dia${dias > 1 ? "s" : ""} atrás`;
    if (horas > 0) return `${horas} hora${horas > 1 ? "s" : ""} atrás`;
    if (minutos > 0) return `${minutos} minuto${minutos > 1 ? "s" : ""} atrás`;
    return "Agora mesmo";
  };

  const dadosFAQ = [
    {
      pergunta: (
        <>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FaSearchLocation style={{ marginRight: "15px" }} />
            Como faço um post de pet perdido?
          </div>
        </>
      ),
      resposta:
        "No PetOS, basta acessar a aba 'Achados e Perdidos', preencher as informações essenciais e publicar gratuitamente. Adicione fotos e localização para aumentar as chances de reencontro!",
    },
    {
      pergunta: (
        <>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FaBullhorn style={{ marginRight: "15px" }} />O anúncio no PetOS é
            gratuito?
          </div>
        </>
      ),
      resposta:
        "Sim! Todos os usuários podem publicar gratuitamente seus anúncios de pets perdidos ou encontrados.",
    },
    {
      pergunta: (
        <>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FaHandshake style={{ marginRight: "15px" }} />O PetOS se conecta
            com ONGs e abrigos?
          </div>
        </>
      ),
      resposta:
        "Sim! O PetOS permite parcerias com ONGs e abrigos, facilitando o cadastro de animais disponíveis para adoção e ajudando a aumentar as chances de encontrar um novo lar.",
    },
    {
      pergunta: (
        <>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FaMapMarkerAlt style={{ marginRight: "15px" }} />
            Como posso acompanhar os casos próximos da minha região?
          </div>
        </>
      ),
      resposta:
        "Você pode ativar alertas de localização para receber notificações sobre pets perdidos ou encontrados perto de você em tempo real.",
    },
    {
      pergunta: (
        <>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FaCheckCircle style={{ marginRight: "15px" }} />É possível
            registrar quando um pet foi encontrado?
          </div>
        </>
      ),
      resposta:
        "Sim! Ao reencontrar seu pet, você pode atualizar o status do anúncio para 'Encontrado', ajudando a manter a plataforma atualizada e a comunidade informada.",
    },
    {
      pergunta: (
        <>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FaPaw style={{ marginRight: "15px" }} />
            Como funciona a área de achados e perdidos?
          </div>
        </>
      ),
      resposta:
        "Você pode visualizar pets perdidos ou encontrados na sua região e ajudar compartilhando ou tentando contato direto com o anunciante.",
    },
  ];

  const [faqAtivo, setFaqAtivo] = useState(null);

  const toggleFAQ = (index) => {
    setFaqAtivo(faqAtivo === index ? null : index);
  };

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

            <Link to="/anunciarPet" className="botao botao-achei">
              <div className="icon-container">
                <RiSearch2Fill className="icon-search-achei" />
                <LiaBoneSolid className="icon-bone-achei" />
              </div>
              <div>
                <strong className="strong-perdi">Achei um Pet</strong>
                <span>Quero buscar o tutor</span>
              </div>
            </Link>
          </div>
          <Link to="/comoFunc" style={{ textDecoration: "none" }}>
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
          </Link>
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
              <h2>
                Achados e Perdidos{" "}
                <span className="contador-perdidos">
                  Total de <b>{postsPerdidos.length}</b> Anúncios de Pets
                  perdidos!
                </span>
              </h2>
              <p>Pets anunciados em Bragança Paulista - SP.</p>
            </div>
            <Link to="/main">
              <a href="/regiao" className="ver-mais">
                Ver mais em Achados e Perdidos
              </a>
            </Link>
          </div>

          <div className="cartoes-perdid-container">
            {postsPerdidos.slice(0, 4).map((p) => (
              <Perdidos
                key={p.idPost}
                imgPet={
                  Array.isArray(p.animal?.imagensAnimal) &&
                  p.animal.imagensAnimal.length > 0
                    ? `http://localhost:3001/uploads/${p.animal.imagensAnimal[0]}`
                    : "https://via.placeholder.com/150"
                }
                nome={p.nomeAnimal}
                local={p.localDesap || p.endereco || "Local não informado"}
                hora={calcularTempoRelativo(p.dataHoraPost)}
              />
            ))}
          </div>
        </div>

        <div className="templates-container">
          <div className="templates-texto">
            <h2>
              Crie posts personalizados e acelere o reencontro com seu melhor
              amigo!
            </h2>
            <p>
              Com o PetOS, você pode criar anúncios detalhados com fotos,
              localização e informações essenciais para engajar pessoas
              próximas. Quanto mais visível o post, maiores as chances de trazer
              seu pet de volta para casa rapidamente!
            </p>
            <Link to="/main">
              <button className="templates-botao">Saiba Mais</button>
            </Link>
          </div>

          <div className="templates-imagem">
            <video
              src={meuVideo3} // ou outro vídeo que quiser
              autoPlay
              loop
              muted
              playsInline
              className="templates-video"
            />
          </div>
        </div>

        <div className="templates-segundo-container">
          <div className="templates-segundo-texto">
            <h2>
              Colabore com toda uma comunidade e faça com que a divulgação
              chegue a todas as pessoas!
            </h2>
            <p>
              Com o PetOS, seus posts ganham destaque e impactam diretamente
              pessoas próximas. Mobilize a comunidade em tempo real e ajude os
              tutores encontrarem seus pets.
            </p>
            <Link to="/main">
              <button className="templates-segundo-botao">Saiba Mais</button>
            </Link>
          </div>
          <div>
            <video
              src={meuVideo2} // ou outro vídeo que quiser
              autoPlay
              loop
              muted
              playsInline
              className="templates-video"
            />
          </div>
        </div>

        <div className="templates-terceiro-container">
          <div className="templates-terceiro-texto">
            <h2>
              Adote um amigo, mude o mundo dele e o seu. Muito mais que um pet,
              um companheiro para a vida!
            </h2>
            <p></p>
            <p>
              Na aba de Adoção, você pode conhecer diversos animais que estão
              esperando por um lar cheio de amor. Dê uma nova chance a quem só
              quer carinho e cuidado. Adotar é um gesto de amor — transforme
              duas vidas com um só ato. 🧡
            </p>
            <button
              className="templates-botao"
              onClick={() => alert("Abrir página completa!")}
            >
              Ir para Adoção
            </button>
          </div>

          <div className="templates-terceiro-imagem">
            <video
              src={meuVideo4} // ou outro vídeo que quiser
              autoPlay
              loop
              muted
              playsInline
              className="templates-video"
            />
          </div>
        </div>

        <div className="petos-beneficios-container">
          <div className="beneficio-card">
            <h3>Rede Colaborativa</h3>
            <div className="beneficio-icon">
              <TbHeartHandshake />
            </div>
            <p>
              Uma comunidade unida por um objetivo: reunir pets e tutores.
              Quanto mais pessoas envolvidas, maiores as chances de reencontro!
            </p>
          </div>

          <div className="beneficio-card">
            <h3>Localização Inteligente</h3>
            <div className="beneficio-icon">
              <FaLocationCrosshairs />
            </div>
            <p>
              Publicações com base na localização facilitam a busca, mostrando
              apenas casos próximos de você.
            </p>
          </div>

          <div className="beneficio-card">
            <h3>Divulgação Instantânea</h3>
            <div className="beneficio-icon">
              <HiBellAlert />
            </div>
            <p>
              Seu anúncio é divulgado rapidamente para usuários da região,
              aumentando as chances de reencontro em tempo recorde.
            </p>
          </div>

          <div className="beneficio-card">
            <h3>Adote com Facilidade</h3>
            <div className="beneficio-icon">
              <GiDogHouse />
            </div>
            <p>
              Além de reencontros, o PetOS conecta animais a novos lares com
              segurança e empatia.
            </p>
          </div>
        </div>

        <div className="faq-container">
          {dadosFAQ.map((item, index) => (
            <div
              key={index}
              className={`faq-item ${faqAtivo === index ? "ativo" : ""}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-pergunta">
                <span>{item.pergunta}</span>
                <FaChevronDown
                  className={`icone-seta ${faqAtivo === index ? "girar" : ""}`}
                />
              </div>
              {faqAtivo === index && (
                <div className="faq-resposta">{item.resposta}</div>
              )}
            </div>
          ))}
          <div className="faq-imagem">
            <img src={faqImage} />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Inicial;
