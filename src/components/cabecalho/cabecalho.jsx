import React, { useContext } from "react";
import LocationContext from "../../../server/location/LocationContext.jsx";
import "./cabecalho.css";

const Cabecalho = () => {
  const { location } = useContext(LocationContext);

  return (
    <div className="cabecalho-container">
      <h1 className="cabecalho-titulo">Achados e Perdidos</h1>
      <p className="cabecalho-subtitulo">
        Veja os posts de pets próximos ao endereço:
      </p>
      <div className="cabecalho-barra-container">
        <i className="fas fa-map-marker-alt icone-localizacao" />
        <input
          type="text"
          value={location || ""}
          readOnly
          className="cabecalho-barra"
          placeholder="Localização não disponível"
        />
      </div>
    </div>
  );
};

export default Cabecalho;
