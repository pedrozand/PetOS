import React from "react";
import "./cabecalho.css";

const Cabecalho = ({ endereco }) => {
  return (
    <div className="cabecalho-container">
      <h1 className="cabecalho-titulo">Achados e Perdidos</h1>
      <p className="cabecalho-subtitulo">Posts de Pets próximos ao endereço:</p>
      <input
        type="text"
        value={endereco}
        readonly
        className="cabecalho-barra"
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
};

export default Cabecalho;
