import "./CSS/post.css";
import "./CSS/caracterisiticas.css";
import "./CSS/botoes-intera.css";
import "./CSS/alert-tel.css";
import "./CSS/img-modal.css";
import "./CSS/animal-info.css";
import { useState, useEffect } from "react";
import {
  FaWhatsapp,
  FaRegCopy,
  FaThumbsUp,
  FaCommentAlt,
  FaShare,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { AiFillDollarCircle } from "react-icons/ai";
import { FaMars, FaVenus, FaDog, FaCat } from "react-icons/fa6";
import { RxEyeOpen, RxEyeClosed } from "react-icons/rx";
import { PiBirdFill } from "react-icons/pi";
import { createPortal } from "react-dom";

export default function Post({
  // Usuário
  avatar,
  nome,
  sobrenome,
  email,
  // Post
  situacao,
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
  referencia,
  dataDesap,
  periodo,
  recompensa, // PERDIDO
  telefone,
  descricaoLocal, // TUTOR
  localPet, // TUTOR
  cuidados, // ADOÇÃO
  temperamento, // ADOÇÃO
  adaptabilidade, // ADOÇÃO
  socializacao, // ADOÇÃO
}) {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarCaracteristicas, setMostrarCaracteristicas] = useState(false);
  const [tempoDecorrido, setTempoDecorrido] = useState("");
  const [imagemExpandida, setImagemExpandida] = useState(false);
  const [imagemAtual, setImagemAtual] = useState(0); // Controla qual imagem está sendo exibida

  function formatarData(dataISO) {
    const data = new Date(dataISO);
    if (isNaN(data.getTime())) return "Data inválida";

    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  function getTagClass(situacao) {
    switch (situacao) {
      case "Perdido":
        return "tag-perdido";
      case "Procurando Tutor":
        return "tag-procurando";
      case "Adocao":
        return "tag-adocao";
      default:
        return "tag-default";
    }
  }

  function getSituacaoLabel(situacao) {
    switch (situacao) {
      case "Perdido":
        return "Perdido";
      case "Procurando Tutor":
        return "Procurando Tutor";
      case "Adocao":
        return "Para Adoção";
      default:
        return "Situação Desconhecida";
    }
  }

  useEffect(() => {
    if (dataDesap) {
      const calcularTempoDecorrido = () => {
        let dataFormatada = dataDesap;

        // Se a data estiver no formato DD/MM/AAAA
        if (/\d{2}\/\d{2}\/\d{4}/.test(dataDesap)) {
          const [dia, mes, ano] = dataDesap.split("/");
          dataFormatada = `${ano}-${mes}-${dia}`; // AAAA-MM-DD
        }

        const dataDesaparecimento = new Date(dataFormatada);

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
    if (imgPet?.length > 0) {
      setImagemAtual((prev) => (prev + 1) % imgPet.length);
    }
  };

  const imagemAnterior = () => {
    if (imgPet?.length > 0) {
      setImagemAtual((prev) => (prev - 1 + imgPet.length) % imgPet.length);
    }
  };

  return (
    <div className="container">
      <div class="post-title-header"></div>
      <div className="post">
        <div className="post-header">
          <img src={avatar} alt="Perfil" />
          <div className="name">
            {nome} {sobrenome}
          </div>
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
          {nomeAnimal && (
            <div className="especie">
              <strong>Nome do Pet</strong>
              <h2 className="nome-animal">{nomeAnimal}</h2>
            </div>
          )}

          <div className="especie">
            <strong>Espécie</strong>
            <p>{especie}</p>
          </div>

          <div className="comentario">
            <strong>Descrição do Pet</strong>
            <p>{descricao}</p>
          </div>

          {!mostrarCaracteristicas &&
            (situacao === "Perdido" && recompensa && recompensa !== "0" ? (
              <div className="recompensa-pet">
                <div className="icone-recompensa">
                  <AiFillDollarCircle />
                </div>
                <div>Recompensa: {recompensa}</div>
                <div className="icone-recompensa">
                  <AiFillDollarCircle />
                </div>
              </div>
            ) : situacao === "Procurando Tutor" &&
              (localPet || descricaoLocal) ? ( // <-- Condição extra aqui
              <div className="local-encontrado-container">
                <strong>Local onde o pet está agora:</strong>
                {localPet && (
                  <p className="local-encontrado-texto">{localPet}</p>
                )}
                {descricaoLocal && (
                  <p className="descricao-local">{descricaoLocal}</p>
                )}
              </div>
            ) : null)}
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
          <>
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
              <div className="caracteristicas caracteristicas-coluna">
                <p>
                  <strong>Cor predominante</strong> {corPredominante}
                </p>

                <p>
                  <strong>Cor dos olhos</strong> {corOlhos}
                </p>

                <p>
                  <strong>Gênero</strong> {sexo}
                </p>
              </div>
            </div>

            {situacao === "Adocao" && (
              <div className="caracteristicas-exibicao-post">
                {cuidados?.length > 0 && (
                  <div className="grupo-caracteristica-post">
                    <h4>CUIDADOS VETERINÁRIOS</h4>
                    <div className="botoes-caracteristica-post">
                      {cuidados.map((item) => (
                        <span
                          key={item}
                          className="botao-caracteristica-post ativo"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {temperamento?.length > 0 && (
                  <div className="grupo-caracteristica-post">
                    <h4>TEMPERAMENTO</h4>
                    <div className="botoes-caracteristica-post">
                      {temperamento.map((item) => (
                        <span
                          key={item}
                          className="botao-caracteristica-post ativo"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {adaptabilidade?.length > 0 && (
                  <div className="grupo-caracteristica-post">
                    <h4>ADAPTABILIDADE</h4>
                    <div className="botoes-caracteristica-post">
                      {adaptabilidade.map((item) => (
                        <span
                          key={item}
                          className="botao-caracteristica-post ativo"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {socializacao?.length > 0 && (
                  <div className="grupo-caracteristica-post">
                    <h4>SOCIALIZAÇÃO</h4>
                    <div className="botoes-caracteristica-post">
                      {socializacao.map((item) => (
                        <span
                          key={item}
                          className="botao-caracteristica-post ativo"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        <div className="post-image-container">
          <span className={getTagClass(situacao)}>
            {getSituacaoLabel(situacao)}
          </span>
          <button className="nav-button left" onClick={imagemAnterior}>
            <FaChevronLeft />
          </button>

          {imgPet?.length > 0 && (
            <img
              className="post-image"
              src={imgPet[imagemAtual]}
              alt="Imagem do animal"
              onClick={() => setImagemExpandida(true)} // Abre o modal ao clicar
            />
          )}

          <button className="nav-button right" onClick={proximaImagem}>
            <FaChevronRight />
          </button>
        </div>

        <div className="info-desaparecimento">
          <div className="info-item">
            {localDesap && (
              <>
                <strong>
                  {situacao === "Procurando Tutor"
                    ? "Local onde o pet foi Encontrado"
                    : situacao === "Adocao"
                    ? "Local onde o pet Está"
                    : "Local do Desaparecimento"}
                </strong>
                <p>{localDesap}</p>
              </>
            )}
            {referencia && (
              <>
                <strong className="ref-ajuste-post">Ponto de Referência</strong>
                <p>{referencia}</p>
              </>
            )}
          </div>
          <div className="info-item">
            {dataDesap && (
              <>
                <strong>
                  {situacao === "Procurando Tutor"
                    ? "Data que o pet foi encontrado"
                    : situacao === "Adocao"
                    ? "Disponivel para adoção desde"
                    : "Data do Desaparecimento"}
                </strong>
                <p>{`${formatarData(dataDesap)} - ${tempoDecorrido}`}</p>
              </>
            )}

            {situacao !== "Adocao" && periodo && (
              <div className="periodo-ajuste-post">
                <strong>Período -</strong>
                <p>{periodo}</p>
              </div>
            )}
            <div className="nome-sobrenome-ajuste-post">
              <strong>Nome do Tutor -</strong>
              <p>
                {nome} {sobrenome}
              </p>
            </div>
            <button
              className="btn-mostrar-contato-tel"
              onClick={() => setMostrarModal(true)}
            >
              Mostrar Contato
            </button>
            {mostrarModal &&
              createPortal(
                <div className="modal-overlay-tel">
                  <div className="modal-content-tel">
                    <div className="modal-header-tel">
                      <h2>Informações de Contato</h2>
                      <button
                        className="btn-closed-tel"
                        onClick={() => setMostrarModal(false)}
                      >
                        ✖
                      </button>
                    </div>

                    <div className="modal-body-tel">
                      <h3>Telefone do Tutor</h3>
                      <p>{telefone}</p>

                      <div className="modal-buttons-tel">
                        <a
                          className="btn-verde-tel"
                          href={`https://wa.me/${telefone.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaWhatsapp size={18} /> Enviar mensagem
                        </a>
                        <button
                          className="btn-azul-tel"
                          onClick={() =>
                            navigator.clipboard.writeText(telefone)
                          }
                        >
                          <FaRegCopy size={15} /> Copiar número
                        </button>
                      </div>

                      <h3>Email do Tutor</h3>
                      <p>{email}</p>

                      <div className="alerta-tel">
                        <strong>ATENÇÃO</strong>
                        <p>
                          Entre em contato com este número <b>apenas</b> se você
                          tiver informações relevantes sobre o paradeiro do pet.
                        </p>
                        <p>
                          Qualquer outro tipo de contato é expressamente
                          proibido e sujeito a medidas legais.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>,
                document.getElementById("modal-root")
              )}
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
      {imagemExpandida &&
        createPortal(
          <div
            className="modal-overlay"
            onClick={() => setImagemExpandida(false)}
          >
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()} // evita fechar modal ao clicar dentro
            >
              <button
                className="nav-button-modal left"
                onClick={(e) => {
                  e.stopPropagation();
                  setImagemAtual(
                    (prev) => (prev - 1 + imgPet.length) % imgPet.length
                  );
                }}
              >
                <FaChevronLeft />
              </button>

              <img
                className="modal-image"
                src={imgPet[imagemAtual]}
                alt="Imagem do animal ampliada"
              />

              <button
                className="nav-button-modal right"
                onClick={(e) => {
                  e.stopPropagation();
                  setImagemAtual((prev) => (prev + 1) % imgPet.length);
                }}
              >
                <FaChevronRight />
              </button>

              <button
                className="btn-close-modal"
                onClick={() => setImagemExpandida(false)}
              >
                ✖
              </button>
            </div>
          </div>,
          document.getElementById("modal-root")
        )}
    </div>
  );
}
