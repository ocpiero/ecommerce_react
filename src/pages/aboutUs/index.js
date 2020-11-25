/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useRef } from "react";
import { fadeInUp, fadeInDown } from "../../components/Animation";
import "./aboutUs.css";

const AboutUs = () => {
  let infoo = useRef(null);
  let mapa = useRef(null);

  useEffect(() => {
    fadeInUp(infoo);
    fadeInDown(mapa);
  }, []);

  return (
    <>
      <div className="aboutUs">
        <div ref={(el) => (infoo = el)} className="infoo">
          <h3>Bem vindo ao prototipo de site E-commerce</h3>
          <p>
            O objetivo da plataforma será promover a venda de produtos através
            do consumo de uma restful-API e promover a navegação dos usuários
            cadastrados em páginas autorizadas por um WebToken. O design do site
            ainda está sendo aprimorado.
          </p>
          <h3>O Palmeiras é o melhor time do mundo!</h3>
        </div>
        <br />
      </div>
      <div ref={(el) => (mapa = el)} className="mapa">
        <iframe
          width="250"
          height="200"
          frameBorder="100"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7376.948922464543!2d-41.817026851662945!3d-22.41116112225128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9636cd70028533%3A0xadf29c93fc457210!2sPraia%20do%20Pecado%2C%20Maca%C3%A9%20-%20RJ!5e0!3m2!1spt-BR!2sbr!4v1595262923778!5m2!1spt-BR!2sbr"
        ></iframe>
      </div>
    </>
  );
};

export default AboutUs;
