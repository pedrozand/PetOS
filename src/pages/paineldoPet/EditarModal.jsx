import { useState } from "react";
import "./CSS/editarModal.css";

const EditarModal = ({ post, onClose, onSave }) => {
  const [descricao, setDescricao] = useState(post.animal.descricao || "");
  const [telefone, setTelefone] = useState(post.telefonePost || "");

  const salvarEdicao = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/postagens/${post.idPost}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            descricaoAnimal: descricao,
            telefonePost: telefone,
          }),
        }
      );
      const atualizado = await response.json();
      onSave({
        ...post,
        animal: { ...post.animal, descricao },
        telefonePost: telefone,
      });
    } catch (err) {
      console.error("Erro ao atualizar:", err);
    }
  };

  return (
    <div className="modal-overlay-ppet">
      <div className="modal-content-ppet">
        <h3>Editar Informações do Pet</h3>

        <label>Descrição:</label>
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <label>Telefone:</label>
        <input
          type="text"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />

        <div className="modal-actions-ppet">
          <button onClick={salvarEdicao}>Salvar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default EditarModal;
