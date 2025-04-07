import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaStar } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./CSS/carrosel.css";
import "./CSS/swiper.css";

const historias = [
  {
    nome: "Carlos",
    pet: "Goku",
    cidade: "Bragança Paulista - SP",
    avaliacao: 5,
    descricao:
      "Após muita busca, conseguimos encontrá-lo graças às postagens! 🥰",
    imagem: "src/assets/img/historias-destaque/cachorro-1.jpg",
  },
  {
    nome: "Fernanda",
    pet: "Vegeta",
    cidade: "Bragança Paulista - SP",
    avaliacao: 5,
    descricao:
      "Uma pessoa viu o post e nos ajudou a reencontrá-la! Emoção pura! ❤️",
    imagem: "src/assets/img/historias-destaque/cachorro-2.jpg",
  },
  {
    nome: "Rafael",
    pet: "Trunks",
    cidade: "Bragança Paulista - SP",
    avaliacao: 5,
    descricao:
      "Depois de dias procurando, ele voltou para casa graças à divulgação! 🐶🙏",
    imagem: "src/assets/img/historias-destaque/cachorro-3.jpg",
  },
  {
    nome: "Juliana",
    pet: "Bulma",
    cidade: "Bragança Paulista - SP",
    avaliacao: 5,
    descricao:
      "Ficamos desesperados, mas com a ajuda de todos conseguimos achá-la! 😍",
    imagem: "src/assets/img/historias-destaque/gato-1.jpg",
  },
  {
    nome: "Rodrigo",
    pet: "Bills",
    cidade: "Bragança Paulista - SP",
    avaliacao: 5,
    descricao:
      "A campanha foi essencial! Hoje ele está de volta e muito feliz! 🥲",
    imagem: "src/assets/img/historias-destaque/gato-2.jpg",
  },
  {
    nome: "Mariana",
    pet: "Piccolo",
    cidade: "Bragança Paulista - SP",
    avaliacao: 5,
    descricao: "As redes sociais ajudaram muito, reencontro emocionante! 🥹❤️",
    imagem: "src/assets/img/historias-destaque/cachorro-4.jpg",
  },
  {
    nome: "André",
    pet: "Goten",
    cidade: "Bragança Paulista - SP",
    avaliacao: 5,
    descricao:
      "Ele estava a quilômetros de casa, mas conseguimos! Gratidão imensa! 🙏",
    imagem: "src/assets/img/historias-destaque/cachorro-5.jpg",
  },
  {
    nome: "Carla",
    pet: "Gohan",
    cidade: "Bragança Paulista - SP",
    avaliacao: 5,
    descricao: "Nosso pequeno voltou pra casa! Obrigada a todos pela ajuda! ❤️",
    imagem: "src/assets/img/historias-destaque/gato-3.jpg",
  },
  {
    nome: "Bruno",
    pet: "Majin Boo",
    cidade: "Bragança Paulista - SP",
    avaliacao: 5,
    descricao: "Depois de dias de angústia, ele finalmente está de volta! 🐕🥰",
    imagem: "src/assets/img/historias-destaque/cachorro-6.jpg",
  },
  {
    nome: "Tatiane",
    pet: "Freeza",
    cidade: "Bragança Paulista - SP",
    avaliacao: 5,
    descricao:
      "Uma corrente do bem nos ajudou a encontrá-lo! Gratidão imensa! 🤗",
    imagem: "src/assets/img/historias-destaque/gato-4.jpg",
  },
  {
    nome: "Luiz",
    pet: "Broly",
    cidade: "Bragança Paulista - SP",
    avaliacao: 5,
    descricao: "Ele estava assustado, mas conseguimos trazê-lo para casa! 😍",
    imagem: "src/assets/img/historias-destaque/gato-5.jpg",
  },
  {
    nome: "Beatriz",
    pet: "Kuririn",
    cidade: "Bragança Paulista - SP",
    avaliacao: 5,
    descricao:
      "Foi uma jornada difícil, mas o final foi feliz! Obrigada a todos! 🥹",
    imagem: "src/assets/img/historias-destaque/gato-6.jpg",
  },
];

function Carrosel() {
  return (
    <div className="historias-container">
      <h2 className="titulo-historias">Histórias em destaque</h2>
      {/* Botão "Ver mais" fixo no canto do carrossel */}
      <button
        className="ver-mais-fixo"
        onClick={() => alert("Abrir página completa!")}
      >
        Ver mais
      </button>
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

export default Carrosel;
