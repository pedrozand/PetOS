import { Link } from "react-router-dom";
import { useState } from "react";
import Carrosel from "../../components/carrosel/carrosel.jsx";
import Perdidos from "../../components/cards/perdidos/perdid.jsx";

import "../../global.css";
import "./CSS/Inicial.css";
import "./CSS/video.css";
import "./CSS/perdid-inicial.css";
import "./CSS/divulgacao.css";
import "./CSS/beneficios.css";
import "./CSS/faqInicial.css";

import imgPet1 from "../../assets/img/post/corgi-1.jpg";

// Importação dos ícones do React Icons
import { RiSearch2Fill } from "react-icons/ri";
import { LiaBoneSolid } from "react-icons/lia";
import { FaPaw } from "react-icons/fa";
import { MdOutlineQuestionMark } from "react-icons/md";
import { TbHeartHandshake } from "react-icons/tb";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { HiBellAlert } from "react-icons/hi2";
import { GiDogHouse } from "react-icons/gi";
import { FaChevronDown } from "react-icons/fa";

import NavBar from "../../components/navbar/navbar.jsx";
import meuVideo from "../../assets/video/page-inicial-op.mp4";
import meuVideo2 from "../../assets/video/divulga-op.mp4";
import meuVideo3 from "../../assets/video/divulga-2-op.mp4";
import meuVideo4 from "../../assets/video/divulga-3-op.mp4";

function Inicial() {
  const dadosFAQ = [
    {
      pergunta: "Como faço um anúncio de pet perdido?",
      resposta:
        "No PetOS, basta acessar a aba 'Perdi meu Pet', preencher as informações essenciais e publicar gratuitamente. Adicione fotos e localização para aumentar as chances de reencontro!",
    },
    {
      pergunta: "O anúncio no PetOS é gratuito?",
      resposta:
        "Sim! Todos os usuários podem publicar gratuitamente seus anúncios de pets perdidos ou encontrados.",
    },
    {
      pergunta: "Quais ferramentas posso usar sem pagar?",
      resposta:
        "Você pode adicionar fotos, localização, descrição, receber alertas e visualizar casos na sua região sem nenhum custo.",
    },
    {
      pergunta: "Como funciona uma campanha patrocinada?",
      resposta:
        "A campanha patrocinada destaca o seu anúncio na página inicial e o impulsiona para mais pessoas próximas, aumentando a visibilidade.",
    },
    {
      pergunta: "Vocês garantem que o pet será encontrado?",
      resposta:
        "Infelizmente não podemos garantir, mas com a visibilidade local, alertas e colaboração da comunidade, suas chances aumentam significativamente!",
    },
    {
      pergunta: "Como funciona a área de achados e perdidos?",
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

            <button
              className="botao botao-achei"
              onClick={() => alert("Abrir página completa!")}
            >
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
          <button
            className="botao botao-extra"
            onClick={() => alert("Abrir página completa!")}
          >
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
          <h2 className="faq-titulo">Dúvidas sobre o PetOS?</h2>
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
        </div>
      </div>
    </>
  );
}

export default Inicial;
