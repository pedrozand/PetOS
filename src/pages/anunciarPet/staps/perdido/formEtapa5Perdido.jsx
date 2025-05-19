import React, { useState, useEffect, useRef } from "react";
import FormBase from "../../formBase";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./CSS/formEtapa5Perdido.css";

export default function FormEtapa5Perdido({ onProximo, onVoltar }) {
  const [local, setLocal] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [sugestoes, setSugestoes] = useState([]);
  const [coordenadas, setCoordenadas] = useState(null);
  const [referencia, setReferencia] = useState(""); // para ponto de referência
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const bloquearBusca = useRef(false);

  const formatarEndereco = (address) => {
    const { road, residential, suburb, city, town, state, country } = address;
    const rua = road || residential || "";
    const bairro = suburb || "";
    const cidade = city || town || "";
    const estado = state || "";
    const pais = country || "";
    return [rua, bairro, cidade, estado, pais].filter(Boolean).join(", ");
  };

  const handleProximo = () => {
    // Passa local e referencia no próximo
    onProximo({ local, referencia });
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (bloquearBusca.current) {
        bloquearBusca.current = false;
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
                setCoordenadas([latitude, longitude]);
                bloquearBusca.current = true;
                setSugestoes([]);
              }
            });
        },
        (error) => {
          console.error("Erro ao obter localização:", error);
        }
      );
    } else {
      alert("Geolocalização não é suportada.");
    }
  };

  // Inicializa o mapa quando coordenadas aparecem
  useEffect(() => {
    if (coordenadas && !mapRef.current) {
      // Inicializa o mapa somente quando o div está no DOM (porque renderiza só se coordenadas)
      mapRef.current = L.map("map").setView(coordenadas, 16);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
      }).addTo(mapRef.current);
    }

    if (coordenadas && mapRef.current) {
      const [lat, lon] = coordenadas;
      mapRef.current.setView([lat, lon], 16);

      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lon]);
      } else {
        markerRef.current = L.marker([lat, lon]).addTo(mapRef.current);
      }
    }
  }, [coordenadas]);

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
              type="button"
              className="usar-localizacao-btn"
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
              {sugestoes.map((item) => {
                const endereco = formatarEndereco(item.address);
                return (
                  <li
                    key={item.place_id}
                    onClick={() => {
                      setLocal(endereco);
                      setInputValue(endereco);
                      bloquearBusca.current = true;
                      setCoordenadas([item.lat, item.lon]);
                      setSugestoes([]);
                    }}
                    className="sugestao-item"
                  >
                    {endereco}
                  </li>
                );
              })}
            </ul>
          )}

          {/* Caixa para ponto de referência - sempre aparece */}
          <div className="referencia-container" style={{ marginTop: "15px" }}>
            <label className="form-label">Ponto de referência (opcional)</label>
            <input
              id="referenciaInput"
              type="text"
              className="referencia-input"
              placeholder="Descreva um ponto de referência próximo"
              value={referencia}
              onChange={(e) => setReferencia(e.target.value)}
            />
          </div>
        </div>

        {/* Renderiza o mapa só se coordenadas estiverem definidas */}
        {coordenadas && (
          <div
            id="map"
            style={{
              height: "200px",
              width: "550px",
              borderRadius: "8px",
              position: "relative",
            }}
          ></div>
        )}
      </div>
    </FormBase>
  );
}
