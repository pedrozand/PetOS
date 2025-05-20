import React, { useState, useEffect } from "react";
import FormBase from "../../formBase";
import "./CSS/formEtapa6Perdido.css";

export default function FormEtapa6Perdido({ onProximo, onVoltar, dados }) {
  const [dataDesaparecimento, setDataDesaparecimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [periodo, setPeriodo] = useState(""); // novo estado
  const [receberAlertas, setReceberAlertas] = useState(false);
  const [declaracao, setDeclaracao] = useState(false);
  const [telefoneErro, setTelefoneErro] = useState("");
  const [declaracaoErro, setDeclaracaoErro] = useState("");

  const handleTelefoneChange = (e) => {
    let input = e.target.value.replace(/\D/g, "");
    if (input.length > 11) input = input.slice(0, 11);
    const formatado = input
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
    setTelefone(formatado);

    if (input.length === 11) {
      setTelefoneErro("");
    }
  };

  const formatarDataCompleta = (dataStr) => {
    const data = new Date(dataStr);
    const opcoes = { day: "numeric", month: "long", year: "numeric" };
    const dataFormatada = data.toLocaleDateString("pt-BR", opcoes);
    const diaSemana = data.toLocaleDateString("pt-BR", { weekday: "long" });
    return `${dataFormatada} (${diaSemana})`;
  };

  useEffect(() => {
    const hoje = new Date();
    const yyyyMMdd = hoje.toISOString().split("T")[0];
    setDataDesaparecimento(yyyyMMdd);
  }, []);

  const handleProximo = () => {
    const telefoneNumeros = telefone.replace(/\D/g, "");

    let houveErro = false;

    // Verifica telefone
    if (telefoneNumeros.length !== 11) {
      setTelefoneErro("Insira um número de telefone válido com DDD.");
      houveErro = true;
    } else {
      setTelefoneErro("");
    }

    // Verifica declaração
    if (!declaracao) {
      setDeclaracaoErro("É necessário aceitar a Declaração de Veracidade.");
      houveErro = true;
    } else {
      setDeclaracaoErro("");
    }

    if (houveErro) return;

    // Se tudo estiver certo, avança
    onProximo({
      dataDesaparecimento,
      telefone,
      receberAlertas,
      declaracao,
      periodo,
    });
  };

  return (
    <FormBase etapaAtual={6} onProximo={handleProximo} onVoltar={onVoltar}>
      <div className="formulario-conteudo">
        <div className="campo">
          <label>Data do desaparecimento</label>
          <input
            type="date"
            value={dataDesaparecimento}
            onChange={(e) => setDataDesaparecimento(e.target.value)}
          />
          {dataDesaparecimento && (
            <p className="data-formatada">
              {formatarDataCompleta(dataDesaparecimento)}
            </p>
          )}
        </div>

        <div className="campo">
          <label>Telefone com WhatsApp</label>
          <input
            type="tel"
            placeholder="Insira seu telefone com DDD"
            value={telefone}
            onChange={handleTelefoneChange}
          />
          {telefoneErro && <p className="erro-telefone">{telefoneErro}</p>}
        </div>

        {/* NOVO CAMPO DE PERÍODO */}
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
                  periodo === p ? "ativo" : ""
                } pos-${index}`}
                onClick={() => setPeriodo(periodo === p ? "" : p)}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="checkbox-bloco">
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={receberAlertas}
              onChange={() => setReceberAlertas(!receberAlertas)}
            />
            <span>Receber alertas por WhatsApp</span>
            <p className="texto-menor">
              Concordo em receber comunicações relevantes por WhatsApp de outros
              usuários.
              <br />
            </p>
          </label>
        </div>

        <div className="checkbox-bloco">
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={declaracao}
              onChange={() => {
                setDeclaracao(!declaracao);
                if (!declaracaoErro && !declaracao) return;
                setDeclaracaoErro("");
              }}
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
