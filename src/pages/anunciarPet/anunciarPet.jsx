import { useState } from "react";
import Carrosel from "../../components/carrosel-2/carrosel-2.jsx";
import "./CSS/anunciarPet.css";

export default function FormEtapa1({ onProximo }) {
  const [formData, setFormData] = useState({
    situacao: "",
    especie: "",
    genero: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProximo = () => {
    onProximo(formData); // Envia os dados para o componente pai
  };

  return (
    <div className="form-container">
      <div className="carrossel-lateral">
        <Carrosel />
      </div>

      <div className="formulario">
        <h2>Vamos começar com algumas informações básicas.</h2>

        <label>
          Situação
          <select
            name="situacao"
            value={formData.situacao}
            onChange={handleChange}
          >
            <option value="">Selecione</option>
            <option value="Perdido">Perdido</option>
            <option value="Procurando Tutor">Procurando um Tutor</option>
            <option value="Adocao">Para Adoção</option>
          </select>
        </label>

        <label>
          Espécie
          <select
            name="especie"
            value={formData.especie}
            onChange={handleChange}
          >
            <option value="">Selecione</option>
            <option value="Cachorro">Cachorro</option>
            <option value="Gato">Gato</option>
            <option value="Passaro">Pássaro</option>
          </select>
        </label>

        <label>
          Gênero
          <select name="genero" value={formData.genero} onChange={handleChange}>
            <option value="">Selecione</option>
            <option value="Macho">Macho</option>
            <option value="Femea">Fêmea</option>
          </select>
        </label>

        <div className="botoes-navegacao">
          <button className="btn-voltar">← Página inicial</button>
          <button className="btn-avancar" onClick={handleProximo}>
            Prosseguir →
          </button>
        </div>
      </div>
    </div>
  );
}
