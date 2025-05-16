import React, { useState } from "react";
import FormBase from "../../formBase";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import "./CSS/formEtapa3Perdido.css";

export default function FormEtapa3Perdido({ onProximo, onVoltar, dados }) {
  const [raça, setRaca] = useState("");
  const [porte, setPorte] = useState("");
  const [corPredominante, setCorPredominante] = useState("");
  const [corOlhos, setCorOlhos] = useState("");
  const [idade, setIdade] = useState("");
  const [focusedSelect, setFocusedSelect] = useState(null);

  const racasPorEspecie = {
    Cachorro: [
      "",
      "Vira-lata",
      "Labrador",
      "Poodle",
      "Shih Tzu",
      "Pinscher",
      "Bulldog",
      "Chihuahua",
      "Golden Retriever",
      "Pastor Alemão",
      "Outro",
    ],
    Gato: [
      "",
      "Vira-lata",
      "Persa",
      "Siamês",
      "Maine Coon",
      "Angorá",
      "Sphynx",
      "Outro",
    ],
    Passaro: [
      "",
      "Calopsita",
      "Papagaio",
      "Periquito",
      "Canário",
      "Agapornis",
      "Outro",
    ],
  };

  const racasDisponiveis = racasPorEspecie[dados?.especie] || [];

  const handleProximo = () => {
    onProximo({
      raca: raça,
      porte,
      corPredominante,
      corOlhos,
      idade,
    });
  };

  const renderSelectWithIcon = (label, value, setValue, name, options) => {
    const toggleFocus = () => {
      setFocusedSelect((prev) => (prev === name ? null : name));
    };

    return (
      <div className="etapa3-select-wrapper">
        <label className="etapa3-select-label">
          {label} <span className="etapa3-optional-label">Opcional</span>
        </label>
        <div className="etapa3-select-container">
          <select
            className={`etapa3-custom-select ${
              value === "" ? "placeholder" : ""
            }`}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocusedSelect(name)}
            onClick={toggleFocus}
            onBlur={() => setTimeout(() => setFocusedSelect(null), 100)}
          >
            <option value="" disabled hidden>
              Selecione uma opção
            </option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          {focusedSelect === name ? (
            <IoIosArrowUp className="etapa3-select-icon" />
          ) : (
            <IoIosArrowDown className="etapa3-select-icon" />
          )}
        </div>
      </div>
    );
  };

  return (
    <FormBase etapaAtual={3} onProximo={handleProximo} onVoltar={onVoltar}>
      <div className="formulario-conteudo">
        <h2>Informações adicionais do pet</h2>
        <p>
          Preencha os dados abaixo para nos ajudar a identificar melhor o pet.
        </p>

        <div className="etapa3-select-group">
          {renderSelectWithIcon(
            "Raça",
            raça,
            setRaca,
            "raça",
            racasDisponiveis
          )}
          {renderSelectWithIcon("Porte", porte, setPorte, "porte", [
            "",
            "Pequeno",
            "Médio",
            "Grande",
          ])}
          {renderSelectWithIcon(
            "Cor predominante",
            corPredominante,
            setCorPredominante,
            "corPredominante",
            [
              "",
              "Preta",
              "Branca",
              "Cinza",
              "Marrom",
              "Caramelo",
              "Vermelha",
              "Outra",
            ]
          )}
          {renderSelectWithIcon(
            "Cor dos olhos",
            corOlhos,
            setCorOlhos,
            "corOlhos",
            [
              "",
              "Escuros",
              "Azuis",
              "Verdes",
              "Amarelos",
              "Um de cada cor",
              "Outra",
            ]
          )}
          {renderSelectWithIcon("Idade", idade, setIdade, "idade", [
            "",
            "Filhote",
            "Adulto",
            "Sênior",
          ])}
        </div>
      </div>
    </FormBase>
  );
}
