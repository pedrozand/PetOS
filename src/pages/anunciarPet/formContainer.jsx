import { useState } from "react";

import Carrosel from "../../components/carrosel-2/carrosel-2.jsx";
import "./CSS/formContainer.css";

import FormEtapa1 from "./staps/formEtapa1";

import FormEtapa2Perdido from "./staps/perdido/formEtapa2Perdido";
import FormEtapa3Perdido from "./staps/perdido/formEtapa3Perdido";
import FormEtapa4Perdido from "./staps/perdido/formEtapa4Perdido";
import FormEtapa5Perdido from "./staps/perdido/formEtapa5Perdido";
import FormEtapa6Perdido from "./staps/perdido/formEtapa6Perdido";

import FormEtapa2Tutor from "./staps/procurandoTutor/formEtapa2Tutor";
import FormEtapa2Adocao from "./staps/adocao/formEtapa2Adocao";

export default function FormContainer() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});

  const handleProximo = (dadosEtapaAtual) => {
    setFormData((prev) => ({ ...prev, ...dadosEtapaAtual }));
    setStep((prev) => prev + 1);
  };

  const handleVoltar = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="form-container-all">
      {/* LADO ESQUERDO */}
      <div className="carrossel-lateral-all">
        <Carrosel />
      </div>

      {/* LADO DIREITO */}
      <div className="formulario-all">
        {step === 0 && <FormEtapa1 onProximo={handleProximo} />}

        {/* Etapas para situação "Perdido" */}
        {formData.situacao === "Perdido" && step === 1 && (
          <FormEtapa2Perdido
            onProximo={handleProximo}
            onVoltar={handleVoltar}
            dados={formData}
          />
        )}
        {formData.situacao === "Perdido" && step === 2 && (
          <FormEtapa3Perdido
            onProximo={handleProximo}
            onVoltar={handleVoltar}
            dados={formData}
          />
        )}
        {formData.situacao === "Perdido" && step === 3 && (
          <FormEtapa4Perdido
            onProximo={handleProximo}
            onVoltar={handleVoltar}
            dados={formData}
          />
        )}
        {formData.situacao === "Perdido" && step === 4 && (
          <FormEtapa5Perdido
            onProximo={handleProximo}
            onVoltar={handleVoltar}
            dados={formData}
          />
        )}
        {formData.situacao === "Perdido" && step === 5 && (
          <FormEtapa6Perdido
            onProximo={handleProximo}
            onVoltar={handleVoltar}
            dados={formData}
          />
        )}

        {/* Etapas para outras situações */}
        {step === 1 && formData.situacao === "Procurando Tutor" && (
          <FormEtapa2Tutor
            onProximo={handleProximo}
            onVoltar={handleVoltar}
            dados={formData}
          />
        )}
        {step === 1 && formData.situacao === "Adocao" && (
          <FormEtapa2Adocao
            onProximo={handleProximo}
            onVoltar={handleVoltar}
            dados={formData}
          />
        )}
      </div>
    </div>
  );
}
