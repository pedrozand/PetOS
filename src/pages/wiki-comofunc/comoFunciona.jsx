import { Link } from "react-router-dom";
import { useState } from "react";
import NavBar from "../../components/navbar/navbar.jsx";
import Footer from "../../components/footer/footer.jsx";

import "./CSS/comoFunciona.css";

import faqImage from "../../assets/img/divulgacao/faqInicial.png";

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

import meuVideo2 from "../../assets/video/divulga-op.mp4";
import meuVideo3 from "../../assets/video/divulga-2-op.mp4";
import meuVideo4 from "../../assets/video/divulga-3-op.mp4";

function Inicial() {
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
              src={meuVideo3}
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
              src={meuVideo2}
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
              src={meuVideo4}
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
