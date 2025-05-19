import { useState } from "react";
import "./CSS/formEtapa4Perdido.css";
import FormBase from "../../formBase";

export default function FormEtapa4Perdido({ onProximo, onVoltar }) {
  const [nomePet, setNomePet] = useState("");
  const [descricao, setDescricao] = useState("");
  const [oferecerRecompensa, setOferecerRecompensa] = useState(false);

  const handleProximo = () => {
    onProximo({
      nomePet,
      descricao,
      oferecerRecompensa,
    });
  };

  return (
    <FormBase etapaAtual={4} onProximo={handleProximo} onVoltar={onVoltar}>
      <div className="form-wrapper">
        {/* Nome do pet */}
        <div className="form-group">
          <label className="form-label">
            Nome do pet <span className="form-optional">Opcional</span>
          </label>
          <input
            type="text"
            placeholder="Deixe em branco se não souber."
            value={nomePet}
            onChange={(e) => setNomePet(e.target.value)}
            className="form-input"
          />
        </div>

        {/* Descrição */}
        <div className="form-group">
          <label className="form-label">
            Descrição <span className="form-optional">Opcional</span>
          </label>
          <textarea
            placeholder="Insira informações relevantes que ajudem na identificação do pet."
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="form-textarea"
            rows={4}
          />
        </div>

        {/* Recompensa */}
        <div className="form-group reward-toggle">
          <label className="switch">
            <input
              type="checkbox"
              checked={oferecerRecompensa}
              onChange={() => setOferecerRecompensa(!oferecerRecompensa)}
            />
            <span className="slider"></span>
          </label>
          <span className="reward-label">Oferecer recompensa</span>
        </div>
      </div>
    </FormBase>
  );
}
