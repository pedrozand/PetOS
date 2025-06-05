import React from "react";

export default function FormEtapa6Tutor({ onProximo, dados }) {
  return (
    <div>
      <h2>Etapa 6 - Procurando Tutor</h2>
      <pre>{JSON.stringify(dados, null, 2)}</pre>
      <button onClick={() => onProximo({ exemplo: "Etapa 6 Tutor" })}>
        Próximo
      </button>
    </div>
  );
}
