import React, { useState, useEffect } from "react";
import FormBase from "../../formBase";
import "./CSS/formEtapa5Perdido.css";

export default function FormEtapa5Perdido({ onProximo, onVoltar, dados }) {
  const [local, setLocal] = useState(""); // endereço final selecionado
  const [inputValue, setInputValue] = useState(""); // o que o usuário digita
  const [sugestoes, setSugestoes] = useState([]);
  const [bloquearBusca, setBloquearBusca] = useState(false);

  const handleProximo = () => {
    onProximo({ local });
  };

  const formatarEndereco = (address) => {
    const { road, residential, suburb, city, town, state, country } = address;

    const rua = road || residential || "";
    const bairro = suburb || "";
    const cidade = city || town || "";
    const estado = state || "";
    const pais = country || "";

    return [rua, bairro, cidade, estado, pais]
      .filter((part) => part)
      .join(", ");
  };

  // Busca endereços conforme o usuário digita
  useEffect(() => {
    if (bloquearBusca) {
      setBloquearBusca(false);
      return; // Evita nova busca após selecionar sugestão
    }

    const delayDebounce = setTimeout(() => {
      if (inputValue.length > 3) {
        fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            inputValue
          )}&format=json&addressdetails=1&bounded=1&viewbox=-46.6371,-22.9725,-46.4835,-22.9275`
        )
          .then((res) => res.json())
          .then((data) => setSugestoes(data))
          .catch((err) => console.error("Erro ao buscar endereço:", err));
      } else {
        setSugestoes([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [inputValue, bloquearBusca]);

  // Captura localização atual
  const usarLocalizacaoAtual = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          )
            .then((res) => res.json())
            .then((data) => {
              if (data.display_name) {
                const enderecoFormatado = formatarEndereco(data.address);
                setLocal(enderecoFormatado);
                setInputValue(enderecoFormatado);
                setBloquearBusca(true);
              }
            })
            .catch((err) =>
              console.error("Erro ao buscar endereço atual:", err)
            );
        },
        (error) => {
          console.error("Erro ao obter localização:", error);
        }
      );
    } else {
      alert("Geolocalização não é suportada no seu navegador.");
    }
  };

  return (
    <FormBase etapaAtual={5} onProximo={handleProximo} onVoltar={onVoltar}>
      <div className="formulario-conteudo">
        <div className="endereco-container">
          <div className="endereco-instrucao">
            <p>
              Nos informe o local onde o pet foi visto pela última vez. Caso não
              saiba exatamente o endereço, indique um ponto de referência
              próximo.
            </p>
          </div>

          <div className="endereco-label-linha">
            <label className="form-label">Endereço</label>
            <button
              className="usar-localizacao-btn"
              type="button"
              onClick={usarLocalizacaoAtual}
            >
              Usar localização atual
            </button>
          </div>

          <input
            type="text"
            className="endereco-input"
            placeholder="Insira o endereço onde o pet foi visto pela última vez."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          {/* Sugestões de endereço da busca */}
          {sugestoes.length > 0 && (
            <ul className="sugestoes-lista">
              {sugestoes.map((item) => (
                <li
                  key={item.place_id}
                  onClick={() => {
                    const enderecoFormatado = formatarEndereco(item.address);
                    setLocal(enderecoFormatado);
                    setInputValue(enderecoFormatado);
                    setSugestoes([]);
                    setBloquearBusca(true); // Evita a nova busca
                  }}
                  className="sugestao-item"
                >
                  {formatarEndereco(item.address)}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </FormBase>
  );
}
