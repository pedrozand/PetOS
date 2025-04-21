import { FaFacebook, FaInstagram } from "react-icons/fa";
import "./footer.css";
import LogoPetOS from "../../assets/img/icon/logo_petos.png";

const Footer = () => {
  return (
    <footer className="containerFooter">
      <div className="auxFooter">
        {/* Logo e nome */}
        <div className="footerLogo">
          <img src={LogoPetOS} className="logoPetOS" />
          <h2 className="tituloFooter">PetOS</h2>
        </div>

        {/* Redes sociais */}
        <div className="iconMidias">
          <a href="#" className="iconFace">
            <FaFacebook /> @petosoficial
          </a>
          <a href="#" className="iconInsta">
            <FaInstagram /> @petosoficial
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="copyRight">
        © 2025 PetOS
        <br />
        CNPJ: XX.XXX.XXX/XXXX-XX
      </div>
    </footer>
  );
};

export default Footer;
