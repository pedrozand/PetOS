import { useEffect, useState } from "react";
import { useAuth } from "../../../server/context/AuthContext.jsx";
import Swal from "sweetalert2";

import NavBar from "../../components/navbar/navbar.jsx";
import Footer from "../../components/footer/footer.jsx";
import Post from "../../components/post/post.jsx";

import EditarModal from "./EditarModal.jsx";
import AtualizarStatusModal from "./AtualizarStatusModal.jsx";

import ImagemDefault from "../../assets/img/perfil/img-default.png";

import "./CSS/paineldoPet.css";

import { FaThumbsUp, FaCommentAlt, FaShare } from "react-icons/fa";

const PainelDoPet = () => {
  const { usuario: user, loading } = useAuth();
  const [posts, setPosts] = useState([]);
  const [postSelecionado, setPostSelecionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  // Modal usuários (curtidas/compartilhamentos)
  const [usuariosModal, setUsuariosModal] = useState([]);
  const [mostrarModalInteracoes, setMostrarModalInteracoes] = useState(false);
  const [tituloModal, setTituloModal] = useState("");

  const [mostrarModalStatus, setMostrarModalStatus] = useState(false);
  const [postParaAtualizarStatus, setPostParaAtualizarStatus] = useState(null);

  const abrirModalStatus = (post) => {
    setPostParaAtualizarStatus(post);
    setMostrarModalStatus(true);
  };

  useEffect(() => {
    if (loading) return;
    if (!user?.idUser) return;

    fetch(`http://localhost:3001/api/postagens/usuario/${user.idUser}`)
      .then((r) => r.json())
      .then((data) => setPosts(data))
      .catch(console.error);
  }, [user, loading]);

  const abrirModalUsuarios = (usuarios, tipo) => {
    setUsuariosModal(usuarios);
    setTituloModal(tipo);
    setMostrarModalInteracoes(true);
  };

  const fecharModal = () => {
    setPostSelecionado(null);
    setMostrarModal(false);
  };

  const atualizarPost = (postAtualizado) => {
    const novosPosts = posts.map((p) =>
      p.idPost === postAtualizado.idPost ? postAtualizado : p
    );
    setPosts(novosPosts);
    fecharModal();
  };

  const alterarAtivoDoPost = async (idPost, novoStatus) => {
    const resultado = await Swal.fire({
      title: novoStatus ? "Ativar post?" : "Inativar post?",
      text: `Você tem certeza que deseja ${
        novoStatus ? "ativar" : "inativar"
      } este post? Ele será ${
        novoStatus ? "repostado na" : "retirado da"
      } área de "Achados e Perdidos".`,
      icon: "warning",
      iconColor: "#ff3131",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim",
      cancelButtonText: "Cancelar",
    });

    if (resultado.isConfirmed) {
      try {
        const response = await fetch(
          `http://localhost:3001/api/postagem/${idPost}/ativar`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ativo: novoStatus }),
          }
        );

        if (response.ok) {
          const atualizado = await response.json();

          setPosts((prev) =>
            prev.map((p) => (p.idPost === atualizado.idPost ? atualizado : p))
          );

          Swal.fire({
            title: "Sucesso!",
            text: `Post ${novoStatus ? "ativado" : "inativado"} com sucesso.`,
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });

          // Recarrega a tela
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      } catch (err) {
        console.error("Erro ao alterar status do post:", err);
        Swal.fire(
          "Erro!",
          "Não foi possível alterar o status do post.",
          "error"
        );
      }
    }
  };

  const abrirModalEdicao = (post) => {
    setPostSelecionado(post);
    setMostrarModal(true);
  };

  return (
    <>
      <div className="painel-container-ppet">
        <NavBar />
        <div className="painel-pet-container-ppet">
          <h2 className="painel-pet-container-tit-ppet">
            Meus Pets Publicados
          </h2>

          {posts.length === 0 ? (
            <a>Você ainda não publicou nenhum pet.</a>
          ) : (
            posts.map((p) => (
              <div key={p.idPost} className="post-wrapper-ppet">
                <Post
                  fotoPerfil={
                    p.usuario?.fotoPerfil
                      ? `http://localhost:3001/uploads/${p.usuario.fotoPerfil}`
                      : ""
                  }
                  nome={p.usuario?.nome || ""}
                  sobrenome={p.usuario?.sobrenome || ""}
                  email={p.usuario?.email || ""}
                  nomeAnimal={p.animal?.nome || ""}
                  especie={p.animal?.especie || ""}
                  descricao={p.animal?.descricao || ""}
                  imgPet={
                    Array.isArray(p.animal?.imagensAnimal)
                      ? p.animal.imagensAnimal.map(
                          (img) => `http://localhost:3001/uploads/${img}`
                        )
                      : []
                  }
                  raca={p.animal?.raca || ""}
                  idade={p.animal?.idade || ""}
                  porte={p.animal?.porte || ""}
                  corPredominante={p.animal?.corPredominante || ""}
                  corOlhos={p.animal?.corOlhos || ""}
                  sexo={p.animal?.sexo || ""}
                  localDesap={p.endereco || ""}
                  referencia={p.pontoReferencia || ""}
                  dataDesap={p.dataPost || ""}
                  periodo={p.periodoPost || ""}
                  recompensa={p.recompensa || ""}
                  descricaoLocal={p.descricaoLocal || ""}
                  localPet={p.localPet || ""}
                  telefone={p.telefonePost || ""}
                  situacao={p.situacao || ""}
                  cuidados={p.animal?.cuidados || []}
                  temperamento={p.animal?.temperamento || []}
                  adaptabilidade={p.animal?.adaptabilidade || []}
                  socializacao={p.animal?.socializacao || []}
                  dataHoraPost={p.dataHoraPost || ""}
                  mostrarInteracoes={false} // desativa interações dentro do Post
                />

                <div className="painel-lateral-ppet">
                  <p>Ações rápidas</p>
                  <div className="botoes-anuncio-container-ppet">
                    <div className="botoes-superiores-ppet">
                      <button onClick={() => abrirModalEdicao(p)}>
                        Editar Anúncio
                      </button>
                      <button
                        onClick={() => alterarAtivoDoPost(p.idPost, !p.ativo)}
                      >
                        {p.ativo ? "Inativar Anúncio" : "Ativar Anúncio"}
                      </button>
                    </div>

                    <button
                      className="botao-atualizar-status-ppet botom-status-ppet"
                      onClick={() => abrirModalStatus(p)}
                    >
                      Atualizar Status
                    </button>
                  </div>

                  <div className="interacoes-resumo-ppet">
                    <span
                      onClick={() =>
                        abrirModalUsuarios(
                          (p.curtidas || []).filter((c) => c.usuario),
                          "Curtidas"
                        )
                      }
                    >
                      <FaThumbsUp className="icone-interect-ppet" />{" "}
                      {p.curtidas?.length || 0} curtidas
                    </span>

                    <span
                      onClick={() =>
                        abrirModalUsuarios(
                          (p.compartilhamentos || []).filter((c) => c.usuario),
                          "Compartilhamentos"
                        )
                      }
                    >
                      <FaShare className="icone-interect-ppet" />{" "}
                      {p.compartilhamentos?.length || 0} compartilhamentos
                    </span>

                    <span style={{ cursor: "default" }} title="Comentários">
                      <FaCommentAlt className="icone-interect-ppet" />{" "}
                      {p.comentarios?.length || 0} comentários
                    </span>
                  </div>

                  {/* Lista simples de comentários */}
                  <div className="comentarios-ppet">
                    <h4>Comentários</h4>
                    {(p.comentarios || []).map((c) => {
                      const calcularTempoRelativo = (data) => {
                        const agora = new Date();
                        const dataComentario = new Date(data);
                        const diffMs = agora - dataComentario;
                        const segundos = Math.floor(diffMs / 1000);
                        const minutos = Math.floor(segundos / 60);
                        const horas = Math.floor(minutos / 60);
                        const dias = Math.floor(horas / 24);

                        if (dias > 0)
                          return `${dias} dia${dias > 1 ? "s" : ""} atrás`;
                        if (horas > 0)
                          return `${horas} hora${horas > 1 ? "s" : ""} atrás`;
                        if (minutos > 0)
                          return `${minutos} minuto${
                            minutos > 1 ? "s" : ""
                          } atrás`;
                        return "Agora mesmo";
                      };

                      return (
                        <div key={c.idComentario} className="comentario-ppet">
                          <img
                            src={
                              c.autor?.fotoPerfil
                                ? `http://localhost:3001/uploads/${c.autor.fotoPerfil}`
                                : ImagemDefault
                            }
                            alt="Foto de perfil"
                            className="comentario-foto-perfil-ppet"
                          />
                          <div className="comentario-texto-ppet">
                            <div className="comentario-cabecalho-ppet">
                              <strong>
                                {c.autor?.nome} {c.autor?.sobrenome}
                              </strong>
                              <span className="tempo-comentario-ppet">
                                · {calcularTempoRelativo(c.dataComentario)}
                              </span>
                            </div>
                            <p>{c.texto}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))
          )}

          {mostrarModalStatus && postParaAtualizarStatus && (
            <AtualizarStatusModal
              post={postParaAtualizarStatus}
              onClose={() => setMostrarModalStatus(false)}
              onUpdate={atualizarPost}
            />
          )}

          {mostrarModalInteracoes && (
            <ModalUsuarios
              titulo={tituloModal}
              usuarios={usuariosModal}
              onClose={() => setMostrarModalInteracoes(false)}
            />
          )}

          {mostrarModal && (
            <EditarModal
              post={postSelecionado}
              onClose={fecharModal}
              onSave={atualizarPost}
            />
          )}
        </div>
      </div>
      <div className="footer-container-painel-user-ppet">
        <Footer />
      </div>
    </>
  );
};

export default PainelDoPet;

const ModalUsuarios = ({ titulo, usuarios, onClose }) => {
  const tipo = titulo.toLowerCase();
  const calcularTempoRelativo = (data) => {
    const agora = new Date();
    const dataInteracao = new Date(data);
    const diffMs = agora - dataInteracao;
    const segundos = Math.floor(diffMs / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);

    if (dias > 0) return `${dias} dia${dias > 1 ? "s" : ""} atrás`;
    if (horas > 0) return `${horas} hora${horas > 1 ? "s" : ""} atrás`;
    if (minutos > 0) return `${minutos} minuto${minutos > 1 ? "s" : ""} atrás`;
    return "Agora mesmo";
  };

  return (
    <div className="modal-overlay-ppet">
      <div className="modal-conteudo-ppet">
        <h3>{titulo}</h3>
        <div className="lista-usuarios-ppet">
          {usuarios.map((u, index) => {
            const dataInteracao =
              tipo === "curtidas" ? u.dataCurtida : u.dataCompartilhamento;

            return (
              <div key={index} className="usuario-item-ppet">
                <img
                  className="foto-perfil-ppet"
                  src={
                    u?.usuario?.fotoPerfil
                      ? `http://localhost:3001/uploads/${u.usuario.fotoPerfil}`
                      : ImagemDefault
                  }
                />
                <div className="usuario-info-ppet">
                  <strong>
                    {u?.usuario?.nome} {u?.usuario?.sobrenome}
                  </strong>
                  <span className="tempo-interacao-ppet">
                    · {calcularTempoRelativo(dataInteracao)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <button className="btn-fechar-modal-ppet" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
};
