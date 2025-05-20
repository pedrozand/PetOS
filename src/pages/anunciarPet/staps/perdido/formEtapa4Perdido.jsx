import { useState } from "react";
import FormBase from "../../formBase";
import "./CSS/formEtapa4Perdido.css";

export default function FormEtapa4Perdido({ onProximo, onVoltar, dados }) {
  const [nomePet, setNomePet] = useState("");
  const [descricao, setDescricao] = useState("");
  const [oferecerRecompensa, setOferecerRecompensa] = useState(false);
  const [valorRecompensa, setValorRecompensa] = useState("");

  function formatarParaReal(valor) {
    const numero = valor.replace(/\D/g, ""); // Remove tudo que não for dígito
    const numeroFormatado = (Number(numero) / 100).toFixed(2); // Divide por 100 para ter 2 casas decimais
    return "R$ " + numeroFormatado.replace(".", ","); // Troca ponto por vírgula
  }

  const handleProximo = () => {
    onProximo({
      nomePet,
      descricao,
      oferecerRecompensa,
      valorRecompensa: oferecerRecompensa ? valorRecompensa : null,
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
        <div className="form-group">
          <label className="reward-label-tit">Recompensa</label>
          <div className="reward-toggle">
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

          {/* Área do valor da recompensa, sempre visível mas com visibilidade controlada */}
          <div className="reward-valor-wrapper">
            <a
              className="reward-label-val"
              style={{
                visibility: oferecerRecompensa ? "visible" : "hidden",
                opacity: oferecerRecompensa ? 1 : 0,
                transition: "opacity 0.3s ease",
              }}
            >
              Valor:
            </a>
            <input
              type="text"
              placeholder="Opcional"
              value={valorRecompensa}
              onChange={(e) =>
                setValorRecompensa(formatarParaReal(e.target.value))
              }
              className="form-input-reward"
              style={{
                visibility: oferecerRecompensa ? "visible" : "hidden",
                opacity: oferecerRecompensa ? 1 : 0,
                transition: "opacity 0.3s ease",
              }}
            />
          </div>
        </div>
      </div>
    </FormBase>
  );
}
