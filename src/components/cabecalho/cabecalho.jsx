import React, { useContext } from "react";
import LocationContext from "../location/LocationContext";

const Cabecalho = () => {
  const { location } = useContext(LocationContext);

  return (
    <header>
      <h1>Posts de Pets próximos ao endereço:</h1>
      {location ? <p>{location}</p> : <p>Carregando localização...</p>}
    </header>
  );
};

export default Cabecalho;
