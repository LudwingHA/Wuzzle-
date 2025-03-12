import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/router.js";
import cookieParser from "cookie-parser";
import { URL_LOCAL } from "./constans/constans.js";

dotenv.config();
const app = express();
const PORT_SERVER = 3100;
mongoose
  .connect("mongodb://localhost/wordle")
  .then(() => console.log("Conexion Exitosa con la base de datos"))
  .catch((error) => {
    console.log(error);
  });

//middleware
app.use(cors({
  origin: ["http://localhost:5173", `http://${URL_LOCAL}:5173`],
  credentials: true,
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(cookieParser())
app.use(express.json());
app.listen(PORT_SERVER, "0.0.0.0", () => {
  console.log(
    `Servidor corriendo correctamente en http://0.0.0.0:${PORT_SERVER}`
  );
});
app.use("/", router);
