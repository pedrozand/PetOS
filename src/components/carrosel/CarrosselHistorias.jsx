import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaStar } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./CarrosselHistorias.css";

const historias = [
  {
    nome: "Midori",
    pet: "Kiyuubi",
    cidade: "Diadema - SP",
    avaliacao: 5,
    descricao:
      "Olá, agradecemos todos que compartilharam!!! Chegou até a pessoa que acolheu ele e ela pode devolver!! Ele voltou!!! 🙏💚🐾",
    imagem: "src/assets/img/historias-destaque/cachorro-1.jpg",
  },
  {
    nome: "Cláudio",
    pet: "Luppy",
    cidade: "Mogi Guaçu - SP",
    avaliacao: 5,
    descricao:
      "Foi encontrado num bairro vizinho, por pessoas boas que cuidaram dele. Assim que viram o post no Facebook, já entraram em contato e prontamente entregaram o cachorro.",
    imagem: "src/assets/img/historias-destaque/cachorro-2.jpg",
  },
  {
    nome: "Ana",
    pet: "Paçoca",
    cidade: "Andradina - SP",
    avaliacao: 5,
    descricao:
      "O vizinho viu a campanha e procurou, achou e nos devolveu ❤️❤️❤️",
    imagem: "src/assets/img/historias-destaque/cachorro-3.jpg",
  },
  // Adicione mais histórias conforme necessário
];

function CarrosselHistorias() {
  return (
    <div className="historias-container">
      <h2 className="titulo-historias">Histórias em destaque</h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
      >
        {historias.map((historia, index) => (
          <SwiperSlide key={index}>
            <div className="cartao-historia">
              <div className="imagem-perfil reencontro-container">
                <img src={historia.imagem} alt={historia.pet} />
                <p className="reencontro">
                  Reencontro de{" "}
                  <strong className="nome-cachorro">{historia.pet}</strong>
                </p>
              </div>

              <h3 className="dono">
                {historia.nome}{" "}
                {Array(historia.avaliacao).fill(
                  <FaStar className="icon-star" />
                )}
              </h3>
              <p className="cidade">{historia.cidade}</p>
              <p className="descricao">"{historia.descricao}"</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default CarrosselHistorias;
