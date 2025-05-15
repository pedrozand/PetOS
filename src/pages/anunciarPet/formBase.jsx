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
  onVoltar, // Adicionado para suportar o botão "Voltar"
}) {
  return (
    <div className="form-container">
      <div className="carrossel-lateral">
        <Carrosel />
      </div>

      <div className="formulario">
        <ProgressBar currentStep={etapaAtual} totalSteps={totalEtapas} />

        {/* Conteúdo específico da etapa */}
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

          <button className="btn-avancar" onClick={onProximo}>
            Prosseguir <IoIosArrowForward className="arrow-class-og" />
          </button>
        </div>
      </div>
    </div>
  );
}
