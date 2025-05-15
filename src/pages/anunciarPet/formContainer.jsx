import { useState } from "react";
import FormEtapa1 from "./staps/formEtapa1";
import FormEtapa2Perdido from "./staps/perdido/formEtapa2Perdido";
import FormEtapa2Tutor from "./staps/procurandoTutor/formEtapa2Tutor";
import FormEtapa2Adocao from "./staps/adocao/formEtapa2Adocao";

export default function FormContainer() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});

  const handleProximo = (dadosEtapaAtual) => {
    setFormData((prev) => ({ ...prev, ...dadosEtapaAtual }));
    setStep((prev) => prev + 1);
  };

  return (
    <>
      {step === 0 && <FormEtapa1 onProximo={handleProximo} />}
      {step === 1 && formData.situacao === "Perdido" && (
        <FormEtapa2Perdido onProximo={handleProximo} dados={formData} />
      )}
      {step === 1 && formData.situacao === "Procurando Tutor" && (
        <FormEtapa2Tutor onProximo={handleProximo} dados={formData} />
      )}
      {step === 1 && formData.situacao === "Adocao" && (
        <FormEtapa2Adocao onProximo={handleProximo} dados={formData} />
      )}
    </>
  );
}
