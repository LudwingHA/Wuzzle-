import React from "react";
import Layout from "../../layout/Layout";

export const Home = () => {
  return (
    <>
      <Layout>
        <div className="home">
          <h1 className="home__title">WUZZLE</h1>
          
          <section className="home__section home__objective">
            <h2 className="home__subtitle">Objetivo</h2>
            <p className="home__text">
              El objetivo del juego es simple, adivinar la palabra oculta. La
              palabra tiene 5 letras y tienes 6 intentos para adivinarla. La
              palabra es la misma para todas las personas en ese día. Cada
              intento debe ser una palabra válida. En cada ronda el juego pinta
              cada letra de un color indicando si esa letra se encuentra o no en
              la palabra y si se encuentra en la posición correcta.
            </p>
          </section>

          <section className="home__section home__how-to-play">
            <h2 className="home__subtitle">Cómo jugar</h2>

            <div className="home__rule">
              <div className="home__letter home__letter--correct">W</div> 
              <p className="home__description">
                <span className="home__highlight home__highlight--green">VERDE </span> 
                significa que la letra está en la palabra y en la posición <strong>CORRECTA</strong>.
              </p>
            </div>

            <div className="home__rule">
              <div className="home__letter home__letter--misplaced">O</div> 
              <p className="home__description">
                <span className="home__highlight home__highlight--yellow">AMARILLO </span> 
                significa que la letra está presente en la palabra pero en la posición <strong>INCORRECTA</strong>.
              </p>
            </div>

            <div className="home__rule">
              <div className="home__letter home__letter--incorrect">R</div> 
              <p className="home__description">
                <span className="home__highlight home__highlight--gray">GRIS </span> 
                significa que la letra letra NO está presente en la palabra.
              </p>
            </div>

          </section>
        </div>
      </Layout>
    </>
  );
};
