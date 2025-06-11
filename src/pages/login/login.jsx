import { Link } from "react-router-dom";
import { useState } from "react";
import "./CSS/login.css";
import { useNavigate } from "react-router-dom";

import NavBar from "../../components/navbar/navbar.jsx";
import Footer from "../../components/footer/footer.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

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

      // Armazena os dados do usuário logado no localStorage
      localStorage.setItem("usuario", JSON.stringify(data));

      // Redireciona
      navigate("/"); // ou página protegida
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
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
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
