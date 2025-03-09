import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import axios from "axios";
import { APT_URL } from "../constans/apiEndpoints";
import Alert from "../components/alerts/Alert";

export const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const auth = useAuth();
  const [messageError, setMessageError] = useState("");
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlertVisible(true);

    try {
      const response = await axios.post(
        `${APT_URL}/login`,
        {
          identifier,
          password,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        auth.saveUser(response.data);
        navigate("/game");
      }
    } catch (error) {
      setAlertVisible(true);

      if (error.response) {
        setMessageError(
          error.response.data.error || "Error en la autenticación."
        );
      } else if (error.request) {
        setMessageError("No se pudo conectar con el servidor.");
      } else {
        setMessageError("Ocurrió un error desconocido.");
        console.log(`error desconocido ${error}`);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="form-container">
        {alertVisible && messageError && (
          <Alert
            type="warning"
            message={messageError}
            onClose={() => setAlertVisible(false)}
          />
        )}
        <form onSubmit={handleSubmit} className="login-form">
          <fieldset>
            <legend>Iniciar Sesión</legend>
            <div className="input-group">
              <label htmlFor="identifier">Usuario / Email</label>
              <input
                type="text"
                id="identifier"
                name="identifier"
                placeholder="Ingresa tu usuario o email"
                value={identifier}
                autoComplete="username"
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-login">
              Ingresar
            </button>

            <p className="register-link">
              ¿No tienes cuenta? <Link to="/register">Crear cuenta</Link>
            </p>
          </fieldset>
        </form>
      </div>
    </>
  );
};
