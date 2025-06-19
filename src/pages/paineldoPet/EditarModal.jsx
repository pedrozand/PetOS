import { useState, useEffect } from "react";
import "./CSS/editarModal.css";
import { FiX } from "react-icons/fi";

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

  return (
    <div className="modal-overlay-modal-ppet">
      <div className="modal-content-modal-ppet">
        <h3>Editar Informações do Pet</h3>

        <label>Nome do Animal:</label>
        <input
          type="text"
          name="nomeAnimal"
          value={formData.nomeAnimal}
          onChange={handleInput}
        />

        <label>Espécie:</label>
        <select name="especie" value={formData.especie} onChange={handleInput}>
          <option value="">Selecione</option>
          <option value="Cachorro">Cachorro</option>
          <option value="Gato">Gato</option>
          <option value="Pássaro">Pássaro</option>
        </select>

        <label>Raça:</label>
        <select name="raca" value={formData.raca} onChange={handleInput}>
          {racas[formData.especie]?.map((r, i) => (
            <option key={i} value={r}>
              {r}
            </option>
          ))}
        </select>

        <label>Descrição:</label>
        <textarea
          name="descricao"
          value={formData.descricao}
          onChange={handleInput}
        />

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
                type="button"
                aria-label="Remover imagem"
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

        <div className="modal-actions-modal-ppet">
          <button onClick={salvarEdicao}>Salvar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default EditarModal;
