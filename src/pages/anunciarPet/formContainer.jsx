import { useState, useEffect } from "react";
import { FormProvider, useFormContext } from "./FormContext.jsx"; // importa o hook
import { useAuth } from "../../../server/context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import LoginModal from "../../components/loginModal/LoginModal.jsx";

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
import FormEtapa3Adocao from "./staps/adocao/formEtapa3Adocao";
import FormEtapa4Adocao from "./staps/adocao/formEtapa4Adocao";
import FormEtapa5Adocao from "./staps/adocao/formEtapa5Adocao";
import FormEtapa6Adocao from "./staps/adocao/formEtapa6Adocao";
import FormEtapa7Adocao from "./staps/adocao/formEtapa7Adocao";
import FormEtapa8Adocao from "./staps/adocao/formEtapa8Adocao.jsx";

export default function FormContainerWrapper() {
  return (
    <FormProvider>
      <FormContainer />
    </FormProvider>
  );
}

function FormContainer() {
  const { formData, updateFormData } = useFormContext();
  const { usuario } = useAuth();
  const location = useLocation();
  const [step, setStep] = useState(0);
  const [mostrarLoginModal, setMostrarLoginModal] = useState(false);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  let totalEtapas = 7; // padrão
  if (formData.situacao === "Adocao") {
    totalEtapas = 8;
  }

  useEffect(() => {
    if (
      location.state &&
      location.state.formData &&
      location.state.step !== undefined
    ) {
      // Se veio pelo navigate com state, usa esses dados
      updateFormData(location.state.formData);
      setStep(location.state.step);
    } else {
      // Senão tenta carregar do localStorage
      const dadosSalvos = localStorage.getItem("formDataTemp");
      const etapaSalva = localStorage.getItem("formStepTemp");

      if (dadosSalvos && etapaSalva) {
        updateFormData(JSON.parse(dadosSalvos));
        setStep(parseInt(etapaSalva));
        localStorage.removeItem("formDataTemp");
        localStorage.removeItem("formStepTemp");
      }
    }
    setLoading(false);
  }, [location.state]);

  if (loading) return null;

  const handleProximo = (dadosEtapaAtual) => {
    updateFormData(dadosEtapaAtual);

    const etapaCritica =
      (formData.situacao === "Perdido" && step === 5) ||
      (formData.situacao === "Procurando Tutor" && step === 5) ||
      (formData.situacao === "Adocao" && step === 6);

    if (etapaCritica && !usuario) {
      setMostrarLoginModal(true);
      return;
    }

    setStep((prev) => prev + 1);
  };

  const handleVoltar = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <>
      <div className="form-container-all">
        {/* LADO ESQUERDO */}
        <div className="carrossel-lateral-all">
          <Carrosel2 />
        </div>

        {/* LADO DIREITO */}
        <div className="formulario-all">
          {/* Comum para todas as etapas */}
          {step === 0 && <FormEtapa1 onProximo={handleProximo} />}

          {/* Etapas para situação "Perdido" */}
          {formData.situacao === "Perdido" && step === 1 && (
            <FormEtapa2Perdido
              onProximo={handleProximo}
              onVoltar={handleVoltar}
            />
          )}
          {formData.situacao === "Perdido" && step === 2 && (
            <FormEtapa3Perdido
              onProximo={handleProximo}
              onVoltar={handleVoltar}
            />
          )}
          {formData.situacao === "Perdido" && step === 3 && (
            <FormEtapa4Perdido
              onProximo={handleProximo}
              onVoltar={handleVoltar}
            />
          )}
          {formData.situacao === "Perdido" && step === 4 && (
            <FormEtapa5Perdido
              onProximo={handleProximo}
              onVoltar={handleVoltar}
            />
          )}
          {formData.situacao === "Perdido" && step === 5 && (
            <FormEtapa6Perdido
              onProximo={handleProximo}
              onVoltar={handleVoltar}
            />
          )}
          {formData.situacao === "Perdido" && step === 6 && (
            <FormEtapa7Perdido
              onProximo={handleProximo}
              onVoltar={handleVoltar}
            />
          )}

          {/* TUTOR */}
          {step === 1 && formData.situacao === "Procurando Tutor" && (
            <FormEtapa2Tutor
              onProximo={handleProximo}
              onVoltar={handleVoltar}
            />
          )}
          {step === 2 && formData.situacao === "Procurando Tutor" && (
            <FormEtapa3Tutor
              onProximo={handleProximo}
              onVoltar={handleVoltar}
            />
          )}
          {step === 3 && formData.situacao === "Procurando Tutor" && (
            <FormEtapa4Tutor
              onProximo={handleProximo}
              onVoltar={handleVoltar}
            />
          )}
          {step === 4 && formData.situacao === "Procurando Tutor" && (
            <FormEtapa5Tutor
              onProximo={handleProximo}
              onVoltar={handleVoltar}
            />
          )}
          {step === 5 && formData.situacao === "Procurando Tutor" && (
            <FormEtapa6Tutor
              onProximo={handleProximo}
              onVoltar={handleVoltar}
            />
          )}
          {step === 6 && formData.situacao === "Procurando Tutor" && (
            <FormEtapa7Tutor
              onProximo={handleProximo}
              onVoltar={handleVoltar}
            />
          )}

          {/* ADOÇÃO */}
          {step === 1 && formData.situacao === "Adocao" && (
            <FormEtapa2Adocao
              onProximo={handleProximo}
              onVoltar={handleVoltar}
              totalEtapas={totalEtapas}
            />
          )}
          {step === 2 && formData.situacao === "Adocao" && (
            <FormEtapa3Adocao
              onProximo={handleProximo}
              onVoltar={handleVoltar}
              totalEtapas={totalEtapas}
            />
          )}
          {step === 3 && formData.situacao === "Adocao" && (
            <FormEtapa4Adocao
              onProximo={handleProximo}
              onVoltar={handleVoltar}
              totalEtapas={totalEtapas}
            />
          )}
          {step === 4 && formData.situacao === "Adocao" && (
            <FormEtapa5Adocao
              onProximo={handleProximo}
              onVoltar={handleVoltar}
              totalEtapas={totalEtapas}
            />
          )}
          {step === 5 && formData.situacao === "Adocao" && (
            <FormEtapa6Adocao
              onProximo={handleProximo}
              onVoltar={handleVoltar}
              totalEtapas={totalEtapas}
            />
          )}
          {step === 6 && formData.situacao === "Adocao" && (
            <FormEtapa7Adocao
              onProximo={handleProximo}
              onVoltar={handleVoltar}
              totalEtapas={totalEtapas}
            />
          )}
          {step === 7 && formData.situacao === "Adocao" && (
            <FormEtapa8Adocao
              onProximo={handleProximo}
              onVoltar={handleVoltar}
              totalEtapas={totalEtapas}
            />
          )}
        </div>
      </div>
      {mostrarLoginModal && (
        <LoginModal
          onClose={() => setMostrarLoginModal(false)} // apenas fecha o modal sem logar
          onLoginSuccess={() => {
            setMostrarLoginModal(false);
            setStep((prev) => prev + 1); // avança só se logar com sucesso
          }}
        />
      )}
    </>
  );
}
