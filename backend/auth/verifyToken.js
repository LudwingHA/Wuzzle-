import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(403).json({ message: "Token Requerido" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Token invalido" });
    req.userId = decoded.id;
    console.log(req.userId);
    next();
  });
};
