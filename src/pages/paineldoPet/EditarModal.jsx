import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import AsyncSelect from "react-select/async";
import "./CSS/editarModal.css";

const EditarModal = ({ post, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    nomeAnimal: post.animal.nome || "",
    especie: post.animal.especie || "",
    descricao: post.animal.descricao || "",
    imagens: Array.isArray(post.animal?.imagensAnimal)
      ? post.animal.imagensAnimal
      : [],
    novaImagem: null,
    raca: post.animal.raca || "",
    idade: post.animal.idade || "",
    porte: post.animal.porte || "",
    corPredominante: post.animal.corPredominante || "",
    corOlhos: post.animal.corOlhos || "",
    sexo: post.animal.sexo || "",
    localDesap: post.endereco || "",
    referencia: post.pontoReferencia || "",
    dataDesap: post.dataPost?.split("T")[0] || "",
    periodo: post.periodoPost || "",
    recompensa: post.recompensa || "",
    descricaoLocal: post.descricaoLocal || "",
    localPet: post.localPet || "",
    telefone: post.telefonePost || "",
    situacao: post.situacao || "",
    cuidados: post.animal.cuidados || [],
    temperamento: post.animal.temperamento || [],
    adaptabilidade: post.animal.adaptabilidade || [],
    socializacao: post.animal.socializacao || [],
  });

  useEffect(() => {
    if (!formData.raca) {
      setFormData((prev) => ({ ...prev, raca: "" }));
    }
  }, [formData.especie]);

  const removerImagem = (index) => {
    const novas = [...formData.imagens];
    novas.splice(index, 1);
    setFormData({ ...formData, imagens: novas });
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const salvarEdicao = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/postagens/${post.idPost}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
          }),
        }
      );
      const atualizado = await response.json();
      onSave(atualizado);
    } catch (err) {
      console.error("Erro ao atualizar:", err);
    }
  };

  const racas = {
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

  const selectList = (label, name, options) => (
    <>
      <label>{label}</label>
      <select name={name} value={formData[name]} onChange={handleInput}>
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </>
  );

  const multiSelectList = (label, name, options) => (
    <>
      <label>{label}</label>
      <select
        name={name}
        multiple
        value={formData[name]}
        onChange={(e) => {
          const values = Array.from(
            e.target.selectedOptions,
            (opt) => opt.value
          );
          setFormData({ ...formData, [name]: values });
        }}
      >
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </>
  );

  const loadAddressOptions = async (inputValue) => {
    if (!inputValue) return [];
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${inputValue}`
    );
    const data = await res.json();
    return data.map((item) => ({
      label: item.display_name,
      value: item.display_name,
    }));
  };

  const camposPermitidos = {
    Perdido: [
      "nomeAnimal",
      "especie",
      "descricao",
      "imgPet",
      "raca",
      "idade",
      "porte",
      "corPredominante",
      "corOlhos",
      "sexo",
      "localDesap",
      "referencia",
      "dataDesap",
      "periodo",
      "recompensa",
      "telefone",
    ],
    Adocao: [
      "nomeAnimal",
      "especie",
      "descricao",
      "imgPet",
      "raca",
      "idade",
      "porte",
      "corPredominante",
      "corOlhos",
      "sexo",
      "localDesap",
      "referencia",
      "dataDesap",
      "periodo",
      "telefone",
      "cuidados",
      "temperamento",
      "adaptabilidade",
      "socializacao",
    ],
    "Procurando Tutor": [
      "nomeAnimal",
      "especie",
      "descricao",
      "imgPet",
      "raca",
      "idade",
      "porte",
      "corPredominante",
      "corOlhos",
      "sexo",
      "localDesap",
      "referencia",
      "dataDesap",
      "periodo",
      "telefone",
      "descricaoLocal",
      "localPet",
    ],
  };

  const isCampoVisivel = (nomeCampo) =>
    camposPermitidos[post.situacao]?.includes(nomeCampo);

  return (
    <div className="modal-overlay-modal-ppet">
      <div className="modal-content-modal-ppet">
        <h3>Editar Informações do Pet</h3>

        <label>Situação:</label>
        <p style={{ marginBottom: "10px", fontWeight: "bold" }}>
          {formData.situacao === "Adocao" ? "Para Adoção" : formData.situacao}
        </p>

        {isCampoVisivel("nomeAnimal") && (
          <>
            <label>Nome do Animal:</label>
            <input
              type="text"
              name="nomeAnimal"
              value={formData.nomeAnimal}
              onChange={handleInput}
            />
          </>
        )}

        {isCampoVisivel("especie") &&
          selectList("Espécie:", "especie", [
            "",
            "Cachorro",
            "Gato",
            "Pássaro",
          ])}

        {isCampoVisivel("raca") &&
          selectList("Raça:", "raca", racas[formData.especie] || [])}

        {isCampoVisivel("descricao") && (
          <>
            <label>Descrição:</label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleInput}
            />
          </>
        )}

        {isCampoVisivel("imgPet") && (
          <>
            <label>Imagens:</label>
            <div className="preview-imagens-modal-ppet">
              {formData.imagens.map((img, index) => (
                <div key={index} className="preview-item-ado">
                  <img
                    src={`http://localhost:3001/uploads/${img}`}
                    alt={`Preview ${index}`}
                  />
                  <button
                    className="btn-remover-ado"
                    onClick={() => removerImagem(index)}
                  >
                    <FiX />
                  </button>
                </div>
              ))}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const nova = e.target.files[0];
                if (nova && formData.imagens.length < 5) {
                  setFormData({ ...formData, novaImagem: nova });
                }
              }}
            />
          </>
        )}

        {isCampoVisivel("idade") &&
          selectList("Idade:", "idade", ["", "Filhote", "Adulto", "Idoso"])}

        {isCampoVisivel("porte") &&
          selectList("Porte:", "porte", ["", "Pequeno", "Médio", "Grande"])}

        {isCampoVisivel("corPredominante") &&
          selectList("Cor Predominante:", "corPredominante", [
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
          ])}

        {isCampoVisivel("corOlhos") &&
          selectList("Cor dos Olhos:", "corOlhos", [
            "",
            "Castanho",
            "Azul",
            "Verde",
            "Amarelo",
            "Outra",
          ])}

        {isCampoVisivel("sexo") &&
          selectList("Sexo:", "sexo", ["", "Macho", "Fêmea"])}

        {isCampoVisivel("localDesap") && (
          <>
            <label>Local do Desaparecimento:</label>
            <AsyncSelect
              cacheOptions
              loadOptions={loadAddressOptions}
              defaultOptions
              onChange={(selected) =>
                setFormData({ ...formData, localDesap: selected.value })
              }
              value={
                formData.localDesap
                  ? { label: formData.localDesap, value: formData.localDesap }
                  : null
              }
            />
          </>
        )}

        {isCampoVisivel("referencia") && (
          <>
            <label>Ponto de Referência:</label>
            <input
              type="text"
              name="referencia"
              value={formData.referencia}
              onChange={handleInput}
            />
          </>
        )}

        {isCampoVisivel("dataDesap") && (
          <>
            <label>Data do Desaparecimento:</label>
            <input
              type="date"
              name="dataDesap"
              max={new Date().toISOString().split("T")[0]}
              value={formData.dataDesap}
              onChange={handleInput}
            />
          </>
        )}

        {isCampoVisivel("periodo") &&
          selectList("Período do Dia:", "periodo", [
            "",
            "Manhã",
            "Tarde",
            "Noite",
          ])}

        {isCampoVisivel("recompensa") && (
          <>
            <label>Recompensa:</label>
            <input
              type="text"
              name="recompensa"
              value={formData.recompensa}
              onChange={handleInput}
            />
          </>
        )}

        {isCampoVisivel("descricaoLocal") && (
          <>
            <label>Descrição do Local:</label>
            <input
              type="text"
              name="descricaoLocal"
              value={formData.descricaoLocal}
              onChange={handleInput}
            />
          </>
        )}

        {isCampoVisivel("localPet") &&
          selectList("Local do Pet:", "localPet", [
            "",
            "Lar Temporário",
            "Petshop",
            "Abrigo",
            "Canil",
            "ONG",
            "Outro",
          ])}

        {isCampoVisivel("telefone") && (
          <>
            <label>Telefone para Contato:</label>
            <input
              type="text"
              name="telefone"
              value={formData.telefone}
              onChange={handleInput}
            />
          </>
        )}

        {isCampoVisivel("cuidados") &&
          multiSelectList("Cuidados:", "cuidados", [
            "Vacinado",
            "Castrado",
            "Vermifugado",
            "Microchipado",
            "Necessidades especiais",
          ])}

        {isCampoVisivel("temperamento") &&
          multiSelectList("Temperamento:", "temperamento", [
            "Dócil",
            "Agressivo",
            "Brincalhão",
            "Calmo",
            "Sociável",
            "Tímido",
            "Independente",
            "Carente",
            "Energia alta",
            "Medroso",
          ])}

        {isCampoVisivel("adaptabilidade") &&
          multiSelectList("Adaptabilidade:", "adaptabilidade", [
            "Vive bem em apartamento",
            "Vive bem em casa com quintal",
            "Necessita de espaço amplo",
            "Se adapta a mudanças frequentes",
          ])}

        {isCampoVisivel("socializacao") &&
          multiSelectList("Socialização:", "socializacao", [
            "Sociável com crianças",
            "Sociável com gatos",
            "Sociável com cães",
            "Sociável com estranhos",
            "Tolerante a visitas",
          ])}

        <div className="modal-actions-modal-ppet">
          <button onClick={salvarEdicao}>Salvar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default EditarModal;
