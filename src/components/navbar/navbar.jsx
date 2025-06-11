import { Link } from "react-router-dom";
import "./CSS/navbar.css";
import "./CSS/dropdown.css";

import { useAuth } from "../../../server/context/AuthContext.jsx";
import { useState, useEffect } from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import React from "react";

import Logo from "../../assets/img/icon/logo_petos.png";
import imgAdocao from "../../assets/img/icon/adocao_icon.png";

import imgPerfilTeste from "../../assets/img/perfil/Pedrozand.jpg"; // Substitua futuramente pela foto real do usuário

export default function Navbar() {
  const { usuario } = useAuth();
  const [dropdownAberto, setDropdownAberto] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/main">
                      Achados e Perdidos
                      <span>
                        Posts de pets perdidos e encontrados em sua região!
                      </span>
                    </Link>
                  </li>
                  <li>
                    <a href="me-acharam.html">
                      Meu humano voltou
                      <span>Veja os reencontros mais recentes!</span>
                    </a>
                  </li>
                  <li>
                    <a href="como-funciona-busca.html">
                      Como funciona?
                      <span>
                        Entenda como o PetOS ajuda na busca do seu pet!
                      </span>
                    </a>
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
                <ul className="dropdown-menu">
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
                <ul className="dropdown-menu">
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
                <Link to="/perfil">
                  <img
                    src={imgPerfilTeste}
                    alt="Perfil"
                    className="profile-pic"
                  />
                  <div className="online-indicator"></div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
