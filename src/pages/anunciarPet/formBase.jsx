import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import Carrosel from "../../components/carrosel-2/carrosel-2.jsx";
import ProgressBar from "../../components/progressbar/progressbar.jsx";
import "./CSS/formBase.css";

export default function FormBase({
  etapaAtual,
  totalEtapas = 7,
  children,
  onProximo,
}) {
  return (
    <div className="form-container">
      <div className="carrossel-lateral">
        <Carrosel />
      </div>

      <div className="formulario">
        <ProgressBar currentStep={etapaAtual} totalSteps={totalEtapas} />

        {/* Aqui entra o conteúdo específico da etapa */}
        {children}

        <div className="botoes-container-anun">
          <Link to="/">
            <button className="btn-voltar">
              <IoIosArrowBack className="arrow-class-og" /> Página inicial
            </button>
          </Link>
          <button className="btn-avancar" onClick={onProximo}>
            Prosseguir <IoIosArrowForward className="arrow-class-og" />
          </button>
        </div>
      </div>
    </div>
  );
}
