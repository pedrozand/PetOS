import "./filtro.css";
import { useState } from "react";
import { PiDogFill, PiDog } from "react-icons/pi";

export default function Filtro() {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar visibilidade

  return (
    // Barra lateral de filtros
    <div className={`sidebar-filter ${isOpen ? "open" : "closed"}`}>
      {/* Título clicável para expandir/recolher */}
      <h2 className="filter-title" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <PiDog className="filter-arrow" />
        ) : (
          <PiDogFill className="filter-arrow" />
        )}
        Filtros{" "}
      </h2>

      {isOpen && (
        <>
          <div className="filter-group">
            <label for="address">Endereço, cidade ou CEP</label>
            <input type="text" id="address" />
          </div>

          <div className="filter-group">
            <label for="name-id">Nome ou ID</label>
            <input type="text" id="name-id" />
          </div>

          <div className="filter-group">
            <label>Espécie</label>

            <label className="switch no-bold">
              <input
                type="checkbox"
                name="especie"
                value="cachorro"
                defaultChecked
              />
              <span className="slider"></span> Cachorro
            </label>
            <label className="switch no-bold">
              <input
                type="checkbox"
                name="especie"
                value="gato"
                defaultChecked
              />
              <span className="slider"></span> Gato
            </label>
            <label className="switch no-bold">
              <input
                type="checkbox"
                name="especie"
                value="passaro"
                defaultChecked
              />
              <span className="slider"></span> Pássaro
            </label>
          </div>

          <div className="filter-group">
            <label>Gênero</label>
            <label className="switch no-bold">
              <input
                type="checkbox"
                name="genero"
                value="macho"
                defaultChecked
              />
              <span className="slider"></span> Macho
            </label>
            <label className="switch no-bold">
              <input
                type="checkbox"
                name="genero"
                value="femea"
                defaultChecked
              />
              <span className="slider"></span> Fêmea
            </label>
          </div>

          <div className="filter-group">
            <label for="size">Porte</label>
            <select id="size">
              <option value="">Qualquer</option>
              <option value="pequeno">Pequeno</option>
              <option value="medio">Médio</option>
              <option value="grande">Grande</option>
            </select>
          </div>

          <div className="filter-group">
            <label for="color">Cor</label>
            <select id="color">
              <option value="">Qualquer</option>
              <option value="preta">Preta</option>
              <option value="branca">Branca</option>
              <option value="cinza">Cinza</option>
              <option value="marrom">Marrom</option>
              <option value="caramelo">Dourada (Caramelo)</option>
              <option value="vermelha">Vermelha</option>
              <option value="outra">Outra</option>
            </select>
          </div>

          <div className="filter-group">
            <label for="eye-color">Cor dos Olhos</label>
            <select id="eye-color">
              <option value="">Qualquer</option>
              <option value="escuros">Escuros</option>
              <option value="azuis">Azuis</option>
              <option value="verdes">Verdes</option>
              <option value="amarelos">Amarelos</option>
              <option value="heterocromia">Um de cada cor</option>
              <option value="outra">Outra</option>
            </select>
          </div>

          <div className="filter-group">
            <label for="color">Idade</label>
            <select id="color">
              <option value="">Qualquer</option>
              <option value="filhote">Filhote</option>
              <option value="adulto">Adulto</option>
              <option value="senior">Sênior</option>
            </select>
          </div>

          <button className="filter-btn">Buscar</button>
        </>
      )}
    </div>
  );
}
