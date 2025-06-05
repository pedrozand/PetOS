import React from "react";

export default function FormEtapa5Tutor({ onProximo, dados }) {
  return (
    <div>
      <h2>Etapa 5 - Procurando Tutor</h2>
      <pre>{JSON.stringify(dados, null, 2)}</pre>
      <button onClick={() => onProximo({ exemplo: "Etapa 5 Tutor" })}>
        Próximo
      </button>
    </div>
  );
}
