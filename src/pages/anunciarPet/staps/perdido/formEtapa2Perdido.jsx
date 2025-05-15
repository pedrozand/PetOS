import React from "react";

export default function FormEtapa2({ formData, onVoltar, onProximo }) {
  const [data, setData] = React.useState({
    nome: "",
    idade: "",
    ...formData, // mantém dados anteriores
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleProximo = () => {
    onProximo(data);
  };

  return (
    <div className="formulario">
      <h2>Informações adicionais do pet</h2>
      <label>
        Nome do Pet
        <input
          type="text"
          name="nome"
          value={data.nome}
          onChange={handleChange}
        />
      </label>

      <label>
        Idade
        <input
          type="text"
          name="idade"
          value={data.idade}
          onChange={handleChange}
        />
      </label>

      <div className="botoes-container-anun">
        <button className="btn-voltar" onClick={() => onVoltar(data)}>
          Voltar
        </button>
        <button className="btn-avancar" onClick={handleProximo}>
          Prosseguir
        </button>
      </div>
    </div>
  );
}
