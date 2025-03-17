import "./navbar.css";

import Logo from "../../assets/img/logo_petos.png";
import imgAdocao from "../../assets/img/adocao_icon.png";

export default function navBar() {
  /* // <!-- Variavel e IF para transição de Navbar de acordo com login-- > */
  let login = false;
  if (login == true) {
    return (
      <>
        <div className="navbar">
          <div className="logo">
            <a href="index.html">
              <img src={Logo} alt="Logo PetOS" className="logo-petos" />
            </a>
          </div>

          {/* // <!-- Menu principal-- > */}
          <div className="right-icons-group">
            <ul className="nav-menu">
              <li className="dropdown busca-menu">
                <a href="#">
                  Busca
                  {/* <!-- Ícone SVG de seta para baixo (indicação de dropdown) --> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a href="achados-perdidos.html">
                      Achados e Perdidos
                      <span>
                        Posts de pets perdidos e encontrados em sua região!
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
              </li>
              <li className="dropdown">
                <a href="#">
                  Conheça
                  {/* <!-- Ícone SVG de seta para baixo (indicação de dropdown) --> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a href="achados-perdidos.html">
                      ONG Faros D'Ajuda
                      <span>ONG em prol dos animais de rua.</span>
                    </a>
                  </li>
                </ul>
              </li>
              {/* <!-- Ícones da direita --> */}
              <div className="right-icons">
                <a href="adocao.html">
                  <img
                    src={imgAdocao}
                    alt="Icone Adoção"
                    className="icon-adot"
                  />
                </a>
              </div>
              <li className="dropdown adocao-dropdown">
                <a href="#">
                  Adoção
                  {/* <!-- Ícone SVG de seta para baixo (indicação de dropdown) --> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </a>
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
              </li>
            </ul>

            {/* <!-- Ícone do perfil à direita == Usuário Logado --> */}
            {}
            <div className="right-profile">
              <a href="perfil.html">
                <img
                  src="https://i.pinimg.com/236x/e4/58/0f/e4580fce3a0d7dcb4e6396632a92ed06.jpg"
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
        <div className="navbar">
          <div className="logo">
            <a href="index.html">
              <img src={Logo} alt="Logo PetOS" className="logo-petos" />
            </a>
          </div>

          {/* // <!-- Menu principal-- > */}
          <div className="right-icons-group">
            <ul className="nav-menu">
              <li className="dropdown busca-menu">
                <a href="#">
                  Busca
                  {/* <!-- Ícone SVG de seta para baixo (indicação de dropdown) --> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a href="achados-perdidos.html">
                      Achados e Perdidos
                      <span>
                        Posts de pets perdidos e encontrados em sua região!
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
              </li>
              <li className="dropdown">
                <a href="#">
                  Conheça
                  {/* <!-- Ícone SVG de seta para baixo (indicação de dropdown) --> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a href="achados-perdidos.html">
                      ONG Faros D'Ajuda
                      <span>ONG em prol dos animais de rua.</span>
                    </a>
                  </li>
                </ul>
              </li>
              {/* <!-- Ícones da direita --> */}
              <div className="right-icons">
                <a href="adocao.html">
                  <img
                    src={imgAdocao}
                    alt="Icone Adoção"
                    className="icon-adot"
                  />
                </a>
              </div>
              <li className="dropdown adocao-dropdown">
                <a href="#">
                  Adoção
                  {/* <!-- Ícone SVG de seta para baixo (indicação de dropdown) --> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </a>
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
