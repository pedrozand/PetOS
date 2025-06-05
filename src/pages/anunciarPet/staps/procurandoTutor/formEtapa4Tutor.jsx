import { useState, useEffect } from "react";
import { useFormContext } from "../../FormContext.jsx";
import FormBase from "../../formBase";
import "./CSS/formEtapa4Tutor.css";

export default function FormEtapa4Tutor({ onProximo, onVoltar }) {
  const { formData, updateFormData } = useFormContext();

  const [localData, setLocalData] = useState({
    nomePet: formData.nomePet || "",
    descricao: formData.descricao || "",
    oferecerRecompensa: formData.oferecerRecompensa || false,
    valorRecompensa: formData.valorRecompensa || "",
  });

  function formatarParaReal(valor) {
    const numero = valor.replace(/\D/g, "");
    const numeroFormatado = (Number(numero) / 100).toFixed(2);
    return "R$ " + numeroFormatado.replace(".", ",");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleRecompensa = () => {
    setLocalData((prev) => ({
      ...prev,
      oferecerRecompensa: !prev.oferecerRecompensa,
      valorRecompensa: !prev.oferecerRecompensa ? "" : prev.valorRecompensa,
    }));
  };

  const handleProximo = () => {
    updateFormData(localData);
    onProximo(localData);
  };

  return (
    <FormBase etapaAtual={4} onProximo={handleProximo} onVoltar={onVoltar}>
      <div className="form-wrapper-tut">
        {/* Nome do pet */}
        <div className="form-group">
          <label className="form-label-tut">
            Nome do pet <span className="form-optional-tut">Opcional</span>
          </label>
          <input
            type="text"
            name="nomePet"
            placeholder="Deixe em branco se não souber."
            value={localData.nomePet}
            onChange={handleChange}
            className="form-input-tut"
          />
        </div>

        {/* Descrição */}
        <div className="form-group">
          <label className="form-label-tut">
            Descrição <span className="form-optional-tut">Opcional</span>
          </label>
          <textarea
            name="descricao"
            placeholder="Insira informações relevantes que ajudem na identificação do pet."
            value={localData.descricao}
            onChange={handleChange}
            className="form-textarea-tut"
            rows={4}
          />
        </div>

        {/* Recompensa */}
        <div className="form-group">
          <label className="reward-label-tit-tut">Recompensa</label>
          <div className="reward-toggle-tut">
            <label className="switch">
              <input
                type="checkbox"
                checked={localData.oferecerRecompensa}
                onChange={handleToggleRecompensa}
              />
              <span className="slider"></span>
            </label>
            <span className="reward-label-tut">Oferecer recompensa</span>
          </div>

          {/* Valor da recompensa */}
          <div className="reward-valor-wrapper-tut">
            <label
              style={{
                visibility: localData.oferecerRecompensa ? "visible" : "hidden",
                opacity: localData.oferecerRecompensa ? 1 : 0,
                transition: "opacity 0.3s ease",
              }}
            >
              <a className="reward-label-val-tut">Valor:</a>
            </label>
            <input
              type="text"
              name="valorRecompensa"
              placeholder="Opcional"
              value={localData.valorRecompensa}
              onChange={(e) =>
                setLocalData((prev) => ({
                  ...prev,
                  valorRecompensa: formatarParaReal(e.target.value),
                }))
              }
              className="form-input-reward-tut"
              style={{
                visibility: localData.oferecerRecompensa ? "visible" : "hidden",
                opacity: localData.oferecerRecompensa ? 1 : 0,
                transition: "opacity 0.3s ease",
              }}
            />
          </div>
        </div>
      </div>
    </FormBase>
  );
}
