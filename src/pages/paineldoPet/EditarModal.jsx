import { useState, useEffect, useRef } from "react";
import { FiX } from "react-icons/fi";
import { FiTrash } from "react-icons/fi";
import "./CSS/editarModal.css";

const EditarModal = ({ post, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    nomeAnimal: post.animal.nome || "",
    especie: post.animal.especie || "",
    descricao: post.animal.descricao || "",
    imagens: Array.isArray(post.animal?.imagensAnimal)
      ? post.animal.imagensAnimal
      : [],
    novasImagens: [],
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

  const [inputEndereco, setInputEndereco] = useState(formData.localDesap || "");
  const [sugestoesEndereco, setSugestoesEndereco] = useState([]);
  const [coordenadasEndereco, setCoordenadasEndereco] = useState(
    formData.coordenadas || null
  );
  const bloquearBusca = useRef(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (bloquearBusca.current) {
        bloquearBusca.current = false;
        return;
      }

      if (inputEndereco.length > 3) {
        fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            inputEndereco
          )}&format=json&addressdetails=1&bounded=1&viewbox=-46.625,-22.920,-46.500,-22.990`
        )
          .then((res) => res.json())
          .then((data) => setSugestoesEndereco(data))
          .catch((err) => console.error("Erro ao buscar endereço:", err));
      } else {
        setSugestoesEndereco([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [inputEndereco]);

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
      const data = new FormData();
      data.append(
        "json",
        JSON.stringify({
          ...formData,
          imagens: formData.imagens,
        })
      );

      // Adiciona as novas imagens
      formData.novasImagens.forEach((item) => {
        data.append("novasImagens", item.file);
      });

      const response = await fetch(
        `http://localhost:3001/api/postagens/${post.idPost}`,
        {
          method: "PUT",
          body: data,
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
      <label
        style={{
          fontWeight: "bold",
        }}
      >
        {label}
      </label>
      <select name={name} value={formData[name]} onChange={handleInput}>
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

  const CARACTERISTICAS = {
    cuidados: [
      "Vacinado",
      "Castrado",
      "Vermifugado",
      "Microchipado",
      "Necessidades especiais",
    ],
    temperamento: [
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
    ],
    adaptabilidade: [
      "Vive bem em apartamento",
      "Vive bem em casa com quintal",
      "Necessita de espaço amplo",
      "Se adapta a mudanças frequentes",
    ],
    socializacao: [
      "Sociável com crianças",
      "Sociável com gatos",
      "Sociável com cães",
      "Sociável com estranhos",
      "Tolerante a visitas",
    ],
  };

  const toggleCaracteristica = (categoria, item) => {
    setFormData((prev) => {
      const jaSelecionado = prev[categoria]?.includes(item);
      return {
        ...prev,
        [categoria]: jaSelecionado
          ? prev[categoria].filter((i) => i !== item)
          : [...prev[categoria], item],
      };
    });
  };

  const renderGrupoCaracteristicas = (titulo, categoria) => (
    <div className="grupo-caracteristica">
      <h4>{titulo}</h4>
      <div className="botoes-caracteristica">
        {CARACTERISTICAS[categoria].map((item) => (
          <button
            key={item}
            type="button"
            className={`botao-caracteristica ${
              formData[categoria]?.includes(item) ? "ativo" : ""
            }`}
            onClick={() => toggleCaracteristica(categoria, item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );

  const isCampoVisivel = (nomeCampo) =>
    camposPermitidos[post.situacao]?.includes(nomeCampo);

  return (
    <div className="modal-overlay-modal-ppet">
      <button
        className="botao-fechar-modal-edit"
        onClick={onClose}
        aria-label="Fechar modal"
      >
        <FiX size={20} />
      </button>
      <div className="modal-content-modal-ppet">
        <h3>Editar Informações do Pet</h3>

        <label
          className="modal-content-modal-ppet-label"
          style={{
            color: "white",
            fontWeight: "bold",
          }}
        >
          Situação
        </label>
        <p className="modal-content-modal-ppet-p">
          {formData.situacao === "Adocao" ? "Para Adoção" : formData.situacao}
        </p>

        {isCampoVisivel("nomeAnimal") && (
          <>
            <label
              style={{
                fontWeight: "bold",
              }}
            >
              Nome do Animal
            </label>
            <input
              type="text"
              name="nomeAnimal"
              value={formData.nomeAnimal}
              onChange={handleInput}
            />
          </>
        )}

        {isCampoVisivel("especie") &&
          selectList("Espécie", "especie", ["", "Cachorro", "Gato", "Pássaro"])}

        {isCampoVisivel("raca") &&
          selectList("Raça", "raca", racas[formData.especie] || [])}

        {isCampoVisivel("descricao") && (
          <>
            <label
              style={{
                fontWeight: "bold",
              }}
            >
              Descrição
            </label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleInput}
            />
          </>
        )}

        {isCampoVisivel("imgPet") && (
          <>
            <h4 className="preview-imagens-modal-ppet">Imagens</h4>
            <div className="preview-imagens-modal-ppet">
              {formData.imagens.map((img, index) => (
                <div key={`img-antiga-${index}`} className="preview-item-ado">
                  <img
                    src={`http://localhost:3001/uploads/${img}`}
                    alt={`Imagem ${index}`}
                  />
                  <button
                    onClick={() => removerImagem(index)}
                    className="btn-remover-ado"
                  >
                    <FiX />
                  </button>
                </div>
              ))}

              {formData.novasImagens.map((item, index) => (
                <div key={`img-nova-${index}`} className="preview-item-ado">
                  <img src={item.preview} alt={`Nova Imagem ${index}`} />
                  <button
                    onClick={() => {
                      const novas = [...formData.novasImagens];
                      novas.splice(index, 1);
                      setFormData({ ...formData, novasImagens: novas });
                    }}
                    className="btn-remover-ado"
                  >
                    <FiX />
                  </button>
                </div>
              ))}
            </div>
            <div className="upload-wrapper-edit">
              <label htmlFor="upload-img" className="upload-button-edit">
                Selecionar Imagem
              </label>
              <input
                id="upload-img"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const arquivo = e.target.files[0];
                  if (arquivo) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setFormData((prev) => ({
                        ...prev,
                        novasImagens: [
                          ...prev.novasImagens,
                          { file: arquivo, preview: reader.result },
                        ],
                      }));
                    };
                    reader.readAsDataURL(arquivo);
                  }
                }}
                className="upload-input-edit"
              />
            </div>
          </>
        )}

        {isCampoVisivel("idade") &&
          selectList("Idade", "idade", ["", "Filhote", "Adulto", "Idoso"])}

        {isCampoVisivel("porte") &&
          selectList("Porte", "porte", ["", "Pequeno", "Médio", "Grande"])}

        {isCampoVisivel("corPredominante") &&
          selectList("Cor Predominante", "corPredominante", [
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
          selectList("Cor dos Olhos", "corOlhos", [
            "",
            "Castanho",
            "Azul",
            "Verde",
            "Amarelo",
            "Outra",
          ])}

        {isCampoVisivel("sexo") &&
          selectList("Sexo", "sexo", ["", "Macho", "Fêmea"])}

        {isCampoVisivel("localDesap") && (
          <>
            <label
              style={{
                fontWeight: "bold",
              }}
            >
              Local do Desaparecimento
            </label>
            {isCampoVisivel("localDesap") && (
              <>
                <label style={{ fontWeight: "bold" }}>Endereço</label>
                {formData.localDesap ? (
                  <div className="endereco-exibido-edit">
                    <span className="texto-endereco-edit">
                      {formData.localDesap}
                    </span>
                    <FiTrash
                      className="icone-lixeira-edit"
                      onClick={() => {
                        setFormData({ ...formData, localDesap: "" });
                        setInputEndereco("");
                        setCoordenadasEndereco(null);
                      }}
                    />
                  </div>
                ) : (
                  <input
                    type="text"
                    className="endereco-input-edit"
                    placeholder="Digite o endereço..."
                    value={inputEndereco}
                    onChange={(e) => {
                      setInputEndereco(e.target.value);
                    }}
                  />
                )}

                {inputEndereco &&
                  !formData.localDesap &&
                  sugestoesEndereco.length > 0 && (
                    <ul className="sugestoes-lista-edit">
                      {sugestoesEndereco.map((item) => {
                        const endereco = formatarEndereco(item.address);
                        return (
                          <li
                            key={item.place_id}
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                localDesap: endereco,
                              }));
                              setInputEndereco(endereco);
                              setCoordenadas([item.lat, item.lon]);
                              bloquearBusca.current = true;
                              setSugestoes([]);
                            }}
                            className="sugestao-item-edit"
                          >
                            {endereco}
                          </li>
                        );
                      })}
                    </ul>
                  )}
              </>
            )}
          </>
        )}

        {isCampoVisivel("referencia") && (
          <>
            <label
              style={{
                fontWeight: "bold",
              }}
            >
              Ponto de Referência
            </label>
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
            <label
              style={{
                fontWeight: "bold",
              }}
            >
              Data do Desaparecimento
            </label>
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
          selectList("Período do Dia", "periodo", [
            "",
            "Manhã",
            "Tarde",
            "Noite",
          ])}

        {isCampoVisivel("recompensa") && (
          <>
            <label
              style={{
                fontWeight: "bold",
              }}
            >
              Recompensa
            </label>
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
            <label
              style={{
                fontWeight: "bold",
              }}
            >
              Descrição do Local
            </label>
            <input
              type="text"
              name="descricaoLocal"
              value={formData.descricaoLocal}
              onChange={handleInput}
            />
          </>
        )}

        {isCampoVisivel("localPet") &&
          selectList("Local do Pet", "localPet", [
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
            <label
              style={{
                fontWeight: "bold",
              }}
            >
              Telefone para Contato
            </label>
            <input
              type="text"
              name="telefone"
              value={formData.telefone}
              onChange={handleInput}
            />
          </>
        )}

        {formData.situacao === "Adocao" && (
          <>
            {renderGrupoCaracteristicas("Cuidados Veterinários", "cuidados")}
            {renderGrupoCaracteristicas("Temperamento", "temperamento")}
            {renderGrupoCaracteristicas("Adaptabilidade", "adaptabilidade")}
            {renderGrupoCaracteristicas("Socialização", "socializacao")}
          </>
        )}

        <div className="modal-actions-modal-ppet">
          <button onClick={salvarEdicao}>Salvar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default EditarModal;
