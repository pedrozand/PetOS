import React, { useState, useEffect, useRef } from "react";
import FormBase from "../../formBase";
import "./CSS/formEtapa5Perdido.css";

export default function FormEtapa5Perdido({ onProximo, onVoltar, dados }) {
  const [local, setLocal] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [sugestoes, setSugestoes] = useState([]);
  const bloquearBusca = useRef(false); // ref para evitar buscas indevidas

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

    return [rua, bairro, cidade, estado, pais].filter(Boolean).join(", ");
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (bloquearBusca.current) {
        bloquearBusca.current = false; // desbloqueia após evitar 1 ciclo
        return;
      }

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
  }, [inputValue]);

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
                bloquearBusca.current = true; // impede nova busca
                setSugestoes([]); // limpa lista
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

          {sugestoes.length > 0 && (
            <ul className="sugestoes-lista">
              {sugestoes.map((item) => (
                <li
                  key={item.place_id}
                  onClick={() => {
                    const enderecoFormatado = formatarEndereco(item.address);
                    setLocal(enderecoFormatado);
                    setInputValue(enderecoFormatado);
                    bloquearBusca.current = true;
                    setSugestoes([]);
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
