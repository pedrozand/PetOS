import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/paineldoUser.css";

import ImagemDefault from "../../assets/img/perfil/img-default.png";

import NavBar from "../../components/navbar/navbar.jsx";
import Footer from "../../components/footer/footer.jsx";
import { useAuth } from "../../../server/context/AuthContext.jsx";

const PainelDoUser = () => {
  const { usuario, login, logout } = useAuth();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    telefone: "",
    cep: "",
    numeroCasa: "",
    fotoPerfil: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState({ ...userData });
  const [erro, setErro] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [fotoPreview, setFotoPreview] = useState(ImagemDefault);

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

        // Se não houver foto, usa imagem padrão
        if (data.fotoPerfil) {
          setFotoPreview(`http://localhost:3001/uploads/${data.fotoPerfil}`);
        } else {
          setFotoPreview(ImagemDefault);
        }
      } catch (error) {
        setErro(error.message);
      }
    };

    fetchUserData();
  }, [usuario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let valorFormatado = value;

    if (name === "telefone") {
      valorFormatado = formatarTelefone(value);
    } else if (name === "cep") {
      valorFormatado = formatarCEP(value);
    }

    setFormValues({
      ...formValues,
      [name]: valorFormatado,
    });
  };

  const handleSave = async () => {
    try {
      const { email, ...formDataSemEmail } = formValues;

      const res = await fetch(
        `http://localhost:3001/api/usuarios/${usuario.idUser}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formDataSemEmail),
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

      login({
        ...usuario,
        nome: updatedUser.nome,
        email: updatedUser.email,
        fotoPerfil: updatedUser.fotoPerfil,
      });

      alert("Informações atualizadas com sucesso!");
      setErro("");
    } catch (error) {
      setErro(error.message);
    }
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFotoPreview(URL.createObjectURL(file));
  };

  const handleFotoUpload = async () => {
    if (!selectedFile) return alert("Selecione uma imagem primeiro!");

    const formData = new FormData();
    formData.append("fotoPerfil", selectedFile);

    try {
      const res = await fetch(
        `http://localhost:3001/api/usuarios/${usuario.idUser}/foto`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Erro ao enviar a foto");

      const data = await res.json();
      setUserData((prev) => ({ ...prev, fotoPerfil: data.fotoPerfil }));
      setFotoPreview(`http://localhost:3001/uploads/${data.fotoPerfil}`);
      setSelectedFile(null);
      alert("Foto atualizada com sucesso!");

      window.location.reload();
    } catch (err) {
      alert("Erro ao atualizar a foto de perfil.");
    }
  };

  const formatarTelefone = (valor) => {
    const somenteNumeros = valor.replace(/\D/g, "").slice(0, 11);
    if (somenteNumeros.length <= 10) {
      return somenteNumeros.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else {
      return somenteNumeros.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    }
  };

  const formatarCEP = (valor) => {
    const somenteNumeros = valor.replace(/\D/g, "").slice(0, 8);
    return somenteNumeros.replace(/(\d{5})(\d{0,3})/, "$1-$2");
  };

  return (
    <>
      <div className="painel-container">
        <NavBar />
        <div className="bcolor-painel">
          <h2 className="painel-titulo">Painel do Usuário</h2>
        </div>
        <div className="painel-wrapper">
          <div className="painel-geral">
            <h2>Informações Gerais</h2>
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

            <div className="painel-formulario">
              {erro && <p className="error">{erro}</p>}

              <div className="painel-campo">
                <label className="painel-label">
                  Email<b>Seu e-mail não pode ser alterado.</b>
                </label>
                {editMode ? (
                  <input
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    className="painel-input"
                    disabled
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
                <label className="painel-label">Sobrenome</label>
                {editMode ? (
                  <input
                    type="text"
                    name="sobrenome"
                    value={formValues.sobrenome}
                    onChange={handleChange}
                    className="painel-input"
                  />
                ) : (
                  <p className="painel-texto">{userData.sobrenome}</p>
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
            </div>
          </div>

          <div className="painel-perfil">
            <div className="perfil-conteudo">
              <div className="perfil-lado-esquerdo">
                <img
                  src={fotoPreview ? fotoPreview : ImagemDefault}
                  alt="Foto do usuário"
                  className="painel-foto-perfil"
                />
                <input
                  type="file"
                  id="upload-foto"
                  accept="image/*"
                  onChange={handleFotoChange}
                  className="painel-upload-foto"
                />
                <label htmlFor="upload-foto" className="painel-botao trocar">
                  Trocar foto de perfil
                </label>
                {selectedFile && (
                  <button
                    onClick={handleFotoUpload}
                    className="painel-botao salvar"
                  >
                    Salvar Foto
                  </button>
                )}
              </div>

              <div className="perfil-lado-direito">
                <div className="perfil-info">
                  <a>Nome</a>
                  <h3 className="painel-nome-usuario">
                    {userData.nome} {userData.sobrenome}
                  </h3>
                  <div className="painel-info-contato-wrap">
                    <h3 className="painel-info-contato">
                      Informações de Contato
                    </h3>
                    <a>Telefone</a>
                    <h3 className="painel-telefone-usuario">
                      {userData.telefone}
                    </h3>
                    <a>Email</a>
                    <h3 className="painel-email-usuario">{userData.email}</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="linha-logout">
              <hr className="linha-separadora" />
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="painel-botao logout"
              >
                Sair
              </button>
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
