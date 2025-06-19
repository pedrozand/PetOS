import { useEffect, useState } from "react";
import { useAuth } from "../../../server/context/AuthContext.jsx";
import NavBar from "../../components/navbar/navbar.jsx";
import Post from "../../components/post/post.jsx";
import EditarModal from "./EditarModal.jsx";
import "./CSS/paineldoPet.css";

const PainelDoPet = () => {
  const { usuario: user, loading } = useAuth();
  const [posts, setPosts] = useState([]);
  const [postSelecionado, setPostSelecionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    if (loading) return; // ainda está carregando
    if (!user?.idUser) {
      console.log("Usuário não autenticado");
      return;
    }

    fetch(`http://localhost:3001/api/postagens/usuario/${user.idUser}`)
      .then((r) => r.json())
      .then((data) => {
        setPosts(data);
      })
      .catch(console.error);
  }, [user, loading]);

  const fecharModal = () => {
    setPostSelecionado(null);
    setMostrarModal(false);
  };

  const atualizarPost = (postAtualizado) => {
    const novosPosts = posts.map((p) =>
      p.id === postAtualizado.id ? postAtualizado : p
    );
    setPosts(novosPosts);
    fecharModal();
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
          <h2>Meus Pets Publicados</h2>
          {posts.length === 0 ? (
            <p>Você ainda não publicou nenhum pet.</p>
          ) : (
            posts.map((p) => (
              <div key={p.idPost} className="post-wrapper-ppet">
                <Post
                  fotoPerfil={
                    p.usuario.fotoPerfil
                      ? `http://localhost:3001/uploads/${p.usuario.fotoPerfil}`
                      : []
                  }
                  nome={p.usuario.nome}
                  sobrenome={p.usuario.sobrenome}
                  email={p.usuario.email}
                  nomeAnimal={p.animal.nome}
                  especie={p.animal.especie}
                  descricao={p.animal.descricao}
                  imgPet={
                    p.animal.imagensAnimal
                      ? JSON.parse(p.animal.imagensAnimal).map(
                          (img) => `http://localhost:3001/uploads/${img}`
                        )
                      : []
                  }
                  raca={p.animal.raca}
                  idade={p.animal.idade}
                  porte={p.animal.porte}
                  corPredominante={p.animal.corPredominante}
                  corOlhos={p.animal.corOlhos}
                  sexo={p.animal.sexo}
                  localDesap={p.endereco}
                  referencia={p.pontoReferencia}
                  dataDesap={p.dataPost}
                  periodo={p.periodoPost}
                  recompensa={p.recompensa}
                  descricaoLocal={p.descricaoLocal}
                  localPet={p.localPet}
                  telefone={p.telefonePost}
                  situacao={p.situacao}
                  cuidados={p.animal.cuidados}
                  temperamento={p.animal.temperamento}
                  adaptabilidade={p.animal.adaptabilidade}
                  socializacao={p.animal.socializacao}
                  dataHoraPost={p.dataHoraPost}
                />
                <div className="painel-lateral-ppet">
                  <p>Ações rápidas</p>
                  <button onClick={() => abrirModalEdicao(p)}>
                    Editar Anúncio
                  </button>
                  <button>Inativar Anúncio</button>
                </div>
              </div>
            ))
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
    </>
  );
};

export default PainelDoPet;
