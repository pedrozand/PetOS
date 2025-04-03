import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
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
    imagem: "/assets/historias/kiyuubi.jpg",
  },
  {
    nome: "Cláudio",
    pet: "Luppy",
    cidade: "Mogi Guaçu - SP",
    avaliacao: 5,
    descricao:
      "Foi encontrado num bairro vizinho, por pessoas boas que cuidaram dele. Assim que viram o post no Facebook, já entraram em contato e prontamente entregaram o cachorro.",
    imagem: "/assets/historias/luppy.jpg",
  },
  {
    nome: "Ana",
    pet: "Paçoca",
    cidade: "Andradina - SP",
    avaliacao: 5,
    descricao:
      "O vizinho viu a campanha e procurou, achou e nos devolveu ❤️❤️❤️",
    imagem: "/assets/historias/pacoca.jpg",
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
              <div className="imagem-perfil">
                <img src={historia.imagem} alt={historia.pet} />
              </div>
              <p className="reencontro">
                Reencontro de <strong>{historia.pet}</strong>
              </p>
              <h3 className="dono">
                {historia.nome} {Array(historia.avaliacao).fill("⭐")}
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
