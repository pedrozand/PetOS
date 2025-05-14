import React from "react";

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosArrowDown,
  IoIosArrowUp,
} from "react-icons/io";

import Carrosel from "../../components/carrosel-2/carrosel-2.jsx";
import ProgressBar from "../../components/progressbar/progressbar.jsx";
import "./CSS/anunciarPet.css";

export default function FormEtapa1({ onProximo }) {
  const [etapaAtual, setEtapaAtual] = React.useState(1);

  const totalEtapas = 7;

  const [formData, setFormData] = useState({
    situacao: "",
    especie: "",
    genero: "",
  });

  const [selectFocus, setSelectFocus] = useState({
    situacao: false,
    especie: false,
    genero: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFocus = (campo) => {
    setSelectFocus((prev) => ({ ...prev, [campo]: true }));
  };

  const handleBlur = (campo) => {
    setSelectFocus((prev) => ({ ...prev, [campo]: false }));
  };

  const handleProximo = () => {
    onProximo(formData);
  };

  const situacaoDescricoes = {
    Perdido: "Seu pet sumiu e você está procurando por ele.",
    "Procurando Tutor": "Você encontrou um pet e está procurando o tutor.",
    Adocao: "Você deseja anunciar um pet para adoção.",
  };

  return (
    <div className="form-container">
      <div className="carrossel-lateral">
        <Carrosel />
      </div>

      <div className="formulario">
        <ProgressBar currentStep={etapaAtual} totalSteps={totalEtapas} />
        <div className="formulario-conteudo">
          <h2>Vamos começar com algumas informações básicas</h2>
          <div className="form-group">
            {/* Situação */}
            <label>
              Situação
              <div className="select-wrapper">
                <select
                  name="situacao"
                  value={formData.situacao}
                  onChange={handleChange}
                  onFocus={() => handleFocus("situacao")}
                  onBlur={() => handleBlur("situacao")}
                  className={`custom-select ${
                    formData.situacao === "" ? "select-placeholder" : ""
                  }`}
                >
                  <option value="" disabled hidden>
                    Selecione uma opção
                  </option>
                  <option value="Perdido">Perdido</option>
                  <option value="Procurando Tutor">Procurando um Tutor</option>
                  <option value="Adocao">Para Adoção</option>
                </select>
                {selectFocus.situacao ? (
                  <IoIosArrowUp className="select-icon" />
                ) : (
                  <IoIosArrowDown className="select-icon" />
                )}
              </div>
              {formData.situacao && (
                <p className="descricao-situacao">
                  {situacaoDescricoes[formData.situacao]}
                </p>
              )}
            </label>

            <label>
              Espécie
              <div className="select-wrapper">
                <select
                  name="especie"
                  value={formData.especie}
                  onChange={handleChange}
                  onFocus={() => handleFocus("especie")}
                  onBlur={() => handleBlur("especie")}
                  className={`custom-select ${
                    formData.especie === "" ? "select-placeholder" : ""
                  }`}
                >
                  <option value="" disabled hidden>
                    Selecione uma opção
                  </option>
                  <option value="Cachorro">Cachorro</option>
                  <option value="Gato">Gato</option>
                  <option value="Passaro">Pássaro</option>
                </select>
                {selectFocus.especie ? (
                  <IoIosArrowUp className="select-icon" />
                ) : (
                  <IoIosArrowDown className="select-icon" />
                )}
              </div>
            </label>

            <label>
              Gênero
              <div className="select-wrapper">
                <select
                  name="genero"
                  value={formData.genero}
                  onChange={handleChange}
                  onFocus={() => handleFocus("genero")}
                  onBlur={() => handleBlur("genero")}
                  className={`custom-select ${
                    formData.genero === "" ? "select-placeholder" : ""
                  }`}
                >
                  <option value="" disabled hidden>
                    Selecione uma opção
                  </option>
                  <option value="Macho">Macho</option>
                  <option value="Femea">Fêmea</option>
                </select>
                {selectFocus.genero ? (
                  <IoIosArrowUp className="select-icon" />
                ) : (
                  <IoIosArrowDown className="select-icon" />
                )}
              </div>
            </label>
          </div>
        </div>

        <div className="botoes-container-anun">
          <Link to="/">
            <button className="btn-voltar">
              <IoIosArrowBack className="arrow-class-og" /> Página inicial
            </button>
          </Link>
          <button className="btn-avancar" onClick={handleProximo}>
            Prosseguir <IoIosArrowForward className="arrow-class-og" />
          </button>
        </div>
      </div>
    </div>
  );
}
