import { useState, useEffect } from "react";
import { useFormContext } from "../../FormContext.jsx";
import FormBase from "../../formBase";
import "./CSS/formEtapa4Adocao.css";

export default function FormEtapa4Adocao({ onProximo, onVoltar, totalEtapas }) {
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
    <FormBase
      etapaAtual={4}
      onProximo={handleProximo}
      onVoltar={onVoltar}
      totalEtapas={totalEtapas}
    >
      <div className="form-wrapper-ado">
        {/* Nome do pet */}
        <div className="form-group">
          <label className="form-label-ado">
            Nome do pet <span className="form-optional-ado">Opcional</span>
          </label>
          <input
            type="text"
            name="nomePet"
            placeholder="Deixe em branco se não souber."
            value={localData.nomePet}
            onChange={handleChange}
            className="form-input-ado"
          />
        </div>

        {/* Descrição */}
        <div className="form-group">
          <label className="form-label-ado">
            Descrição <span className="form-optional-ado">Opcional</span>
          </label>
          <textarea
            name="descricao"
            placeholder="Insira informações relevantes que ajudem na identificação do pet."
            value={localData.descricao}
            onChange={handleChange}
            className="form-textarea-ado"
            rows={4}
          />
        </div>
      </div>
    </FormBase>
  );
}
