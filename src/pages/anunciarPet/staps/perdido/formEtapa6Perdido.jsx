import React, { useState, useEffect } from "react";
import FormBase from "../../formBase";
import "./CSS/formEtapa6Perdido.css";

export default function FormEtapa6Perdido({ onProximo, onVoltar, dados }) {
  const [dataDesaparecimento, setDataDesaparecimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [receberAlertas, setReceberAlertas] = useState(false);
  const [declaracao, setDeclaracao] = useState(false);

  const handleTelefoneChange = (e) => {
    let input = e.target.value.replace(/\D/g, ""); // remove tudo que não for número

    if (input.length > 11) input = input.slice(0, 11); // limita a 11 dígitos

    const formatado = input
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");

    setTelefone(formatado);
  };

  // Função para formatar data completa com dia da semana
  const formatarDataCompleta = (dataStr) => {
    const data = new Date(dataStr);
    const opcoes = { day: "numeric", month: "long", year: "numeric" };
    const dataFormatada = data.toLocaleDateString("pt-BR", opcoes);
    const diaSemana = data.toLocaleDateString("pt-BR", { weekday: "long" });
    return `${dataFormatada} (${diaSemana})`;
  };

  // Preencher automaticamente com a data de hoje
  useEffect(() => {
    const hoje = new Date();
    const yyyyMMdd = hoje.toISOString().split("T")[0]; // formato compatível com <input type="date">
    setDataDesaparecimento(yyyyMMdd);
  }, []);

  const handleProximo = () => {
    if (!declaracao) {
      alert("É necessário aceitar a Declaração de Veracidade.");
      return;
    }

    onProximo({
      dataDesaparecimento,
      telefone,
      receberAlertas,
      declaracao,
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
              <strong>Atenção:</strong>{" "}
              <em>
                Nunca solicitaremos dados de pagamentos ou cobranças de taxas
                por WhatsApp. Desconfie de qualquer mensagem desse tipo.
              </em>
            </p>
          </label>
        </div>

        <div className="checkbox-bloco">
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={declaracao}
              onChange={() => setDeclaracao(!declaracao)}
            />
            <span>Declaração de Veracidade</span>
            <p className="texto-menor">
              Certifico que todas as informações fornecidas são precisas e
              atualizadas, assumindo total responsabilidade pela divulgação
              deste pet.
            </p>
          </label>
        </div>
      </div>
    </FormBase>
  );
}
