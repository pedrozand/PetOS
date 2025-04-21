import { useState } from "react";
import "./faqInicial.css";
import { FaChevronDown } from "react-icons/fa";

const dadosFAQ = [
  {
    pergunta: "Como faço um anúncio de pet perdido?",
    resposta:
      "No PetOS, basta acessar a aba 'Perdi meu Pet', preencher as informações essenciais e publicar gratuitamente. Adicione fotos e localização para aumentar as chances de reencontro!",
  },
  {
    pergunta: "O anúncio no PetOS é gratuito?",
    resposta:
      "Sim! Todos os usuários podem publicar gratuitamente seus anúncios de pets perdidos ou encontrados.",
  },
  {
    pergunta: "Quais ferramentas posso usar sem pagar?",
    resposta:
      "Você pode adicionar fotos, localização, descrição, receber alertas e visualizar casos na sua região sem nenhum custo.",
  },
  {
    pergunta: "Como funciona uma campanha patrocinada?",
    resposta:
      "A campanha patrocinada destaca o seu anúncio na página inicial e o impulsiona para mais pessoas próximas, aumentando a visibilidade.",
  },
  {
    pergunta: "Vocês garantem que o pet será encontrado?",
    resposta:
      "Infelizmente não podemos garantir, mas com a visibilidade local, alertas e colaboração da comunidade, suas chances aumentam significativamente!",
  },
  {
    pergunta: "Como funciona a área de achados e perdidos?",
    resposta:
      "Você pode visualizar pets perdidos ou encontrados na sua região e ajudar compartilhando ou tentando contato direto com o anunciante.",
  },
];

function PerguntasRespostas() {
  const [ativoIndex, setAtivoIndex] = useState(null);

  const toggleResposta = (index) => {
    setAtivoIndex(ativoIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2 className="faq-titulo">Dúvidas sobre o PetOS?</h2>
      {dadosFAQ.map((item, index) => (
        <div
          key={index}
          className={`faq-item ${ativoIndex === index ? "ativo" : ""}`}
          onClick={() => toggleResposta(index)}
        >
          <div className="faq-pergunta">
            <span>{item.pergunta}</span>
            <FaChevronDown
              className={`icone-seta ${ativoIndex === index ? "girar" : ""}`}
            />
          </div>
          {ativoIndex === index && (
            <div className="faq-resposta">{item.resposta}</div>
          )}
        </div>
      ))}
    </div>
  );
}

export default PerguntasRespostas;
