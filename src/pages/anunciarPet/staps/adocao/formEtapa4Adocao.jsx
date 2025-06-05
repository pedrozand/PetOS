import React from "react";

export default function FormEtapa4Adocao({ onProximo, dados }) {
  return (
    <div>
      <h2>Etapa 2 - Para Adoção</h2>
      <pre>{JSON.stringify(dados, null, 2)}</pre>
      <button onClick={() => onProximo({ exemplo: "Etapa 2 Adocao" })}>
        Próximo
      </button>
    </div>
  );
}
