import React, { useState, useEffect } from "react";
import FormBase from "../../formBase";
import { useFormContext } from "../../FormContext.jsx";
import "./CSS/formEtapa6Tutor.css";

export default function FormEtapa6Tutor({ onProximo, onVoltar }) {
  const { formData, updateFormData } = useFormContext();

  const getDataHoje = () => {
    const hoje = new Date();
    hoje.setMinutes(hoje.getMinutes() - hoje.getTimezoneOffset());
    return hoje.toISOString().split("T")[0];
  };

  const [localData, setLocalData] = useState({
    dataDesaparecimento: formData.dataDesaparecimento || "",
    telefone: formData.telefone || "",
    periodo: formData.periodo || "",
    receberAlertas: formData.receberAlertas || false,
    declaracao: formData.declaracao || false,
    localRadio: formData.declaracao || "",
  });

  const [telefoneErro, setTelefoneErro] = useState("");
  const [declaracaoErro, setDeclaracaoErro] = useState("");

  const formatarDataCompleta = (dataStr) => {
    const [ano, mes, dia] = dataStr.split("-");
    const data = new Date(ano, mes - 1, dia);
    const opcoes = { day: "numeric", month: "long", year: "numeric" };
    const dataFormatada = data.toLocaleDateString("pt-BR", opcoes);
    const diaSemana = data.toLocaleDateString("pt-BR", { weekday: "long" });
    return `${dataFormatada} (${diaSemana})`;
  };

  useEffect(() => {
    if (!localData.dataDesaparecimento) {
      setLocalData((prev) => ({ ...prev, dataDesaparecimento: getDataHoje() }));
    }
  }, []);

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
        <div className="campo-tut">
          <a className="local-pet-radio-tut">Local onde o pet está agora</a>
          <div className="local-pet-opcoes">
            {[
              " Lar Temporário",
              " Petshop",
              " Abrigo",
              " Canil",
              " ONG",
              " Outro",
            ].map((localRadio) => (
              <label key={localRadio} className="local-pet-label">
                <input
                  type="radio"
                  name="localPet"
                  value={localRadio}
                  checked={localData.localPet === localRadio}
                  onChange={() => handleChange("localPet", localRadio)}
                />
                <span>{localRadio}</span>
              </label>
            ))}
          </div>

          {/* Input aparece quando alguma opção for selecionada */}
          {localData.localPet && (
            <input
              type="text"
              className="input-descricao-local"
              placeholder="Descreva mais sobre o local..."
              value={localData.descricaoLocal || ""}
              onChange={(e) => handleChange("descricaoLocal", e.target.value)}
            />
          )}
        </div>

        {/* Data */}
        <div className="campo-tut">
          <label>Data do desaparecimento</label>
          <input
            type="date"
            value={localData.dataDesaparecimento}
            max={getDataHoje()}
            onChange={(e) =>
              handleChange("dataDesaparecimento", e.target.value)
            }
          />
          {localData.dataDesaparecimento && (
            <p className="data-formatada-tut">
              {formatarDataCompleta(localData.dataDesaparecimento)}
            </p>
          )}
        </div>

        {/* Telefone */}
        <div className="campo-tut">
          <label>Telefone com WhatsApp</label>
          <input
            type="tel"
            placeholder="Insira seu telefone com DDD"
            value={localData.telefone}
            onChange={handleTelefoneChange}
          />
          {telefoneErro && <p className="erro-telefone-tut">{telefoneErro}</p>}
        </div>

        {/* Período */}
        <div className="campo-tut">
          <label>
            Período do desaparecimento{" "}
            <span className="opcional-tut">Opcional</span>
          </label>
          <div className="periodo-selector-tut">
            {["Manhã", "Tarde", "Noite"].map((p, index) => (
              <button
                key={p}
                type="button"
                className={`periodo-botao-tut ${
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
        <div className="checkbox-bloco-tut">
          <label className="checkbox-container-tut">
            <input
              type="checkbox"
              checked={localData.receberAlertas}
              onChange={() =>
                handleChange("receberAlertas", !localData.receberAlertas)
              }
            />
            <span>Receber alertas por WhatsApp</span>
            <p className="texto-menor-tut">
              Concordo em receber comunicações relevantes por WhatsApp de outros
              usuários.
            </p>
          </label>
        </div>

        {/* Declaração */}
        <div className="checkbox-bloco-tut">
          <label className="checkbox-container-tut">
            <input
              type="checkbox"
              checked={localData.declaracao}
              onChange={() => handleChange("declaracao", !localData.declaracao)}
            />
            <span>Declaração de Veracidade</span>
            <p className="texto-menor-tut">
              Certifico que todas as informações fornecidas são precisas e
              atualizadas, assumindo total responsabilidade pela divulgação
              deste pet.
            </p>
          </label>
          {declaracaoErro && (
            <p className="erro-declaracao-tut">{declaracaoErro}</p>
          )}
        </div>
      </div>
    </FormBase>
  );
}
