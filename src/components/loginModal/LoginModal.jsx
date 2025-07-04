import { useState } from "react";
import "./CSS/loginModal.css";
import { useAuth } from "../../../server/context/AuthContext.jsx";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import CadastroModal from "../cadastroModal/CadastroModal.jsx";

const LoginModal = ({ onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const { login } = useAuth();

  const [mostrarCadastro, setMostrarCadastro] = useState(false);

  const alternarVisibilidadeSenha = () => {
    setMostrarSenha((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !senha) {
      setErro("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErro(data.erro || "E-mail ou senha inválidos");
        return;
      }

      login(data);
      onLoginSuccess();
    } catch (error) {
      setErro("Erro ao conectar com o servidor.");
    }
  };

  return (
    <>
      <div className="modal-overlay-login">
        <div className="modal-content-login">
          <button className="btn-close" onClick={onClose}>
            ×
          </button>
          <h2>Login Necessário</h2>
          <p className="mensagem-explicativa">
            Para finalizar a publicação do pet, é necessário fazer login ou
            criar uma conta no PetOS.
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="campo-senha-sen-modal">
              <input
                type={mostrarSenha ? "text" : "password"}
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
              {senha && (
                <span
                  className="icone-olho-sen-modal"
                  onClick={alternarVisibilidadeSenha}
                >
                  {mostrarSenha ? <FaEye /> : <FaEyeSlash />}
                </span>
              )}
            </div>
            {erro && <p className="erro-login">{erro}</p>}
            <button type="submit" className="btn-login">
              Entrar
            </button>
          </form>

          <p className="mensagem-cadastro">
            Ainda não tem uma conta?{" "}
            <button
              className="btn-cadastro-inline"
              onClick={() => setMostrarCadastro(true)}
            >
              Cadastre-se
            </button>
          </p>
        </div>
      </div>

      {mostrarCadastro && (
        <CadastroModal
          onClose={() => setMostrarCadastro(false)}
          onCadastroSuccess={() => {
            setMostrarCadastro(false); // fecha o CadastroModal
            onClose(); // fecha o LoginModal
            onLoginSuccess(); // segue o fluxo do formulário
          }}
        />
      )}
    </>
  );
};

export default LoginModal;
