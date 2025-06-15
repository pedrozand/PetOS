import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import ProgressBar from "../../components/progressbar/progressbar.jsx";
import "./CSS/formBase.css";

export default function FormBase({
  etapaAtual,
  totalEtapas = 7,
  children,
  onProximo,
  onVoltar,
}) {
  return (
    <div className="form-container">
      <div className="formulario">
        <ProgressBar currentStep={etapaAtual} totalSteps={totalEtapas} />
        {children}
        <div className="botoes-container-anun">
          {etapaAtual > 1 ? (
            <button className="btn-voltar" onClick={onVoltar}>
              <IoIosArrowBack className="arrow-class-og" /> Voltar
            </button>
          ) : (
            <Link to="/">
              <button className="btn-voltar">
                <IoIosArrowBack className="arrow-class-og" /> Página inicial
              </button>
            </Link>
          )}

          {etapaAtual < totalEtapas - 0 ? (
            <button className="btn-avancar" onClick={onProximo}>
              Prosseguir <IoIosArrowForward className="arrow-class-og" />
            </button>
          ) : (
            <Link to="/main">
              <button className="btn-avancar" onClick={onProximo}>
                Criar Anuncio <IoIosArrowForward className="arrow-class-og" />
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
