import "./post.css";
import { useState, useEffect } from "react";
import { FaThumbsUp, FaCommentAlt, FaShare } from "react-icons/fa";
import { FaMars, FaVenus, FaDog, FaCat } from "react-icons/fa6";
import { RxEyeOpen, RxEyeClosed } from "react-icons/rx";
import { PiBirdFill } from "react-icons/pi";

export default function Post({
  avatar,
  nomeUser,
  nomeAnimal,
  especie,
  descricao,
  imgPet,
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
  const [imagemExpandida, setImagemExpandida] = useState(false); // Estado do modal

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
        <div className="post-image-container">
          <span className="tag-perdido">Perdido</span>
          <img
            className="post-image"
            src={imgPet}
            alt="Imagem do post"
            onClick={() => setImagemExpandida(true)} // Abre o modal ao clicar
          />
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

      {/* Modal da Imagem Expandida */}
      {imagemExpandida && (
        <div className="modal" onClick={() => setImagemExpandida(false)}>
          <button
            className="close-modal"
            onClick={() => setImagemExpandida(false)}
          >
            ✖
          </button>
          <img src={imgPet} alt="Imagem expandida" />
        </div>
      )}
    </div>
  );
}
