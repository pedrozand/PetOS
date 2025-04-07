import "./encontr.css";

export default function Encontrados({ nome, local, hora, intervalo, imgPet }) {
  return (
    <div className="card-encontrado">
      <div className="card-encontr-header">Encontrado</div>

      <div className="card-img-wrapper">
        <img src={imgPet} alt="Imagem do animal" className="animal-img" />
        <div className="animal-intervalo">{intervalo}</div>{" "}
        {/* Texto sobreposto */}
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
