import React from "react";

export default function FormEtapa4Tutor({ onProximo, dados }) {
  return (
    <div>
      <h2>Etapa 4 - Procurando Tutor</h2>
      <pre>{JSON.stringify(dados, null, 2)}</pre>
      <button onClick={() => onProximo({ exemplo: "Etapa 4 Tutor" })}>
        Próximo
      </button>
    </div>
  );
}
