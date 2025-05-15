import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import FormBase from "../formBase.jsx";

export default function FormEtapa1({ onProximo }) {
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

  const [erro, setErro] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErro(""); // limpa o erro ao modificar qualquer campo
  };

  const handleFocus = (campo) => {
    setSelectFocus((prev) => ({ ...prev, [campo]: true }));
  };

  const handleBlur = (campo) => {
    setSelectFocus((prev) => ({ ...prev, [campo]: false }));
  };

  const handleProximo = () => {
    if (formData.situacao && formData.especie && formData.genero) {
      onProximo(formData);
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

          {/* Espécie */}
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

          {/* Gênero */}
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

          {/* Mensagem de erro */}
          {erro && <p style={{ color: "red", marginTop: "1rem" }}>{erro}</p>}
        </div>
      </div>
    </FormBase>
  );
}
