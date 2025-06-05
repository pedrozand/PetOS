import React from "react";

export default function FormEtapa3Tutor({ onProximo, dados }) {
  return (
    <div>
      <h2>Etapa 3 - Procurando Tutor</h2>
      <pre>{JSON.stringify(dados, null, 2)}</pre>
      <button onClick={() => onProximo({ exemplo: "Etapa 3 Tutor" })}>
        Próximo
      </button>
    </div>
  );
}
