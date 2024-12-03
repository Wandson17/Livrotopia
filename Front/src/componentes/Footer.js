import React from "react";
import "./Footer.css";
import twitterIcon from "../imgs/twitter.png";
import instagramIcon from "../imgs/instagram.png";
import youtubeIcon from "../imgs/youtube.png";
import linkdinIcon from "../imgs/linkdin.png";

const Footer = () => {
  return (
    <footer>
      <div>
        <img src={twitterIcon} alt="Ícone do twitter"></img>
        <img src={instagramIcon} alt="Ícone do instagram"></img>
        <img src={youtubeIcon} alt="Ícone do youtube"></img>
        <img src={linkdinIcon} alt="Ícone do linkdin"></img>
      </div>
      <div>
        <p className="negrito">
          &copy; 2024 Livrotopia - Todos os direitos reservados
        </p>
        <p>
          <a href="/sobre">Sobre o sistema</a>
        </p>
        <p>
          <a href="/contato">Contato</a>
        </p>
        <p>
          <a href="/termos">Termos e Condições</a>
        </p>
        <p>
          <a href="/privacidade">Política de Privacidade</a>
        </p>
        <p>
          <a href="/faq">Perguntas Frequentes</a>
        </p>
        <p>
          <a href="/suporte">Suporte ao Cliente</a>
        </p>
        <p>
          <a href="/carreiras">Carreiras</a>
        </p>
        <p>
          <a href="/parcerias">Parcerias</a>
        </p>
      </div>
      <div>
        <p className="negrito">
          &copy; 2024 Livrotopia - Todos os direitos reservados
        </p>
        <p>
          <a href="/sobre">Sobre o sistema</a>
        </p>
        <p>
          <a href="/contato">Contato</a>
        </p>
        <p>
          <a href="/termos">Termos e Condições</a>
        </p>
        <p>
          <a href="/privacidade">Política de Privacidade</a>
        </p>
        <p>
          <a href="/faq">Perguntas Frequentes</a>
        </p>
        <p>
          <a href="/suporte">Suporte ao Cliente</a>
        </p>
        <p>
          <a href="/carreiras">Carreiras</a>
        </p>
        <p>
          <a href="/parcerias">Parcerias</a>
        </p>
      </div>
    </footer>
  );
};
export default Footer;