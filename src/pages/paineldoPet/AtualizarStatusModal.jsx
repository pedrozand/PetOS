import Swal from "sweetalert2";
import { useState } from "react";
import "./CSS/statusModal.css";

export default function AtualizarStatusModal({ post, onClose, onUpdate }) {
  const [texto, setTexto] = useState("");

  const enviar = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/postagem/${post.idPost}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ statusTexto: texto }),
        }
      );

      if (res.ok) {
        const atualizado = await res.json();
        Swal.fire("Status atualizado!", "", "success");
        onUpdate(atualizado); // atualiza na lista de posts
        onClose();
      } else {
        Swal.fire("Erro!", "Não foi possível atualizar o status.", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Erro!", "Falha ao comunicar com o servidor.", "error");
    }
  };

  return (
    <div className="modal-overlay-ppet-sts">
      <div className="modal-conteudo-ppet-sts">
        <h3>Atualizar Status</h3>
        <p>
          Deseja marcar esse post <strong>{post.situacao}</strong> como
          resolvido?
        </p>
        <textarea
          placeholder="Descreva como foi resolvido (opcional)"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          rows={4}
          style={{ width: "100%", marginTop: "10px" }}
        />
        <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
          <button onClick={enviar}>Confirmar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
