import { useState } from "react";
import "./CSS/cadastroUser.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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

  const formatarTelefone = (valor) => {
    let telefone = valor.replace(/\D/g, ""); // Remove caracteres não numéricos

    if (telefone.length > 10) {
      telefone = telefone.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else {
      telefone = telefone.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    }

    return telefone;
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    // Verifica se foi pressionada a tecla Backspace ou Delete
    const isDeleting = e.nativeEvent.inputType === "deleteContentBackward";

    if (name === "telefone") {
      value = isDeleting ? value : formatarTelefone(value);
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const resultado = await response.json();
        setMensagem("Usuário cadastrado com sucesso!");
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
      } else {
        const erro = await response.json();

        if (response.status === 409) {
          setErroEmail(erro.erro); // mensagem de erro do backend
          setMensagem(""); // limpa a mensagem geral
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
        {mensagem && <p>{mensagem}</p>}
      </div>
      <div className="footer-container-cadastro">
        <Footer />
      </div>
    </>
  );
}

export default CadastroUser;
