import React from "react";
import FormBase from "../../formBase";

export default function FormEtapa7Perdido({ onProximo, onVoltar, dados }) {
  const handleProximo = () => {
    onProximo({ local: "Exemplo de local perdido" });
  };

  return (
    <FormBase etapaAtual={7} onProximo={handleProximo} onVoltar={onVoltar}>
      <div className="formulario-conteudo">
        <h2>Informações de perda</h2>
        <p>Conteúdo específico para a situação "Perdido"</p>
        {/* Aqui entra qualquer input, mapa ou info específica dessa etapa */}
      </div>
    </FormBase>
  );
}
