import React from "react";

export default function FormEtapa3Adocao({ onProximo, dados }) {
  return (
    <div>
      <h2>Etapa 3 - Para Adoção</h2>
      <pre>{JSON.stringify(dados, null, 2)}</pre>
      <button onClick={() => onProximo({ exemplo: "Etapa 3 Adocao" })}>
        Próximo
      </button>
    </div>
  );
}
