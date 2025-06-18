import { useState } from "react";
import "./CSS/cadastroModal.css";
import { useAuth } from "../../../server/context/AuthContext.jsx";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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

  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  const [erroEmail, setErroEmail] = useState("");
  const [erroSenha, setErroSenha] = useState("");
  const [erroConfirmarSenha, setErroConfirmarSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

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

    if (formData.senha.length < 8) {
      setErroSenha("A senha deve ter pelo menos 8 caracteres.");
      return;
    }
    if (formData.senha !== confirmarSenha) {
      setErroConfirmarSenha("As senhas não coincidem.");
      return;
    }

    setErroSenha("");
    setErroConfirmarSenha("");
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
        login(resultado);
        onClose();
        onCadastroSuccess?.();
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
        <button className="btn-fechar-cadastro" onClick={onClose}>
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

          {/* SENHA */}
          <div className="input-container-modal-cad">
            <input
              name="senha"
              placeholder="Senha (mínimo 8 caracteres)"
              type={mostrarSenha ? "text" : "password"}
              value={formData.senha}
              onChange={(e) => {
                const senha = e.target.value;
                setFormData({ ...formData, senha });

                if (confirmarSenha && senha !== confirmarSenha) {
                  setErroConfirmarSenha("As senhas não coincidem.");
                } else {
                  setErroConfirmarSenha("");
                }

                if (erroSenha) setErroSenha("");
              }}
              onBlur={() => {
                if (formData.senha && formData.senha.length < 8) {
                  setErroSenha("A senha deve ter pelo menos 8 caracteres.");
                }
              }}
              className={erroSenha ? "input-erro-modal-cad" : ""}
              required
            />
            {formData.senha && (
              <span
                className="icone-olho-modal-cad"
                onClick={() => setMostrarSenha(!mostrarSenha)}
              >
                {mostrarSenha ? <FaEye /> : <FaEyeSlash />}
              </span>
            )}
          </div>
          {erroSenha && <p className="mensagem-erro-modal-cad">{erroSenha}</p>}

          {/* CONFIRMAR SENHA */}
          <div className="input-container-modal-cad">
            <input
              name="confirmarSenha"
              placeholder="Confirmar senha"
              type={mostrarConfirmarSenha ? "text" : "password"}
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              onBlur={() => {
                if (confirmarSenha !== formData.senha) {
                  setErroConfirmarSenha("As senhas não coincidem.");
                } else {
                  setErroConfirmarSenha("");
                }
              }}
              className={erroConfirmarSenha ? "input-erro-modal-cad" : ""}
              required
            />
            {confirmarSenha && (
              <span
                className="icone-olho-modal-cad"
                onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
              >
                {mostrarConfirmarSenha ? <FaEye /> : <FaEyeSlash />}
              </span>
            )}
          </div>
          {erroConfirmarSenha && (
            <p className="mensagem-erro-modal-cad">{erroConfirmarSenha}</p>
          )}

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
