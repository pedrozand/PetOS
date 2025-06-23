import { Link, useNavigate } from "react-router-dom";

import "./CSS/navbar.css";
import "./CSS/dropdown.css";
import "./CSS/perfil-menu.css";

import { useAuth } from "../../../server/context/AuthContext.jsx";
import { useState, useEffect } from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";

import Logo from "../../assets/img/icon/logo_petos.png";
import imgAdocao from "../../assets/img/icon/adocao_icon.png";

import imgPerfilDefault from "../../assets/img/perfil/img-default.png"; // Substitua futuramente pela foto real do usuário

export default function Navbar() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const [fotoPerfilURL, setFotoPerfilURL] = useState(imgPerfilDefault);

  useEffect(() => {
    const buscarFotoPerfil = async () => {
      if (!usuario?.idUser) return;

      try {
        const res = await fetch(
          `http://localhost:3001/api/usuarios/${usuario.idUser}`
        );
        if (!res.ok) throw new Error("Erro ao buscar usuário");

        const data = await res.json();

        if (data.fotoPerfil) {
          setFotoPerfilURL(`http://localhost:3001/uploads/${data.fotoPerfil}`);
        } else {
          setFotoPerfilURL(imgPerfilDefault);
        }
      } catch (err) {
        console.error("Erro ao carregar imagem de perfil:", err.message);
        setFotoPerfilURL(imgPerfilDefault);
      }
    };

    buscarFotoPerfil();
  }, [usuario]);

  const URL_IMG = "http://localhost:3001/uploads/"; // ajuste se for outra URL do backend
  const imagemPerfil = usuario?.fotoPerfil
    ? `${URL_IMG}${usuario.fotoPerfil}`
    : imgPerfilDefault;

  const [dropdownAberto, setDropdownAberto] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [perfilMenuAberto, setPerfilMenuAberto] = useState(false);

  const togglePerfilMenu = () => {
    setPerfilMenuAberto((prev) => !prev);
  };

  const fecharPerfilMenu = () => {
    setPerfilMenuAberto(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [usuario]);

  const handleMouseEnter = (menu) => setDropdownAberto(menu);
  const handleMouseLeave = () => setDropdownAberto(null);

  return (
    <>
      <div className={`navbar-background ${scrolled ? "scrolled" : ""}`}></div>
      <div className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="Logo PetOS" className="logo-petos" />
          </Link>
        </div>

        <div className="right-icons-group">
          <ul className="nav-menu">
            {/* Menu Busca */}
            <li
              className="dropdown busca-menu"
              onMouseEnter={() => handleMouseEnter("busca")}
              onMouseLeave={handleMouseLeave}
            >
              <a href="#">
                Busca{" "}
                {dropdownAberto === "busca" ? (
                  <SlArrowUp className="dropdown-arrow" />
                ) : (
                  <SlArrowDown className="dropdown-arrow" />
                )}
              </a>
              {dropdownAberto === "busca" && (
                <ul className={`dropdown-menu ${usuario ? "logged-in" : ""}`}>
                  <li>
                    <Link to="/main">
                      Achados e Perdidos
                      <span>
                        Posts de pets perdidos e encontrados em sua região!
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/petEncontr">
                      Meu humano voltou
                      <span>Veja os reencontros mais recentes!</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/comoFunc">
                      Como funciona?
                      <span>
                        Entenda como o PetOS ajuda na busca do seu pet!
                      </span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Menu Conheça */}
            <li
              className="dropdown"
              onMouseEnter={() => handleMouseEnter("conheca")}
              onMouseLeave={handleMouseLeave}
            >
              <a href="#">
                Conheça{" "}
                {dropdownAberto === "conheca" ? (
                  <SlArrowUp className="dropdown-arrow" />
                ) : (
                  <SlArrowDown className="dropdown-arrow" />
                )}
              </a>
              {dropdownAberto === "conheca" && (
                <ul className={`dropdown-menu ${usuario ? "logged-in" : ""}`}>
                  <li>
                    <a href="achados-perdidos.html">
                      ONG Faros D'Ajuda
                      <span>ONG em prol dos animais de rua.</span>
                    </a>
                  </li>
                </ul>
              )}
            </li>

            {/* Icone Adoção */}
            <div className="right-icons">
              <a href="adocao.html">
                <img src={imgAdocao} alt="Icone Adoção" className="icon-adot" />
              </a>
            </div>

            {/* Menu Adoção */}
            <li
              className="dropdown adocao-dropdown"
              onMouseEnter={() => handleMouseEnter("adocao")}
              onMouseLeave={handleMouseLeave}
            >
              <a href="#">
                Adoção{" "}
                {dropdownAberto === "adocao" ? (
                  <SlArrowUp className="dropdown-arrow" />
                ) : (
                  <SlArrowDown className="dropdown-arrow" />
                )}
              </a>
              {dropdownAberto === "adocao" && (
                <ul className={`dropdown-menu ${usuario ? "logged-in" : ""}`}>
                  <li>
                    <a href="/View/adocao.html">
                      Pets para Adoção
                      <span>Veja pets disponíveis em sua localidade.</span>
                    </a>
                  </li>
                  <li>
                    <a href="como-funciona-adocao.html">
                      Como funciona a adoção?
                      <span>Entenda como adotar com o PetOS!</span>
                    </a>
                  </li>
                </ul>
              )}
            </li>
          </ul>

          {/* Botões à Direita */}
          <div className="right-buttons">
            <Link to="/anunciarPet">
              <button className="btn-anunciar">Anunciar</button>
            </Link>

            {!usuario ? (
              <Link to="/login">
                <button className="btn-entrar">Entrar</button>
              </Link>
            ) : (
              <div className="right-profile">
                <div className="profile-wrapper" onClick={togglePerfilMenu}>
                  <img
                    src={fotoPerfilURL}
                    alt="Foto do usuário"
                    className="profile-pic"
                  />
                  <div className="online-indicator"></div>
                </div>

                {perfilMenuAberto && (
                  <div className="perfil-dropdown-menu">
                    <Link to="/painelPet" onClick={fecharPerfilMenu}>
                      <a className="tit-color">Meus Pets</a>
                    </Link>
                    <Link to="/painelUser" onClick={fecharPerfilMenu}>
                      <a className="tit-color">Minha Conta</a>
                    </Link>
                    <div className="perfil-email">{usuario?.email}</div>
                    <button
                      onClick={() => {
                        fecharPerfilMenu();
                        logout();
                        navigate("/");
                      }}
                    >
                      Sair
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
