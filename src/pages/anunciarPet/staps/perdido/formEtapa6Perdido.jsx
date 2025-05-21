import React, { useState, useEffect } from "react";
import FormBase from "../../formBase";
import { useFormContext } from "../../FormContext.jsx";
import "./CSS/formEtapa6Perdido.css";

export default function FormEtapa6Perdido({ onProximo, onVoltar }) {
  const { formData, updateFormData } = useFormContext();

  // Função para obter data de hoje no formato YYYY-MM-DD ajustada para fuso horário local
  const getDataHoje = () => {
    const hoje = new Date();
    hoje.setMinutes(hoje.getMinutes() - hoje.getTimezoneOffset()); // Ajusta fuso horário local
    return hoje.toISOString().split("T")[0];
  };

  const [localData, setLocalData] = useState({
    dataDesaparecimento: formData.dataDesaparecimento || "",
    telefone: formData.telefone || "",
    periodo: formData.periodo || "",
    receberAlertas: formData.receberAlertas || false,
    declaracao: formData.declaracao || false,
  });

  const [telefoneErro, setTelefoneErro] = useState("");
  const [declaracaoErro, setDeclaracaoErro] = useState("");

  // Formata data para exibição legível, corrigindo problema do fuso horário
  const formatarDataCompleta = (dataStr) => {
    const [ano, mes, dia] = dataStr.split("-");
    // Criar data no horário local
    const data = new Date(ano, mes - 1, dia);
    const opcoes = { day: "numeric", month: "long", year: "numeric" };
    const dataFormatada = data.toLocaleDateString("pt-BR", opcoes);
    const diaSemana = data.toLocaleDateString("pt-BR", { weekday: "long" });
    return `${dataFormatada} (${diaSemana})`;
  };

  // Define a data inicial como hoje, considerando fuso horário local
  useEffect(() => {
    if (!localData.dataDesaparecimento) {
      setLocalData((prev) => ({ ...prev, dataDesaparecimento: getDataHoje() }));
    }
  }, []); // só na montagem

  const handleChange = (campo, valor) => {
    setTelefoneErro("");
    setDeclaracaoErro("");
    setLocalData((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleTelefoneChange = (e) => {
    let input = e.target.value.replace(/\D/g, "");
    if (input.length > 11) input = input.slice(0, 11);
    const formatado = input
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
    handleChange("telefone", formatado);
  };

  const handleProximo = () => {
    const telefoneNumeros = localData.telefone.replace(/\D/g, "");
    let houveErro = false;

    if (telefoneNumeros.length !== 11) {
      setTelefoneErro("Insira um número de telefone válido com DDD.");
      houveErro = true;
    }

    if (!localData.declaracao) {
      setDeclaracaoErro("É necessário aceitar a Declaração de Veracidade.");
      houveErro = true;
    }

    if (houveErro) return;

    updateFormData(localData);
    onProximo(localData);
  };

  return (
    <FormBase etapaAtual={6} onProximo={handleProximo} onVoltar={onVoltar}>
      <div className="formulario-conteudo">
        {/* Data */}
        <div className="campo">
          <label>Data do desaparecimento</label>
          <input
            type="date"
            value={localData.dataDesaparecimento}
            onChange={(e) =>
              handleChange("dataDesaparecimento", e.target.value)
            }
          />
          {localData.dataDesaparecimento && (
            <p className="data-formatada">
              {formatarDataCompleta(localData.dataDesaparecimento)}
            </p>
          )}
        </div>

        {/* Telefone */}
        <div className="campo">
          <label>Telefone com WhatsApp</label>
          <input
            type="tel"
            placeholder="Insira seu telefone com DDD"
            value={localData.telefone}
            onChange={handleTelefoneChange}
          />
          {telefoneErro && <p className="erro-telefone">{telefoneErro}</p>}
        </div>

        {/* Período */}
        <div className="campo">
          <label>
            Período do desaparecimento{" "}
            <span className="opcional">Opcional</span>
          </label>
          <div className="periodo-selector">
            {["Manhã", "Tarde", "Noite"].map((p, index) => (
              <button
                key={p}
                type="button"
                className={`periodo-botao ${
                  localData.periodo === p ? "ativo" : ""
                } pos-${index}`}
                onClick={() =>
                  handleChange("periodo", localData.periodo === p ? "" : p)
                }
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Alertas */}
        <div className="checkbox-bloco">
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={localData.receberAlertas}
              onChange={() =>
                handleChange("receberAlertas", !localData.receberAlertas)
              }
            />
            <span>Receber alertas por WhatsApp</span>
            <p className="texto-menor">
              Concordo em receber comunicações relevantes por WhatsApp de outros
              usuários.
            </p>
          </label>
        </div>

        {/* Declaração */}
        <div className="checkbox-bloco">
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={localData.declaracao}
              onChange={() => handleChange("declaracao", !localData.declaracao)}
            />
            <span>Declaração de Veracidade</span>
            <p className="texto-menor">
              Certifico que todas as informações fornecidas são precisas e
              atualizadas, assumindo total responsabilidade pela divulgação
              deste pet.
            </p>
          </label>
          {declaracaoErro && (
            <p className="erro-declaracao">{declaracaoErro}</p>
          )}
        </div>
      </div>
    </FormBase>
  );
}
