import { useState } from "react";
import "./CSS/cadastroModal.css";
import { useAuth } from "../../../server/context/AuthContext.jsx";

const CadastroModal = ({ onClose, onCadastroSuccess }) => {
  const { login } = useAuth();

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
    if (telefone.length > 10) {
      telefone = telefone.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else {
      telefone = telefone.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    }
    return telefone;
  };

  const formatarCEP = (valor) => {
    valor = valor.replace(/\D/g, "");
    if (valor.length > 5) {
      valor = valor.replace(/^(\d{5})(\d{1,3}).*/, "$1-$2");
    }
    return valor;
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    const isDeleting = e.nativeEvent.inputType === "deleteContentBackward";

    if (name === "telefone") {
      value = isDeleting ? value : formatarTelefone(value);
    }

    if (name === "cep") {
      value = isDeleting ? value : formatarCEP(value);
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErroEmail("");
    setMensagem("");

    try {
      const response = await fetch("http://localhost:3001/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const resultado = await response.json();

      if (response.ok) {
        login(resultado); // login automático
        onClose(); // fecha o CadastroModal
        onCadastroSuccess?.(); // avisa o LoginModal para fechar também
      } else if (response.status === 409) {
        setErroEmail(resultado.erro || "E-mail já cadastrado.");
      } else {
        setMensagem(
          "Erro ao cadastrar: " + (resultado.erro || "Erro desconhecido.")
        );
      }
    } catch (error) {
      console.error("Erro ao conectar com API:", error);
      setMensagem("Erro de conexão com o servidor.");
    }
  };

  return (
    <div className="modal-overlay-cadastro">
      <div className="modal-content-cadastro">
        <button className="btn-close" onClick={onClose}>
          ×
        </button>
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
            className={erroEmail ? "input-erro" : ""}
            required
          />
          {erroEmail && <p className="mensagem-erro">{erroEmail}</p>}
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
            placeholder="Número da casa"
            value={formData.numeroCasa}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn-cadastro">
            Cadastrar
          </button>
        </form>
        {mensagem && <p className="mensagem">{mensagem}</p>}
      </div>
    </div>
  );
};

export default CadastroModal;
