import { useState } from "react";
import "./CSS/cadastroUser.css";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import NavBar from "../../components/navbar/navbar.jsx";
import Footer from "../../components/footer/footer.jsx";

function CadastroUser() {
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
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erroSenha, setErroSenha] = useState("");
  const [erroConfirmarSenha, setErroConfirmarSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const navigate = useNavigate();

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

    setErroConfirmarSenha("");
    setErroSenha("");

    try {
      const response = await fetch("http://localhost:3001/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const resultado = await response.json();
        setMensagem("Usuário cadastrado com sucesso!");
        setTimeout(() => {
          navigate("/login"); // ✅ Redireciona para o login
        }, 1000);
        console.log("Usuário criado:", resultado);
        setFormData({
          nome: "",
          sobrenome: "",
          telefone: "",
          email: "",
          senha: "",
          cep: "",
          numeroCasa: "",
        });
        setConfirmarSenha("");
      } else {
        const erro = await response.json();
        if (response.status === 409) {
          setErroEmail(erro.erro);
          setMensagem("");
        } else {
          setErroEmail("");
          setMensagem(
            "Erro ao cadastrar: " + (erro.erro || "Erro desconhecido.")
          );
        }
      }
    } catch (error) {
      console.error("Erro ao conectar com API:", error);
      setMensagem("Erro de conexão com o servidor.");
    }
  };

  return (
    <>
      <div className="cadastro-container">
        <NavBar />
        <h2>Cadastre-se no PetOS</h2>
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
          {/* SENHA */}
          <div className="input-container">
            <input
              name="senha"
              placeholder="Senha (mínimo 8 caracteres)"
              type={mostrarSenha ? "text" : "password"}
              value={formData.senha}
              onChange={(e) => {
                const senha = e.target.value;
                setFormData({ ...formData, senha });

                // Se o usuário já preencheu a confirmação, verifica se são iguais
                if (confirmarSenha && senha !== confirmarSenha) {
                  setErroConfirmarSenha("As senhas não coincidem.");
                } else {
                  setErroConfirmarSenha("");
                }

                // Esconde erro enquanto digita
                if (erroSenha) setErroSenha("");
              }}
              onBlur={() => {
                if (formData.senha && formData.senha.length < 8) {
                  setErroSenha("A senha deve ter pelo menos 8 caracteres.");
                }
              }}
              className={erroSenha ? "input-erro" : ""}
            />
            {formData.senha && (
              <span
                className="icone-olho"
                onClick={() => setMostrarSenha(!mostrarSenha)}
              >
                {mostrarSenha ? <FaEye /> : <FaEyeSlash />}
              </span>
            )}
          </div>
          {erroSenha && <p className="mensagem-erro">{erroSenha}</p>}

          {/* CONFIRMAR SENHA */}
          <div className="input-container">
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
              className={erroConfirmarSenha ? "input-erro" : ""}
            />
            {confirmarSenha && (
              <span
                className="icone-olho"
                onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
              >
                {mostrarConfirmarSenha ? <FaEyeSlash /> : <FaEye />}
              </span>
            )}
          </div>
          {erroConfirmarSenha && (
            <p className="mensagem-erro">{erroConfirmarSenha}</p>
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
        {mensagem && <p>{mensagem}</p>}
      </div>
      <div className="footer-container-cadastro">
        <Footer />
      </div>
    </>
  );
}

export default CadastroUser;
