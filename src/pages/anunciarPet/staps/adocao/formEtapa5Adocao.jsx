import { useState, useEffect } from "react";
import { useFormContext } from "../../FormContext.jsx";
import FormBase from "../../formBase";
import "./CSS/formEtapa5Adocao.css";

const CARACTERISTICAS = {
  cuidados: [
    "Vacinado",
    "Castrado",
    "Vermifugado",
    "Microchipado",
    "Necessidades especiais",
  ],
  temperamento: [
    "Dócil",
    "Agressivo",
    "Brincalhão",
    "Calmo",
    "Sociável",
    "Tímido",
    "Independente",
    "Carente",
    "Energia alta",
    "Medroso",
  ],
  adaptabilidade: [
    "Vive bem em apartamento",
    "Vive bem em casa com quintal",
    "Necessita de espaço amplo",
    "Se adapta a mudanças frequentes",
  ],
  socializacao: [
    "Sociável com crianças",
    "Sociável com gatos",
    "Sociável com cães",
    "Sociável com estranhos",
    "Tolerante a visitas",
  ],
};

export default function FormEtapa5Adocao({ onProximo, onVoltar }) {
  const { formData, updateFormData } = useFormContext();

  const [caracteristicas, setCaracteristicas] = useState(
    formData.caracteristicas || {
      cuidados: [],
      temperamento: [],
      adaptabilidade: [],
      socializacao: [],
    }
  );

  const toggleSelecao = (categoria, item) => {
    setCaracteristicas((prev) => {
      const jaSelecionado = prev[categoria].includes(item);
      return {
        ...prev,
        [categoria]: jaSelecionado
          ? prev[categoria].filter((i) => i !== item)
          : [...prev[categoria], item],
      };
    });
  };

  const handleProximo = () => {
    updateFormData({ ...formData, caracteristicas });
    onProximo({ ...formData, caracteristicas });
  };

  const renderGrupo = (titulo, categoria) => (
    <div className="grupo-caracteristica">
      <h4>{titulo}</h4>
      <div className="botoes-caracteristica">
        {CARACTERISTICAS[categoria].map((item) => (
          <button
            key={item}
            type="button"
            className={`botao-caracteristica ${
              caracteristicas[categoria].includes(item) ? "ativo" : ""
            }`}
            onClick={() => toggleSelecao(categoria, item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <FormBase etapaAtual={5} onProximo={handleProximo} onVoltar={onVoltar}>
      <div className="formulario-scroll-ado">
        <div className="form-wrapper-ado">
          <div className="mensagem-destaque">
            Estamos quase lá! Agora selecione as{" "}
            <b>características que você conhece sobre o pet</b>. Essas
            informações ajudam a entender melhor seu perfil e necessidades.
          </div>
          {renderGrupo("Cuidados Veterinários", "cuidados")}
          {renderGrupo("Temperamento", "temperamento")}
          {renderGrupo("Adaptabilidade", "adaptabilidade")}
          {renderGrupo("Socialização", "socializacao")}
        </div>
      </div>
    </FormBase>
  );
}
