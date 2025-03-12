import React from "react";
import Layout from "../../layout/Layout";
import { useAuth } from "../../auth/AuthProvider";

export const Preferences = () => {
  const { userInfo } = useAuth();
  console.log(userInfo);
  const { username, wins, email, birthdate, createdAt } = userInfo.user;
  return (
    <>
      <Layout>
        <h1>Preferencias</h1>
        <div>
          <h2>
            Bienvenido, <span className="username">{username}</span>
          </h2>
          <hr />
          <h3>Información del usuario</h3>
          <p> username: {username}</p>
          <p>email: {email}</p>
          <p>Palabras encontradas: {wins}</p>
          <p>Fecha de nacimiento: {birthdate}</p>
          <p>Fecha de registro: {createdAt}</p>
          <hr />
        </div>
        <h3>Configuracion</h3>
        <p>Idioma: </p> <button>Ingles</button> <button>Español</button>
        <p>Tema: </p> <button>Oscuro</button> <button>Claro</button>
        <hr />
        <h3>Seguridad</h3>
        <p>Cambiar contraseña</p>
        <input type="password" name="" id="" placeholder="nueva contraseña" />
        <button>Cambiar contraseña</button>
        <p>Eliminar cuenta</p>
        <button>Eliminar mi cuenta y Información</button>
      </Layout>
    </>
  );
};
