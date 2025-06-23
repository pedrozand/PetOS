import React, { useState, useContext, useEffect } from "react";
import LocationContext from "../../../server/location/LocationContext";
import "./CSS/sidebarfilter.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { PiTrash } from "react-icons/pi";

const racasPorEspecie = {
  Cachorro: [
    "",
    "Outro",
    "Não sei",
    "Vira-lata",
    "Labrador Retriever",
    "Poodle",
    "Shih Tzu",
    "Pinscher",
    "Bulldog Inglês",
    "Chihuahua",
    "Golden Retriever",
    "Pastor Alemão",
    "Akita",
    "Beagle",
    "Border Collie",
    "Boxer",
    "Buldogue Francês",
    "Cocker Spaniel",
    "Dachshund (Salsicha)",
    "Doberman",
    "Dogo Argentino",
    "Fox Paulistinha",
    "Husky Siberiano",
    "Lhasa Apso",
    "Maltês",
    "Pastor Belga",
    "Pastor de Shetland",
    "Pitbull",
    "Pug",
    "Rottweiler",
    "Schnauzer",
    "Shar Pei",
    "Spitz Alemão (Lulu da Pomerânia)",
    "Staffordshire Bull Terrier",
    "Weimaraner",
    "Whippet",
    "Yorkshire Terrier",
    "American Bully",
    "Australian Cattle Dog",
    "Australian Shepherd",
    "Basenji",
    "Basset Hound",
    "Bernese Mountain Dog",
    "Bloodhound",
    "Borzoi",
    "Boston Terrier",
    "Bull Terrier",
    "Cane Corso",
    "Cavalier King Charles Spaniel",
    "Chow Chow",
    "Collie",
    "Dálmata",
    "Fila Brasileiro",
    "Greyhound",
    "Irish Setter",
    "Jack Russell Terrier",
    "Komondor",
    "Kuvasz",
    "Labradoodle",
    "Mastim Napolitano",
    "Norfolk Terrier",
    "Old English Sheepdog (Bobtail)",
    "Papillon",
    "Pekingês",
    "Pointer",
    "Puli",
    "Saluki",
    "Samoyeda",
    "São Bernardo",
    "Scottish Terrier",
    "Setter Gordon",
    "Skye Terrier",
    "Soft Coated Wheaten Terrier",
    "St. Bernard",
    "Terra Nova (Newfoundland)",
    "Tosa Inu",
    "Vizsla",
    "Welsh Corgi",
    "West Highland White Terrier",
    "Xoloitzcuintli",
  ],

  Gato: [
    "",
    "Outro",
    "Não sei",
    "Vira-lata",
    "Persa",
    "Siamês",
    "Maine Coon",
    "Angorá",
    "Sphynx",
    "Abissínio",
    "American Bobtail",
    "American Curl",
    "American Shorthair",
    "American Wirehair",
    "Ashera",
    "Azul Russo",
    "Balinês",
    "Bengal",
    "Birmanês (Burmese)",
    "Bobtail Japonês",
    "British Shorthair",
    "British Longhair",
    "Burmilla",
    "Chartreux",
    "Cornish Rex",
    "Cymric",
    "Devon Rex",
    "Don Sphynx (Donskoy)",
    "Egyptian Mau",
    "Europeu de Pelo Curto",
    "Exótico (Exotic Shorthair)",
    "Fold Escocês (Scottish Fold)",
    "Himalaio",
    "Javanês",
    "Korat",
    "LaPerm",
    "Manx",
    "Munchkin",
    "Nebelung",
    "Norueguês da Floresta",
    "Ocicat",
    "Oriental",
    "Peterbald",
    "Pixie-bob",
    "Ragdoll",
    "Savannah",
    "Selkirk Rex",
    "Serengeti",
    "Singapura",
    "Snowshoe",
    "Somali",
    "Sokoke",
    "Tonquinês",
    "Toyger",
    "Turco de Angorá",
    "Van Turco",
  ],

  Pássaro: [
    "",
    "Outro",
    "Não sei",
    "Calopsita",
    "Periquito-australiano",
    "Canário-belga",
    "Canário-da-terra",
    "Curió",
    "Bicudo",
    "Coleiro",
    "Trinca-ferro",
    "Sabiá-laranjeira",
    "Diamante-de-Gould",
    "Diamante-mandarim",
    "Manon",
    "Codorna",
    "Pato Carolina",
  ],
};

const SidebarFilter = ({ onFilterChange }) => {
  const [filtros, setFiltros] = useState({
    nomeAnimal: "",
    situacao: "",
    especies: {
      Cachorro: false,
      Gato: false,
      Pássaro: false,
    },
    racasSelecionadas: {},
    idade: "",
    porte: "",
    corPredominante: "",
    corOlhos: "",
    sexo: {
      Macho: false,
      Fêmea: false,
    },
  });

  const handleSwitchChange = (categoria, key) => {
    setFiltros((prev) => ({
      ...prev,
      [categoria]: {
        ...prev[categoria],
        [key]: !prev[categoria][key],
      },
    }));
  };

  const [selectAberto, setSelectAberto] = useState("");

  const { location, isLocationSet, setLocation } = useContext(LocationContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (searchTerm.length < 3) {
      setSuggestions([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
      const encodedSearch = encodeURIComponent(searchTerm);
      const url =
        `https://nominatim.openstreetmap.org/search?` +
        `q=${encodedSearch}&format=json&addressdetails=1` +
        `&countrycodes=br&limit=5` +
        `&viewbox=-46.605, -22.930, -46.495, -22.960&bounded=1`;

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          const filtered = data.filter((item) => {
            const addr = item.address;
            return (
              addr.city === "Bragança Paulista" ||
              addr.town === "Bragança Paulista"
            );
          });

          setSuggestions(filtered);
        });
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  const handleRacaChange = (especie, value) => {
    setFiltros((prev) => ({
      ...prev,
      racasSelecionadas: {
        ...prev.racasSelecionadas,
        [especie]: value,
      },
    }));
  };

  const handleClear = () => {
    setLocation("");
    setSearchTerm("");
  };

  const renderSelectComIcone = (nome, options, valor, onChange) => (
    <div className="select-container-side">
      <select
        name={nome}
        value={valor}
        onChange={onChange}
        onClick={() => {
          setSelectAberto((prev) => (prev === nome ? "" : nome));
        }}
        onBlur={() => {
          setSelectAberto("");
        }}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt || "Qualquer"}
          </option>
        ))}
      </select>
      <span className="icone-select-side">
        {selectAberto === nome ? <FaChevronUp /> : <FaChevronDown />}
      </span>
    </div>
  );

  return (
    <aside className="filtro-lateral">
      <h3>Filtros</h3>

      <label>Endereço</label>
      <div className="localizacao-overlay">
        {location ? (
          <div className="highlight">
            {location}
            <button className="clear-btn" onClick={handleClear}>
              <PiTrash />
            </button>
          </div>
        ) : (
          <div className="endereco-autocomplete-wrapper">
            <input
              type="text"
              placeholder="Digite um endereço"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}
      </div>
      {suggestions.length > 0 && (
        <ul className="sugestoes-lista">
          {suggestions.map((item) => {
            const addr = item.address;
            const formatado = [
              addr.road,
              addr.house_number,
              addr.suburb,
              addr.city || addr.town,
              addr.state,
              addr.postcode,
              addr.country,
            ]
              .filter(Boolean)
              .join(", ");

            return (
              <li
                key={item.place_id}
                className="sugestao-item"
                onClick={() => {
                  setLocation(formatado);
                  setSearchTerm("");
                  setSuggestions([]);
                }}
              >
                {formatado}
              </li>
            );
          })}
        </ul>
      )}

      <label>Nome do Animal</label>
      <input
        type="text"
        name="nomeAnimal"
        value={filtros.nomeAnimal}
        onChange={handleChange}
      />

      <label>Situação</label>
      {renderSelectComIcone(
        "situacao",
        ["", "Perdido", "Adocao", "Procurando Tutor"],
        filtros.situacao,
        handleChange
      )}

      <label>Espécie</label>
      {Object.keys(filtros.especies).map((esp) => (
        <div className="switch-row" key={esp}>
          <label className="switch">
            <input
              type="checkbox"
              checked={filtros.especies[esp]}
              onChange={() => handleSwitchChange("especies", esp)}
            />
            <span className="slider" />
          </label>
          <span className="switch-row-ali">{esp}</span>
        </div>
      ))}

      {Object.entries(filtros.especies).map(
        ([esp, ativo]) =>
          ativo && (
            <div key={esp}>
              <label>Raça ({esp})</label>
              {renderSelectComIcone(
                `raca-${esp}`,
                racasPorEspecie[esp],
                filtros.racasSelecionadas[esp] || "",
                (e) => handleRacaChange(esp, e.target.value)
              )}
            </div>
          )
      )}

      <label>Sexo</label>
      {Object.keys(filtros.sexo).map((sx) => (
        <div className="switch-row" key={sx}>
          <label className="switch">
            <input
              type="checkbox"
              checked={filtros.sexo[sx]}
              onChange={() => handleSwitchChange("sexo", sx)}
            />
            <span className="slider" />
          </label>
          <span className="switch-row-ali">{sx}</span>
        </div>
      ))}

      <label>Idade</label>
      {renderSelectComIcone(
        "idade",
        ["", "Filhote", "Adulto", "Idoso"],
        filtros.idade,
        handleChange
      )}

      <label>Porte</label>
      {renderSelectComIcone(
        "porte",
        ["", "Pequeno", "Médio", "Grande"],
        filtros.porte,
        handleChange
      )}

      <label>Cor</label>
      {renderSelectComIcone(
        "corPredominante",
        [
          "",
          "Preto",
          "Branco",
          "Marrom",
          "Caramelo",
          "Cinza",
          "Amarelo",
          "Bege",
          "Rajado",
          "Listrado",
          "Manchado",
          "Mesclado",
          "Outra",
        ],
        filtros.corPredominante,
        handleChange
      )}

      <label>Cor dos Olhos</label>
      {renderSelectComIcone(
        "corOlhos",
        ["", "Castanho", "Azul", "Verde", "Amarelo", "Outra"],
        filtros.corOlhos,
        handleChange
      )}
      <button
        className="btn-aplicar-filtros"
        onClick={() => {
          console.log("Filtros aplicados:", { ...filtros, endereco: location });
          onFilterChange({ ...filtros, endereco: location });
        }}
      >
        Aplicar Filtros
      </button>
    </aside>
  );
};

export default SidebarFilter;
