import "./CSS/post.css";
import "./CSS/caracterisiticas.css";
import "./CSS/botoes-intera.css";
import "./CSS/alert-tel.css";
import "./CSS/img-modal.css";
import "./CSS/animal-info.css";
import "./CSS/comentarios.css";
import "./CSS/compartilhar.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  FaWhatsapp,
  FaRegCopy,
  FaThumbsUp,
  FaCommentAlt,
  FaShare,
  FaChevronLeft,
  FaChevronRight,
  FaInstagram,
  FaFacebook,
  FaTelegram,
} from "react-icons/fa";
import { AiFillDollarCircle } from "react-icons/ai";
import { FaMars, FaVenus, FaDog, FaCat } from "react-icons/fa6";
import { RxEyeOpen, RxEyeClosed } from "react-icons/rx";
import { PiBirdFill } from "react-icons/pi";
import { createPortal } from "react-dom";
import { RiExpandDiagonal2Line } from "react-icons/ri";

import ImagemDefault from "../../assets/img/perfil/img-default.png";

export default function Post({
  // Usuário
  usuario,
  fotoPerfil,
  nome,
  sobrenome,
  email,
  // Post
  idPost,
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
  dataHoraPost,
  curtidas = [],
  comentarios = [],
  compartilhamentos = [],
}) {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarCaracteristicas, setMostrarCaracteristicas] = useState(false);
  const [tempoDecorrido, setTempoDecorrido] = useState("");
  const [imagemExpandida, setImagemExpandida] = useState(false);
  const [imagemAtual, setImagemAtual] = useState(0);
  const [tempoPostagem, setTempoPostagem] = useState("");
  const navigate = useNavigate();
  const [curtido, setCurtido] = useState(false);
  const [comentariosState, setComentarios] = useState(comentarios || []);
  const [mostrarComentario, setMostrarComentario] = useState(false);
  const [mostrarModalCompartilhar, setMostrarModalCompartilhar] =
    useState(false);
  const linkPost = `${window.location.origin}/post/${idPost}`;
  const [mostrarTodosComentarios, setMostrarTodosComentarios] = useState(false);
  const [textoComentario, setTextoComentario] = useState("");
  const [numCompartilhamentos, setNumCompartilhamentos] = useState(
    compartilhamentos.length
  );
  const [numCurtidas, setNumCurtidas] = useState(0);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [textoComentario]);

  useEffect(() => {
    setNumCurtidas(curtidas?.length || 0);
  }, [curtidas]);

  useEffect(() => {
    if (usuario) {
      const jaCurtiu = curtidas.some((c) => c.idUser === usuario.idUser);
      setCurtido(jaCurtiu);
    }
  }, [curtidas, usuario]);

  const toggleCurtida = async () => {
    if (!usuario)
      return Swal.fire({
        title: "Atenção!",
        text: "Você precisa estar logado para realizar essa ação!",
        icon: "warning",
        confirmButtonText: "Ir para Login",
        iconColor: "#ff3131",
        confirmButtonColor: "#ff3131",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });

    try {
      if (curtido) {
        // Descurtir (DELETE)
        await fetch(`http://localhost:3001/api/curtidas/${idPost}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idUser: usuario.idUser }),
        });
        setNumCurtidas(numCurtidas - 1);
      } else {
        // Curtir (POST)
        await fetch(`http://localhost:3001/api/curtidas`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idPost, idUser: usuario.idUser }),
        });
        setNumCurtidas(numCurtidas + 1);
      }
      setCurtido(!curtido);
      onAtualizarPost();
    } catch (error) {
      console.error("Erro ao curtir/descurtir", error);
    }
  };

  const enviarComentario = async () => {
    if (!usuario)
      return Swal.fire({
        title: "Atenção!",
        text: "Você precisa estar logado para realizar essa ação!",
        icon: "warning",
        confirmButtonText: "Ir para Login",
        iconColor: "#ff3131",
        confirmButtonColor: "#ff3131",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    if (!textoComentario.trim()) return;

    try {
      const response = await fetch(`http://localhost:3001/api/comentarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idPost,
          idAutor: usuario.idUser,
          texto: textoComentario.trim(),
          dataComentario: new Date(),
          horaComentario: new Date().toLocaleTimeString(),
        }),
      });
      const novoComentario = await response.json();
      setComentarios([...comentarios, novoComentario]);
      setTextoComentario("");
      setMostrarComentario(false);
    } catch (error) {
      console.error("Erro ao enviar comentário", error);
    }
  };

  const compartilharPost = async () => {
    if (!usuario) {
      return Swal.fire({
        title: "Atenção!",
        text: "Você precisa estar logado para realizar essa ação!",
        icon: "warning",
        confirmButtonText: "Ir para Login",
        iconColor: "#ff3131",
        confirmButtonColor: "#ff3131",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }

    const jaCompartilhou = compartilhamentos.some(
      (comp) => comp.idUser === usuario.idUser
    );

    if (jaCompartilhou) {
      // Apenas abre a modal, mas não envia nova requisição nem incrementa contador
      return setMostrarModalCompartilhar(true);
    }

    try {
      await fetch(`http://localhost:3001/api/compartilhamentos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idPost,
          idUser: usuario.idUser,
          dataCompartilhamento: new Date(),
          horaCompartilhamento: new Date().toLocaleTimeString(),
        }),
      });
      setNumCompartilhamentos(numCompartilhamentos + 1);
    } catch (error) {
      console.error("Erro ao registrar compartilhamento", error);
    }

    setMostrarModalCompartilhar(true);
  };

  function calcularTempoRelativo(dataISO) {
    const agora = new Date();
    const dataPost = new Date(dataISO);
    dataPost.setHours(dataPost.getHours());

    const diffMs = agora - dataPost;
    const diffMin = Math.floor(diffMs / (1000 * 60));
    const diffHoras = Math.floor(diffMin / 60);
    const diffDias = Math.floor(diffHoras / 24);
    const diffMeses = Math.floor(diffDias / 30);

    if (diffMin < 1) return "agora mesmo";
    if (diffMin < 60) return `${diffMin} min`;
    if (diffHoras < 24) return `${diffHoras} h`;
    if (diffDias < 30) return `${diffDias} dias atrás`;
    return `${diffMeses} mês${diffMeses > 1 ? "es" : ""} atrás`;
  }

  useEffect(() => {
    if (dataHoraPost) {
      setTempoPostagem(calcularTempoRelativo(dataHoraPost));
    }
  }, [dataHoraPost]);

  function formatarData(dataISO) {
    const data = new Date(dataISO);

    // Corrige a data somando 3 horas para compensar o fuso UTC-3
    data.setHours(data.getHours() + 3);

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

  // Garante que todas as listas sejam arrays
  const cuidadosList = Array.isArray(cuidados)
    ? cuidados
    : typeof cuidados === "string"
    ? cuidados.split(",").map((c) => c.trim())
    : [];

  const temperamentoList = Array.isArray(temperamento)
    ? temperamento
    : typeof temperamento === "string"
    ? temperamento.split(",").map((c) => c.trim())
    : [];

  const adaptabilidadeList = Array.isArray(adaptabilidade)
    ? adaptabilidade
    : typeof adaptabilidade === "string"
    ? adaptabilidade.split(",").map((c) => c.trim())
    : [];

  const socializacaoList = Array.isArray(socializacao)
    ? socializacao
    : typeof socializacao === "string"
    ? socializacao.split(",").map((c) => c.trim())
    : [];

  return (
    <div className="container">
      <div class="post-title-header"></div>
      <div className="post">
        <div className="post-header">
          <img src={fotoPerfil} alt="Perfil" />
          <div>
            <div className="name">
              {nome} {sobrenome}
            </div>
            {tempoPostagem && (
              <div className="tempo-postagem">{tempoPostagem}</div>
            )}
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
                      {cuidadosList.map((item) => (
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
                      {temperamentoList.map((item) => (
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
                      {adaptabilidadeList.map((item) => (
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
                      {socializacaoList.map((item) => (
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
              <strong>
                {situacao === "Perdido"
                  ? "Nome do Tutor"
                  : "Nome do Anunciante"}
              </strong>
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
                      <h3>
                        {situacao === "Perdido"
                          ? "Telefone do Tutor"
                          : "Telefone do Anunciante"}
                      </h3>
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

        <div className="interacoes-contador">
          <div className="curtidas-contador" style={{ cursor: "pointer" }}>
            <FaThumbsUp className="icone-curtida" />
            <strong className="cor-strong-icon-curt">{numCurtidas}</strong>{" "}
            {numCurtidas === 1 ? "curtida" : "curtidas"}
          </div>

          <div
            className="comentarios-contador"
            onClick={() => setMostrarComentario((prev) => !prev)}
            style={{ cursor: "pointer" }}
          >
            <FaCommentAlt className="icone-comentario" />
            <strong className="cor-strong-icon">
              {comentariosState.length}
            </strong>{" "}
            {comentariosState.length === 1 ? "comentário" : "comentários"}
          </div>

          <div
            className="compartilhamentos-contador"
            style={{ cursor: "pointer" }}
          >
            <FaShare className="icone-compartilhamento" />
            <strong className="cor-strong-icon">
              {numCompartilhamentos}
            </strong>{" "}
            {numCompartilhamentos === 1
              ? "compartilhamento"
              : "compartilhamentos"}
          </div>
        </div>

        <div className="post-actions">
          <button
            onClick={toggleCurtida}
            className={`btn-action ${curtido ? "ativo" : ""}`}
          >
            <FaThumbsUp className="icon" />
            Curtir
          </button>

          <button
            onClick={() => setMostrarComentario(!mostrarComentario)}
            className="btn-action"
          >
            <FaCommentAlt className="icon" />
            Comentar
          </button>

          <button onClick={compartilharPost} className="btn-action">
            <FaShare className="icon" />
            Compartilhar
          </button>
        </div>

        {mostrarComentario && (
          <>
            <div className="comentario-input-container">
              <img
                src={
                  usuario?.fotoPerfil
                    ? `http://localhost:3001/uploads/${usuario.fotoPerfil}`
                    : ImagemDefault
                }
                alt="Perfil"
                className="foto-perfil-comentario"
              />
              <div className="comentario-input-wrapper">
                <textarea
                  ref={textareaRef}
                  className="comentario-textarea"
                  value={textoComentario}
                  onChange={(e) => setTextoComentario(e.target.value)}
                  placeholder="Adicionar comentário"
                  rows={1}
                />
                {textoComentario.trim() !== "" && (
                  <button
                    className="comentario-enviar-btn"
                    onClick={enviarComentario}
                  >
                    Comentar
                  </button>
                )}
              </div>
            </div>
            {usuario && (
              <div className="comentarios-lista">
                {comentariosState
                  .slice(
                    0,
                    mostrarTodosComentarios ? comentariosState.length : 3
                  )
                  .map((comentario) => (
                    <div
                      key={comentario.idComentario}
                      className="comentario-item"
                    >
                      <img
                        className="foto-perfil-comentario-exp"
                        src={
                          comentario.autor?.fotoPerfil
                            ? `http://localhost:3001/uploads/${comentario.autor.fotoPerfil}`
                            : ImagemDefault
                        }
                        alt="Foto de perfil"
                      />
                      <div className="comentario-conteudo">
                        <div className="comentario-cabecalho">
                          <strong>
                            {comentario.autor?.nome}{" "}
                            {comentario.autor?.sobrenome}
                          </strong>{" "}
                          <span className="tempo-comentario">
                            · {calcularTempoRelativo(comentario.dataComentario)}
                          </span>
                        </div>
                        <div className="comentario-texto">
                          {comentario.texto}
                        </div>
                      </div>
                    </div>
                  ))}

                {comentariosState.length > 3 && !mostrarTodosComentarios && (
                  <button
                    className="btn-carregar-mais"
                    onClick={() => setMostrarTodosComentarios(true)}
                  >
                    <RiExpandDiagonal2Line className="icone-carregar-mais" />{" "}
                    Carregar mais comentários
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {mostrarModalCompartilhar && (
        <ModalCompartilhar
          link={linkPost}
          onClose={() => setMostrarModalCompartilhar(false)}
        />
      )}

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

function ModalCompartilhar({ link, onClose }) {
  const copiarLink = () => {
    navigator.clipboard.writeText(link);
    alert("Link copiado!");
  };

  return (
    <div className="modal-compartilhar-backdrop" onClick={onClose}>
      <div className="modal-compartilhar" onClick={(e) => e.stopPropagation()}>
        <h2>Compartilhar post</h2>
        <div className="link-post">
          <input type="text" readOnly value={link} />
          <button onClick={copiarLink} title="Copiar link">
            <FaRegCopy />
          </button>
        </div>
        <div className="redes-sociais">
          <a
            href={`https://www.instagram.com`}
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram"
            className="icone-instagram-bg"
          >
            <FaInstagram className="icone-instagram" />
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              link
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Facebook"
            className="icone-face-bg"
          >
            <FaFacebook className="icone-face" />
          </a>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(link)}`}
            target="_blank"
            rel="noopener noreferrer"
            title="WhatsApp"
            className="icone-whats-bg"
          >
            <FaWhatsapp className="icone-whats" />
          </a>
          <a
            href={`https://t.me/share/url?url=${encodeURIComponent(link)}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Telegram"
            className="icone-tele-bg"
          >
            <FaTelegram className="icone-tele" />
          </a>
        </div>
        <button className="fechar-btn" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}
