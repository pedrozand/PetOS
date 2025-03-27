import React, { useContext } from "react";
import LocationContext from "../location/LocationContext";
import "./cabecalho.css";

const Cabecalho = () => {
  const { location } = useContext(LocationContext);

  return (
    <div className="cabecalho-container">
      <h1 className="cabecalho-titulo">Achados e Perdidos</h1>
      <p className="cabecalho-subtitulo">Posts de Pets próximos ao endereço:</p>
      <input
        type="text"
        value={location ? location : ""}
        readOnly
        className="cabecalho-barra"
      />
    </div>
  );
};

export default Cabecalho;
