import { Link } from "react-router-dom";
import { useState } from "react";
import "./CSS/login.css";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import NavBar from "../../components/navbar/navbar.jsx";
import Footer from "../../components/footer/footer.jsx";

import { useAuth } from "../../../server/context/AuthContext.jsx"; // importe o hook do contexto

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuth(); // obtenha a função login do contexto

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
        setErro(data.erro || "Erro ao fazer login");
        return;
      }

      // Use a função login do contexto para atualizar estado e localStorage
      login(data);

      // Verifica se havia um formulário em andamento
      const formDataTemp = localStorage.getItem("formDataTemp");
      const formStepTemp = localStorage.getItem("formStepTemp");

      if (formDataTemp && formStepTemp) {
        // Limpa os dados temporários
        localStorage.removeItem("formDataTemp");
        localStorage.removeItem("formStepTemp");

        navigate("/anunciarPet", {
          state: {
            formData: JSON.parse(formDataTemp),
            step: Number(formStepTemp),
          },
        });
      } else {
        navigate("/"); // Redirecionamento normal se não houver dados
      }
    } catch (error) {
      setErro("Erro ao conectar com o servidor.");
    }
  };

  return (
    <>
      <div className="container-login">
        <NavBar />
        <h2>Faça o login ou crie uma conta</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="campo-senha-sen">
            <input
              type={mostrarSenha ? "text" : "password"}
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            {senha && (
              <span
                className="icone-olho-sen"
                onClick={alternarVisibilidadeSenha}
              >
                {mostrarSenha ? <FaEye /> : <FaEyeSlash />}
              </span>
            )}
          </div>
          {erro && <p className="error">{erro}</p>}
          <button className="btn-login" type="submit">
            Entrar
          </button>
        </form>
        <Link to="/cadastroUser" className="linkroute-ajuste">
          <div className="link-cadastro">
            Não tem uma conta? <a>Cadastre-se</a>
          </div>
        </Link>
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </>
  );
};

export default Login;
