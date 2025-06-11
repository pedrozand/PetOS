import React, { useState, useEffect } from "react";
import "./CSS/paineldoUser.css";

import NavBar from "../../components/navbar/navbar.jsx";
import Footer from "../../components/footer/footer.jsx";
import { useAuth } from "../../../server/context/AuthContext.jsx";

const PainelDoUser = () => {
  const { usuario, login } = useAuth();

  const [userData, setUserData] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    telefone: "",
    cep: "",
    numeroCasa: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState({ ...userData });
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (!usuario?.idUser) return;

    const fetchUserData = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/api/usuarios/${usuario.idUser}`
        );
        if (!res.ok) throw new Error("Erro ao buscar dados do usuário");
        const data = await res.json();
        setUserData(data);
        setFormValues(data);
      } catch (error) {
        setErro(error.message);
      }
    };

    fetchUserData();
  }, [usuario]);

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/usuarios/${usuario.idUser}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formValues),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.erro || "Erro ao atualizar usuário");
      }

      const updatedUser = await res.json();

      setUserData(updatedUser);
      setFormValues(updatedUser);
      setEditMode(false);

      // Atualiza o contexto e o localStorage com os dados atualizados
      login({
        ...usuario,
        nome: updatedUser.nome,
        email: updatedUser.email,
      });

      alert("Informações atualizadas com sucesso!");
      setErro("");
    } catch (error) {
      setErro(error.message);
    }
  };

  return (
    <>
      <div className="painel-container">
        <NavBar />
        <h2 className="painel-titulo">Painel do Usuário</h2>
        <div className="painel-geral">
          <h2>Informações Gerais</h2>
          <div className="painel-formulario">
            {erro && <p className="error">{erro}</p>}

            <div className="painel-campo">
              <label className="painel-label">Email</label>
              {editMode ? (
                <input
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  className="painel-input"
                />
              ) : (
                <p className="painel-texto">{userData.email}</p>
              )}
            </div>

            <div className="painel-campo">
              <label className="painel-label">Nome</label>
              {editMode ? (
                <input
                  type="text"
                  name="nome"
                  value={formValues.nome}
                  onChange={handleChange}
                  className="painel-input"
                />
              ) : (
                <p className="painel-texto">{userData.nome}</p>
              )}
            </div>

            <div className="painel-campo">
              <label className="painel-label">Telefone</label>
              {editMode ? (
                <input
                  type="text"
                  name="telefone"
                  value={formValues.telefone}
                  onChange={handleChange}
                  className="painel-input"
                />
              ) : (
                <p className="painel-texto">{userData.telefone}</p>
              )}
            </div>

            <div className="painel-campo">
              <label className="painel-label">CEP</label>
              {editMode ? (
                <input
                  type="text"
                  name="cep"
                  value={formValues.cep}
                  onChange={handleChange}
                  className="painel-input"
                />
              ) : (
                <p className="painel-texto">{userData.cep}</p>
              )}
            </div>

            <div className="painel-campo">
              <label className="painel-label">Número da Casa</label>
              {editMode ? (
                <input
                  type="text"
                  name="numeroCasa"
                  value={formValues.numeroCasa}
                  onChange={handleChange}
                  className="painel-input"
                />
              ) : (
                <p className="painel-texto">{userData.numeroCasa}</p>
              )}
            </div>

            <div className="painel-botoes">
              {editMode ? (
                <>
                  <button onClick={handleSave} className="painel-botao salvar">
                    Salvar
                  </button>
                  <button
                    onClick={() => {
                      setFormValues(userData);
                      setEditMode(false);
                      setErro("");
                    }}
                    className="painel-botao cancelar"
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditMode(true)}
                  className="painel-botao editar"
                >
                  Editar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="footer-container-painel-user">
        <Footer />
      </div>
    </>
  );
};

export default PainelDoUser;
