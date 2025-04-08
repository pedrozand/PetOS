import { Link } from "react-router-dom";

import "./CSS/navbar.css";
import "./CSS/dropdown.css";

import { useState, useEffect } from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import React from "react";

import Logo from "../../assets/img/icon/logo_petos.png";
import imgAdocao from "../../assets/img/icon/adocao_icon.png";

import imgPerfilTeste from "../../assets/img/perfil/Pedrozand.jpg";

export default function Navbar() {
  const [dropdownAberto, setDropdownAberto] = useState(null);
  const [scrolled, setScrolled] = useState(false); // Estado para verificar se rolou a página

  // Função para abrir e fechar dropdown ao passar o mouse
  const handleMouseEnter = (menu) => {
    setDropdownAberto(menu);
  };

  const handleMouseLeave = () => {
    setDropdownAberto(null);
  };

  // Função para verificar o scroll da página
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true); // Se rolar mais que 50px, muda para transparente
      } else {
        setScrolled(false); // Se estiver no topo, mantém branco
      }
    };

    window.addEventListener("scroll", handleScroll); // Detecta o scroll

    // Cleanup ao desmontar o componente
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  let login = false;
  if (login === true) {
    return (
      <>
        <div
          className={`navbar-background ${scrolled ? "scrolled" : ""}`}
        ></div>
        <div className={`navbar ${scrolled ? "scrolled" : ""}`}>
          {" "}
          {/* Classe condicional */}
          <div className="logo">
            <Link to="/">
              <img src={Logo} alt="Logo PetOS" className="logo-petos" />
            </Link>
          </div>
          {/* Menu principal */}
          <div className="right-icons-group">
            <ul className="nav-menu">
              {/* Item - Busca */}
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
                        <span>
                          Veja os reencontros mais recentes de pets e seus
                          tutores!
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="como-funciona-busca.html">
                        Como funciona?
                        <span>
                          Compreenda como o PetOS ajuda na busca de seu pet!
                        </span>
                      </a>
                    </li>
                  </ul>
                )}
              </li>

              {/* Item - Conheça */}
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

              {/* Ícone de adoção */}
              <div className="right-icons">
                <a href="adocao.html">
                  <img
                    src={imgAdocao}
                    alt="Icone Adoção"
                    className="icon-adot"
                  />
                </a>
              </div>

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
                        <span>
                          Pets disponíveis para adoção em sua localidade.
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="como-funciona-adocao.html">
                        Como funciona a adoção?
                        <span>
                          Compreenda como os pets podem encontrar um novo lar!
                        </span>
                      </a>
                    </li>
                  </ul>
                )}
              </li>
            </ul>

            {/* Ícone de perfil */}
            <div className="right-profile">
              <a href="perfil.html">
                <img
                  src={imgPerfilTeste}
                  alt="Perfil"
                  className="profile-pic"
                />
                <div className="online-indicator"></div>
              </a>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
          className={`navbar-background ${scrolled ? "scrolled" : ""}`}
        ></div>
        <div className={`navbar  ${scrolled ? "scrolled" : ""}`}>
          {" "}
          {/* Classe condicional */}
          <div className="logo">
            <Link to="/">
              <img src={Logo} alt="Logo PetOS" className="logo-petos" />
            </Link>
          </div>
          {/* Menu principal */}
          <div className="right-icons-group">
            <ul className="nav-menu">
              {/* Item - Busca */}
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
                        <span>
                          Veja os reencontros mais recentes de pets e seus
                          tutores!
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="como-funciona-busca.html">
                        Como funciona?
                        <span>
                          Compreenda como o PetOS ajuda na busca de seu pet!
                        </span>
                      </a>
                    </li>
                  </ul>
                )}
              </li>

              {/* Item - Conheça */}
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

              {/* Ícone de adoção */}
              <div className="right-icons">
                <a href="adocao.html">
                  <img
                    src={imgAdocao}
                    alt="Icone Adoção"
                    className="icon-adot"
                  />
                </a>
              </div>

              {/* Item - Adoção */}
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
                        <span>
                          Pets disponíveis para adoção em sua localidade.
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="como-funciona-adocao.html">
                        Como funciona a adoção?
                        <span>
                          Compreenda como os pets podem encontrar um novo lar!
                        </span>
                      </a>
                    </li>
                  </ul>
                )}
              </li>
            </ul>

            {/* <!-- Ícone Auxiliares == Usuário não logado --> */}
            <div class="right-buttons">
              <button class="btn-anunciar">Anunciar</button>
              <button class="btn-entrar">Entrar</button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
