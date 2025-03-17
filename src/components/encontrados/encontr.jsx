import "./encontr.css";

export default function Encontrados({ nome, local, hora, intervalo, imgPet }) {
  return (
    <div className="card-encontrado">
      <div className="card-header">Encontrado</div>

      <div className="card-img-wrapper">
        <img src={imgPet} alt="Imagem do animal" className="animal-img" />
      </div>

      <div className="card-content">
        <div className="animal-nome">{nome}</div>
        <div className="animal-local">
          <strong>{local}</strong>
        </div>
        <div className="animal-hora">
          <strong>{hora}</strong>
        </div>
        <div className="animal-intervalo">
          <strong>{intervalo}</strong>
        </div>
      </div>
    </div>
  );
}
