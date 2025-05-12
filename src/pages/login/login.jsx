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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !senha) {
      setErro("Por favor, preencha todos os campos.");
      return;
    }

    setErro("");
    // Aqui você pode integrar com sua API
    console.log("Login com:", { email, senha });

    // Redireciona para página principal após login
    // Exemplo: navigate("/dashboard");
    alert("Login realizado com sucesso!");
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
