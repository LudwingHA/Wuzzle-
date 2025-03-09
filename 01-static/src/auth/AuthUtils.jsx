import axios from "axios";
import jwt_decode from "jwt-decode";

const isTokenExpired = (token) => {
  const decoded = jwt_decode(token);
  return decoded.exp * 1000 < Date.now(); // La expiración se compara con la hora actual en milisegundos
};

const getAccessToken = async () => {
  let token = localStorage.getItem("accessToken"); // Asumiendo que el access token se guarda en localStorage
  if (token && isTokenExpired(token)) {
    // Si el access token ha expirado, hacer una solicitud para obtener un nuevo access token
    try {
      const response = await axios.post(
        "/api/refresh",
        {},
        { withCredentials: true }
      ); // Con cookies httpOnly
      token = response.data.accessToken;
      localStorage.setItem("accessToken", token); // Actualizar el access token en localStorage
    } catch (error) {
      console.error("Error al renovar el token:", error);
    }
  }
  return token;
};
const getProtectedData = async () => {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    console.error("No autorizado");
    return;
  }

  try {
    const response = await axios.get("/api/protected", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(response.data);
  } catch (error) {
    console.error("Error al acceder a datos protegidos", error);
  }
};
const logout = () => {
  localStorage.removeItem("accessToken");
  // Eliminar la cookie del refresh token
  axios.post("/api/logout", {}, { withCredentials: true });
};
export const logoutUser = (req, res) => {
  // Eliminar la cookie del refresh token
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
  return res.status(200).json({ message: "Sesión cerrada con éxito" });
};
