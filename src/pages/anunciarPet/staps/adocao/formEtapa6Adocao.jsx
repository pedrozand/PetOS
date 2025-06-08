import React, { useState, useEffect, useRef } from "react";
import FormBase from "../../formBase";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./CSS/formEtapa6Adocao.css";
import { FiTrash } from "react-icons/fi";
import { useFormContext } from "../../FormContext";

export default function FormEtapa6Adocao({ onProximo, onVoltar, totalEtapas }) {
  const { formData, updateFormData } = useFormContext();

  const [local, setLocal] = useState(formData.local || "");
  const [inputValue, setInputValue] = useState(formData.local || "");
  const [referencia, setReferencia] = useState(formData.referencia || "");
  const [sugestoes, setSugestoes] = useState([]);
  const [coordenadas, setCoordenadas] = useState(formData.coordenadas || null);
  const [erroLocal, setErroLocal] = useState("");

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
    if (!local || local.trim() === "") {
      setErroLocal("Por favor, insira um endereço válido.");
      return;
    }

    setErroLocal(""); // limpa o erro se estiver tudo certo

    // Atualiza os dados no contexto
    updateFormData({ local, referencia, coordenadas });

    // Avança etapa
    onProximo({ local, referencia, coordenadas });
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

  useEffect(() => {
    if (coordenadas && !mapRef.current) {
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
    <FormBase
      etapaAtual={6}
      onProximo={handleProximo}
      onVoltar={onVoltar}
      totalEtapas={totalEtapas}
    >
      <div className="formulario-scroll-ado">
        <div className="formulario-conteudo">
          <div className="endereco-container-ado">
            <div className="endereco-instrucao-ado">
              <p>
                Nos informe o <b>local onde o pet foi encontrado.</b> Caso não
                saiba exatamente o endereço, indique um endereço próximo ou um
                ponto de referência.
              </p>
            </div>

            <div className="endereco-label-linha-ado">
              <label className="form-label-ado">Endereço</label>
              <button
                type="button"
                className="usar-localizacao-btn-ado"
                onClick={usarLocalizacaoAtual}
              >
                Usar localização atual
              </button>
            </div>

            {local ? (
              <div className="endereco-exibido-ado">
                <span className="texto-endereco-ado">{local}</span>
                <FiTrash
                  className="icone-lixeira-ado"
                  onClick={() => {
                    setLocal("");
                    setInputValue("");
                    setCoordenadas(null);
                  }}
                  aria-label="Apagar endereço"
                />
              </div>
            ) : (
              <input
                type="text"
                className="endereco-input-ado"
                placeholder="Insira o endereço onde o pet foi encontrado."
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  if (erroLocal) setErroLocal("");
                }}
              />
            )}
            {erroLocal && (
              <p className="mensagem-erro-local-ado">{erroLocal}</p>
            )}

            {sugestoes.length > 0 && (
              <ul className="sugestoes-lista-ado">
                {sugestoes.map((item) => {
                  const endereco = formatarEndereco(item.address);
                  return (
                    <li
                      key={item.place_id}
                      onClick={() => {
                        setLocal(endereco);
                        setInputValue(endereco);
                        setCoordenadas([item.lat, item.lon]);
                        bloquearBusca.current = true;
                        setSugestoes([]);
                      }}
                      className="sugestao-item-ado"
                    >
                      {endereco}
                    </li>
                  );
                })}
              </ul>
            )}

            {coordenadas && (
              <div
                className="referencia-container-ado"
                style={{ marginTop: "15px" }}
              >
                <label className="form-label-ado">
                  Ponto de referência{" "}
                  <span className="referenica-form-optional-ado">Opcional</span>
                </label>
                <input
                  id="referenciaInput"
                  type="text"
                  className="referencia-input-ado"
                  placeholder="Ex. Próximo à lanchonete da Dri"
                  value={referencia}
                  onChange={(e) => setReferencia(e.target.value)}
                />
              </div>
            )}
          </div>

          {coordenadas && (
            <div
              id="map"
              style={{
                height: "300px",
                width: "550px",
                borderRadius: "8px",
                position: "relative",
              }}
            />
          )}
        </div>
      </div>
    </FormBase>
  );
}
