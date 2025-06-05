import { useState } from "react";
import { FormProvider } from "./FormContext.jsx";

import Carrosel2 from "../../components/carrosel-2/carrosel-2.jsx";
import "./CSS/formContainer.css";

import FormEtapa1 from "./staps/formEtapa1";

import FormEtapa2Perdido from "./staps/perdido/formEtapa2Perdido";
import FormEtapa3Perdido from "./staps/perdido/formEtapa3Perdido";
import FormEtapa4Perdido from "./staps/perdido/formEtapa4Perdido";
import FormEtapa5Perdido from "./staps/perdido/formEtapa5Perdido";
import FormEtapa6Perdido from "./staps/perdido/formEtapa6Perdido";
import FormEtapa7Perdido from "./staps/perdido/formEtapa7Perdido";

import FormEtapa2Tutor from "./staps/procurandoTutor/formEtapa2Tutor";
import FormEtapa3Tutor from "./staps/procurandoTutor/formEtapa3Tutor";
import FormEtapa4Tutor from "./staps/procurandoTutor/formEtapa4Tutor";
import FormEtapa5Tutor from "./staps/procurandoTutor/formEtapa5Tutor";
import FormEtapa6Tutor from "./staps/procurandoTutor/formEtapa6Tutor";
import FormEtapa7Tutor from "./staps/procurandoTutor/formEtapa7Tutor";

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
    <FormProvider>
      <div className="form-container-all">
        {/* LADO ESQUERDO */}
        <div className="carrossel-lateral-all">
          <Carrosel2 />
        </div>

        {/* LADO DIREITO */}
        <div className="formulario-all">
          {/* PERDIDO */}
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
          {formData.situacao === "Perdido" && step === 6 && (
            <FormEtapa7Perdido
              onProximo={handleProximo}
              onVoltar={handleVoltar}
              dados={formData}
            />
          )}

          {/* TUTOR */}
          {step === 1 && formData.situacao === "Procurando Tutor" && (
            <FormEtapa2Tutor
              onProximo={handleProximo}
              onVoltar={handleVoltar}
              dados={formData}
            />
          )}
          {step === 2 && formData.situacao === "Procurando Tutor" && (
            <FormEtapa3Tutor
              onProximo={handleProximo}
              onVoltar={handleVoltar}
              dados={formData}
            />
          )}
          {step === 3 && formData.situacao === "Procurando Tutor" && (
            <FormEtapa4Tutor
              onProximo={handleProximo}
              onVoltar={handleVoltar}
              dados={formData}
            />
          )}
          {step === 4 && formData.situacao === "Procurando Tutor" && (
            <FormEtapa5Tutor
              onProximo={handleProximo}
              onVoltar={handleVoltar}
              dados={formData}
            />
          )}
          {step === 5 && formData.situacao === "Procurando Tutor" && (
            <FormEtapa6Tutor
              onProximo={handleProximo}
              onVoltar={handleVoltar}
              dados={formData}
            />
          )}
          {step === 6 && formData.situacao === "Procurando Tutor" && (
            <FormEtapa7Tutor
              onProximo={handleProximo}
              onVoltar={handleVoltar}
              dados={formData}
            />
          )}

          {/* ADOÇÃO */}
          {step === 1 && formData.situacao === "Adocao" && (
            <FormEtapa2Adocao
              onProximo={handleProximo}
              onVoltar={handleVoltar}
              dados={formData}
            />
          )}
        </div>
      </div>
    </FormProvider>
  );
}
