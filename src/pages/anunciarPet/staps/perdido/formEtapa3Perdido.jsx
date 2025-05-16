import React, { useState } from "react";
import FormBase from "../../formBase";
import "./CSS/formEtapa3Perdido.css";

export default function FormEtapa3Perdido({ onProximo, onVoltar, dados }) {
  const [raça, setRaca] = useState("");
  const [porte, setPorte] = useState("");
  const [corPredominante, setCorPredominante] = useState("");
  const [corOlhos, setCorOlhos] = useState("");
  const [idade, setIdade] = useState("");

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

  return (
    <FormBase etapaAtual={3} onProximo={handleProximo} onVoltar={onVoltar}>
      <div className="formulario-conteudo">
        <h2>Informações adicionais do pet</h2>
        <p>
          Preencha os dados abaixo para nos ajudar a identificar melhor o pet.
        </p>

        <div className="etapa3-select-group">
          {/* Raça */}
          <div className="etapa3-select-wrapper">
            <label className="etapa3-select-label">
              Raça <span className="etapa3-optional-label">Opcional</span>
            </label>
            <select
              className={`etapa3-custom-select ${
                raça === "" ? "placeholder" : ""
              }`}
              value={raça}
              onChange={(e) => setRaca(e.target.value)}
            >
              <option value="" disabled hidden>
                Selecione uma opção
              </option>
              {racasDisponiveis.map((r, index) => (
                <option key={index} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Porte */}
          <div className="etapa3-select-wrapper">
            <label className="etapa3-select-label">
              Porte <span className="etapa3-optional-label">Opcional</span>
            </label>
            <select
              className={`etapa3-custom-select ${
                porte === "" ? "placeholder" : ""
              }`}
              value={porte}
              onChange={(e) => setPorte(e.target.value)}
            >
              <option value="" disabled hidden>
                Selecione uma opção
              </option>
              <option value=""></option>
              <option value="Pequeno">Pequeno</option>
              <option value="Médio">Médio</option>
              <option value="Grande">Grande</option>
            </select>
          </div>

          {/* Cor Predominante */}
          <div className="etapa3-select-wrapper">
            <label className="etapa3-select-label">
              Cor predominante{" "}
              <span className="etapa3-optional-label">Opcional</span>
            </label>
            <select
              className={`etapa3-custom-select ${
                corPredominante === "" ? "placeholder" : ""
              }`}
              value={corPredominante}
              onChange={(e) => setCorPredominante(e.target.value)}
            >
              <option value="" disabled hidden>
                Selecione uma opção
              </option>
              <option value=""></option>
              <option value="Preta">Preta</option>
              <option value="Branca">Branca</option>
              <option value="Cinza">Cinza</option>
              <option value="Marrom">Marrom</option>
              <option value="Caramelo">Caramelo</option>
              <option value="Vermelha">Vermelha</option>
              <option value="Outra">Outra</option>
            </select>
          </div>

          {/* Cor dos Olhos */}
          <div className="etapa3-select-wrapper">
            <label className="etapa3-select-label">
              Cor dos olhos{" "}
              <span className="etapa3-optional-label">Opcional</span>
            </label>
            <select
              className={`etapa3-custom-select ${
                corOlhos === "" ? "placeholder" : ""
              }`}
              value={corOlhos}
              onChange={(e) => setCorOlhos(e.target.value)}
            >
              <option value="" disabled hidden>
                Selecione uma opção
              </option>
              <option value=""></option>
              <option value="Escuros">Escuros</option>
              <option value="Azuis">Azuis</option>
              <option value="Verdes">Verdes</option>
              <option value="Amarelos">Amarelos</option>
              <option value="Um de cada cor">Um de cada cor</option>
              <option value="Outra">Outra</option>
            </select>
          </div>

          {/* Idade */}
          <div className="etapa3-select-wrapper">
            <label className="etapa3-select-label">
              Idade <span className="etapa3-optional-label">Opcional</span>
            </label>
            <select
              className={`etapa3-custom-select ${
                idade === "" ? "placeholder" : ""
              }`}
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
            >
              <option
                value=""
                disabled
                hidden
                className="etapa3-select-placeholder"
              >
                Selecione uma opção
              </option>
              <option value=""></option>
              <option value="Filhote">Filhote</option>
              <option value="Adulto">Adulto</option>
              <option value="Sênior">Sênior</option>
            </select>
          </div>
        </div>
      </div>
    </FormBase>
  );
}
