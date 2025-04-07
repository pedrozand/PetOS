import "./perdid.css";

export default function Perdidos({ nome, local, hora, imgPet }) {
  return (
    <div className="card-perdid">
      <div className="card-perdid-header">Perdido</div>

      <div className="card-img-wrapper">
        <img src={imgPet} alt="Imagem do animal" className="animal-img" />
      </div>

      <div className="card-content">
        <div className="animal-nome">{nome}</div>
        <div className="container-infos">
          <div className="animal-local">{local}</div>
          <div className="animal-hora">{hora}</div>
        </div>
      </div>
    </div>
  );
}
