import React from "react";
import Layout from "../../layout/Layout";
import { Link } from "react-router-dom";

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
          <section className="home__section home__example">
          <h2 className="home__subtitle">Ejemplo de juego</h2>
          <p className="home__text">
            Supongamos que la palabra oculta es <strong>"SOLAR"</strong>. Aquí hay un ejemplo de cómo se verían los intentos:
          </p>

          <div className="home__attempt">
            <div className="home__letter home__letter--incorrect">T</div>
            <div className="home__letter home__letter--misplaced">A</div>
            <div className="home__letter home__letter--incorrect">P</div>
            <div className="home__letter home__letter--incorrect">A</div>
            <div className="home__letter home__letter--incorrect">S</div>
          </div>
          <p className="home__description">
            En el primer intento (<strong>TAPAS</strong>): 
            "T", "P" y la segunda "A" no están en la palabra. 
            "A" está en la palabra pero en la posición incorrecta.
            "S" no está en la posición correcta.
          </p>

          <div className="home__attempt">
            <div className="home__letter home__letter--correct">S</div>
            <div className="home__letter home__letter--correct">O</div>
            <div className="home__letter home__letter--correct">L</div>
            <div className="home__letter home__letter--misplaced">E</div>
            <div className="home__letter home__letter--correct">R</div>
          </div>
          <p className="home__description">
            En el segundo intento (<strong>SOLER</strong>):  
            "S", "O", "L" y "R" están en la posición correcta.  
            "E" está en la palabra, pero en la posición incorrecta.
          </p>

          <div className="home__attempt">
            <div className="home__letter home__letter--correct">S</div>
            <div className="home__letter home__letter--correct">O</div>
            <div className="home__letter home__letter--correct">L</div>
            <div className="home__letter home__letter--correct">A</div>
            <div className="home__letter home__letter--correct">R</div>
          </div>
          <p className="home__description">
            En el tercer intento (<strong>SOLAR</strong>), ¡la palabra es correcta! 🎉
          </p>
        </section>
        <section className="home__section home__play-now">
          <h2 className="home__subtitle">¿Listo para jugar?</h2>
          <p className="home__text">
            Pon a prueba tu habilidad y adivina la palabra del día. ¡Compite con
            tus amigos y mejora tu récord!
          </p>

          <Link to="/game" className="home__play-button">
            🎮 Jugar Ahora
          </Link>
        </section>
        </div>
      </Layout>
    </>
  );
};
