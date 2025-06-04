import React, { useState, useEffect } from "react";
import { useFormContext } from "../FormContext.jsx";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import FormBase from "../formBase.jsx";

export default function FormEtapa1({ onProximo }) {
  const { formData, updateFormData } = useFormContext();

  // Inicializa estado local com dados do contexto para mostrar no formulário
  const [localData, setLocalData] = useState({
    situacao: formData.situacao || "",
    especie: formData.especie || "",
    genero: formData.genero || "",
  });

  const [selectFocus, setSelectFocus] = useState({
    situacao: false,
    especie: false,
    genero: false,
  });

  const [erro, setErro] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErro("");
    setLocalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocus = (campo) => {
    setSelectFocus((prev) => ({ ...prev, [campo]: true }));
  };

  const handleBlur = (campo) => {
    setSelectFocus((prev) => ({ ...prev, [campo]: false }));
  };

  const handleProximo = () => {
    if (localData.situacao && localData.especie && localData.genero) {
      updateFormData(localData); // Atualiza no contexto
      onProximo(localData);
    } else {
      setErro("Por favor, preencha todos os campos antes de continuar.");
    }
  };

  const situacaoDescricoes = {
    Perdido: "Seu pet sumiu e você está procurando por ele.",
    "Procurando Tutor": "Você encontrou um pet e está procurando o tutor.",
    Adocao: "Você deseja anunciar um pet para adoção.",
  };

  return (
    <FormBase etapaAtual={1} onProximo={handleProximo}>
      <div className="formulario-conteudo">
        <h2>Vamos começar com algumas informações básicas</h2>
        <div className="form-group">
          {/* Situação */}
          <label>
            Situação
            <div className="select-wrapper">
              <select
                name="situacao"
                value={localData.situacao}
                onChange={handleChange}
                onFocus={() => handleFocus("situacao")}
                onBlur={() => handleBlur("situacao")}
                className={`custom-select ${
                  localData.situacao === "" ? "select-placeholder" : ""
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
            {localData.situacao && (
              <p className="descricao-situacao">
                {situacaoDescricoes[localData.situacao]}
              </p>
            )}
          </label>

          {/* Espécie */}
          <label>
            Espécie
            <div className="select-wrapper">
              <select
                name="especie"
                value={localData.especie}
                onChange={handleChange}
                onFocus={() => handleFocus("especie")}
                onBlur={() => handleBlur("especie")}
                className={`custom-select ${
                  localData.especie === "" ? "select-placeholder" : ""
                }`}
              >
                <option value="" disabled hidden>
                  Selecione uma opção
                </option>
                <option value="Cachorro">Cachorro</option>
                <option value="Gato">Gato</option>
                <option value="Pássaro">Pássaro</option>
              </select>
              {selectFocus.especie ? (
                <IoIosArrowUp className="select-icon" />
              ) : (
                <IoIosArrowDown className="select-icon" />
              )}
            </div>
          </label>

          {/* Gênero */}
          <label>
            Gênero
            <div className="select-wrapper">
              <select
                name="genero"
                value={localData.genero}
                onChange={handleChange}
                onFocus={() => handleFocus("genero")}
                onBlur={() => handleBlur("genero")}
                className={`custom-select ${
                  localData.genero === "" ? "select-placeholder" : ""
                }`}
              >
                <option value="" disabled hidden>
                  Selecione uma opção
                </option>
                <option value="Macho">Macho</option>
                <option value="Fêmea">Fêmea</option>
              </select>
              {selectFocus.genero ? (
                <IoIosArrowUp className="select-icon" />
              ) : (
                <IoIosArrowDown className="select-icon" />
              )}
            </div>
          </label>

          {/* Mensagem de erro */}
          {erro && <p style={{ color: "red", marginTop: "1rem" }}>{erro}</p>}
        </div>
      </div>
    </FormBase>
  );
}
