import React from "react";
import "./cabecalho.css";

const Cabecalho = () => {
  return (
    <div className="cabecalho-container">
      <h1 className="cabecalho-titulo">Achados e Perdidos</h1>
      <p className="cabecalho-subtitulo">Posts de Pets próximos ao endereço:</p>
      <input
        type="text"
        value="Texto fixo"
        readonly
        className="cabecalho-barra"
      />
    </div>
  );
};

export default Cabecalho;
