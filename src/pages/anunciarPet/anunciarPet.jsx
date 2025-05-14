import { useState } from "react";
import { Link } from "react-router-dom";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosArrowDown,
  IoIosArrowUp,
} from "react-icons/io";

import Carrosel from "../../components/carrosel-2/carrosel-2.jsx";
import "./CSS/anunciarPet.css";

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

  return (
    <div className="form-container">
      <div className="carrossel-lateral">
        <Carrosel />
      </div>

      <div className="formulario">
        <div className="formulario-conteudo">
          <h2>Vamos começar com algumas informações básicas.</h2>
          <div className="form-group">
            {/* Situação */}
            <label>
              Situação
              <div className="select-wrapper">
                <select
                  name="situacao"
                  value={formData.situacao}
                  onChange={handleChange}
                  className="custom-select"
                >
                  <option value="Perdido">Perdido</option>
                  <option value="Procurando Tutor">Procurando um Tutor</option>
                  <option value="Adocao">Para Adoção</option>
                </select>
                <IoIosArrowDown className="select-icon" />
              </div>
            </label>

            {/* Espécie */}
            <label>
              Espécie
              <div className="select-wrapper">
                <select
                  name="especie"
                  value={formData.especie}
                  onChange={handleChange}
                  className="custom-select"
                >
                  <option value="Cachorro">Cachorro</option>
                  <option value="Gato">Gato</option>
                  <option value="Passaro">Pássaro</option>
                </select>
                <IoIosArrowDown className="select-icon" />
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
                  className="custom-select"
                >
                  <option value="Macho">Macho</option>
                  <option value="Femea">Fêmea</option>
                </select>
                <IoIosArrowDown className="select-icon" />
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
