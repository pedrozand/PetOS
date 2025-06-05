import React from "react";

export default function FormEtapa7Tutor({ onProximo, dados }) {
  return (
    <div>
      <h2>Etapa 7 - Procurando Tutor</h2>
      <pre>{JSON.stringify(dados, null, 2)}</pre>
      <button onClick={() => onProximo({ exemplo: "Etapa 7 Tutor" })}>
        Próximo
      </button>
    </div>
  );
}
