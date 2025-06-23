import React, { useEffect, useState } from "react";
import NavBar from "../../components/navbar/navbar.jsx";
import Encontrados from "../../components/cards/encontrados/encontr.jsx";

import "./CSS/petEcontrado.css";

function PetEcontrado() {
  const [encontrados, setEncontrados] = useState([]);
  const [modalAberta, setModalAberta] = useState(false);
  const [postSelecionado, setPostSelecionado] = useState(null);

  const calcularTempoRelativo = (data) => {
    const agora = new Date();
    const dataHora = new Date(data);
    const diffMs = agora - dataHora;
    const segundos = Math.floor(diffMs / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);

    if (dias > 0) return `${dias} dia${dias > 1 ? "s" : ""} atrás`;
    if (horas > 0) return `${horas} hora${horas > 1 ? "s" : ""} atrás`;
    if (minutos > 0) return `${minutos} minuto${minutos > 1 ? "s" : ""} atrás`;
    return "Agora mesmo";
  };

  const calcularIntervaloStatus = (dataPost, statusAtualizadoEm) => {
    const inicio = new Date(dataPost);
    const fim = new Date(statusAtualizadoEm);
    const diffMs = fim - inicio;

    const dias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diffMs / (1000 * 60)) % 60);

    if (dias > 0)
      return `Encontrado ${dias} dia${dias > 1 ? "s" : ""} depois do anúncio!`;
    if (horas > 0)
      return `Encontrado ${horas} hora${
        horas > 1 ? "s" : ""
      } depois do anúncio!`;
    if (minutos > 0)
      return `Encontrado ${minutos} minuto${
        minutos > 1 ? "s" : ""
      } depois do anúncio!`;
    return "Encontrado imediatamente após o anúncio!";
  };

  useEffect(() => {
    async function fetchEncontrados() {
      try {
        const response = await fetch(
          "http://localhost:3001/api/postagens/encontrados"
        );
        const data = await response.json();
        setEncontrados(data);
      } catch (error) {
        console.error("Erro ao buscar cards encontrados:", error);
      }
    }

    fetchEncontrados();
  }, []);

  const abrirModal = (post) => {
    setPostSelecionado(post);
    setModalAberta(true);
  };

  const fecharModal = () => {
    setModalAberta(false);
    setPostSelecionado(null);
  };

  return (
    <>
      <div className="container-geral-petenc">
        <NavBar />
        <div className="titulo-reencontros">
          <h1>Últimos Reencontros</h1>
          <p>
            Veja as histórias de sucesso de pets que foram resgatados e voltaram
            para casa.
          </p>
          <span>{encontrados.length} reencontros até o momento.</span>
        </div>

        <div className="grid-encontrados">
          {encontrados.map((p) => (
            <div
              key={p.idPost}
              onClick={() => abrirModal(p)}
              style={{ cursor: "pointer" }}
            >
              <Encontrados
                imgPet={
                  p.animal.imagensAnimal?.[0]
                    ? `http://localhost:3001/uploads/${p.animal.imagensAnimal[0]}`
                    : "https://via.placeholder.com/150"
                }
                nome={p.animal.nome}
                local={p.endereco}
                hora={calcularTempoRelativo(p.dataHoraPost)}
                intervalo={calcularIntervaloStatus(
                  p.dataPost,
                  p.statusAtualizadoEm
                )}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalAberta && postSelecionado && (
        <div className="modal-overlay-reencontro" onClick={fecharModal}>
          <div
            className="modal-conteudo-reencontro"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-imagem-wrapper">
              <img
                src={
                  postSelecionado.animal.imagensAnimal?.[0]
                    ? `http://localhost:3001/uploads/${postSelecionado.animal.imagensAnimal[0]}`
                    : "https://via.placeholder.com/150"
                }
                className="modal-img-pet"
                alt="Pet"
              />
              <button className="modal-fechar-reencontro" onClick={fecharModal}>
                &times;
              </button>
            </div>

            <div className="modal-conteudo-interno">
              <div className="modal-dados-texto">
                <h2>{postSelecionado.animal.nome}</h2>
                <p className="modal-endereco">{postSelecionado.endereco}</p>
                <p>
                  <strong>Status</strong>{" "}
                  {calcularIntervaloStatus(
                    postSelecionado.dataPost,
                    postSelecionado.statusAtualizadoEm
                  )}
                </p>
                <p>
                  <strong>Postado</strong>{" "}
                  {calcularTempoRelativo(postSelecionado.dataHoraPost)}
                </p>
              </div>

              <div className="modal-usuario">
                <img
                  src={
                    postSelecionado.usuario?.fotoPerfil
                      ? `http://localhost:3001/uploads/${postSelecionado.usuario.fotoPerfil}`
                      : "https://via.placeholder.com/100"
                  }
                  className="modal-img-usuario"
                  alt="Usuário"
                />
                <p>
                  {postSelecionado.usuario?.nome}{" "}
                  {postSelecionado.usuario?.sobrenome}
                </p>
              </div>

              <div className="modal-comentario">
                <h3>Comentário do Tutor</h3>
                <p>{postSelecionado.statusTexto}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PetEcontrado;
