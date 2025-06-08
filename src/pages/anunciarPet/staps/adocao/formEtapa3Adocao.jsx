import React, { useState } from "react";
import { useFormContext } from "../../FormContext";
import FormBase from "../../formBase";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import "./CSS/formEtapa3Adocao.css"; // atualizado o caminho do CSS

export default function FormEtapa3Adocao({ onProximo, onVoltar, totalEtapas }) {
  const { formData, updateFormData } = useFormContext();

  const [raça, setRaca] = useState(formData.raca || "");
  const [porte, setPorte] = useState(formData.porte || "");
  const [corPredominante, setCorPredominante] = useState(
    formData.corPredominante || ""
  );
  const [corOlhos, setCorOlhos] = useState(formData.corOlhos || "");
  const [idade, setIdade] = useState(formData.idade || "");
  const [focusedSelect, setFocusedSelect] = useState(null);

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

  const racasDisponiveis = racasPorEspecie[formData?.especie] || [];

  const handleProximo = () => {
    const novosDados = {
      raca: raça,
      porte,
      corPredominante,
      corOlhos,
      idade,
    };
    updateFormData(novosDados);
    onProximo(novosDados);
  };

  const renderSelectWithIcon = (label, value, setValue, name, options) => {
    const toggleFocus = () => {
      setFocusedSelect((prev) => (prev === name ? null : name));
    };

    return (
      <div className="etapa3-select-wrapper-ado">
        <label className="etapa3-select-label-ado">
          {label} <span className="etapa3-optional-label-ado">Opcional</span>
        </label>
        <div className="etapa3-select-container-ado">
          <select
            className={`etapa3-custom-select-ado ${
              value === "" ? "placeholder-ado" : ""
            }`}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocusedSelect(name)}
            onClick={toggleFocus}
            onBlur={() => setTimeout(() => setFocusedSelect(null), 100)}
          >
            <option value="" disabled hidden>
              Selecione uma opção
            </option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          {focusedSelect === name ? (
            <IoIosArrowUp className="etapa3-select-icon-ado" />
          ) : (
            <IoIosArrowDown className="etapa3-select-icon-ado" />
          )}
        </div>
      </div>
    );
  };

  return (
    <FormBase
      etapaAtual={3}
      onProximo={handleProximo}
      onVoltar={onVoltar}
      totalEtapas={totalEtapas}
    >
      <div className="formulario-conteudo">
        <div className="etapa3-select-group-ado">
          {renderSelectWithIcon(
            "Raça",
            raça,
            setRaca,
            "raça",
            racasDisponiveis
          )}
          {renderSelectWithIcon("Porte", porte, setPorte, "porte", [
            "",
            "Pequeno",
            "Médio",
            "Grande",
          ])}
          {renderSelectWithIcon(
            "Cor Predominante",
            corPredominante,
            setCorPredominante,
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
            ]
          )}
          {renderSelectWithIcon(
            "Cor dos Olhos",
            corOlhos,
            setCorOlhos,
            "corOlhos",
            ["", "Castanho", "Azul", "Verde", "Amarelo", "Outra"]
          )}
          {renderSelectWithIcon("Idade Aproximada", idade, setIdade, "idade", [
            "",
            "Filhote",
            "Adulto",
            "Idoso",
          ])}
        </div>
      </div>
    </FormBase>
  );
}
