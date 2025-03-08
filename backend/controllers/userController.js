import User from "../models/User.js";
import getUserInfo from "../util/getUserInfo.js";

//REGISTER
export const registerUser = async (req, res, next) => {
  const { username, email, password, birthdate } = req.body;
  console.log(req.body);
  if (!!!username || !!!email || !!!password || !!!birthdate) {
    return res.status(400).json({
      error: "Todos los datos son requeridos",
    });
  }
  const user = new User();
  const exists = await User.exists(username, email);
  if (exists)
    return res.status(400).json({
      error: "El usuario o email ya esta registrado",
    });
  try {
    const user = new User({ username: username.toLowerCase(), email: email.toLowerCase(), password, birthdate });
    await user.save();
    return res.status(200).json({
      message: "Usuario registrado Exitosamente",
    });
  } catch (error) {
    return res.status(500).json({
      error: `ERROR AL MOMENTO DE GUARDAR EL REGISTRO ${error}`,
    });
  }
};
//LOGIN
export const authenticateUser = async (req, res) => {
    try {
      const { identifier, password } = req.body;
      console.log(req.body);
      if (!identifier || !password) {
        return res.status(400).json({ error: "Tienes que llenar todos los datos" });
      }
      const normalizedIdentifier = identifier.toLowerCase();
      const user = await User.findOne({$or: [{username: normalizedIdentifier}, {email: normalizedIdentifier}] });
      if (!user) {
        return res.status(400).json({ error: "Credenciales incorrectas" });
      }
      const isCorrectPassword = await user.commparePassword(password, user.password);
      if (!isCorrectPassword) {
        return res.status(400).json({ error: "Credenciales incorrectas" });
      }
      
      const accessToken = user.createAccessToken(user)
      const refreshToken = await user.createRefreshToken(user)
      return res.status(200).json({
        user: getUserInfo(user),
        accessToken: accessToken,
        refreshToken: refreshToken
      });
  
    } catch (error) {
      console.error("Error en autenticación:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  };
  