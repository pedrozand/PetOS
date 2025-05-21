import React, { useEffect, useState } from "react";
import FormBase from "../../formBase";
import { useFormContext } from "../../FormContext";

export default function FormEtapa7Perdido({ onProximo, onVoltar }) {
  const { formData } = useFormContext();
  const [previews, setPreviews] = useState([]);

  const handleProximo = () => {
    onProximo({ confirmacao: true }); // Exemplo, pode ser ajustado
  };

  useEffect(() => {
    if (formData.fotos && formData.fotos.length > 0) {
      const previewUrls = formData.fotos.map((file) =>
        typeof file === "string" ? file : URL.createObjectURL(file)
      );
      setPreviews(previewUrls);

      // Cleanup
      return () => {
        previewUrls.forEach((url) => {
          if (url.startsWith("blob:")) URL.revokeObjectURL(url);
        });
      };
    }
  }, [formData.fotos]);

  return (
    <FormBase etapaAtual={7} onProximo={handleProximo} onVoltar={onVoltar}>
      <div className="formulario-conteudo">
        <h2>Resumo das Informações</h2>
        <p>Confira os dados preenchidos antes de finalizar:</p>

        <div className="resumo-dados">
          <p>
            <strong>Situação:</strong> {formData.situacao}
          </p>
          <p>
            <strong>Espécie:</strong> {formData.especie}
          </p>
          <p>
            <strong>Gênero:</strong> {formData.genero}
          </p>

          {previews.length > 0 && (
            <div className="resumo-fotos">
              <h3>Fotos do Pet:</h3>
              <div className="resumo-fotos-grid">
                {previews.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Foto ${index + 1}`}
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      margin: "5px",
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          <p>
            <strong>Nome:</strong> {formData.nomePet}
          </p>
          <p>
            <strong>Decrição:</strong> {formData.descricao}
          </p>
          <p>
            <strong>Recompensa:</strong> {formData.valorRecompensa}
          </p>
          <p>
            <strong>Raça:</strong> {formData.raca}
          </p>
          <p>
            <strong>Porte:</strong> {formData.porte}
          </p>
          <p>
            <strong>Cor Predominante:</strong> {formData.corPredominante}
          </p>
          <p>
            <strong>Cor dos Olhos:</strong> {formData.corOlhos}
          </p>
          <p>
            <strong>Idade Aproximada:</strong> {formData.idade}
          </p>
          <p>
            <strong>Última Localização Vista:</strong> {formData.local}
          </p>
          <p>
            <strong>Ponto de Referência:</strong> {formData.referencia}
          </p>
          <p>
            <strong>Data de Desaparecimento:</strong>{" "}
            {formData.dataDesaparecimento}
          </p>
          <p>
            <strong>Telefone:</strong> {formData.telefone}
          </p>
          <p>
            <strong>Período:</strong> {formData.periodo}
          </p>
        </div>
      </div>
    </FormBase>
  );
}
