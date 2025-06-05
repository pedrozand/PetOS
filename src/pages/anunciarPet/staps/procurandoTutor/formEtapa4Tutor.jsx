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
      </div>
    </FormBase>
  );
}
