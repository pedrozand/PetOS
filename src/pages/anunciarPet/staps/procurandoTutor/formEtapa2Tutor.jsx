import React from "react";

export default function FormEtapa2Tutor({ onProximo, dados }) {
  return (
    <div>
      <h2>Etapa 2 - Procurando Tutor</h2>
      <pre>{JSON.stringify(dados, null, 2)}</pre>
      <button onClick={() => onProximo({ exemplo: "Etapa 2 Tutor" })}>
        Próximo
      </button>
    </div>
  );
}
