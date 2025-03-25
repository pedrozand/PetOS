import "./filtro.css";
import { useState, useEffect, useRef } from "react";
import { PiDogFill, PiDog, PiTrash } from "react-icons/pi";

export default function Filtro({ setEnderecoSelecionado }) {
  const [isOpen, setIsOpen] = useState(true); // Estado para controlar visibilidade
  const [address, setAddress] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // Para armazenar a pesquisa do usuário
  const [suggestions, setSuggestions] = useState([]); // Para armazenar as sugestões da API
  const inputRef = useRef(null); // Referência para o campo editável
  const debounceTimeout = useRef(null); // Para armazenar o timeout do debounce
  const [showSuggestions, setShowSuggestions] = useState(false); // Controle de visibilidade das sugestões

  // Função para formatar o endereço retornado pela API
  const formatAddress = (data) => {
    const { road, house_number, suburb, city, state, postcode, country } =
      data.address;

    // Filtra e retorna apenas os dados essenciais para exibir no formato desejado
    return [road, house_number, suburb, city, state, postcode, country]
      .filter(Boolean) // Filtra valores falsy, como undefined ou null
      .join(", ");
  };

  // Função para formatar o endereço retornado pela API
  const reverseGeocode = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );
      const data = await response.json();

      if (data.display_name) {
        const formattedAddress = formatAddress(data);
        setAddress(formattedAddress);

        if (inputRef.current) {
          inputRef.current.innerText = formattedAddress;
        }
      }
    } catch (error) {
      console.error("Erro ao obter endereço:", error);
    }
  };

  // Função para obter a localização do usuário
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          await reverseGeocode(latitude, longitude);
        },
        (error) => {
          console.error("Erro ao obter localização:", error);
        }
      );
    } else {
      console.error("Geolocalização não suportada no navegador.");
    }
  };

  // Função para limpar o conteúdo do campo
  const handleClear = () => {
    setAddress("");
    setEnderecoSelecionado(""); // 🔹 Garante que o input abaixo do título também seja limpo
    if (inputRef.current) {
      inputRef.current.innerText = "";
    }
    setSuggestions([]);
    setShowSuggestions(false);
  };

  // Função para lidar com a mudança de texto na div
  const handleInputChange = () => {
    const query = inputRef.current ? inputRef.current.innerText : "";
    setSearchQuery(query);

    // Aplica o debounce para evitar múltiplas requisições
    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      fetchSuggestions(query);
    }, 300); // Espera 300ms após o último caractere digitado

    // Exibe as sugestões se houver alguma
    if (query && suggestions.length > 0) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false); // Esconde as sugestões caso o campo esteja vazio
    }
  };

  // Função para buscar as sugestões de endereço da API
  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]); // Se a busca estiver vazia, limpa as sugestões
      return;
    }

    const city = "Bragança Paulista"; // Substitua "SuaCidade" pelo nome da sua cidade
    const state = "São Paulo"; // Substitua "SeuEstado" pelo nome do seu estado

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1`
      );
      const data = await response.json();

      // Filtra os resultados para incluir apenas aqueles que pertencem à cidade e estado especificados
      const filteredSuggestions = data.filter((suggestion) => {
        const address = suggestion.address || {};
        return (
          (address.city && address.city.toLowerCase() === city.toLowerCase()) ||
          (address.state && address.state.toLowerCase() === state.toLowerCase())
        );
      });

      // Formatar cada sugestão antes de atualizar o estado
      const formattedSuggestions = filteredSuggestions.map((suggestion) => {
        return {
          ...suggestion,
          formatted_address: formatAddress(suggestion), // Adiciona o endereço formatado
        };
      });

      setSuggestions(formattedSuggestions); // Atualiza as sugestões com as formatadas
    } catch (error) {
      console.error("Erro ao buscar sugestões:", error);
    }
  };

  // Função para lidar com a seleção de uma sugestão
  const handleSuggestionClick = (suggestion) => {
    const formattedAddress = suggestion.formatted_address;
    setAddress(formattedAddress);
    if (inputRef.current) {
      inputRef.current.innerText = formattedAddress;
    }
    setShowSuggestions(false); // Fecha as sugestões após a seleção
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    // Barra lateral de filtros
    <div className={`sidebar-filter ${isOpen ? "open" : "closed"}`}>
      {/* Título clicável para expandir/recolher */}
      <h2 className="filter-title" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <PiDog className="filter-arrow" />
        ) : (
          <PiDogFill className="filter-arrow" />
        )}
        Filtros{" "}
      </h2>

      {isOpen && (
        <>
          <div className="filter-group">
            <label htmlFor="address">Endereço, cidade ou CEP</label>

            {/* Container para o campo de entrada e botão de limpeza */}
            <div className="input-container">
              <div
                className="input-like"
                contentEditable="true"
                ref={inputRef}
                suppressContentEditableWarning={true}
                onInput={handleInputChange} // Atualiza o estado com o texto digitado
              >
                {address}
              </div>
              {address && (
                <button className="clear-btn" onClick={handleClear}>
                  <PiTrash />
                </button>
              )}
            </div>

            {/* Exibe as sugestões fora do balão de pesquisa */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="suggestions-container">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.formatted_address}{" "}
                    {/* Exibe o endereço formatado */}
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
