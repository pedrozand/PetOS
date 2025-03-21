import "./CSS/post.css";
import { useState, useEffect } from "react";
import {
  FaThumbsUp,
  FaCommentAlt,
  FaShare,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { FaMars, FaVenus, FaDog, FaCat } from "react-icons/fa6";
import { RxEyeOpen, RxEyeClosed } from "react-icons/rx";
import { PiBirdFill } from "react-icons/pi";

export default function Post({
  avatar,
  nomeUser,
  nomeAnimal,
  especie,
  descricao,
  imgPet, // É um Array de imagens burro
  raca,
  idade,
  porte,
  corPredominante,
  corOlhos,
  sexo,
  localDesap,
  dataDesap,
}) {
  const [mostrarCaracteristicas, setMostrarCaracteristicas] = useState(false);
  const [tempoDecorrido, setTempoDecorrido] = useState("");
  const [imagemExpandida, setImagemExpandida] = useState(false);
  const [imagemAtual, setImagemAtual] = useState(0); // Controla qual imagem está sendo exibida

  // Funções para navegar entre as imagens no modal
  const proximaImagemModal = (e) => {
    e.stopPropagation(); // Impede que o clique feche o modal
    setImagemAtual((prev) => (prev + 1) % imgPet.length);
  };

  const imagemAnteriorModal = (e) => {
    e.stopPropagation(); // Impede que o clique feche o modal
    setImagemAtual((prev) => (prev - 1 + imgPet.length) % imgPet.length);
  };

  useEffect(() => {
    if (dataDesap) {
      const calcularTempoDecorrido = () => {
        // Verifica se dataDesap é uma string válida
        const dataDesaparecimento = new Date(dataDesap);
        if (isNaN(dataDesaparecimento.getTime())) {
          console.error("Data inválida:", dataDesap);
          setTempoDecorrido("Data inválida");
          return;
        }

        const dataAtual = new Date();
        const diferencaEmMilissegundos = dataAtual - dataDesaparecimento;
        const diasDecorridos = Math.floor(
          diferencaEmMilissegundos / (1000 * 60 * 60 * 24)
        );

        if (diasDecorridos === 0) {
          setTempoDecorrido("Hoje");
        } else if (diasDecorridos === 1) {
          setTempoDecorrido("1 dia atrás");
        } else {
          setTempoDecorrido(`${diasDecorridos} dias atrás`);
        }
      };

      calcularTempoDecorrido();
    }
  }, [dataDesap]);

  // Funções para navegar entre as imagens
  const proximaImagem = () => {
    setImagemAtual((prev) => (prev + 1) % imgPet.length);
  };

  const imagemAnterior = () => {
    setImagemAtual((prev) => (prev - 1 + imgPet.length) % imgPet.length);
  };

  return (
    <div className="container">
      <div className="post">
        <div className="post-header">
          <img src={avatar} alt="Perfil" />
          <div className="name">{nomeUser}</div>
          <div className="animal-post-icon">
            {sexo === "Macho" && <FaMars className="animal-icon-macho" />}
            {sexo === "Fêmea" && <FaVenus className="animal-icon-femea" />}
            {especie === "Gato" && <FaCat className="animal-icon-gato" />}
            {especie === "Cachorro" && (
              <FaDog className="animal-icon-cachorro" />
            )}
            {especie === "Pássaro" && (
              <PiBirdFill className="animal-icon-passaro" />
            )}
          </div>
        </div>
        <div className="post-content">
          <h2 className="nome-animal">{nomeAnimal}</h2>

          <div className="especie">
            <strong>Espécie</strong>
            <p>{especie}</p>
          </div>

          <div className="comentario">
            <strong>Comentário do Tutor</strong>
            <p>{descricao}</p>
          </div>
        </div>

        <button
          className="btn-caracteristicas"
          onClick={() => setMostrarCaracteristicas(!mostrarCaracteristicas)}
        >
          {mostrarCaracteristicas ? <RxEyeOpen /> : <RxEyeClosed />}{" "}
          {mostrarCaracteristicas
            ? "Ocultar características"
            : "Ver características"}
        </button>

        {mostrarCaracteristicas && (
          <div className="caracteristicas">
            <div className="caracteristicas caracteristicas-coluna">
              <p>
                <strong>Raça</strong> {raca}
              </p>
              <p>
                <strong>Idade</strong> {idade}
              </p>
              <p>
                <strong>Porte</strong> {porte}
              </p>
            </div>
            <div className="linha-divisoria"></div>
            <div className="caracteristicas caracteristicas-coluna">
              <p>
                <strong>Cor predominante</strong> {corPredominante}
              </p>
              <p>
                <strong>Cor dos olhos</strong> {corOlhos}
              </p>
              <p>
                <strong>Sexo</strong> {sexo}
              </p>
            </div>
          </div>
        )}

        {/* Carrossel de imagens */}
        <div className="post-image-container">
          <span className="tag-perdido">Perdido</span>
          <button className="nav-button left" onClick={imagemAnterior}>
            <FaChevronLeft />
          </button>

          <img
            className="post-image"
            src={imgPet[imagemAtual]}
            alt="Imagem do animal"
            onClick={() => setImagemExpandida(true)} // Abre o modal ao clicar
          />

          <button className="nav-button right" onClick={proximaImagem}>
            <FaChevronRight />
          </button>
        </div>

        <div className="info-desaparecimento">
          <div className="info-item">
            <strong>Local do Desaparecimento</strong>
            <p>{localDesap}</p>
          </div>
          <div className="info-item">
            <strong>Data do Desaparecimento</strong>
            <p>
              {dataDesap
                ? `${dataDesap} - ${tempoDecorrido}`
                : "Data não informada"}
            </p>
          </div>
        </div>
        <div className="post-actions">
          <button className="btn-action">
            <FaThumbsUp className="icon" /> Curtir
          </button>
          <button className="btn-action">
            <FaCommentAlt className="icon" /> Comentar
          </button>
          <button className="btn-action">
            <FaShare className="icon" /> Compartilhar
          </button>
        </div>
      </div>

      {/* Modal de imagem expandida */}
      {imagemExpandida && (
        <div className="modal" onClick={() => setImagemExpandida(false)}>
          <div className="modal-content">
            <button
              className="nav-button-modal left"
              onClick={imagemAnteriorModal}
            >
              <FaChevronLeft />
            </button>
            <img
              src={imgPet[imagemAtual]}
              alt="Imagem expandida"
              className="modal-image"
            />
            <button
              className="nav-button-modal right"
              onClick={proximaImagemModal}
            >
              <FaChevronRight />
            </button>
          </div>
          <button
            className="close-modal"
            onClick={() => setImagemExpandida(false)}
          >
            ✖
          </button>
        </div>
      )}
    </div>
  );
}
