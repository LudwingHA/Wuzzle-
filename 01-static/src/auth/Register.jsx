import axios from "axios";
import React, { useState } from "react";
import { APT_URL } from "../constans/apiEndpoints";
import { useAuth } from "./AuthProvider";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Alert from "../components/alerts/Alert";
export const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthdate, setBirthDate] = useState("");
  const [messageError, setMessageError] = useState("");
  const [alertVisible, setAlertVisible] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlertVisible(true);
    if (password !== confirmPassword) {
      setAlertVisible(true);
      setMessageError("Las contraseñas no coinciden");
      return;
    }
    try {
      const response = await axios.post(`${APT_URL}/register`, {
        username,
        email,
        password,
        birthdate,
      });
      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      setAlertVisible(true);
      if (error.response) {
        setMessageError(
          error.response.data.error || "Error al registar el usuario"
        );
      } else if (error.request) {
        setMessageError("No se pudo conectar con el servidor.");
      } else {
        setMessageError("Ocurrió un error desconocido.");
        console.log(`error desconocido ${error}`);
      }
    } finally {
    }
  };
  return (
    <div className="form-container">
      {alertVisible && messageError && (
        <Alert
          type="warning"
          message={messageError}
          onClose={() => setAlertVisible(false)}
        ></Alert>
      )}
      <form onSubmit={handleSubmit} className="login-form">
        <fieldset>
          <legend>Registro</legend>
          <div className="input-group">
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Correo electronico: </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="tucorreo@dominio.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="birthdate">Fecha de nacimiento: </label>
            <input
              type="date" // Usa type="date" para un campo de fecha
              id="birthdate"
              name="birthdate"
              value={birthdate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña: </label>
            <input
              type="password" // Usa type="date" para un campo de fecha
              id="password"
              name="password"
              value={password}
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirmPassword">Repite la contraseña: </label>
            <input
              type="password" // Usa type="date" para un campo de fecha
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              autoComplete="new-password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-login">
            Registrar
          </button>

          <p className="register-link">
            ¿Ya tienes cuenta? <Link to="/login">Ingresar</Link>
          </p>
        </fieldset>
      </form>
    </div>
  );
};
