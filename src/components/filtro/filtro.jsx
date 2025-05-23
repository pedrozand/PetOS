import "./filtro.css";
import { useState, useRef, useContext, useEffect } from "react";
import { PiDogFill, PiDog, PiTrash } from "react-icons/pi";
import LocationContext from "../location/LocationContext";

// Importa o contexto de localização

export default function Filtro() {
  const { location, setLocation, isLocationSet } = useContext(LocationContext); // Usa o contexto
  const [isOpen, setIsOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // Para armazenar a pesquisa do usuário
  const [suggestions, setSuggestions] = useState([]); // Para armazenar as sugestões da API
  const inputRef = useRef(null); // Referência para o campo editável
  const debounceTimeout = useRef(null); // Para armazenar o timeout do debounce
  const [showSuggestions, setShowSuggestions] = useState(false); // Controle de visibilidade das sugestões
  const [inputStyle, setInputStyle] = useState("input-like default"); // Classe inicial

  useEffect(() => {
    if (isLocationSet) {
      setInputStyle("input-like selected");
    } else {
      setInputStyle("input-like default");
    }
  }, [isLocationSet]);

  // Função para quando clicar na lixeira
  const handleClear = () => {
    setLocation("");
    setInputStyle("input-like default"); // Volta para o estilo padrão
  };

  // Função para formatar o endereço retornado pela API
  const formatAddress = (data) => {
    const { road, house_number, suburb, city, state, postcode, country } =
      data.address;
    return [road, house_number, suburb, city, state, postcode, country]
      .filter(Boolean)
      .join(", ");
  };

  // Função para buscar sugestões de endereço da API
  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]); // Se a busca estiver vazia, limpa as sugestões
      return;
    }

    const city = "Bragança Paulista"; // Definindo a cidade como Bragança Paulista
    const state = "São Paulo"; // Definindo o estado como São Paulo

    try {
      // Fazendo a busca na API sem os parâmetros city e state
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1`
      );
      const data = await response.json();

      // Filtrando os resultados para incluir apenas os que pertencem à cidade de Bragança Paulista e ao estado de São Paulo
      const filteredData = data.filter((suggestion) => {
        const { city: suggestionCity, state: suggestionState } =
          suggestion.address || {};
        return suggestionCity === city && suggestionState === state;
      });

      // Formatar cada sugestão antes de atualizar o estado
      const formattedSuggestions = filteredData.map((suggestion) => ({
        ...suggestion,
        formatted_address: formatAddress(suggestion), // Adiciona o endereço formatado
      }));

      setSuggestions(formattedSuggestions); // Atualiza as sugestões com as formatadas
    } catch (error) {
      console.error("Erro ao buscar sugestões:", error);
    }
  };

  // Lidar com entrada no campo editável
  const handleInputChange = () => {
    const query = inputRef.current ? inputRef.current.innerText : "";
    setSearchQuery(query);
    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      fetchSuggestions(query);
    }, 300);
    setShowSuggestions(query && suggestions.length > 0);
  };

  // Lidar com a seleção de uma sugestão
  const handleSuggestionClick = (suggestion) => {
    const formattedAddress = suggestion.formatted_address;
    setLocation(formattedAddress); // Atualiza o contexto
    if (inputRef.current) {
      inputRef.current.innerText = formattedAddress;
    }
    setShowSuggestions(false);
    setInputStyle("input-like selected"); // Aplica o estilo com fundo colorido
  };

  return (
    <div className={`sidebar-filter ${isOpen ? "open" : "closed"}`}>
      <h2 className="filter-title" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <PiDog className="filter-arrow" />
        ) : (
          <PiDogFill className="filter-arrow" />
        )}
        Filtros
      </h2>

      {isOpen && (
        <>
          <div className="filter-group">
            <label htmlFor="address">Endereço, cidade ou CEP</label>
            <div className="input-container">
              <div
                className={inputStyle}
                contentEditable="true"
                ref={inputRef}
                suppressContentEditableWarning={true}
                onInput={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault(); // Impede a quebra de linha
                  }
                }}
                spellCheck={false} // Desativa correção ortográfica
                autoCorrect="off" // Desativa correção automática (iOS e Android)
                autoCapitalize="off" // Desativa capitalização automática
              >
                {location}
              </div>
              {location && (
                <button className="clear-btn" onClick={handleClear}>
                  <PiTrash />
                </button>
              )}
            </div>

            {showSuggestions && suggestions.length > 0 && (
              <div className="suggestions-container">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.formatted_address}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="filter-group filter-name">
            <label for="name-id">Nome ou ID</label>
            <input type="text" id="name-id" />
          </div>

          <div className="filter-group">
            <label>Espécie</label>

            <label className="switch no-bold">
              <input
                type="checkbox"
                name="especie"
                value="cachorro"
                defaultChecked
              />
              <span className="slider"></span> Cachorro
            </label>
            <label className="switch no-bold">
              <input
                type="checkbox"
                name="especie"
                value="gato"
                defaultChecked
              />
              <span className="slider"></span> Gato
            </label>
            <label className="switch no-bold">
              <input
                type="checkbox"
                name="especie"
                value="passaro"
                defaultChecked
              />
              <span className="slider"></span> Pássaro
            </label>
          </div>

          <div className="filter-group">
            <label>Gênero</label>
            <label className="switch no-bold">
              <input
                type="checkbox"
                name="genero"
                value="macho"
                defaultChecked
              />
              <span className="slider"></span> Macho
            </label>
            <label className="switch no-bold">
              <input
                type="checkbox"
                name="genero"
                value="femea"
                defaultChecked
              />
              <span className="slider"></span> Fêmea
            </label>
          </div>

          <div className="filter-group">
            <label for="size">Porte</label>
            <select id="size">
              <option value="">Qualquer</option>
              <option value="pequeno">Pequeno</option>
              <option value="medio">Médio</option>
              <option value="grande">Grande</option>
            </select>
          </div>

          <div className="filter-group">
            <label for="color">Cor</label>
            <select id="color">
              <option value="">Qualquer</option>
              <option value="preta">Preta</option>
              <option value="branca">Branca</option>
              <option value="cinza">Cinza</option>
              <option value="marrom">Marrom</option>
              <option value="caramelo">Dourada (Caramelo)</option>
              <option value="vermelha">Vermelha</option>
              <option value="outra">Outra</option>
            </select>
          </div>

          <div className="filter-group">
            <label for="eye-color">Cor dos Olhos</label>
            <select id="eye-color">
              <option value="">Qualquer</option>
              <option value="escuros">Escuros</option>
              <option value="azuis">Azuis</option>
              <option value="verdes">Verdes</option>
              <option value="amarelos">Amarelos</option>
              <option value="heterocromia">Um de cada cor</option>
              <option value="outra">Outra</option>
            </select>
          </div>

          <div className="filter-group">
            <label for="color">Idade</label>
            <select id="color">
              <option value="">Qualquer</option>
              <option value="filhote">Filhote</option>
              <option value="adulto">Adulto</option>
              <option value="senior">Sênior</option>
            </select>
          </div>

          <button className="filter-btn">Aplicar Filtros</button>
        </>
      )}
    </div>
  );
}
