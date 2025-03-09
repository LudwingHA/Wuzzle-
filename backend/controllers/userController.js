import {
  generateAccessToken,
  generateRefreshToken,
} from "../auth/generateToken.js";
import User from "../models/User.js";
import getUserInfo from "../util/getUserInfo.js";
import jwt from "jsonwebtoken";

// Registrar usuario
export const registerUser = async (req, res, next) => {
  const { username, email, password, birthdate } = req.body;
  if (!username || !email || !password || !birthdate) {
    return res.status(400).json({
      error: "Todos los datos son requeridos",
    });
  }
  const userExists = await User.exists(username, email);
  if (userExists)
    return res.status(400).json({
      error: "El usuario o email ya está registrado",
    });

  try {
    const user = new User({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password,
      birthdate,
    });
    await user.save();
    return res.status(200).json({
      message: "Usuario registrado exitosamente",
    });
  } catch (error) {
    return res.status(500).json({
      error: `ERROR AL GUARDAR EL REGISTRO ${error}`,
    });
  }
};

// Autenticar usuario
export const authenticateUser = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    if (!identifier || !password) {
      return res
        .status(400)
        .json({ error: "Tienes que llenar todos los datos" });
    }
    const normalizedIdentifier = identifier.toLowerCase();
    const user = await User.findOne({
      $or: [
        { username: normalizedIdentifier },
        { email: normalizedIdentifier },
      ],
    });
    if (!user) {
      return res.status(400).json({ error: "Credenciales incorrectas" });
    }

    const isCorrectPassword = await user.comparePassword(
      password,
      user.password
    );
    if (!isCorrectPassword) {
      return res.status(400).json({ error: "Credenciales incorrectas" });
    }

    const accessToken = user.createAccessToken(user);
    const refreshToken = await user.createRefreshToken(user);

    // Asegúrate de que la cookie se esté configurando correctamente
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    return res.status(200).json({
      user: getUserInfo(user),
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    console.error("Error en autenticación:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Refrescar token de acceso
export const refreshAccessToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  console.log("Se hizo la peticion refreshAccessToken")
  if (!refreshToken) {
    return res.status(400).json({ error: "Refresh token requerido" });
  }
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err) return res.status(401).jsom({ error: "Refresh token invalido" });
      const newAccessToken = generateRefreshToken({ _id: decoded.id });
      console.log(newAccessToken)
      res.json({ accessToken: newAccessToken });
    }
  );
};

export const profile = async (req, res) =>{
  const user = await User.findById(req.userId, { password: 0 });
  res.json(user);
}


// Cerrar sesión
export const logoutUser = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
  return res.status(200).json({ message: "Sesión cerrada con éxito" });
};
