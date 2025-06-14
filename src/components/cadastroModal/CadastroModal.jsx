import { useState } from "react";
import "./CSS/cadastroModal.css";

const CadastroModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    telefone: "",
    email: "",
    senha: "",
    cep: "",
    numeroCasa: "",
  });

  const [mensagem, setMensagem] = useState("");
  const [erroEmail, setErroEmail] = useState("");

  const formatarTelefone = (valor) => {
    let telefone = valor.replace(/\D/g, "");
    return telefone.length > 10
      ? telefone.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3")
      : telefone.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
  };

  const formatarCEP = (valor) => {
    valor = valor.replace(/\D/g, "");
    return valor.length > 5
      ? valor.replace(/^(\d{5})(\d{1,3}).*/, "$1-$2")
      : valor;
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    const isDeleting = e.nativeEvent?.inputType === "deleteContentBackward";

    if (name === "telefone")
      value = isDeleting ? value : formatarTelefone(value);
    if (name === "cep") value = isDeleting ? value : formatarCEP(value);

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMensagem("Cadastro realizado com sucesso!");
        setFormData({
          nome: "",
          sobrenome: "",
          telefone: "",
          email: "",
          senha: "",
          cep: "",
          numeroCasa: "",
        });
      } else if (response.status === 409) {
        setErroEmail(data.erro);
        setMensagem("");
      } else {
        setErroEmail("");
        setMensagem(data.erro || "Erro ao cadastrar.");
      }
    } catch (error) {
      setMensagem("Erro de conexão com o servidor.");
    }
  };

  return (
    <div className="modal-overlay-cadastro">
      <div className="modal-content-cadastro">
        <h2>Crie sua conta no PetOS</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="nome"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
          <input
            name="sobrenome"
            placeholder="Sobrenome"
            value={formData.sobrenome}
            onChange={handleChange}
            required
          />
          <input
            name="telefone"
            placeholder="Telefone"
            value={formData.telefone}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={erroEmail ? "erro-input" : ""}
            required
          />
          {erroEmail && <p className="erro-texto">{erroEmail}</p>}
          <input
            name="senha"
            placeholder="Senha"
            type="password"
            value={formData.senha}
            onChange={handleChange}
            required
          />
          <input
            name="cep"
            placeholder="CEP"
            value={formData.cep}
            onChange={handleChange}
            required
          />
          <input
            name="numeroCasa"
            placeholder="Número da Casa"
            value={formData.numeroCasa}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn-cadastro">
            Cadastrar
          </button>
        </form>
        {mensagem && <p className="mensagem-feedback">{mensagem}</p>}

        <button className="btn-fechar-cadastro" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
};

export default CadastroModal;
