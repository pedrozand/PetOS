import React, { useState } from "react";
import "./sidebarfilter.css";

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

  return (
    <aside className="filtro-lateral">
      <h3>Filtros</h3>

      <label>Nome do Animal</label>
      <input
        type="text"
        name="nomeAnimal"
        value={filtros.nomeAnimal}
        onChange={handleChange}
        placeholder="Digite o nome..."
      />

      <label>Situação</label>
      <select name="situacao" value={filtros.situacao} onChange={handleChange}>
        <option value="">Todas</option>
        <option value="Perdido">Perdido</option>
        <option value="Para Adoção">Para Adoção</option>
        <option value="Procurando Tutor">Procurando Tutor</option>
      </select>

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
              <select
                value={filtros.racasSelecionadas[esp] || ""}
                onChange={(e) => handleRacaChange(esp, e.target.value)}
              >
                {racasPorEspecie[esp].map((raca) => (
                  <option key={raca} value={raca}>
                    {raca || "Qualquer"}
                  </option>
                ))}
              </select>
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
      <select name="idade" value={filtros.idade} onChange={handleChange}>
        <option value="">Qualquer</option>
        <option value="Filhote">Filhote</option>
        <option value="Adulto">Adulto</option>
        <option value="Idoso">Idoso</option>
      </select>

      <label>Porte</label>
      <select name="porte" value={filtros.porte} onChange={handleChange}>
        <option value="">Qualquer</option>
        <option value="Pequeno">Pequeno</option>
        <option value="Médio">Médio</option>
        <option value="Grande">Grande</option>
      </select>

      <label>Cor</label>
      <select
        name="corPredominante"
        value={filtros.corPredominante}
        onChange={handleChange}
      >
        <option value="">Qualquer</option>
        <option value="Preto">Preto</option>
        <option value="Branco">Branco</option>
        <option value="Caramelo">Caramelo</option>
        <option value="Mesclado">Mesclado</option>
      </select>

      <label>Cor dos Olhos</label>
      <select name="corOlhos" value={filtros.corOlhos} onChange={handleChange}>
        <option value="">Qualquer</option>
        <option value="Castanho">Castanho</option>
        <option value="Azul">Azul</option>
        <option value="Verde">Verde</option>
      </select>
    </aside>
  );
};

export default SidebarFilter;
